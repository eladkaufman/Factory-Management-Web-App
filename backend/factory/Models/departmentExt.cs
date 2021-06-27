using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class departmentExt
    {
        public int ID { get; set; }
        public string name { get; set; }
        public Nullable<int> manager { get; set; }

        public Boolean isEmpty { get; set; }
    }
}