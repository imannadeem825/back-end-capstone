using back_end_capstone.Models;
using System.Collections.Generic;

namespace back_end_capstone.Repositories
{
    public interface IDailyReportSymptomRepository
    {
        void Add(DailyReportSymptom dailyReportSymptom);
        void Delete(int id);
        List<DailyReportSymptom> GetAllDailyReportSymptoms();
        DailyReportSymptom GetDailyReportSymptomById(int dailyReportSymptomId);
        void Update(DailyReportSymptom dailyReportSymptom);
    }
}