using iSujou.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.ViewModel
{
    public class PropertyViewModel
    {
        public PropertyViewModel(Property property)
        {
            this.Id = property.Id;
            this.Title = property.Title;
            this.Description = property.Description;
            this.State = property.State;
            this.City = property.City;
            this.Neighborhood = property.Neighborhood;
            this.Street = property.Street;
            this.Number = property.Number;
            this.Cep = property.Cep;
            this.Complement = property.Complement;
        }

        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public iSujou.Domain.Enums.State State { get; set; }
        public string City { get; set; }
        public string Neighborhood { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Cep { get; set; }
        public string Complement { get; set; }
    }
}
