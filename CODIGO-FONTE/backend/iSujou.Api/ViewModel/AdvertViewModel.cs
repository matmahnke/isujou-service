using iSujou.Domain.Entities;
using iSujou.Domain.Enums;
using System;
using System.Collections.Generic;

namespace iSujou.Api.ViewModel
{
    public class AdvertViewModel
    {
        public AdvertViewModel(Advert advert)
        {
            Id = advert.Id;
            Title = advert.Property.Title;
            Date = advert.Date;
            City = advert.Property.City;
            State = advert.Property.State;
            Items = advert.Items;
            Photos = new string[] { };
            OwnerId = advert.Creator.UserInfoId.GetValueOrDefault();
            OwnerName = advert.Creator.UserInfo.Name;
            OwnerPhotoUrl = "";
            Active = advert.Active;
            PropertyId = advert.PropertyId;
        }

        public long Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string FormatedDate => this.Date.ToString("dd/MM/yyyy");
        public string DateForComponent => this.Date.ToString("yyyy-MM-dd");
        public string HourForComponent => this.Date.ToString("HH:mm");
        public string City { get; set; }
        public State State { get; set; }
        public List<AdvertItem> Items { get; set; }
        public string[] Photos { get; set; }
        public long OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerPhotoUrl { get; set; }
        public bool Active { get; set; }
        public long PropertyId { get; set; }
    }
}
