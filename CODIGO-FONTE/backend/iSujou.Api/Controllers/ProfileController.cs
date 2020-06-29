using iSujou.Api.Application.Dto;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    [AllowAnonymous]
    public class ProfileController : ControllerBase
    {
        private readonly IUserInfoRepository _userInfo;
        private readonly IUnitOfWork _unitOfWork;

        public ProfileController(IUserInfoRepository userInfo, IUnitOfWork unitOfWork)
        {
            _userInfo = userInfo;
            _unitOfWork = unitOfWork;
        }

        [HttpGet()]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var userInfo = await _userInfo.GetUserProfileById(id);

                if (userInfo == null)
                   return NotFound("Usuário não encontrado.");

                return Ok(new ProfileDto
                {
                    Achievement = userInfo.Archievement,
                    AmountAdverts = userInfo.User.Adverts.Count,
                    AmountArchevements = 0,
                    AmountAssessments = 0,
                    BirthDate = userInfo.BirthDate,
                    Cpf = userInfo.Cpf,
                    Description = "",
                    FotoUrl = "",
                    Gender = userInfo.Gender,
                    LastName = userInfo.LastName,
                    Name = userInfo.Name
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut()]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] ProfileCommand command)
        {
            try
            {
                var userInfo = await _userInfo.GetUserProfileById(id);

                userInfo.BirthDate = command.BirthDate;
                userInfo.Cpf = command.Cpf;
                userInfo.Gender = command.Gender;
                userInfo.LastName = command.LastName;
                userInfo.Name = command.Name;

                await _unitOfWork.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}