namespace SPA.Data.Contract
{
    using SPA.Model;
    using System;
    using System.Collections.Generic;
    using System.Text;

    public interface IJobSearchRepository : IRepository<JobDetails>
    {
        List<JobDetails> GetJobSearchValues(int id);
    }
}
