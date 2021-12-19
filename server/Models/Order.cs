using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int? TransactionId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public double? Amount { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Product Product { get; set; }
        public virtual Transaction Transaction { get; set; }
    }
}
