using System;
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public record PutProductDTO
    {
        public string name { get; init; }
        public string thumbUrl { get; init; }
        public float unitPrice { get; init; }
        public int quantity { get; init; }
        public float discount { get; set; }
        public string category { get; set; }
    }
}