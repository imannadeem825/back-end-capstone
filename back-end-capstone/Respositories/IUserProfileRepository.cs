using back_end_capstone.Models;
using System.Collections.Generic;

namespace back_end_capstone.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseId(string firebaseId);
    }
}