using iSujou.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace iSujou.Api.Application.Commands
{
    public class AdvertCommand
    {
        public long PropertyId { get; set; }
        public DateTime Date { get; set; }
        public bool Active { get; set; }
        public List<AdvertItemCommand> Items { get; set; }

        public Advert ToEntity()
        {
            return new Advert
            {
                Active = true,
                Date = Date,
                PropertyId = PropertyId,
                Items = Items.Select(x => new AdvertItem()).ToList()
            };
        }
    }
}
