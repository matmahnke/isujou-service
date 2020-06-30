using iSujou.Domain.Enums;

namespace iSujou.Domain.Entities
{
    public class Achievement : EntityBase
    {
        public Achievements Code { get; set; }
        public int Points { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
