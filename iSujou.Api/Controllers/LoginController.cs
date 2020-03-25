using iSujou.Api.Application.Commands;
using iSujou.Api.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace iSujou.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _service;

        public LoginController(ILoginService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<string> Authenticate(LoginCommand command)
        {
            var response = _service.Authenticate(command);

            return new ActionResult<string>(response);
        }
    }
}