namespace SPA.Data
{
    using SPA.Data.Contract;
    using SPA.Model;
    using System;

    public class JobSearchUow : IJobSearchUow, IDisposable
    {

        public JobSearchUow(IRepositoryProvider repositoryProvider, JobDbContext dBContext)
        {
            this.DbContext = dBContext;

            repositoryProvider.DbContext = this.DbContext;
            this.RepositoryProvider = repositoryProvider;
        }

        private JobDbContext DbContext { get; set; }


        public IJobSearchRepository JobSearchDetails
        {
            get { return this.GetRepo<IJobSearchRepository>(); }
        }

        public IRepository<User> Users
        {
            get { return this.GetStandardRepo<User>(); }
        }

        protected IRepositoryProvider RepositoryProvider { get; set; }

        private T GetRepo<T>()
            where T : class
        {
            return this.RepositoryProvider.GetRepository<T>();
        }

        private IRepository<T> GetStandardRepo<T>()
            where T : class
        {
            return this.RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        public void Commit()
        {
            this.DbContext.SaveChanges();

            // System.Diagnostics.Debug.WriteLine("Committed");
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.DbContext != null)
                {
                    this.DbContext.Dispose();
                }
            }
        }

    }
}
