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
        private readonly RoleManager<IdentityRole> _roleManager;


        public IdentityInitializer(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Initialize()
        {
            if (!await _roleManager.RoleExistsAsync(Roles.DEFAULT))
            {
                await _roleManager.CreateAsync(
                    new IdentityRole(Roles.DEFAULT));
            }

            await CreateUser(
                new User()
                {
                    UserName = "admin",
                    Email = "admin@teste.com"
                }, "Pa$$w0rd", Roles.DEFAULT);
        }


        private async Task CreateUser(
            User user,
            string password,
            string initialRole = null)
        {
            if (_userManager.FindByNameAsync(user.UserName).Result == null)
            {
                var resultado = await _userManager
                    .CreateAsync(user, password);

                if (resultado.Succeeded &&
                    !String.IsNullOrWhiteSpace(initialRole))
                {
                    _userManager.AddToRoleAsync(user, initialRole).Wait();
                }
            }
        }
    }
}
