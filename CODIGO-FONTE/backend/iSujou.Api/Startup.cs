using iSujou.Api.Registers;
using iSujou.Domain.Entities;
using iSujou.Infra;
using iSujou.Infra.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

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
        private IServiceCollection _services { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            _services = services;

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
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(policy);

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseHsts();

            app.UseApiVersioning();

            app.UseHttpsRedirection();

            app.UseRouting();

            app
                .UseDbServices()
                .UseAuthenticationServices()
                .UseAuthorizationServices()
                .UseSwaggerServices();

            InitializeSeeds().Wait();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health");
                endpoints.MapControllers();
            });
        }

        private async Task InitializeSeeds()
        {
            var um = _services.BuildServiceProvider().GetService<UserManager<User>>();
            var rm = _services.BuildServiceProvider().GetService<RoleManager<IdentityRole>>();
            await new IdentityInitializer(um, rm).Initialize();
        }
    }
}
