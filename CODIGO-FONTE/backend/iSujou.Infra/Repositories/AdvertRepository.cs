using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iSujou.Infra.Repositories
{
    public class AdvertRepository : Repository<Advert>, IAdvertRepository
    {
        public AdvertRepository(DbContext context) 
            : base(context)
        {
        }

        public Task<List<Advert>> GetPortfolioAsync()
        {
            return _set.Include(advert => advert.Property).ToListAsync();
        }
    }
}
