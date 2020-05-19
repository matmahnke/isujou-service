using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using iSujou.Infra;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _repository;
        private readonly IUnitOfWork _uow;

        public PropertyController(IPropertyRepository repository, IUnitOfWork uow)
        {
            _repository = repository;
            _uow = uow;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PropertyCommand command)
        {

            await _repository.AddAsync(command.ToEntity());
            await _uow.Commit();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PropertyCommand command)
        {
            await _repository.UpdateAsync(command.ToEntity());
            await _uow.Commit();
            return Ok();
        }
    }
}