using iSujou.Api.Registers;
using iSujou.Infra;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace iSujou.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var jwtKey = Configuration.GetSection("JwtConfiguration:Secret").Value;
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
                .AddAuthenticationService(jwtKey)
                .AddAuthorization()
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
                .UseAuthenticationService()
                .UseAuthorizationService()
                .UseSwaggerServices();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health");
                endpoints.MapControllers();
            });
        }
    }
}
