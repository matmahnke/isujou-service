using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    public class AdvertController : ControllerBase
    {
        private readonly IAdvertRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public AdvertController(IAdvertRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]AdvertCommand command)
        {
            await _repository.AddAsync(new Domain.Entities.Advert
            {
                Active = command.Active,
                Date = command.Date,
                PropertyId = command.PropertyId,
                CreatorId = long.Parse(User.Identity.GetUserId())
            });
            await _unitOfWork.Commit();
            return Ok();
        }
    }
}