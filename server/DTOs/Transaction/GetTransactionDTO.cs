using System;
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public record GetTransactionDTO
    {
        public int id { get; init; }
        public DateTime date { get; init; }
        public float totalAmount { get; init; }
        public bool isPaid { get; init; }
        public string paymentMethod { get; init; }
        public DateTime created_at { get; init; }
        public DateTime updated_at { get; init; }
    }
}