using System;

namespace iSujou.Api.Application.Commands
{
    public class AdvertCommand
    {
        public long PropertyId { get; set; }
        public DateTime Date { get; set; }
        public bool Active { get; set; }
    }
}
