using iSujou.Domain.Enums;
using System;

namespace iSujou.Domain.Entities
{
    public class User : EntityBase
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Cpf { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
    }
}
