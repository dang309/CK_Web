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
    public class CartController : ControllerBase
    {
        private readonly N12Context _context;

        public CartController(N12Context context)
        {
            _context = context;
        }

        [HttpGet("/v1/carts/{customer_id}")]
        public IQueryable getCarts(int customer_id)
        {
            var query = from cart in _context.Carts
                        where cart.CustomerId == customer_id
                        select cart;
            return query;
        }

        [HttpPost("/v1/carts")]
        public void createCartItem([FromBody] PostCartDTO cart)
        {
            var newCartItem = new Cart();
            newCartItem.Id = _context.Carts.Count() == 0 ? 1 : _context.Carts.Max(item => item.Id) + 1;
            newCartItem.CustomerId = cart.customerId;
            newCartItem.ProductId = cart.productId;
            newCartItem.Quantity = cart.quantity;
            newCartItem.CreatedAt = DateTime.Now;
            newCartItem.UpdatedAt = DateTime.Now;

            _context.Carts.Add(newCartItem);
            _context.SaveChanges();
        }

        [HttpPut("carts/{cart_item_id}")]
        public void updateOrder(int cart_item_id, [FromBody] PutCartDTO cart)
        {
            Cart cCartItem = (from _cart in _context.Carts
                              where _cart.Id == cart_item_id
                              select _cart).SingleOrDefault();
            cCartItem.Quantity = cart.quantity;
            cCartItem.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
        }

        [HttpDelete("carts/{cart_item_id}")]
        public void deleteOrder(int cart_item_id)
        {
            Cart cCartItem = (from cart in _context.Carts
                              where cart.Id == cart_item_id
                              select cart).SingleOrDefault();
            _context.Carts.Remove(cCartItem);
            _context.SaveChanges();
        }
    }
}
