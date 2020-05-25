using iSujou.Api;
using iSujou.Api.Application.Commands;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Primitives;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace iSujou.Integration.Tests.controllers
{
    public class AuthControllertests :
    IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup>
            _factory;

        public AuthControllertests(
            CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_Authentication_ReturnsModelWithToken()
        {
            var username = "Test";
            var password = @"Pa$$w0rd";
            await _client.PostAsJsonAsync("/api/v1/auth/register", new RegisterCommand
            {
                Username = username,
                Password = password,
                BirthDate = DateTime.Now,
                Cpf = "1231231",
                LastName = "Test",
                Name = "Test"
            });

            var result = await _client.PostAsJsonAsync("/api/v1/auth", new LoginCommand
            {
                Username = username,
                Password = password
            });
        }
    }
}
