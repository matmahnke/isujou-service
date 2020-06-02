using iSujou.Domain.Entities;
using iSujou.Domain.Enums;

namespace iSujou.Api.Application.Commands
{
    public class PropertyCommand
    {
        public long? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public State State { get; set; }
        public string City { get; set; }
        public string Neighborhood { get; set; }
        public string Street { get; set; }
        public string Cep { get; set; }
        public string Number { get; set; }
        public string Complement { get; set; }
        public bool Active { get; set; }

        public Property ToEntity()
        {
            return new Property
            {
                Id = Id.GetValueOrDefault(),
                Title = Title,
                Description = Description,
                State = State,
                City = City,
                Neighborhood = Neighborhood,
                Street = Street,
                Cep = Cep,
                Number = Number,
                Complement = Complement,
                Active = Active
            };
        }
    }
}
