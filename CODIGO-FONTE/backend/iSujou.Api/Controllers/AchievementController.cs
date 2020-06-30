using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    public class AchievementController : ControllerBase
    {
        private readonly IAchievementRepository _repository;

        public AchievementController(IAchievementRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var achievements = _repository.GetAll().Where(x => x.UserId == id);

                return Ok(achievements);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}