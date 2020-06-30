using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
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
            return Ok(_repository.GetAll().Include(x => x.Owner).Where(x => x.Owner.UserName == User.Identity.Name));
        }

        [HttpGet()]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var property = await _repository.GetByIdAsync(id);

                if (property == null)
                    return NotFound("Imóvel não encontrado.");

                return Ok(property);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PropertyCommand command)
        {
            try
            {
                var cm = command.ToEntity();
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                cm.OwnerId = user.Id;
                await _repository.AddAsync(cm);
                await _uow.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PropertyCommand command)
        {
            try
            {
                var cm = command.ToEntity();
                var property = await _repository.GetByIdAsync(cm.Id);

                if (property != null)
                {
                    property.Title = cm.Title;
                    property.Active = cm.Active;
                    property.Description = cm.Description;
                    property.State = cm.State;
                    property.City = cm.City;
                    property.Neighborhood = cm.Neighborhood;
                    property.Street = cm.Street;
                    property.Number = cm.Number;
                    property.Cep = cm.Cep;
                    property.Complement = cm.Complement;

                    await _repository.UpdateAsync(property);
                    await _uow.Commit();

                    return Ok();
                }
                else
                {
                    return NotFound("Imóvel não encontrado.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _repository.RemoveAsync(id);
                await _uow.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}