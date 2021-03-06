﻿using iSujou.Domain.Enums;
using System.Collections;
using System.Collections.Generic;

namespace iSujou.Domain.Entities
{
    public class Property : EntityBase
    {
        public string OwnerId { get; set; }
        public virtual User Owner { get; set; }
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
    }
}
