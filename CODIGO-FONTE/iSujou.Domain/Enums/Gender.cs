using System.ComponentModel;

namespace iSujou.Domain.Enums
{
    public enum Gender
    {
        [Description("Homem")]
        Man = 1,
        [Description("Mulher")]
        Woman,
        [Description("Outro")]
        Other
    }
}
