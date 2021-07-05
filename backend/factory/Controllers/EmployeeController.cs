using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using factory.Models;

using System.Web.Http.Cors;

namespace factory.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployeeController : ApiController
    {
        private static EmployeeBL bl = new EmployeeBL();
        // GET: api/Employee
        public List<employeeExt> Get()
        {
            return bl.GetAllEmployees();
        }

        // GET: api/Employee/5
        public employee Get(int id)
        {
            return bl.GetEmployee(id); 
        }

        // POST: api/Employee
        public string Post(employeeShift empShft)
        {
            if(bl.isExist(empShft))
            {
                return "";
            }
            bl.AddShiftToEmp(empShft);
            return "Shift Added!";
        }

        // PUT: api/Employee/5
        public string Put(int id, employee emp)
        {
            bl.EditEmployee(id, emp);
            return "Updated!";
        }

        // DELETE: api/Employee/5
        public string Delete(int id)
        {
             bl.Delete(id);
            return "Deleted!";
        }
    }
}
