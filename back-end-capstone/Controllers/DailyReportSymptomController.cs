using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using back_end_capstone.Models;
using back_end_capstone.Repositories;



namespace back_end_capstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DailyReportSymptomController : ControllerBase
    {
        private readonly IDailyReportSymptomRepository _dailyReportSymptomRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public DailyReportSymptomController(IDailyReportSymptomRepository dailyReportSymptomRepository, IUserProfileRepository userProfileRepository)
        {
            _dailyReportSymptomRepository = dailyReportSymptomRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dailyReportSymptomRepository.GetAllDailyReportSymptoms());
        }


        [HttpGet("/getById/{dailyReportSymptomId}")]
        public ActionResult Details(int dailyReportSymptomId)
        {
            var dailyReportSymptom = _dailyReportSymptomRepository.GetDailyReportSymptomById(dailyReportSymptomId);
            if (dailyReportSymptom == null)
            {
                return NotFound();
            }
            return Ok(dailyReportSymptom);
        }



        [HttpPost("/dailyReportSymptomForm/{id}")]
        public IActionResult DailyReport(DailyReportSymptom dailyReportSymptom)
        {
        
            _dailyReportSymptomRepository.Add(dailyReportSymptom);
            return CreatedAtAction("Details", new { dailyReportSymptomId = dailyReportSymptom.Id }, dailyReportSymptom);
        }


        [HttpDelete("/dailyReportSymptom/delete/{dailyReportSymptomId}")]
        public IActionResult Delete(int dailyReportSymptomId)
        {
            _dailyReportSymptomRepository.Delete(dailyReportSymptomId);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseId);
        }
    }
}