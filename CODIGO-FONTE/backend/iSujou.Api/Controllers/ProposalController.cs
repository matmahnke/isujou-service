using iSujou.Api.Application.Commands;
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

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
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
        public async Task<IActionResult> Create([FromBody]ProposalCommand command)
        {
            try
            {
                await _repository.AddAsync(new Domain.Entities.Proposal
                {
                    AdvertId = command.AdvertId,
                    Status = command.Status,
                    Value = 1,
                    CandidateId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id
                });
                await _unitOfWork.Commit();
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<object> result = new List<object>();
            var proposals = await _repository.GetProposals();
            var userId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;

            foreach (var proposal in proposals)
            {
                bool isMine = userId == proposal.Advert.CreatorId,
                     showButtons = isMine && proposal.Status == ProposalStatus.Pending;
                result.Add(new
                {
                    id = proposal.Id,
                    advert = proposal.Advert,
                    status = proposal.Status,
                    isMine = isMine,
                    canApprove = showButtons,
                    canRefuse = showButtons,
                    canSuspend = showButtons
                });
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("aprove/{id}")]
        public async Task<IActionResult> aprove(long id)
        {
            var proposal = await _repository.GetByIdAsync(id);
            proposal.Status = ProposalStatus.Accepted;
            await _unitOfWork.Commit();
            return Ok();
        }


        [Route("refuse/{id}")]
        public async Task<IActionResult> refuse(long id)
        {
            var proposal = await _repository.GetByIdAsync(id);
            proposal.Status = ProposalStatus.Refused;
            await _unitOfWork.Commit();
            return Ok();
        }

        [Route("suspend/{id}")]
        public async Task<IActionResult> suspend(long id)
        {
            var proposal = await _repository.GetByIdAsync(id);
            proposal.Status = ProposalStatus.Canceled;
            await _unitOfWork.Commit();
            return Ok();
        }
    }
}