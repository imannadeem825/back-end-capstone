using back_end_capstone.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SymptomController : ControllerBase
    {

        private readonly ISymptomRepository _symptomRepository;


        public SymptomController(ISymptomRepository symptomRepository)
        {
            _symptomRepository = symptomRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_symptomRepository.GetAllSymptoms());
        }

        [HttpGet("/symptomDetails/{symptomId}")]
        public IActionResult Get(int symptomId)
        {
            return Ok(_symptomRepository.GetSymptomDetailsBySymptomId(symptomId));
        }
    }
}
