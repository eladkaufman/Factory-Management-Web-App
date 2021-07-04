using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace factory.Models
{

    public class EmployeeBL
    {
        factoryProjectDBEntities1 db = new factoryProjectDBEntities1();
        public List<employeeExt> GetAllEmployees()
        {
            List<employeeExt> employeesExt = new List<employeeExt>();

            foreach (var emp in db.employee)
            {
                employeeExt empExt = new employeeExt();
                empExt.ID = emp.ID;
                empExt.fName = emp.fName;
                empExt.lName = emp.lName;
                empExt.startWorkYear = emp.startWorkYear;
                empExt.departmentID = emp.departmentID;
                empExt.departmentName = db.department.Where(dep => dep.ID == emp.departmentID).First().name;
                empExt.isManager = db.department.Where(dep => dep.ID == emp.departmentID).First().manager == emp.ID;
                empExt.shifts = new List<shift>();

                foreach (var empSh in db.employeeShift)
                {
                    if (emp.ID == empSh.employeeID)
                    {
                        foreach (var sh in db.shift)
                        {
                            if (empSh.shiftID == sh.ID)
                            {
                                //shiftDateFormated fShift = new shiftDateFormated();
                                //fShift.ID = sh.ID;
                                //fShift.date = sh.date.ToString("dd/MM/yyyy");
                                //fShift.start_time = sh.start_time;
                                //fShift.end_time = sh.end_time;

                                empExt.shifts.Add(sh);
                            }
                        }
                    }
                }
                employeesExt.Add(empExt);

            }


            return employeesExt;
        }
        public employee GetEmployee(int id)
        {
            employee found = db.employee.Where(emp => emp.ID == id).First();
            return found;

        }
        public void EditEmployee(int id, employee emp)
        {
            employee chosenEmp = db.employee.Where(x => x.ID == id).First();
            chosenEmp.fName = emp.fName;
            chosenEmp.lName = emp.lName;
            chosenEmp.startWorkYear = emp.startWorkYear;
            chosenEmp.departmentID = emp.departmentID;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            employee found = db.employee.Where(emp => emp.ID == id).First();

            db.employee.Remove(found);
            db.SaveChanges();



        }
        public void AddShiftToEmp(employeeShift empShft)
        {
            db.employeeShift.Add(empShft);
            db.SaveChanges();
        }
    }
}