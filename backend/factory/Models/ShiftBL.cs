using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace factory.Models
{

    public class ShiftBL
    {
        factoryProjectDBEntities1 db = new factoryProjectDBEntities1();
        public List<shift> GetAllShifts()
        {
            return db.shift.ToList();
        }

        public void DeleteEmpShft(int empId)
        {
            List<employeeShift> found = db.employeeShift.Where(empSh => empSh.employeeID == empId).ToList();

            foreach (var empshft in found)
            {
                db.employeeShift.Remove(empshft);

            }
            db.SaveChanges();
        }

        public List<shiftWithEmpList> GetShiftsWithEmpList()
        {
            List<shiftWithEmpList> shiftsWithEmp = new List<shiftWithEmpList>();
            foreach(var s in db.shift)
            {
                shiftWithEmpList SWEL = new shiftWithEmpList();
                SWEL.ID = s.ID;
                SWEL.date = s.date;
                SWEL.start_time = s.start_time;
                SWEL.end_time = s.end_time;
                SWEL.employees = new List<employee>();

                List<employeeShift> shifts = db.employeeShift.Where(empSh => empSh.shiftID == s.ID ).ToList();
                foreach (var empSh in shifts)
                {
                    employee empFound = new employee();
                    empFound = db.employee.Where(emp => emp.ID == empSh.employeeID).First();
                    SWEL.employees.Add(empFound);
                }
                shiftsWithEmp.Add(SWEL);
            }

            return shiftsWithEmp;

        }
        public void AddShift(shift newShift)
        {
            db.shift.Add(newShift);
            db.SaveChanges();
        }

    }
}