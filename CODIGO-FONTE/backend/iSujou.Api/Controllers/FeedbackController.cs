using iSujou.Api.Application.Commands;
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
    public class FeedbackController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAchievementRepository _achievements;
        private readonly IUserInfoRepository _userInfo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFeedbackRepository _repository;

        public FeedbackController(UserManager<User> userManager, IFeedbackRepository repository, IAchievementRepository achievementRepository, IUnitOfWork unitOfWork, IUserInfoRepository userInfo)
        {
            _userManager = userManager;
            _achievements = achievementRepository;
            _unitOfWork = unitOfWork;
            _repository = repository;
            _userInfo = userInfo;
        }

        [HttpPost]
        [Authorize("Bearer")]
        public async Task<IActionResult> Post([FromBody] FeedbackCommand command)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                var receiver = (await _userInfo.GetUserProfileById(command.ReceiverId)).User;

                await _repository.AddAsync(new Feedback
                {
                    CreatorId = user.Id,
                    ReceiverId = receiver.Id,
                    Description = command.Description,
                    CreationDate = DateTime.Now
                });

                if (command.Achievement != null)
                {
                    var achievement = _achievements.GetAll().Where(x => x.User.UserInfoId == command.ReceiverId && x.Code == command.Achievement).FirstOrDefault();

                    if (achievement == null)
                    {
                        await _achievements.AddAsync(new Achievement
                        {
                            Points = 1,
                            Code = command.Achievement.GetValueOrDefault(),
                            UserId = receiver.Id
                        });
                    }
                    else
                        achievement.Points++;
                }

                await _unitOfWork.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize("Bearer")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                var feedbacks = _repository.GetAll().Where(x => x.ReceiverId == user.Id);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}