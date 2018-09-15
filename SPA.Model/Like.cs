﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SPA.Model
{
    public class Like
    {
        public int LikeId { get;  set; }
        public string UserName { get; set; }
        //public int JobDescriptionId { get; set; }
        public DateTime LikedDate { get; set; }

        
        public JobDetails JobDetails { get; set; }
        [ForeignKey("JobDetailFK")]
        public int JobDetailFk { get; set; }

    }
}
