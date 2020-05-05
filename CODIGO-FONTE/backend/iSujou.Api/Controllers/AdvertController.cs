using iSujou.Api.Application.Commands;
using iSujou.Domain.Repositories;
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

        public AdvertController(IAdvertRepository repository)
        {
            this._repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]AdvertCommand command)
        {
            await _repository.AddAsync(new Domain.Entities.Advert
            {
                Active = command.Active,
                Date = command.Date,
                PropertyId = command.PropertyId
            });
            return Ok();
        }
    }
}