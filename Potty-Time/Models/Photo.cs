using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Potty_Time.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public int ChildId { get; set; }
        public int ActivityId { get; set; }
    }
}
