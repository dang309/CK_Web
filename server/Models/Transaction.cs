using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Transaction
    {
        public Transaction()
        {
            Order = new HashSet<Order>();
            TransactionDetail = new HashSet<TransactionDetail>();
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public double? TotalAmount { get; set; }
        public bool? IsPaid { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentInfo { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<TransactionDetail> TransactionDetail { get; set; }
    }
}
