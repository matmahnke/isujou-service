using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Domain.Entities
{
    public class EntityBase<TKey>
    {
        public TKey Id { get; set; }
    }
}
