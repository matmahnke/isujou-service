using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace iSujou.Infra.Repositories
{
    public class ProposalRepository : Repository<Proposal>, IProposalRepository
    {
        public ProposalRepository(DbContext context) : base(context)
        {
        }
    }
}
