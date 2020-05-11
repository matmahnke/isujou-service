using iSujou.Api.Application.Interfaces;
using iSujou.Api.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.Registers
{
    public static class ApplicationRegister
    {
        public static IServiceCollection RegisterServices(this IServiceCollection service)
        {
            service.AddScoped<ILoginService, LoginService>();
            return service;
        }
    }
}
