using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class employeeExt
    {
        public int ID { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public Nullable<int> startWorkYear { get; set; }
        public Nullable<int> departmentID { get; set; }
        public string departmentName { get; set; }

        public Boolean isManager { get; set; }
        public List<shiftDateFormated> shifts { get; set; }
    }
}