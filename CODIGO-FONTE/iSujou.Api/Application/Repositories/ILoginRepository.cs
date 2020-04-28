using iSujou.Domain.Entities;
using System.Threading.Tasks;

namespace iSujou.Api.Application.Repositories
{
    public interface ILoginRepository
    {
        Task<Login> Find(string username, string password);
    }
}
