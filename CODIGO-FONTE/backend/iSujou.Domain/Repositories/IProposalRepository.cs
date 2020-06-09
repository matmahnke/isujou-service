using iSujou.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iSujou.Domain.Repositories
{
    public interface IProposalRepository : IRepository<Proposal>
    {
        Task<List<Proposal>> GetProposals();
    }
}
