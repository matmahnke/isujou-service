using iSujou.Api.ViewModel;
using iSujou.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.Application.Dto
{
    public class ProfileDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Cpf { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public string Description { get; set; }
        public string FotoUrl { get; set; }
        public int AmountAdverts { get; set; }
        public int AmountAssessments { get; set; }
        public List<AchievementViewModel> Achievements { get; set; }
        public int Points { get; set; }
    }
}
