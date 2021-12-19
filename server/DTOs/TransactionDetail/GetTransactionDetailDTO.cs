using System;
using System.ComponentModel.DataAnnotations;

using server.Models;

namespace server.DTOs
{
    public record GetTransactionDetailDTO
    {
        public int id { get; init; }
        public Transaction transaction_id { get; init; }
        public Customer customer_id { get; init; }
        public DateTime created_at { get; init; }
        public DateTime updated_at { get; init; }
    }
}