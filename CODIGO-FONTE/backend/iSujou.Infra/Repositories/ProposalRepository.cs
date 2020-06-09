using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iSujou.Infra.Repositories
{
    public class ProposalRepository : Repository<Proposal>, IProposalRepository
    {
        public ProposalRepository(DbContext context) : base(context)
        {
        }

        public Task<List<Proposal>> GetProposals()
        {
            return _set.Include(p => p.Advert).ThenInclude(a => a.Property).ToListAsync();
        }
    }
}
