using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class shiftWithEmpList
    {
 
        public int ID { get; set; }
        public System.DateTime date { get; set; }
        public Nullable<int> start_time { get; set; }
        public Nullable<int> end_time { get; set; }

        public List<employee> employees { get; set; }

    }
}