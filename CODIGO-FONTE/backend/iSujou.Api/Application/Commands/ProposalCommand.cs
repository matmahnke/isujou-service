using iSujou.Domain.Enums;

namespace iSujou.Api.Application.Commands
{
    public class ProposalCommand
    {
        public long? AdvertId { get; set; }
        public string? CandidateId { get; set; }
        public decimal Value { get; set; }
        public ProposalStatus Status { get; set; }
    }
}
