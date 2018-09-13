namespace SPA.Data.Contract
{
    using SPA.Model;
    using System.Threading.Tasks;

    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
