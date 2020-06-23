using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using System.Collections.Generic;

namespace iSujou.Api.ViewModel
{
    public class AdvertViewModel
    {
        public AdvertViewModel(Advert advert)
        {
            Id = advert.Id;
            Title = advert.Property.Title;
            Date = advert.Date.ToString("dd/MM/yyyy");
            City = advert.Property.City;
            State = advert.Property.State;
            Items = advert.Items;
            Photos = new string[] { };
            OwnerId = advert.Creator.UserInfo.Id;
            OwnerName = advert.Creator.UserInfo.Name;
            OwnerPhotoUrl = "";
            Active = advert.Active;
        }

        public long Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string City { get; set; }
        public State State { get; set; }
        public List<AdvertItem> Items { get; set; }
        public string[] Photos { get; set; }
        public long OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerPhotoUrl { get; set; }
        public bool Active { get; set; }
    }
}
