using iSujou.Api.Application.Commands;
using iSujou.Api.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace iSujou.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _service;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public LoginController(UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        ILoginService service)
        {
            _service = service;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [MapToApiVersion("1.0")]
        [AllowAnonymous]
        public ActionResult<string> Authenticate(LoginCommand command)
        {
            var response = _service.Authenticate(command);

            return new ActionResult<string>(response);
        }
    }
}