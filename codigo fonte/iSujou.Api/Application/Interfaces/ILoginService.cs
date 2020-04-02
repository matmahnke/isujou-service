using iSujou.Api.Application.Commands;
using System.Threading.Tasks;

namespace iSujou.Api.Application.Interfaces
{
    public interface ILoginService
    {
        string Authenticate(LoginCommand command);
    }
}
