using System;
using System.Collections.Generic;
using System.Text;

namespace SPA.Model
{
    public class Comment
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime ComentedDate { get; set; }
        public int JobDescriptionId { get; set; }
        public string CommentDiscription { get; set; }
    }
}
