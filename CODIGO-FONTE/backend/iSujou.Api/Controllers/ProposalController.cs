using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
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

        public ProposalController(IProposalRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ProposalCommand command)
        {
            await _repository.AddAsync(new Domain.Entities.Proposal
            {
                AdvertId = command.AdvertId,
                Status = command.Status,
                Value = command.Value,
                CandidateId = command.CandidateId
            });
            await _unitOfWork.Commit();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repository.GetAllAsync());
        }
    }
}