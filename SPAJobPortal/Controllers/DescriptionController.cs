using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SPA.Model;
using SPA.Data.Contract;
using Microsoft.Extensions.Options;
using SPA.Model.Config;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace SPAJobPortal.Controllers
{
    [Authorize(Policy = "UserRoles")]
    [Route("api/[controller]")]
    public class DescriptionController : BaseController
    {
        private readonly AppSettingsConfig appSettingsConfig;
        private readonly ConnectionStringsConfig connectionString;
        public DescriptionController(IJobSearchUow uow, IOptions<ConnectionStringsConfig> connectionString, IOptions<AppSettingsConfig> options)
        {
            this.JobSearchUow = uow;
            this.connectionString = connectionString.Value;
        }

        [HttpGet("{id}", Name = "GetDescription")]
        [HttpHead]
        //[Authorize(Policy = "User")]
        public IActionResult GetDescription(string id)
        {
            if (IsNumeric(id))
            {
                // to get username
                var asd = HttpContext.User.Identity.Name;
                var searchInfoFromRepo = new JobDetails();

                var JSON = System.IO.File.ReadAllText("./DummyData/DummyData.json");

                var result = JsonConvert.DeserializeObject<List<JobDetails>>(JSON);

                searchInfoFromRepo = result.Where(a => a.JobDetailId == Convert.ToInt32(id)).FirstOrDefault();
                if (searchInfoFromRepo == null)
                {
                    return NotFound();
                }

                return Ok(searchInfoFromRepo);
            }
            return Ok(new JobDetails() { JobDetailId = -1 });
        }

        public static bool IsNumeric(object Expression)
        {
            double retNum;

            bool isNum = Double.TryParse(Convert.ToString(Expression), System.Globalization.NumberStyles.Any, System.Globalization.NumberFormatInfo.InvariantInfo, out retNum);
            return isNum;
        }


        [HttpPost("SaveDescription")]
        //[Authorize(Policy = "User")]
        public IActionResult SaveDescription([FromBody]JobDetails jobDetail)
        {
            this.JobSearchUow.JobSearchDetails.Add(jobDetail);
            this.JobSearchUow.Commit();            
            return Ok(jobDetail);
        }

    }
}
