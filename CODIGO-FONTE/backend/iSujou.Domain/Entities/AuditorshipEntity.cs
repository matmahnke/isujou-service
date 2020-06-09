using System;

namespace iSujou.Domain.Entities
{
    public class AuditorshipEntity : EntityBase
    {
        public DateTime? CreationDate { get; set; }
        public string? CreatorId { get; set; }
        public virtual User Creator { get; set; }
        public DateTime? EditionDate { get; set; }
        public string? EditorId { get; set; }
        public virtual User Editor { get; set; }
    }
}
