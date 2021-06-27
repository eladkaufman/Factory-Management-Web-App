using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{
    public class DepartmentBL
    {
        factoryProjectDBEntities1 db = new factoryProjectDBEntities1();
        public List<departmentExt> GetAllDepartments()
        {
            List<departmentExt> departmentsExt = new List<departmentExt>();

           foreach(var dep in db.department)
            {
                departmentExt depExt = new departmentExt();
                depExt.ID = dep.ID;
                depExt.name = dep.name;
                depExt.manager = dep.manager;
                depExt.isEmpty = true;
                foreach(var emp in db.employee)
                {
                    if (emp.ID == dep.ID)
                    {
                        depExt.isEmpty = false;
                        break;
                    } 
                }
                departmentsExt.Add(depExt);

            }
            
            
            return departmentsExt;
        }

        public void AddDepartment(department newDepartment)
        {
            db.department.Add(newDepartment);
            db.SaveChanges();
        }

        public department FindDepartment(int depID)
        {
            return db.department.Where(x => x.ID == depID).First();
        }

        public void EditDepartment(int id, department dep)
        {
            department chosenDep = db.department.Where(x => x.ID == id).First();
            chosenDep.name = dep.name;
            chosenDep.manager = dep.manager;
            db.SaveChanges();
        }

        public void DeleteDepartment(int depID)
        {
            department chosenDep = db.department.Where(x => x.ID == depID).First();
            db.department.Remove(chosenDep);
            db.SaveChanges();
        }
    }
}