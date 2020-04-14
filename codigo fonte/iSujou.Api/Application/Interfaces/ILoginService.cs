using iSujou.Api.Application.Commands;

namespace iSujou.Api.Application.Interfaces
{
    public interface ILoginService
    {
        string Authenticate(LoginCommand command);
    }
}
