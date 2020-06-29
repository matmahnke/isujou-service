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
        private readonly IArchievementRepository _archievementRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFeedbackRepository _repository;

        public FeedbackController(UserManager<User> userManager, IFeedbackRepository repository, IArchievementRepository archievementRepository, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _archievementRepository = archievementRepository;
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        [HttpPost]
        [Authorize("Bearer")]
        public async Task<IActionResult> Post([FromBody]FeedbackCommand command)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                await _repository.AddAsync(new Feedback
                {
                    CreatorId = user.Id,
                    ReceiverId = command.ReceiverId,
                    Description = command.Description,
                });

                var receiver = _archievementRepository.GetAll().Where(x => x.UserId == command.ReceiverId && x.Status == command.Archievement).FirstOrDefault();

                if (receiver == null)
                {
                    await _archievementRepository.AddAsync(new Archievement
                    {
                        Points = 1,
                        Status = command.Archievement,
                        UserId = command.ReceiverId
                    });
                }
                else
                {
                    receiver.Points++;
                }
                await _unitOfWork.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
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
                return BadRequest(ex);
            }
        }
    }
}