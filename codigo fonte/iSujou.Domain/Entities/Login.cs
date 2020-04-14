using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Domain.Entities
{
    public class Login : EntityBase<long>
    {
        private Login() { }

        public Login(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Token { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
