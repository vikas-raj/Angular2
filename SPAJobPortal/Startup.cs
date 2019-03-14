namespace SPAJobPortal
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.SpaServices.AngularCli;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Diagnostics;
    using SPA.Data;
    using SPA.Data.Context;
    using System.Collections.Generic;
    using System;
    using SPA.Data.Contract;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using SPA.Model.Config;
    using Microsoft.AspNetCore.Mvc;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddOptions();
            services.AddMvc();

            this.ConfigureStore(services);
            services.Configure<AppSettingsConfig>(this.Configuration.GetSection("AppSettings"));
            services.AddSingleton<RepositoryFactories>(new RepositoryFactories(new Dictionary<Type, Func<DbContext, object>>
                {
                    { typeof(IJobSearchRepository), dbcontext => new JobSearchRepository(dbcontext) }
            }));
            services.AddTransient<IRepositoryProvider, RepositoryProvider>();
            services.AddTransient<IJobSearchUow, JobSearchUow>();
            services.AddTransient<IAuthRepository, AuthRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddAuthorization(options => {
                options.AddPolicy("UserROles", claim => claim.RequireClaim("UserRole", "User"));
                options.AddPolicy("AdminROles", claim => claim.RequireClaim("AdminRole", "Admin"));
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/ClientApp";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "Homecontroller/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        protected virtual void ConfigureStore(IServiceCollection services)
        {
            //TODO : use latest AddDbContextPool if possible
            services.AddDbContext<JobDbContext>(
                options => options.UseSqlServer(this.Configuration.GetConnectionString("JobportalConnection")).ConfigureWarnings(warnings =>
                {
                    warnings.Throw(RelationalEventId.QueryClientEvaluationWarning);
                }), ServiceLifetime.Transient);
            services.AddDbContext<DataContext>(
                options => options.UseSqlServer(this.Configuration.GetConnectionString("JobportalConnection"), b => b.MigrationsAssembly("SPA.Data")).ConfigureWarnings(warnings =>
                {
                    warnings.Throw(RelationalEventId.QueryClientEvaluationWarning);
                }), ServiceLifetime.Transient);

        }
    }
}
