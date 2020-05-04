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

            //services.AddIdentity<IdentityUser, IdentityRole>(config => {
            //    config.Password.RequiredLength = 4;
            //    config.Password.RequireDigit = false;
            //    config.Password.RequireNonAlphanumeric = false;
            //    config.Password.RequireUppercase = false;
            //    config.SignIn.RequireConfirmedEmail = true;
            //})
            //.AddEntityFrameworkStores<iSujouContext>()
            //.AddDefaultTokenProviders();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
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
                x.Audience = "iSujou default api";
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

        public static IApplicationBuilder UseAuthenticationServic(this IApplicationBuilder app)
        {
            //app.UseIdentityServer();
            app.UseAuthentication();
            return app;
        }
    }
}
