using Microsoft.AspNetCore.Identity;

namespace iSujou.Domain.Entities
{
    public class User : IdentityUser
    {
        public virtual UserInfo UserInfo { get; set; }
        public long? UserInfoId { get; set; }
    }
}
