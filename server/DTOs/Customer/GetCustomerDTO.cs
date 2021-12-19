using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace server.DTOs
{
    public record GetCustomerDTO
    {
        public int id { get; init; }
        public string? name { get; init; }
        public string email { get; init; }

        [JsonIgnore]
        public string hashedPassword { get; init; }
        public bool? isAdmin { get; init; }
        public string? avatar { get; init; }
        public DateTime? created_at { get; init; }
        public DateTime? updated_at { get; init; }
    }
}