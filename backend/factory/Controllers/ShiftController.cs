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
    public class ShiftController : ApiController
    {
        private static ShiftBL bl = new ShiftBL();
        // GET: api/Shift
        [HttpGet]
        [Route("api/Shift")]
        public List<shift> Get()
        {
            return bl.GetAllShifts();
        }

        // GET: api/Shifts//all/
        [HttpGet]
        [Route("api/Shift/all/")]
        public List<shiftWithEmpList> GetEx()
        {
            return bl.GetShiftsWithEmpList();
        }

        [Route("api/Shift")]
        // POST: api/Shift
        [HttpPost]
        public string Post(shift newShift)
        {
            bl.AddShift(newShift);
            return "Created!";
        }

        // DELETE: api/Shift/5
        public string Delete(int id)
        {
            bl.DeleteEmpShft(id);
            return "shifts deleted";
          
        }
    }
}
