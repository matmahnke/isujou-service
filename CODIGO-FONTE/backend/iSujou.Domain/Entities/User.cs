using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;

namespace iSujou.Domain.Entities
{
    public class User : IdentityUser
    {
        public virtual UserInfo UserInfo { get; set; }
        public long? UserInfoId { get; set; }
        public virtual ICollection<Advert> Adverts { get; set; }
    }
}
