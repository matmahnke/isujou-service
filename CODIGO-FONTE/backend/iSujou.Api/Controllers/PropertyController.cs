using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
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
            var cm = command.ToEntity();
            var userId = long.Parse(User.Identity.GetUserId());
            cm.OwnerId = userId;
            await _repository.AddAsync(cm);
            await _uow.Commit();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PropertyCommand command)
        {
            try
            {
                var cm = command.ToEntity();
                var userId = long.Parse(User.Identity.GetUserId());
                cm.OwnerId = userId;
                await _repository.UpdateAsync(cm);
                await _uow.Commit();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }

        public async  Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                await _repository.RemoveAsync(id);
                await _uow.Commit();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }
    }
}