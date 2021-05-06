using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using back_end_capstone.Models;
using back_end_capstone.Utils;

namespace back_end_capstone.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Email, u.Address,
                              u.CreateDateTime
                         FROM UserProfile u";

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            Address = reader.GetString(reader.GetOrdinal("Address")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        };

                        userProfiles.Add(userProfile);
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }


        public UserProfile GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Email, u.Address,
                              u.CreateDateTime
                         FROM UserProfile u";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            Address = reader.GetString(reader.GetOrdinal("Address")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseId, FirstName, LastName,  
                                                                 Email, Address, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @FirstName, @LastName, 
                                                @Email, @Address, @CreateDateTime)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.Address);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
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
