using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using back_end_capstone.Models;
using back_end_capstone.Repositories;

namespace back_end_capstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetUserProfile(string firebaseId)
        {
            return Ok(_userProfileRepository.GetByFirebaseId(firebaseId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
        
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseId = userProfile.FirebaseId },
                userProfile);
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUserProfiles());
        }



        //[HttpGet("getById/{id}")]
        //public IActionResult Get(int id)
        //{
        //    var up = _userProfileRepository.GetUserProfileById(id);
        //    if (up == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(up);
        //}


    }
}
