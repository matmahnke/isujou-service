using iSujou.Domain.Enums;

namespace iSujou.Api.Application.Commands
{
    public class FeedbackCommand
    {
        public long ReceiverId { get; set; }
        public string Description { get; set; }
        public long ProposalId { get; set; }
        public Achievements? Achievement { get; set; }
    }
}
