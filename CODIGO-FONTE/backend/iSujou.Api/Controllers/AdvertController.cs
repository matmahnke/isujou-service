using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
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
        private readonly UserManager<User> _userManager;

        public AdvertController(IAdvertRepository repository, IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet()]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var property = await _repository.GetByIdAsync(id);

                if (property == null)
                    throw new Exception("Registro não encontrado.");

                return Ok(property);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]AdvertCommand command)
        {

            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            await _repository.AddAsync(new Domain.Entities.Advert
            {
                Active = command.Active,
                Date = command.Date,
                PropertyId = command.PropertyId,
                CreatorId = user.Id
            });
            await _unitOfWork.Commit();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] AdvertCommand command)
        {
            try
            {
                await _repository.UpdateAsync(new Domain.Entities.Advert
                {
                    Active = command.Active,
                    Date = command.Date,
                    PropertyId = command.PropertyId
                });
                await _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _repository.RemoveAsync(id);
                await _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok();
        }
    }
}