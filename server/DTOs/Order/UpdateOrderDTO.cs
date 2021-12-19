using System;
using System.ComponentModel.DataAnnotations;

using server.Models;

namespace server.DTOs
{
    public record UpdateOrderDTO
    {
        public Transaction transaction_id { get; init; }
        public Product product_id { get; init; }
        public int quantity { get; init; }
        public float amount { get; init; }
        public int status { get; init; }
    }
}