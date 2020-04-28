using iSujou.Infra;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace iSujou.Api.Registers
{
    public static class AuthorizationService
    {
        public static IServiceCollection AddAuthorizationService(this IServiceCollection services, string jwtKey)
        {
            //services
            //    .AddDefaultIdentity<IdentityUser>()
            //    .AddRoles<IdentityRole>()
            //    .AddEntityFrameworkStores<iSujouContext>();

            services.AddAuthorization(options =>
            {
                var builder = new AuthorizationPolicyBuilder();
                var policy = builder.RequireAuthenticatedUser()
                .RequireClaim(ClaimTypes.Role)
                .Build();
                options.DefaultPolicy = policy;
                options.AddPolicy("RequireAdministratorRole",
                     policy => policy.RequireRole("Administrator"));
            });

            return services;
        }

        public static IApplicationBuilder UseAuthorizationService(this IApplicationBuilder app)
        {
            app.UseAuthorization();
            return app;
        }
    }
}
