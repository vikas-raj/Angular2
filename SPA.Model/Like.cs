using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SPA.Model
{
    public class Like
    {
        public int LikeId { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public JobDetails JobDetails
        {
            get { return null; }
            set { value = null; }
        }
        [ForeignKey("JobDetailFK")]
        public int JobDetailFK { get; set; }
    }
}
