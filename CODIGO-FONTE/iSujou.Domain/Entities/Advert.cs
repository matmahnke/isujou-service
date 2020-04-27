namespace iSujou.Domain.Entities
{
    public class Advert : AuditorshipEntity
    {
        public long PropertyId { get; set; }
        public virtual Property Property { get; set; }
    }
}
