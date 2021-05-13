using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using back_end_capstone.Models;
using back_end_capstone.Utils;

namespace back_end_capstone.Repositories
{
    public class DailyReportSymptomRepository : BaseRepository, IDailyReportSymptomRepository
    {
        public DailyReportSymptomRepository(IConfiguration configuration) : base(configuration) { }

        public List<DailyReportSymptom> GetAllDailyReportSymptoms()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DailyReportId, SymptomId, Comment, Urgency
                        FROM DailyReportSymptom";

                    var reader = cmd.ExecuteReader();

             
                    var dailyReportSymptoms = new List<DailyReportSymptom>();
                    while (reader.Read())
                    {
                        dailyReportSymptoms.Add(new DailyReportSymptom()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DailyReportId = DbUtils.GetInt(reader, "DailyReportId"),
                            SymptomId = DbUtils.GetInt(reader, "SymptomId"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            Urgency = DbUtils.GetInt(reader, "Urgency"),
                         
                        });
                    }

                    reader.Close();

                    return dailyReportSymptoms;
                }
            }
        }

        public DailyReportSymptom GetDailyReportSymptomById(int dailyReportSymptomId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DailyReportId, SymptomId, Comment, Urgency
                        FROM DailyReportSymptom
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", dailyReportSymptomId);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {

                        DailyReportSymptom dailyReportSymptom = new DailyReportSymptom()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DailyReportId = DbUtils.GetInt(reader, "DailyReportId"),
                            SymptomId = DbUtils.GetInt(reader, "SymptomId"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            Urgency = DbUtils.GetInt(reader, "Urgency")

                        };
                        reader.Close();
                        return dailyReportSymptom;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void Add(DailyReportSymptom dailyReportSymptom)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO DailyReportSymptom (DailyReportId, SymptomId, Comment, Urgency)
                            OUTPUT INSERTED.ID
                            VALUES (@DailyReportId, @SymptomId, @Comment, @Urgency)";

                    DbUtils.AddParameter(cmd, "@DailyReportId", dailyReportSymptom.DailyReportId);
                    DbUtils.AddParameter(cmd, "@SymptomId", dailyReportSymptom.SymptomId);
                    DbUtils.AddParameter(cmd, "@Comment", dailyReportSymptom.Comment);
                    DbUtils.AddParameter(cmd, "@Urgency", dailyReportSymptom.Urgency);


                    dailyReportSymptom.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(DailyReportSymptom dailyReportSymptom)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE DailyReportSymptom
                           SET DailyReportId = @DailyReportId,
                               SymptomId = @SymptomId,
                               Comment = @Comment,
                               Urgency = @Urgency
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@DailyReportId", dailyReportSymptom.DailyReportId);
                    DbUtils.AddParameter(cmd, "@SymptomId", dailyReportSymptom.SymptomId);
                    DbUtils.AddParameter(cmd, "@Comment", dailyReportSymptom.Comment);
                    DbUtils.AddParameter(cmd, "@Urgency", dailyReportSymptom.Urgency);
                    DbUtils.AddParameter(cmd, "@Id", dailyReportSymptom.Id);

                    cmd.ExecuteNonQuery();
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
                    cmd.CommandText = @"DELETE FROM DailyReportSymptom WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}

//SELECT d.Id AS DailyReportSymptomId, d.DailyReportId, d.SymptomId AS ForeignKeySymptomId, d.Comment, d.Urgency,
//                        s.Id AS SymptomId, s.Name
//                        FROM DailyReportSymptom d
//                        LEFT JOIN Symptom s ON s.Id = d.SymptomId