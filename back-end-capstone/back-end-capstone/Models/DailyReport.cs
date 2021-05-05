using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_capstone.Models
{
    public class DailyReport
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime Date { get; set; }
    }
}
