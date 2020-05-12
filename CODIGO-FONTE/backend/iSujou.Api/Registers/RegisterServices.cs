using iSujou.Api.Application.Interfaces;
using iSujou.Api.Application.Services;
using iSujou.CrossCutting.Data.Impl;
using iSujou.CrossCutting.Data.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace iSujou.Api.Registers
{
    public static class ApplicationRegister
    {
        public static IServiceCollection RegisterServices(this IServiceCollection service)
        {
            service.AddScoped<ILoginService, LoginService>();
            service.AddScoped<IUnitOfWork, UnitOfWork>();
            return service;
        }
    }
}
