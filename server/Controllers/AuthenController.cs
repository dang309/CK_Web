using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

using server.DTOs;
using server.Models;
using server.Utilities;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    public class AuthenController : ControllerBase
    {
        private readonly N12Context _context;

        public AuthenController(N12Context context)
        {
            _context = context;
        }

        [HttpPost("/v1/auth/login")]
        public IActionResult login([FromBody] LoginRequest req)
        {
            var cCustomer = _context.Customers.SingleOrDefault(item => item.Email == req.Email);
            if (cCustomer == null) return BadRequest(new Res(400, "Email không tồn tại!", false, null));
            if (!BC.Verify(req.Password, cCustomer.HashedPassword)) return Unauthorized(new Res(401, "Mật khẩu sai!", false, null));
            string securityKey = "This is secret key";

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: "FW_HTTT_M12",
                audience: "author",
                expires: DateTime.Now.AddHours(24),
                signingCredentials: signingCredentials
            );

            return Ok(new Res(200, "Đăng nhập thành công!", true, new
            {
                id = cCustomer.Id,
                email = cCustomer.Email,
                name = cCustomer.Name,
                is_admin = cCustomer.IsAdmin,
                avatar = cCustomer.Avatar,
                gender = cCustomer.Gender,
                token = new
                {
                    jwt = new JwtSecurityTokenHandler().WriteToken(token),
                    expires = DateTime.Now.AddHours(24)
                }
            })
           );
        }

        [HttpPost("/v1/auth/register")]
        public IActionResult register([FromBody] RegisterRequest req)
        {
            var cCustomer = _context.Customers.SingleOrDefault(item => item.Email == req.Email);
            if (cCustomer != null) return BadRequest(new Res(400, "Email đã tồn tại!", false, null));
            Customer newCustomer = new Customer();
            newCustomer.Id = _context.Customers.Max(item => item.Id) + 1;
            newCustomer.Name = req.Name;
            newCustomer.Email = req.Email;
            newCustomer.HashedPassword = BC.HashPassword(req.Password);
            newCustomer.IsAdmin = false;
            newCustomer.Gender = null;
            newCustomer.CreatedAt = DateTime.Now;
            newCustomer.UpdatedAt = DateTime.Now;

            _context.Customers.Add(newCustomer);
            _context.SaveChanges();

            return Ok(new Res(200, "Thành công!", true, new
            {
                id = newCustomer.Id,
                email = newCustomer.Email,
                name = newCustomer.Name,
                is_admin = newCustomer.IsAdmin,
                avatar = newCustomer.Avatar,
                gender = newCustomer.Gender
            }));
        }
    }
}