using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace iSujou.Domain.Entities
{
    public class AdvertItem : EntityBase
    {
        [JsonIgnore]
        [IgnoreDataMember]
        public long AdvertId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Advert Advert { get; set; }
        public string Description { get; set; }
    }
}
