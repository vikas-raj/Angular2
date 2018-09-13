namespace SPAJobPortal.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using SPA.Data.Contract;
    public class BaseController : Controller
    {
        protected IJobSearchUow JobSearchUow { get; set; }
        protected IAuthRepository AuthUow { get; set; }
    }
}