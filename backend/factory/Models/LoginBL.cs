using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class LoginBL
    {
        factoryProjectDBEntities1 db = new factoryProjectDBEntities1();

        public int IsUserExist(string userName)
        {
            var userFound = db.user.Where(user => user.userName == userName);
            if (userFound.Count() > 0)
            {
                return userFound.First().ID;
            }
            else
            {
                return -1;
            }

        }

        public user GetUser(int id)
        {
            return  db.user.Where(u => u.ID == id).First();
           
        }
    }
}