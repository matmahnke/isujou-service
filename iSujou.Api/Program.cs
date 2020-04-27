using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace iSujou.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var usermanager = scope.ServiceProvider
                    .GetRequiredService<UserManager<IdentityUser>>();
                var user = new IdentityUser("matheusRemoveThis");
                usermanager.CreateAsync(user, "password").GetAwaiter().GetResult();
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureAppConfiguration(x => CreateConfiguration(x));
                    webBuilder.UseStartup<Startup>();
                });

        public static IConfigurationBuilder CreateConfiguration(IConfigurationBuilder builder)
        {
            return builder
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@".\appsettings.json")
                .AddJsonFile(@".\authentication.json")
                .AddJsonFile(@".\databaseconfiguration.json");
        }
    }
}
