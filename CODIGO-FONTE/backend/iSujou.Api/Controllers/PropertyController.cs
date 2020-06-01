using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    [Authorize("Bearer")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _repository;
        private readonly IUnitOfWork _uow;
        private readonly UserManager<User> _userManager;

        public PropertyController(IPropertyRepository repository, IUnitOfWork uow, UserManager<User> userManager)
        {
            _repository = repository;
            _uow = uow;
            _userManager = userManager;
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
            //var userId = User.Identity.GetUserId();
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            cm.OwnerId = user.Id;
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
                //var userId = long.Parse(User.Identity.GetUserId());
                //cm.OwnerId = userId;
                await _repository.UpdateAsync(cm);
                await _uow.Commit();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }

        public async Task<IActionResult> Delete([FromQuery] int id)
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