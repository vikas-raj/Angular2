using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SPA.Model
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string UserName { get; set; }
        public DateTime ComentedDate { get; set; }
        //public int JobDescriptionId { get; set; }
        public string CommentDiscription { get; set; }
        public JobDetails JobDetails
        {
            get { return null; }
            set { value = null; }
        }
        [ForeignKey("JobDetailFK")]
        public int JobDetailFk { get; set; }

    }
}
