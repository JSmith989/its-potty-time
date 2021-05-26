using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.Models
{
    public class Baby
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public DateTime Birthday { get; set; }
        public int UserId { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string ParentId { get; set; }
    }
}
