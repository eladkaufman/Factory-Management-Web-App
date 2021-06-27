using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class LoginBL
    {
        factoryProjectDBEntities1 db = new factoryProjectDBEntities1();

        public bool IsUserExist(string userName, string password)
        {
            var result = db.user.Where(user => user.userName == userName && user.password == password);
            if (result.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}