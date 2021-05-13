using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using back_end_capstone.Models;
using back_end_capstone.Utils;


namespace back_end_capstone.Repositories
{
    public class DailyReportRepository : BaseRepository, IDailyReportRepository
    {
        public DailyReportRepository(IConfiguration configuration) : base(configuration) { }

        public List<DailyReport> GetAllDailyReports()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserProfileId, Date
                        FROM DailyReport";

                    var reader = cmd.ExecuteReader();

                    var dailyReports = new List<DailyReport>();
                    while (reader.Read())
                    {
                        dailyReports.Add(new DailyReport()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),

                        });
                    }

                    reader.Close();

                    return dailyReports;
                }
            }
        }

        public DailyReport GetDailyReportById(int dailyReportId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserProfileId, Date
                      
                        FROM DailyReport";

                    cmd.Parameters.AddWithValue("@id", dailyReportId);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {

                        DailyReport dailyReport = new DailyReport()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),

                        };
                        reader.Close();
                        return dailyReport;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void Add(DailyReport dailyReport)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO DailyReport (UserProfileId, Date)
                            OUTPUT INSERTED.ID
                            VALUES (@UserProfileId, @Date)";

                    DbUtils.AddParameter(cmd, "@UserProfileId", dailyReport.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Date", dailyReport.Date);


                    dailyReport.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM DailyReportSymptom 
                                        WHERE DailyReportId = @id;
                                        DELETE FROM DailyReport 
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}