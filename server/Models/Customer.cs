using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Customer
    {
        public Customer()
        {
            TransactionDetail = new HashSet<TransactionDetail>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public bool? IsAdmin { get; set; }
        public string Avatar { get; set; }
        public bool? Gender { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<TransactionDetail> TransactionDetail { get; set; }
    }
}
