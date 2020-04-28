using iSujou.Domain.Enums;

namespace iSujou.Domain.Entities
{
    public class Proposal : EntityBase
    {
        public long AdvertId { get; set; }
        public virtual Advert Advert { get; set; }
        public long CandidateId { get; set; }
        public virtual User Candidate { get; set; }
        public decimal Value { get; set; }
        public ProposalStatus Status { get; set; }
    }
}
