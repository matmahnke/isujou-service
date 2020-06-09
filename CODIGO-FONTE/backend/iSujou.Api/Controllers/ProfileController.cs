using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iSujou.Api.Application.Commands;
using iSujou.Api.Application.Dto;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    [Authorize("Bearer")]
    public class ProfileController : ControllerBase
    {
        private readonly IUserInfoRepository _userInfo;
        private readonly IUnitOfWork _unitOfWork;

        public ProfileController(IUserInfoRepository userInfo, IUnitOfWork unitOfWork)
        {
            _userInfo = userInfo;
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try
            {
                var user = await _userInfo.GetUserProfileByName(User.Identity.Name);

                return Ok(new ProfileDto
                {
                    achievements = new object[0],
                    AmountAdverts = user.User.Adverts.Count,
                    AmountArchevements = 0,
                    AmountAssessments = 0,
                    BirthDate = user.BirthDate,
                    Cpf = user.Cpf,
                    Description = "",
                    FotoUrl = "",
                    Gender = user.Gender,
                    Id = user.User.Id,
                    LastName = user.LastName,
                    Name = user.Name
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}