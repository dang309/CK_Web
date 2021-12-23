using System;
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public record PostCustomerDTO
    {
        public string name { get; init; }
        public string email { get; init; }
        public string hashedPassword { get; init; }
        public bool isAdmin { get; init; }
        public string avatar { get; init; }

        public DateTime birthday { get; set; }
        public string bio
        {
            get; set;
        }
    }
}