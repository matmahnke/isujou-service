using iSujou.Infra;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace iSujou.Api.Registers
{
    public static class DbServices
    {
        public static IServiceCollection AddDbServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<iSujouContext>(options =>
            options.UseSqlServer(connectionString,
                op => op.EnableRetryOnFailure(10, TimeSpan.FromSeconds(30), null)
            ));

            services
                .AddHealthChecks()
                .AddDbContextCheck<DbContext>();

            return services;
        }

        public static IApplicationBuilder UseDbServices(this IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();

            var context = serviceScope.ServiceProvider.GetRequiredService<iSujouContext>();

            context.Database.Migrate();

            return app;
        }
    }
}