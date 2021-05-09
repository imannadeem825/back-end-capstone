using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using back_end_capstone.Models;
using back_end_capstone.Utils;

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
                       SELECT Id, Name
                         FROM Symptom";

                    Symptom symptom = null;
                    var reader = cmd.ExecuteReader();

                    var symptoms = new List<Symptom>();
                    while (reader.Read())
                    {
                        symptom = new Symptom()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        };

                        symptoms.Add(symptom);
                    }
                    reader.Close();
                    return symptoms;
                }
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
}
