using iSujou.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace iSujou.Domain.Repositories
{
    public interface IUserInfoRepository: IRepository<UserInfo>
    {
        public Task<UserInfo> GetUserProfileByName(string name);
    }
}
