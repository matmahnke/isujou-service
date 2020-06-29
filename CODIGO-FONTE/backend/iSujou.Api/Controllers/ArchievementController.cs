using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iSujou.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    public class ArchievementController : ControllerBase
    {
        private readonly IArchievementRepository _repository;

        public ArchievementController(IArchievementRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var archievements = _repository.GetAll().Where(x => x.UserId == id);

                return Ok(archievements);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}