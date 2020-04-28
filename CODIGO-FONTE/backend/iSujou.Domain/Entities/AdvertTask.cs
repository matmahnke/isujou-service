using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace iSujou.Domain.Entities
{
    public class AdvertTask : EntityBase
    {
        public long AdvertId { get; set; }
        public virtual Advert Advert { get; set; }
        public string Description { get; set; }
        public DateTime? CompletedDate { get; set; }

        [NotMapped]
        public bool Done => CompletedDate.HasValue;
    }
}
