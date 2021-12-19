using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class TransactionDetail
    {
        public int Id { get; set; }
        public int? TransactionId { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Transaction Transaction { get; set; }
    }
}
