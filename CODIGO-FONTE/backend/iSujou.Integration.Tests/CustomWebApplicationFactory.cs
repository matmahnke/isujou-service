﻿using iSujou.Domain.Entities;
using iSujou.Infra;
using iSujou.Infra.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace iSujou.Integration.Tests
{
    public class CustomWebApplicationFactory<TStartup>
        : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbContextOptions<iSujouContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<iSujouContext>(options =>
                {
                    options.UseInMemoryDatabase("iSujouInMemory");
                });

                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<iSujouContext>();
                    var logger = scopedServices
                        .GetRequiredService<ILogger<CustomWebApplicationFactory<TStartup>>>();

                    db.Database.EnsureCreated();
                }
                InitializeSeeds(services);
            });
        }

        private void InitializeSeeds(IServiceCollection services)
        {
            var um = services.BuildServiceProvider().GetService<UserManager<User>>();
            var rm = services.BuildServiceProvider().GetService<RoleManager<IdentityRole>>();
            new IdentityInitializer(um, rm).Initialize();
        }
    }
}
