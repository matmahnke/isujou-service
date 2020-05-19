namespace iSujou.Domain.Entities
{
    public class AdvertItem : EntityBase
    {
        public long AdvertId { get; set; }
        public virtual Advert Advert { get; set; }
    }
}
