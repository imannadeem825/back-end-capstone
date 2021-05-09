using back_end_capstone.Models;
using System.Collections.Generic;

namespace back_end_capstone.Repositories
{
    public interface ISymptomRepository
    {
        List<Symptom> GetAllSymptoms();
    }
}