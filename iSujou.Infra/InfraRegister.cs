using Microsoft.Extensions.DependencyInjection;

namespace iSujou.Infra
{
    public static class InfraRegister
    {
        public static IServiceCollection RegisterRepositories(this IServiceCollection service)
        {
            return service;
        }
    }
}
