using System;
using System.ComponentModel.DataAnnotations;

using server.Models;

namespace server.DTOs
{
    public record PostOrderDTO
    {
        public int transactionId { get; init; }
        public int productId { get; init; }
        public int quantity { get; init; }
        public float amount { get; init; }
        public int status { get; init; }
    }
}