using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using server.DTOs;
using server.Models;
using server.Utilities;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly N12Context _context;

        public CustomerController(N12Context context)
        {
            _context = context;
        }

        [HttpGet("/v1/customers")]
        public IActionResult getCustomers(int limit = 999, int skip = 1)
        {
            return Ok(new Res(200, "", true, (from trans in _context.Customers
                                              select trans).Skip((skip - 1) * limit).Take(limit)));
        }

        [HttpGet("/v1/customers/{customer_id}")]
        public IActionResult getCustomerById(int customer_id)
        {
            return Ok(new Res(200, "", true, (from cus in _context.Customers
                                              where cus.Id == customer_id
                                              select cus).Take(1)));
        }

        [HttpGet("/v1/customers/groups")]
        public IActionResult getAllCustomersInGroup(int group_id)
        {
            return Ok(new Res(200, "", true, (from cus in _context.Customers
                                              where cus.GroupId == group_id
                                              select cus)));
        }

        [HttpPut("/v1/customers/groups/create")]
        public IActionResult createGroup(int customer_id, int group_id)
        {
            Customer cCustomer = (from cus in _context.Customers
                                  where cus.Id == customer_id
                                  select cus).SingleOrDefault();
            cCustomer.GroupId = group_id;
            cCustomer.IsGroupHost = true;

            _context.SaveChanges();

            return Ok(new Res(200, "", true, cCustomer));
        }

        [HttpPut("/v1/customers/groups/join")]
        public IActionResult joinGroup(int customer_id, int group_id)
        {
            Customer cCustomer = (from cus in _context.Customers
                                  where cus.Id == customer_id
                                  select cus).SingleOrDefault();
            cCustomer.GroupId = group_id;
            cCustomer.IsGroupHost = false;

            _context.SaveChanges();

            var groupHost = _context.Customers.SingleOrDefault(o => o.GroupId == cCustomer.GroupId && o.IsGroupHost == true);

            if (groupHost == null)
            {
                return BadRequest(new Res(400, "Id không hợp lệ!", false, null));
            }

            var products = _context.Carts.Where(o => o.CustomerId == groupHost.Id).ToList();

            foreach (var item in products)
            {
                var newCartItem = new Cart();
                newCartItem.Id = _context.Carts.Count() == 0 ? 1 : _context.Carts.Max(item => item.Id) + 1;
                newCartItem.CustomerId = customer_id;
                newCartItem.ProductId = item.ProductId;
                newCartItem.QuantityInCart = item.QuantityInCart;
                newCartItem.CreatedAt = DateTime.Now;
                newCartItem.UpdatedAt = DateTime.Now;

                _context.Carts.Add(newCartItem);
                _context.SaveChanges();
            }

            return Ok(new Res(200, "", true, null));
        }

        [HttpPut("/v1/customers/groups/leave")]
        public IActionResult leaveGroup(int customer_id)
        {

            Customer cCustomer = (from cus in _context.Customers
                                  where cus.Id == customer_id
                                  select cus).SingleOrDefault();
            var members = _context.Customers.Where(o => o.GroupId == cCustomer.GroupId).ToList();

            foreach (var item in members)
            {
                item.GroupId = null;
                item.IsGroupHost = null;
                _context.SaveChanges();
            }

            return Ok(new Res(200, "", true, cCustomer));
        }

        [HttpPost("/v1/customers")]
        public IActionResult createCustomer([FromBody] PostCustomerDTO customer)
        {
            var newCustomer = new Customer();
            newCustomer.Id = _context.Customers.Count() == 0 ? 1 : _context.Customers.Max(item => item.Id) + 1;
            newCustomer.Name = customer.name ?? "";
            newCustomer.Email = customer.email ?? "";
            newCustomer.HashedPassword = customer.hashedPassword ?? "";
            newCustomer.IsAdmin = customer.isAdmin;
            newCustomer.Avatar = customer.avatar;
            newCustomer.Bio = customer.bio ?? "";
            newCustomer.Birthday = customer.birthday;
            newCustomer.CreatedAt = DateTime.Now;
            newCustomer.UpdatedAt = DateTime.Now;

            _context.Customers.Add(newCustomer);
            _context.SaveChanges();

            return Ok(new Res(201, "", true, newCustomer));
        }

        [HttpPut("/v1/customers/{customer_id}")]
        public IActionResult updateCustomer(int customer_id, [FromBody] PutCustomerDTO customer)
        {
            Customer cCustomer = (from cus in _context.Customers
                                  where cus.Id == customer_id
                                  select cus).SingleOrDefault();
            cCustomer.Name = customer.name ?? cCustomer.Name;
            cCustomer.Email = customer.email ?? cCustomer.Email;
            cCustomer.IsAdmin = customer.isAdmin != null ? customer.isAdmin : cCustomer.IsAdmin;
            cCustomer.Avatar = customer.avatar ?? cCustomer.Avatar;
            cCustomer.Bio = customer.bio ?? cCustomer.Bio;
            cCustomer.Birthday = customer.birthday == null ? cCustomer.Birthday : customer.birthday;
            cCustomer.UpdatedAt = DateTime.Now;

            _context.SaveChanges();

            return Ok(new Res(200, "", true, cCustomer));
        }

        [HttpDelete("/v1/customers/{customer_id}")]
        public void deleteCustomer(int customer_id)
        {
            Customer cCustomer = (from cus in _context.Customers
                                  where cus.Id == customer_id
                                  select cus).SingleOrDefault();
            _context.Customers.Remove(cCustomer);
            _context.SaveChanges();
        }
    }
}
