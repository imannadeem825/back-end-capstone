using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_capstone.Models
{
    public class DailyReportSymptom
    {
        public int Id { get; set; }

        public int DailyReportId { get; set; }

        public int SymptomId { get; set; }

        public List<Symptom> Symptoms { get; set; }

        public string Comment { get; set; }

        public int Urgency { get; set; }
    }
}
