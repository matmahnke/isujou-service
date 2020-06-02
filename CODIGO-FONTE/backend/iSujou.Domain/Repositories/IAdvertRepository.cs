using iSujou.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iSujou.Domain.Repositories
{
    public interface IAdvertRepository : IRepository<Advert>
    {
        Task<List<Advert>> GetPortfolioAsync();

        Task<Advert> GetAdvert(long id);
    }
}
