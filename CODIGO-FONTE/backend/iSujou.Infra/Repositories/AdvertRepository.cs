using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Infra.Repositories
{
    public class AdvertRepository : Repository<Advert>, IAdvertRepository
    {
        public AdvertRepository(DbContext context) 
            : base(context)
        {
        }

        public async Task<Advert> GetAdvert(long id)
        {
            return await _set
                .Include(x => x.Items)
                .Include(advert => advert.Property)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public Advert GetByIdWithDetails(long id)
        {
            return _set.Where(advert => advert.Id == id)
                       .Include(advert => advert.Property)
                       .Include(advert => advert.Creator)
                       .Include(advert => advert.Editor)
                       .FirstOrDefault();
        }

        public Task<List<Advert>> GetPortfolioAsync()
        {
            return _set.Include(advert => advert.Property).ToListAsync();
        }
    }
}
