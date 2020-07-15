using iSujou.Domain.Entities;
using iSujou.Domain.Enums;

namespace iSujou.Api.ViewModel
{
    public class ProposalViewModel
    {
        public ProposalViewModel(Proposal proposal, bool isMine = false, bool canWriteFeedBack = false, long? feedbackProfileId = 0)
        {
            bool showInitialButtons = proposal.Status == ProposalStatus.Pending;

            this.Id = proposal.Id;
            this.Value = proposal.Value.ToString("N2");
            this.Advert = new AdvertViewModel(proposal.Advert);
            this.Status = proposal.Status == 0 ? ProposalStatus.Pending : proposal.Status;
            this.IsMine = isMine;
            this.CanApprove = showInitialButtons;
            this.CanRefuse = showInitialButtons;
            this.CanSuspend = showInitialButtons;
            this.CanStart = proposal.Status == ProposalStatus.Accepted;
            this.CanShowDetails = proposal.Status == ProposalStatus.Accepted || isMine;
            this.CanComplete = proposal.Status == ProposalStatus.Active;
            this.CanWriteFeedBack = canWriteFeedBack;
            this.FeedbackProfileId = feedbackProfileId;
            this.Property = new PropertyViewModel(proposal.Advert.Property);
        }

        public long Id { get; set; }
        public string Value { get; set; }
        public AdvertViewModel Advert { get; set; }
        public ProposalStatus Status { get; set; }
        public bool IsMine { get; set; }
        public bool CanApprove { get; set; }
        public bool CanRefuse { get; set; }
        public bool CanSuspend { get; set; }
        public bool CanStart { get; set; }
        public bool CanComplete { get; set; }
        public bool CanWriteFeedBack { get; set; }
        public bool CanShowDetails { get; set; }
        public long? FeedbackProfileId { get; set; }
        public PropertyViewModel Property { get; set; }
    }
}
