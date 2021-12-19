using System;
using System.ComponentModel.DataAnnotations;

using server.Models;

namespace server.DTOs
{
    public record GetOrderDTO
    {
        public int id { get; init; }
        public Transaction transaction_id { get; init; }
        public Product product_id { get; init; }
        public int quantity { get; init; }
        public float amount { get; init; }
        public int status { get; init; }
        public DateTime created_at { get; init; }
        public DateTime updated_at { get; init; }
    }
}