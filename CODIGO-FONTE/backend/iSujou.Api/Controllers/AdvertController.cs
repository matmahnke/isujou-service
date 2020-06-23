using iSujou.Api.Application.Commands;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Linq;
using iSujou.Api.ViewModel;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    [AllowAnonymous]
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
            try
            {
                return Ok((await _repository.GetPortfolioAsync()).Select(advert => new AdvertViewModel(advert)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("authenticated")]
        [Authorize("Bearer")]
        public async Task<IActionResult> GetAdvertsByAuthenticatedUser()
        {
            return Ok((await _repository.GetPortfolioAsync()).Where(x => x.Creator.UserName == User.Identity.Name).Select(advert => new AdvertViewModel(advert)));
        }

        [HttpGet()]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var advert = await _repository.GetAdvert(id);

                if (advert == null)
                    throw new Exception("Registro n�o encontrado.");

                return Ok(new AdvertViewModel(advert));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize("Bearer")]
        public async Task<IActionResult> Create([FromBody] AdvertCommand command)
        {
            try
            {
                await _repository.AddAsync(new Advert
                {
                    Active = command.Active,
                    Date = command.Date,
                    PropertyId = command.PropertyId,
                    CreatorId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id,
                    Items = command.Items?.Select(x => new AdvertItem
                    {
                        Description = x.Value
                    }).ToList()
                });
                await _unitOfWork.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPut]
        [Authorize("Bearer")]
        public async Task<IActionResult> Update([FromBody] AdvertCommand command)
        {
            try
            {
                await _repository.UpdateAsync(new Domain.Entities.Advert
                {
                    Active = command.Active,
                    Date = command.Date,
                    PropertyId = command.PropertyId,
                    Items = command.Items.Select(x => new AdvertItem
                    {
                        Description = x.Value
                    }).ToList()
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
        [Authorize("Bearer")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _repository.RemoveAsync(id);
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