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
    public class DailyReportController : ControllerBase
    {
        private readonly IDailyReportRepository _dailyReportRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public DailyReportController(IDailyReportRepository dailyReportRepository, IUserProfileRepository userProfileRepository)
        {
            _dailyReportRepository = dailyReportRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_dailyReportRepository.GetAllDailyReports());
        }


        [HttpGet("/dailyReport/getById/{dailyReportId}")]
        public ActionResult Details(int dailyReportId)
        {
            var dailyReport = _dailyReportRepository.GetDailyReportById(dailyReportId);
            if (dailyReport == null)
            {
                return NotFound();
            }
            return Ok(dailyReport);
        }



        [HttpPost("/dailyReport/create")]
        public IActionResult DailyReport(DailyReport dailyReport)
        {
            var currentUserProfile = GetCurrentUserProfile();
            dailyReport.UserProfileId = currentUserProfile.Id;
            dailyReport.Date = DateTime.Now;
            _dailyReportRepository.Add(dailyReport);
            return CreatedAtAction("Details", new { dailyReportId = dailyReport.Id }, dailyReport);
        }


        [HttpDelete("/dailyReport/delete/{dailyReportId}")]
        public IActionResult Delete(int dailyReportId)
        {
            _dailyReportRepository.Delete(dailyReportId);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseId);
        }
    }
}
