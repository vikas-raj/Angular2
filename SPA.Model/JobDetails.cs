namespace SPA.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    public class JobDetails
    {
        [Key]
        public int JobDetailId { get; set; }
        public string AboutTheCompany { get; set; }
        public string CompanyName { get; set; }
        public string CompanyWebsite { get; set; }
        public string JobLocation { get; set; }
        public string Position { get; set; }
        public string Salary { get; set; }
        public string InterviewVenue { get; set; }
        public string EligibilityCriteria { get; set; }
        public string HowToApply { get; set; }
        public string RegistrationLink { get; set; }
        public string ImportantNote { get; set; }
        public DateTime? EventDate { get; set; }
        public DateTime? LastDateToApply { get; set; }
        public string ExperienceRequired { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
