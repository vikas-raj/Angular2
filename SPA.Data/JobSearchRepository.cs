namespace SPA.Data
{
    using Microsoft.EntityFrameworkCore;
    using SPA.Data.Contract;
    using SPA.Model;
    using System.Collections.Generic;

    public class JobSearchRepository: EFRepository<JobDetails>, IJobSearchRepository
    {
        public JobSearchRepository(DbContext context)
            : base(context)
        {
        }

        public List<JobDetails> GetJobSearchValues(int id)
        {
            return new List<JobDetails>();
        }
    }
}
