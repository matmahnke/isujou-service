using Microsoft.Extensions.DependencyInjection;

namespace iSujou.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection RegisterServices(this IServiceCollection service)
        {
            return service;
        }
    }
}
