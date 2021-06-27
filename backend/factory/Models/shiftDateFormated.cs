using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class shiftDateFormated
    {
        public int ID { get; set; }
        public string date { get; set; }
        public Nullable<int> start_time { get; set; }
        public Nullable<int> end_time { get; set; }
    }
}