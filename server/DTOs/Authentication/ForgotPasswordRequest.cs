using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class ForgotPasswordRequest
    {
        [Required]
        public string Email { get; set; }
    }
}