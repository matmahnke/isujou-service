using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace iSujou.Infra.Repositories
{
    public class ArchievementRepository : Repository<Archievement>, IArchievementRepository
    {
        public ArchievementRepository(DbContext context) : base(context)
        {
        }
    }
}
