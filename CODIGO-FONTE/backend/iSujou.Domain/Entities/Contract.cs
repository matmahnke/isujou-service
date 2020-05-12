using iSujou.Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace iSujou.Domain.Entities
{
    public class Contract : AuditorshipEntity
    {
        public long? ProposalId { get; set; }
        public virtual Proposal Proposal { get; set; }
        //public long? OwnerId { get; set; }
        //public virtual User Owner { get; set; }
        public DateTime? OwnerSignatureDate { get; set; }
        public bool OwnerPersonSigned => OwnerSignatureDate.HasValue;
        //public long? HiredId { get; set; }
        //public virtual User Hired { get; set; }
        public DateTime? HiredSignatureDate { get; set; }
        public bool HiredPersonSigned => HiredSignatureDate.HasValue;
        public DateTime StartTerm { get; set; }
        public DateTime? EndTerm { get; set; }
        public ContractStatus Status { get; set; }
        public decimal AgreedValue { get; set; }
    }
}
