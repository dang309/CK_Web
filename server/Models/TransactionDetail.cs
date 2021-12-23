using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class TransactionDetail
    {
        public Guid Id { get; set; }
        public int? TransactionId { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
