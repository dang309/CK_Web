using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Transaction
    {
        public Transaction()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public double? TotalAmount { get; set; }
        public bool? IsPaid { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string ShippingAddress { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
