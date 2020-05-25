using iSujou.Api.Application.Commands;
using iSujou.Api.Application.Configurations;
using iSujou.Api.Application.Interfaces;
using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace iSujou.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1")]
    public class AuthController : ControllerBase
    {
        private readonly ILoginService _service;
        private readonly SigningConfigurations _signingConfigurations;
        private readonly TokenConfigurations _tokenConfigurations;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(UserManager<User> userManager,
        SignInManager<User> signInManager,
        ILoginService service,
            SigningConfigurations signingConfigurations,
            TokenConfigurations tokenConfigurations,
            RoleManager<IdentityRole> roleManager)
        {
            _service = service;
            _signingConfigurations = signingConfigurations;
            _tokenConfigurations = tokenConfigurations;
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]LoginCommand user)
        {
            bool credenciaisValidas = false;
            if (user != null && !string.IsNullOrWhiteSpace(user.Username))
            {
                // Verifica a existência do usuário nas tabelas do
                // ASP.NET Core Identity
                var userIdentity = _userManager
                    .FindByNameAsync(user.Username).Result;
                if (userIdentity != null)
                {
                    // Efetua o login com base no Id do usuário e sua senha
                    var resultadoLogin = _signInManager
                        .CheckPasswordSignInAsync(userIdentity, user.Password, false)
                        .Result;
                    if (resultadoLogin.Succeeded)
                    {
                        // Verifica se o usuário em questão possui
                        // a role
                        credenciaisValidas = _userManager.IsInRoleAsync(
                            userIdentity, Roles.DEFAULT).Result;
                    }
                }
            }

            if (credenciaisValidas)
            {
                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(user.Username, "Login"),
                    new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
                    }
                );

                DateTime dataCriacao = DateTime.Now;
                DateTime dataExpiracao = dataCriacao +
                    TimeSpan.FromSeconds(_tokenConfigurations.Seconds);

                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = _tokenConfigurations.Issuer,
                    Audience = _tokenConfigurations.Audience,
                    SigningCredentials = _signingConfigurations.SigningCredentials,
                    Subject = identity,
                    NotBefore = dataCriacao,
                    Expires = dataExpiracao
                });
                var token = handler.WriteToken(securityToken);

                return Ok(new
                {
                    authenticated = true,
                    created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                    expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token,
                    message = "OK"
                });
            }
            else
            {
                return BadRequest(new { message = "Usuário e senha inválidos." });
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterCommand command)
        {
            var user = new User
            {
                UserName = command.Username,
                UserInfo = new UserInfo
                {
                    Name = command.Name,
                    LastName = command.LastName,
                    Cpf = command.Cpf,
                    BirthDate = command.BirthDate,
                    Gender = (Gender)command.Gender
                }
            };

            var result = await _userManager.CreateAsync(user, command.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Roles.DEFAULT);

                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(command.Username, "Login"),
                    new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, command.Username)
                    }
                );

                DateTime dataCriacao = DateTime.Now;
                DateTime dataExpiracao = dataCriacao +
                    TimeSpan.FromSeconds(_tokenConfigurations.Seconds);

                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = _tokenConfigurations.Issuer,
                    Audience = _tokenConfigurations.Audience,
                    SigningCredentials = _signingConfigurations.SigningCredentials,
                    Subject = identity,
                    NotBefore = dataCriacao,
                    Expires = dataExpiracao
                });
                var token = handler.WriteToken(securityToken);

                return Ok(new
                {
                    authenticated = true,
                    created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                    expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                    accessToken = token,
                    message = "OK"
                });
            }
            else
            {
                return BadRequest(new { message = string.Join(Environment.NewLine, result.Errors.Select(erro => erro.Description)) });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("private")]
        [Authorize("Bearer")]
        public string PrivateAction()
        {
            return "this message is secret";
        }

        [HttpGet("public")]
        public string PublicAction()
        {
            return "this message is public";
        }
    }
}
