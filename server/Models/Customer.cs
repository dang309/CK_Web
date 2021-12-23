using System;
using System.Collections.Generic;

#nullable disable

namespace server.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Carts = new HashSet<Cart>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public bool? IsAdmin { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool? Gender { get; set; }
        public string Bio { get; set; }
        public DateTime? Birthday { get; set; }
        public string Avatar { get; set; }
        public int? GroupId { get; set; }
        public bool? IsGroupHost { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
    }
}
