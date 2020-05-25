using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iSujou.Domain.Entities
{
    public class AuditorshipEntity : EntityBase
    {
        public DateTime? CreationDate { get; set; }

        public long? CreatorId { get; set; }

        public virtual User Creator { get; set; }

        public DateTime? EditionDate { get; set; }

        public long? EditorId { get; set; }

        public virtual User Editor { get; set; }
    }
}
