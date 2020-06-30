using iSujou.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Domain.Entities
{
    public class UserInfo : EntityBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Cpf { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public User User { get; set; }
        public int Points { get; set; }
        public Archievements Archievement { get; set; }
        public string PhotoUrl { get; set; }
    }
}
