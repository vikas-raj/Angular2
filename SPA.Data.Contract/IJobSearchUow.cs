
namespace SPA.Data.Contract
{    
    using SPA.Model;

    public interface IJobSearchUow
    {
        IJobSearchRepository JobSearchDetails { get; }
        IRepository<User> Users { get; }
        IRepository<Like> Likes { get; }
        IRepository<Comment> Comments { get; }
    }
}
