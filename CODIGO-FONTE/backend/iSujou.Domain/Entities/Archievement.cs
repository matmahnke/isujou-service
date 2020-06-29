using iSujou.Domain.Enums;

namespace iSujou.Domain.Entities
{
    public class Archievement : EntityBase
    {
        public Archievements Status { get; set; }
        public int Points { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
