namespace server.Utilities
{
    public class Res
    {
        public Res(int status, string message, bool result, dynamic data, dynamic paging = null)
        {
            Status = status;
            Message = message;
            Result = result;
            Data = data;
            Paging = paging;
        }

        public int Status { get; private set; }
        public string Message { get; private set; }
        public bool? Result { get; private set; }
        public dynamic? Data { get; private set; }
        public dynamic? Paging { get; private set; }

    }
}