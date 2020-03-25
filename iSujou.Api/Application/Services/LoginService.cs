using iSujou.Api.Application.Commands;
using iSujou.Api.Application.Interfaces;
using iSujou.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace iSujou.Api.Application.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IConfiguration _configuration;

        public LoginService(ILoginRepository loginRepository, IConfiguration configuration)
        {
            _loginRepository = loginRepository;
            _configuration = configuration;
        }
        public string Authenticate(LoginCommand command)
        {

            var result = _loginRepository.GetAll().FirstOrDefault(x => x.Username == command.Username
            && x.Password == command.Password);

            // return null if user not found
            if (result == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();


            var jwtSection = _configuration.GetSection("JwtConfiguration");
            var jwtConfig = jwtSection.Get<JwtConfiguration>();
            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, result.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),

            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
