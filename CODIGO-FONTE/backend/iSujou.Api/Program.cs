using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;

namespace iSujou.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.AddConsole();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureAppConfiguration(x => CreateConfiguration(x));
                    webBuilder.UseStartup<Startup>();
                });
        }

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
