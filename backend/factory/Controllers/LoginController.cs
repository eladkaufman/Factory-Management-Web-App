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

    public class LoginController : ApiController
    {
        static LoginBL bl = new LoginBL();

        // GET: api/Login/5
        public user Get(int id)
        {
            return bl.GetUser(id);
        }

        // POST: api/Login
        public int Post(user user)
        {
            return bl.IsUserExist(user.userName);
        }
    }
}
