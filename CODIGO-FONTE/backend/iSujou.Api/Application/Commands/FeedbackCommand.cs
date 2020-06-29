using iSujou.Domain.Enums;

namespace iSujou.Api.Application.Commands
{
    public class FeedbackCommand
    {
        public string ReceiverId { get; set; }
        public string Description { get; set; }
        public Archievements Archievement { get; set; }
    }
}
