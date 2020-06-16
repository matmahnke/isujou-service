using iSujou.Domain.Entities;
using iSujou.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Infra.Repositories
{
    public class UserInfoRepository : Repository<UserInfo>, IUserInfoRepository
    {
        public UserInfoRepository(DbContext context) : base(context)
        {
        }

        public async Task<UserInfo> GetUserProfileById(long id)
        {
            return await _set.Include(x => x.User).ThenInclude(x => x.Adverts).Where(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}
