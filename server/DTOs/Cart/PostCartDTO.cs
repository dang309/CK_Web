namespace server.DTOs
{
    public class PostCartDTO
    {
        public int customerId { get; set; }

        public int productId { get; set; }

        public int quantity { get; set; }
    }
}