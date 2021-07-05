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
    public class DepartmentController : ApiController
    {
         
        private static DepartmentBL bl = new DepartmentBL();
        // GET: api/Department
  
        [Route("api/Department")]
        public List<departmentExt> Get()
        {
            return bl.GetAllDepartments();
        }

        // GET: api/Department/5
        [HttpGet]
        public department Get(int id)
        {
            return bl.FindDepartment(id);
        }


        [Route("api/Department")]
        // POST: api/Department
        [HttpPost]
        public string Post(department newDep)
        {
            //check if department's name exist
            List<departmentExt> allDeparments = bl.GetAllDepartments();
            foreach(var dep in allDeparments)
            {
                if(dep.name == newDep.name)
                {
                    return "";
                }
            }
            bl.AddDepartment(newDep);
            return "Created!";
        }

        // PUT: api/Department/5
        [HttpPut]
        public string Put(int id, department dep)
        {
            bl.EditDepartment(id, dep);
            return "Updated!";
        }

        // DELETE: api/Department/5
        [HttpDelete]
        public string Delete(int id)
        {
            bl.DeleteDepartment(id);
            return "Deleted!";
        }
    }
}
