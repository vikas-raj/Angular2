namespace SPAJobPortal
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.SpaServices.Webpack;
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

            services.AddAuthorization(options =>{
                options.AddPolicy("UserROles", claim => claim.RequireClaim("UserRole", "User"));
                options.AddPolicy("AdminROles", claim => claim.RequireClaim("AdminRole", "Admin"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
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
                options => options.UseSqlServer(this.Configuration.GetConnectionString("JobportalConnection")).ConfigureWarnings(warnings =>
                {
                    warnings.Throw(RelationalEventId.QueryClientEvaluationWarning);
                }), ServiceLifetime.Transient);

        }
    }
}
