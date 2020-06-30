using iSujou.Domain.Enums;
using System;

namespace iSujou.Domain.Entities
{
    public class Feedback : EntityBase
    {
        public string Description { get; set; }
        public Proposal Proposal { get; set; }
        public long ProposalId { get; set; }
        public string CreatorId { get; set; }
        public User Creator { get; set; }
        public string ReceiverId { get; set; }
        public User Receiver { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
