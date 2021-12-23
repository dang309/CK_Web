namespace server.DTOs
{
    public class PutCartDTO
    {
        public int quantityInCart { get; set; }

        public int customerId { get; set; }

        public int productId { get; set; }

        public int availableQuantity { get; set; }

    }
}