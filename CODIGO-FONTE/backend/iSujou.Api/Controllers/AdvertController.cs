using iSujou.Api.Application.Commands;
using iSujou.Api.ViewModel;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

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
                return Ok((await _repository.GetPortfolioAsync()).Where(advert => advert.Active).OrderByDescending(advert => advert.Date).Select(advert => new AdvertViewModel(advert)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("authenticated")]
        [Authorize("Bearer")]
        public async Task<IActionResult> GetAdvertsByAuthenticatedUser()
        {
            try
            {
                return Ok((await _repository.GetPortfolioAsync()).Where(x => x.Creator.UserName == User.Identity.Name).OrderByDescending(advert => advert.Id).Select(advert => new AdvertViewModel(advert)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet()]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var advert = await _repository.GetAdvert(id);

                if (advert == null)
                    return NotFound("Anúncio não encontrado.");

                return Ok(new AdvertViewModel(advert));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize("Bearer")]
        public async Task<IActionResult> Update([FromBody] AdvertCommand command)
        {
            try
            {
                await _repository.UpdateAsync(new Advert
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

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("suspend/{id}")]
        [Authorize("Bearer")]
        public async Task<IActionResult> Suspender(long id)
        {
            try
            {
                var advert = await _repository.GetAdvert(id);

                if (advert == null)
                    return NotFound("Anúncio não encontrado.");

                advert.Active = false;
                advert.EditorId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
                advert.EditionDate = DateTime.Now;
                await _unitOfWork.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}