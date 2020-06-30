using iSujou.Domain.Repositories;
using iSujou.Infra.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace iSujou.Infra
{
    public static class InfraRegister
    {
        public static IServiceCollection RegisterRepositories(this IServiceCollection service)
        {
            service.AddScoped<DbContext, iSujouContext>();
            service.AddScoped<ILoginRepository, LoginRepository>();
            service.AddScoped<IAdvertRepository, AdvertRepository>();
            service.AddScoped<IPropertyRepository, PropertyRepository>();
            service.AddScoped<IProposalRepository, ProposalRepository>();
            service.AddScoped<IUserInfoRepository, UserInfoRepository>();
            service.AddScoped<IFeedbackRepository, FeedbackRepository>();
            service.AddScoped<IAchievementRepository, AchievementRepository>();
            return service;
        }
    }
}
