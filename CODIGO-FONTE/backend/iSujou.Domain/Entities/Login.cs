using System;

namespace iSujou.Domain.Entities
{
    public class Login : EntityBase
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
