using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Infra.Data
{
        public class IdentityInitializer
        {
            private readonly iSujouContext _context;
            private readonly UserManager<IdentityUser> _userManager;
            private readonly RoleManager<IdentityRole> _roleManager;


            public IdentityInitializer(
                iSujouContext context,
                UserManager<IdentityUser> userManager,
                RoleManager<IdentityRole> roleManager)
            {
                _context = context;
                _userManager = userManager;
                _roleManager = roleManager;
            }

            public void Initialize()
            {
                if (_context.Database.EnsureCreated())
                {
                    if (!_roleManager.RoleExistsAsync(Roles.DEFAULT).Result)
                    {
                        var resultado = _roleManager.CreateAsync(
                            new IdentityRole(Roles.DEFAULT)).Result;
                        if (!resultado.Succeeded)
                        {
                            throw new Exception(
                                $"quot; Erro durante a criação da role { Roles.DEFAULT}.");
                        }
                    }

                    CreateUser(
                        new IdentityUser()
                        {
                            UserName = "admin_apialturas",
                            Email = "admin-apialturas@teste.com.br"
                        }, "AdminAPIAlturas01!", Roles.DEFAULT);

                    CreateUser(
                        new IdentityUser()
                        {
                            UserName = "usrinvalido_apialturas",
                            Email = "usrinvalido-apialturas@teste.com.br",
                            EmailConfirmed = true
                        }, "UsrInvAPIAlturas01!");
                }
            }

            private void CreateUser(
                IdentityUser user,
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
                        _userManager.AddToRoleAsync(user.Id, initialRole).Wait();
                    }
                }
            }
        }
    }
