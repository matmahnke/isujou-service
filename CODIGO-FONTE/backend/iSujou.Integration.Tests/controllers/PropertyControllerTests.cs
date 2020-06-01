using iSujou.Api;
using iSujou.Api.Application.Commands;
using iSujou.Integration.Tests.Utils;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Xunit;

namespace iSujou.Integration.Tests.controllers
{
    public class PropertyControllerTests :
    IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup>
            _factory;

        public PropertyControllerTests(
            CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_CreateNewProperty()
        {
            var response = await _client.PostAsJsonAsync("/api/v1/auth", new LoginCommand
            {
                Username = "admin",
                Password = "Pa$$w0rd"
            });

            var contents = await response.Content.ReadAsAsync<LoginResultModel>();

            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", contents.accessToken);

            await _client.PostAsJsonAsync("/api/v1/property", new PropertyCommand
            {
                Active = true,
                Cep = "12131",
                City = "teste",
                Complement = "teste",
                Description = "test",
                Neighborhood = "test",
                Number = "12",
                State = Domain.Enums.State.SC,
                Street = "test",
                Title = "test"
            });

        }
    }
}
