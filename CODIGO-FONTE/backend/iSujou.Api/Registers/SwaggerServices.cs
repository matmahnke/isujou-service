using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;

namespace iSujou.Api.Registers
{
    public static class SwaggerServices
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "iSujou API",
                    Description = "API feita em .NET Core 3.0",
                    TermsOfService = new Uri("https://isujou.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "ISujou",
                        Email = string.Empty,
                        Url = new Uri("https://isujou.com/contact"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("https://isujou.com/license"),
                    }
                });
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerServices(this IApplicationBuilder app)
        {
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ISujou API V1");
                c.RoutePrefix = string.Empty;
            });
            return app;
        }
    }
}
