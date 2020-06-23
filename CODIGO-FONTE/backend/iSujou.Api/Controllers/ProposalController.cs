using iSujou.Api.Application.Commands;
using iSujou.Api.ViewModel;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    [Authorize("Bearer")]
    public class ProposalController : ControllerBase
    {
        private readonly IProposalRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public ProposalController(IProposalRepository repository, IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
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
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<object> result = new List<object>();
                var username = User?.Identity?.Name;
                var proposals = (await _repository.GetProposals()).Where(x => x.Candidate.UserName == username || x.Advert.Creator.UserName == username);
                var userId = (await _userManager.FindByNameAsync(username)).Id;

                foreach (var proposal in proposals)
                {
                    bool isMine = userId == proposal.Advert.CreatorId,
                         showInitialButtons = proposal.Status == ProposalStatus.Pending;
                    result.Add(new
                    {
                        id = proposal.Id,
                        advert = new AdvertViewModel(proposal.Advert),
                        status = proposal.Status == 0 ? ProposalStatus.Pending : proposal.Status,
                        isMine,
                        canApprove = showInitialButtons,
                        canRefuse = showInitialButtons,
                        canSuspend = showInitialButtons
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("approve/{id}")]
        public async Task<IActionResult> Approve(long id)
            => await ChangeStatus(id, ProposalStatus.Accepted);

        [HttpPost]
        [Route("refuse/{id}")]
        public async Task<IActionResult> Refuse(long id)
            => await ChangeStatus(id, ProposalStatus.Refused);

        [HttpPost]
        [Route("suspend/{id}")]
        public async Task<IActionResult> Suspend(long id)
            => await ChangeStatus(id, ProposalStatus.Canceled);

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
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}