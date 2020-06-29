using iSujou.Domain.Enums;

namespace iSujou.Domain.Entities
{
    public class Feedback : EntityBase
    {
        public string Description { get; set; }
        public string CreatorId { get; set; }
        public User Creator { get; set; }
        public string ReceiverId { get; set; }
        public User Receiver { get; set; }
    }
}
