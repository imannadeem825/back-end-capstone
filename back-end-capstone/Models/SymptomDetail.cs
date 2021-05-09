using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_capstone.Models
{
    public class SymptomDetail
    {
        public int Id { get; set; }

        public int SymptomId { get; set; }

        public int UrgencyLevel { get; set; }

        public string Severity { get; set; }
    }
}
