using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace iSujou.Infra.Repositories
{
    public class LoginRepository : Repository<Login, long>, ILoginRepository
    {
        public LoginRepository(DbContext context) :
            base(context)
        {
        }
    }
}
