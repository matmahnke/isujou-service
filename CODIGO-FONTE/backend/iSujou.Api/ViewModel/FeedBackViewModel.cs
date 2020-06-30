using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.ViewModel
{
    public class FeedBackViewModel
    {
        public FeedBackViewModel(long id, string description, DateTime date)
        {
            this.Id = id;
            this.Description = description;
            this.Date = date.ToString("dd/MM/yyyy");
        }

        public long Id { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
    }
}
