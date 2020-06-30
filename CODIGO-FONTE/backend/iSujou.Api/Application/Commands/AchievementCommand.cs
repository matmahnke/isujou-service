using iSujou.Domain.Enums;

namespace iSujou.Api.Application.Commands
{
    public class AchievementCommand
    {
        public Achievements Status { get; set; }
        public int Points { get; set; }
        public string UserId { get; set; }
    }
}
