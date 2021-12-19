using System;
using System.Collections.Generic;

namespace server.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ThumbUrl { get; set; }
        public double? UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public string Category { get; set; }
        public double? Discount { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

    }
}
