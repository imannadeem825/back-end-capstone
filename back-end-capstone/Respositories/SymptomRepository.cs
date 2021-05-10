using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using back_end_capstone.Models;
using back_end_capstone.Utils;
using Microsoft.Data.SqlClient;

namespace back_end_capstone.Repositories
{
    public class SymptomRepository : BaseRepository, ISymptomRepository
    {
        public SymptomRepository(IConfiguration configuration) : base(configuration) { }

        public List<Symptom> GetAllSymptoms()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT s.Id AS SymptomId, s.Name
                              
                         FROM Symptom s";
                    //LEFT JOIN SymptomDetail sd on s.Id = sd.SymptomId";
                    //sd.Id AS SymptomDetailId, sd.SymptomId AS ForeignKeySymptomId, sd.UrgencyLevel, sd.Severity


                    var reader = cmd.ExecuteReader();

                  
                    var symptoms = new List<Symptom>();
                    while (reader.Read())
                    {
                        //if (symptom == null)
                        //{
                        //    symptom = NewSymptomObject(reader);
                        //    symptom.SymptomDetails = new List<SymptomDetail>();

                        //};

                        //if (DbUtils.IsNotDbNull(reader, "SymptomDetailId"))
                        //{
                        //    symptom.SymptomDetails.Add(new SymptomDetail()
                        //    {
                        //        Id = DbUtils.GetInt(reader, "SymptomDetailId"),
                        //        SymptomId = DbUtils.GetInt(reader, "ForeignKeySymptomId"),
                        //        UrgencyLevel = DbUtils.GetInt(reader, "UrgencyLevel"),
                        //        Severity = DbUtils.GetString(reader, "Severity")
                        //    });
                        //}

                        symptoms.Add(new Symptom()
                        {
                            Id = DbUtils.GetInt(reader, "SymptomId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            //SymptomDetails = new List<SymptomDetail>()
                            //{
                            //    Id = DbUtils.GetInt(reader, "SymptomDetailId"),
                            //    SymptomId = DbUtils.GetInt(reader, "ForeignKeySymptomId"),
                            //    UrgencyLevel = DbUtils.GetInt(reader, "UrgencyLevel"),
                            //    Severity = DbUtils.GetString(reader, "Severity")

                            //}
                        });

                    }

                    
                    reader.Close();
                    return symptoms;
                }
            }
        }

        public Symptom GetSymptomDetailsBySymptomId (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT s.Id AS SymptomId, s.Name,
                              sd.Id AS SymptomDetailId, sd.SymptomId AS ForeignKeySymptomId, sd.UrgencyLevel, sd.Severity
                         FROM Symptom s
                         LEFT JOIN SymptomDetail sd on s.Id = sd.SymptomId
                         WHERE sd.SymptomId = @Id";

                    Symptom symptom = null;
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();



                    while (reader.Read())
                    {
                        if (symptom == null)
                        {
                            symptom = NewSymptomObject(reader);
                            symptom.SymptomDetails = new List<SymptomDetail>();


                        };

                        if (DbUtils.IsNotDbNull(reader, "SymptomDetailId"))
                        {
                            symptom.SymptomDetails.Add(new SymptomDetail()
                            {
                                Id = DbUtils.GetInt(reader, "SymptomDetailId"),
                                SymptomId = DbUtils.GetInt(reader, "ForeignKeySymptomId"),
                                UrgencyLevel = DbUtils.GetInt(reader, "UrgencyLevel"),
                                Severity = DbUtils.GetString(reader, "Severity")
                            });
                        }

                    }

              
                    reader.Close();
                    return symptom;
                }
            }
        }


        private Symptom NewSymptomObject(SqlDataReader reader)
        {
            return new Symptom()
            {
                Id = reader.GetInt32(reader.GetOrdinal("SymptomId")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
            };
        }


    }




    //public UserProfile GetUserProfileById(int id)
    //{
    //    using (var conn = Connection)
    //    {
    //        conn.Open();
    //        using (var cmd = conn.CreateCommand())
    //        {
    //            cmd.CommandText = @"
    //                  SELECT up.Id AS UserProfileId, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
    //                       up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
    //                       ut.Name AS UserTypeName
    //                  FROM UserProfile up
    //                       LEFT JOIN UserType ut on up.UserTypeId = ut.Id

    //                 WHERE up.Id = @Id";

    //            DbUtils.AddParameter(cmd, "@Id", id);

    //            UserProfile userProfile = null;

    //            var reader = cmd.ExecuteReader();
    //            if (reader.Read())
    //            {
    //                userProfile = new UserProfile()
    //                {
    //                    Id = DbUtils.GetInt(reader, "UserProfileId"),
    //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
    //                    FirstName = DbUtils.GetString(reader, "FirstName"),
    //                    LastName = DbUtils.GetString(reader, "LastName"),
    //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
    //                    Email = DbUtils.GetString(reader, "Email"),
    //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
    //                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
    //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
    //                    UserType = new UserType()
    //                    {
    //                        Id = DbUtils.GetInt(reader, "UserTypeId"),
    //                        Name = DbUtils.GetString(reader, "UserTypeName"),
    //                    }
    //                };
    //            }
    //            reader.Close();

    //            return userProfile;
    //        }
    //    }
    //}

 
        
}
