using System;
using System.ComponentModel.DataAnnotations;

using server.Models;

namespace server.DTOs
{
    public record PutTransactionDetailDTO
    {
        public int transactionId { get; init; }
        public int customerId { get; init; }
    }
}