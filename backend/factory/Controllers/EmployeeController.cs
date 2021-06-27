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
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Employee/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Employee/5
        public string Delete(int id)
        {
             bl.Delete(id);
            return "Deleted!";
        }
    }
}
