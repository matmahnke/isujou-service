using iSujou.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.Application.Commands
{
    public class ProfileCommand
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Cpf { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
    }
}
