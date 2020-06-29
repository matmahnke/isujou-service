using iSujou.Domain.Enums;

namespace iSujou.Api.Application.Commands
{
    public class ArchievementCommand
    {
        public Archievements Status { get; set; }
        public int Points { get; set; }
        public string UserId { get; set; }
    }
}
