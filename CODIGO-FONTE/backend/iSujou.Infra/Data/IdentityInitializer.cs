using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace iSujou.Infra.Data
{
    public class IdentityInitializer
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<long>> _roleManager;


        public IdentityInitializer(
            UserManager<User> userManager,
            RoleManager<IdentityRole<long>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Initialize()
        {
            var resultado = _roleManager.CreateAsync(
                new IdentityRole<long>(Roles.DEFAULT)).Result;
            if (!resultado.Succeeded)
            {
                throw new Exception(
                    $"Erro durante a criação da role { Roles.DEFAULT}.");
            }

            CreateUser(
                new User()
                {
                    UserName = "admin",
                    Email = "admin@teste.com"
                }, "Pa$$w0rd", Roles.DEFAULT);
        }


        private void CreateUser(
            User user,
            string password,
            string initialRole = null)
        {
            if (_userManager.FindByNameAsync(user.UserName).Result == null)
            {
                var resultado = _userManager
                    .CreateAsync(user, password).Result;

                if (resultado.Succeeded &&
                    !String.IsNullOrWhiteSpace(initialRole))
                {
                    _userManager.AddToRoleAsync(user, initialRole).Wait();
                }
            }
        }
    }
}
