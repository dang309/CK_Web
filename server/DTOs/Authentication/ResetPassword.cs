using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class ResetPasswordRequest
    {
        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }
    }
}