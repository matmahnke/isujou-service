using iSujou.Infra;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace iSujou.Api.Registers
{
    public static class AuthenticationService
    {
        public static IServiceCollection AddAuthenticationService(this IServiceCollection services, string jwtKey)
        {
            services.AddDefaultIdentity<IdentityUser>()
                .AddEntityFrameworkStores<iSujouContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 15;
                options.Lockout.AllowedForNewUsers = true;

                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._!@#$%¨&*()+";
                options.User.RequireUniqueEmail = false;
            });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddGoogle(options =>
            {
                var configuration = (IConfiguration)services.BuildServiceProvider().GetService(typeof(IConfiguration));
                IConfigurationSection googleAuthNSection =
                    configuration.GetSection("Authentication:Google");

                options.ClientId = googleAuthNSection["ClientId"];
                options.ClientSecret = googleAuthNSection["ClientSecret"];
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.ClaimsIssuer = "iSujou.Api";
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            return services;
        }

        public static IApplicationBuilder UseAuthenticationService(this IApplicationBuilder app)
        {
            app.UseAuthentication();
            return app;
        }
    }
}
