using System.ComponentModel.DataAnnotations;

namespace iSujou.Domain.Entities
{
    public class EntityBase
    {
        [Key]
        [Required]
        public long Id { get; set; }
    }
}
