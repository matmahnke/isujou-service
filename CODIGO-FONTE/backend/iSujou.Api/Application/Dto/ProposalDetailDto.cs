using iSujou.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iSujou.Api.Application.Dto
{
    public class ProposalDetailDto
    {
        public AdvertDto Advert { get; set; }
        public long Candidate { get; set; }
        public decimal Value { get; set; }
        public ProposalStatus Status { get; set; }
    }
}
