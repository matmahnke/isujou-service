using iSujou.Api.Registers;
using iSujou.Domain.Entities;
using iSujou.Infra;
using iSujou.Infra.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace iSujou.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string policy = "iSujouPolicy";
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors(options =>
            //{
            //    options.AddPolicy(name: specificOriginsKey,
            //    builder =>
            //    {
            //        builder.WithOrigins("http://localhost:3000/")
            //        .AllowCredentials();
            //    });
            //});

            services.AddCors(o => o.AddPolicy(policy, builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            var configurationSection = Configuration.GetSection("TokenConfigurations");
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddControllers()
                .AddNewtonsoftJson();

            services.AddOptions();

            services
                .RegisterServices()
                .RegisterRepositories();

            services.AddSingleton(Configuration);

            services
                .AddDbServices(connectionString)
                .AddAuthenticationService(configurationSection)
                .AddAuthorizationServices()
                .AddSwaggerServices();


            services.AddApiVersioning(p =>
            {
                p.DefaultApiVersion = new ApiVersion(1, 0);
                p.ReportApiVersions = true;
                p.AssumeDefaultVersionWhenUnspecified = true;
            });

            services.AddVersionedApiExplorer(p =>
            {
                p.DefaultApiVersion = new ApiVersion(1, 0);
                p.AssumeDefaultVersionWhenUnspecified = true;
                p.ApiVersionParameterSource = new UrlSegmentApiVersionReader();
            });

            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder
                    .AddFilter("Microsoft", LogLevel.Warning)
                    .AddFilter("System", LogLevel.Warning)
                    .AddFilter("LoggingConsoleApp.Program", LogLevel.Debug)
                    .AddConsole()
                    .AddEventLog();
            });
            ILogger logger = loggerFactory.CreateLogger<Program>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(policy);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseApiVersioning();

            app.UseHttpsRedirection();

            app.UseRouting();

            app
                .UseDbServices()
                .UseAuthenticationServices()
                .UseAuthorizationServices()
                .UseSwaggerServices();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health");
                endpoints.MapControllers();
            });
        }
    }
}
