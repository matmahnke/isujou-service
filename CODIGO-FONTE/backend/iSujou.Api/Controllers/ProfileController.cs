using iSujou.Api.Application.Commands;
using iSujou.Api.Application.Dto;
using iSujou.Api.ViewModel;
using iSujou.CrossCutting.Data.Interfaces;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
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
    public class ProfileController : ControllerBase
    {
        private readonly IUserInfoRepository _userInfo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAchievementRepository _achievements;
        private readonly IFeedbackRepository _feedbacks;

        public ProfileController(IUserInfoRepository userInfo, IUnitOfWork unitOfWork, IAchievementRepository achievements, IFeedbackRepository feedbacks)
        {
            _userInfo = userInfo;
            _unitOfWork = unitOfWork;
            _achievements = achievements;
            _feedbacks = feedbacks;
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
                    Achievements = (await _achievements.GetAllAsync()).Where(ach => ach.UserId == userInfo.User.Id).Select(ach => new AchievementViewModel((int)ach.Code, ach.Points)).ToList(),
                    AmountAdverts = userInfo.User.Adverts.Count,
                    AmountAssessments = (await _feedbacks.GetAllAsync()).Count(fb => fb.ReceiverId == userInfo.User.Id),
                    BirthDate = userInfo.BirthDate,
                    Cpf = userInfo.Cpf,
                    Description = userInfo.Description,
                    PhotoUrl = userInfo.PhotoUrl,
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
                userInfo.PhotoUrl = command.PhotoUrl;

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