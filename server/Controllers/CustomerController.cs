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
        public IQueryable getCustomers(int limit = 0, int skip = 0)
        {
            if (limit == 0 && skip == 0)
            {
                return (from cus in _context.Customers
                        select cus);
            }
            else if (limit == 0)
            {
                return (from cus in _context.Customers
                        select cus).Skip(skip);
            }
            else if (skip == 0)
            {
                return (from cus in _context.Customers
                        select cus).Take(limit);
            }
            else
            {
                return (from cus in _context.Customers
                        select cus).Skip(skip).Take(limit);
            }
        }

        [HttpGet("/v1/customers/{customer_id}")]
        public IQueryable getCustomerById(int customer_id)
        {
            var query = (from cus in _context.Customers
                         where cus.Id == customer_id
                         select cus).Take(1);
            return query;
        }

        [HttpPost("/v1/customers")]
        public void createCustomer([FromBody] PostCustomerDTO customer)
        {
            var newCustomer = new Customer();
            newCustomer.Id = _context.Customers.Count() == 0 ? 1 : _context.Customers.Max(item => item.Id) + 1;
            newCustomer.Name = customer.name ?? "";
            newCustomer.Email = customer.email ?? "";
            newCustomer.HashedPassword = customer.hashedPassword ?? "";
            newCustomer.IsAdmin = customer.isAdmin;
            newCustomer.Avatar = customer.avatar ?? "";
            newCustomer.CreatedAt = DateTime.Now;
            newCustomer.UpdatedAt = DateTime.Now;

            _context.Customers.Add(newCustomer);
            _context.SaveChanges();
        }

        [HttpPut("/v1/customers/{customer_id}")]
        public void updateCustomer(int customer_id, [FromBody] PutCustomerDTO customer)
        {
            Customer cCustomer = (from cus in _context.Customers
                                  where cus.Id == customer_id
                                  select cus).SingleOrDefault();
            cCustomer.Name = customer.name ?? cCustomer.Name;
            cCustomer.Email = customer.email ?? cCustomer.Email;
            cCustomer.HashedPassword = customer.hashedPassword ?? cCustomer.HashedPassword;
            cCustomer.IsAdmin = customer.isAdmin != null ? customer.isAdmin : cCustomer.IsAdmin;
            cCustomer.Avatar = customer.avatar ?? cCustomer.Avatar;
            cCustomer.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
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
