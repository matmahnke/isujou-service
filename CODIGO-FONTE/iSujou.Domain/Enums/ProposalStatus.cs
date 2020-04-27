using System.ComponentModel;

namespace iSujou.Domain.Enums
{
    public enum ProposalStatus
    {
        [Description("Pendente")]
        // Quando o Empregado envia a proposta, quando ela é criada
        Pending = 1,
        [Description("Recusada")]
        // Quando o Proprietário recusou
        Refused,
        [Description("Aceita")]
        // Quando o Proprietário aceitou
        Accepted,
        [Description("Cancelada")]
        // Quando o Empregado desiste
        Canceled
    }
}
