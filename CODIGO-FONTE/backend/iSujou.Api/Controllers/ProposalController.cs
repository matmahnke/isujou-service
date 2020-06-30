using iSujou.Api.Application.Commands;
using iSujou.Api.ViewModel;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    [Authorize("Bearer")]
    public class ProposalController : ControllerBase
    {
        private readonly IProposalRepository _repository;
        private readonly IAdvertRepository _adverRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IFeedbackRepository _feedbacks;

        public ProposalController(IProposalRepository repository, IUnitOfWork unitOfWork, UserManager<User> userManager, IAdvertRepository adverRepository, IFeedbackRepository feedbacks)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _adverRepository = adverRepository;
            _feedbacks = feedbacks;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProposalCommand command)
        {
            try
            {
                await _repository.AddAsync(new Proposal
                {
                    AdvertId = command.AdvertId,
                    Status = ProposalStatus.Pending,
                    Value = command.Value,
                    CandidateId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id
                });
                await _unitOfWork.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<object> result = new List<object>();
                var username = User?.Identity?.Name;
                var proposals = (await _repository.GetProposals()).Where(x => x.Candidate.UserName == username || x.Advert.Creator.UserName == username).OrderByDescending(proposal => proposal.Id);
                var user = (await _userManager.FindByNameAsync(username));

                foreach (var proposal in proposals)
                {
                    bool isMine = user.Id == proposal.Advert.CreatorId,
                         showInitialButtons = proposal.Status == ProposalStatus.Pending;
                    User feedBackProfileUser = isMine ? proposal.Candidate : proposal.Advert.Creator;
                    bool canWriteFeedBack = proposal.Status == ProposalStatus.Completed && !(await UserWroteFeedBack(user.Id, feedBackProfileUser.Id));
                    result.Add(new
                    {
                        id = proposal.Id,
                        value = proposal.Value.ToString("N2"),
                        advert = new AdvertViewModel(proposal.Advert),
                        status = proposal.Status == 0 ? ProposalStatus.Pending : proposal.Status,
                        isMine,
                        canApprove = showInitialButtons,
                        canRefuse = showInitialButtons,
                        canSuspend = showInitialButtons,
                        canStart = proposal.Status == ProposalStatus.Accepted,
                        canComplete = proposal.Status == ProposalStatus.Active,
                        canWriteFeedBack,
                        feedbackProfileId = feedBackProfileUser.UserInfoId
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // filtrar pela proposta
        private async Task<bool> UserWroteFeedBack(string writer, string receiver)
            => (await _feedbacks.GetAllAsync()).Any(fb => fb.CreatorId == writer && fb.ReceiverId == receiver);

        [HttpPost]
        [Route("approve/{id}")]
        public async Task<IActionResult> Approve(long id)
        {
            try
            {
                var proposal = await _repository.GetByIdAsync(id);
                proposal.Status = ProposalStatus.Accepted;

                var advert = await _adverRepository.GetByIdAsync(proposal.AdvertId.GetValueOrDefault());
                advert.Active = false;

                foreach (var anotherProposal in (await _repository.GetAllAsync()).Where(prop => prop.AdvertId == advert.Id && prop.Id != proposal.Id && prop.Status == ProposalStatus.Pending))
                    anotherProposal.Status = ProposalStatus.Canceled;

                await _unitOfWork.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("refuse/{id}")]
        public async Task<IActionResult> Refuse(long id)
            => await ChangeStatus(id, ProposalStatus.Refused);

        [HttpPost]
        [Route("suspend/{id}")]
        public async Task<IActionResult> Suspend(long id)
            => await ChangeStatus(id, ProposalStatus.Canceled);

        [HttpPost]
        [Route("start/{id}")]
        public async Task<IActionResult> Start(long id)
            => await ChangeStatus(id, ProposalStatus.Active);

        [HttpPost]
        [Route("complete/{id}")]
        public async Task<IActionResult> Complete(long id)
            => await ChangeStatus(id, ProposalStatus.Completed);

        private async Task<IActionResult> ChangeStatus(long id, ProposalStatus status)
        {
            try
            {
                var proposal = await _repository.GetByIdAsync(id);
                proposal.Status = status;
                await _unitOfWork.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}