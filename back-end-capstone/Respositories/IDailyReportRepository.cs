using back_end_capstone.Models;
using System.Collections.Generic;

namespace back_end_capstone.Repositories
{
    public interface IDailyReportRepository
    {
        void Add(DailyReport dailyReport);
        void Delete(int id);
        List<DailyReport> GetAllDailyReports();
        DailyReport GetDailyReportById(int dailyReportId);
    }
}