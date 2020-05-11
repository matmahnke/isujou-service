using System.ComponentModel;

namespace iSujou.Domain.Enums
{
    public enum ContractStatus
    {
        [Description("Aberto")]
        // Quando o contrato é criado
        Open = 1,
        [Description("Enviado ao contratado")]
        // Quando o contrato é enviado ao Empregado
        SentToHiredPerson,
        [Description("Enviado ao proprietário")]
        // Quando o contrato é enviado ao Proprietário
        SentToOwner,
        [Description("Ativo")]
        // Quando o contrato está ativo, ou seja, o serviço será ou está sendo prestado
        Active,
        [Description("Concluído")]
        // Quando o contrato é competado, ou seja, o serviço já foi prestado
        Completed,
        [Description("Suspenso")]
        // Por algum motivo, o contrato foi suspenso
        Suspenso
    }
}
