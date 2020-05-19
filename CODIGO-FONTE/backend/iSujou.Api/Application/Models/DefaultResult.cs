namespace iSujou.Api.Application.Models
{
    public class DefaultResult<T>
    {
        public DefaultResult(T data, bool succeeded = true)
        {
            Data = data;
            Succeeded = succeeded;
        }
        public bool Succeeded { get; set; }
        public T Data { get; set; }
    }
}
