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
        public IActionResult getCarts(int customer_id)
        {
            return Ok(new Res(200, "", true, from cart in _context.Carts
                                             where cart.CustomerId == customer_id
                                             select cart));
        }

        [HttpPost("/v1/carts")]
        public IActionResult createCartItem([FromBody] PostCartDTO cart)
        {
            var _groupId = _context.Customers.SingleOrDefault(item => item.Id == cart.customerId).GroupId;

            if (_groupId == null)
            {
                if (_context.Carts.Any(o => o.CustomerId == cart.customerId && o.ProductId == cart.productId))
                {
                    return BadRequest(new Res(400, "Sản phẩm đã tồn tại trong giỏ hàng!", false, null));
                }

                var newCartItem = new Cart();
                newCartItem.Id = _context.Carts.Count() == 0 ? 1 : _context.Carts.Max(o => o.Id) + 1;
                newCartItem.CustomerId = cart.customerId;
                newCartItem.ProductId = cart.productId;
                newCartItem.QuantityInCart = cart.quantityInCart;
                newCartItem.CreatedAt = DateTime.Now;
                newCartItem.UpdatedAt = DateTime.Now;

                _context.Carts.Add(newCartItem);
                _context.SaveChanges();

                return Ok(new Res(201, "", true, null));
            }

            var members = _context.Customers.Where(item => item.GroupId == _groupId).ToList();

            foreach (var item in members)
            {
                if (_context.Carts.Any(o => o.CustomerId == item.Id && o.ProductId == cart.productId))
                {
                    return BadRequest(new Res(400, "Sản phẩm đã tồn tại trong giỏ hàng!", false, null));
                }
            }

            foreach (var item in members)
            {
                var newCartItem = new Cart();
                newCartItem.Id = _context.Carts.Count() == 0 ? 1 : _context.Carts.Max(item => item.Id) + 1;
                newCartItem.CustomerId = item.Id;
                newCartItem.ProductId = cart.productId;
                newCartItem.QuantityInCart = cart.quantityInCart;
                newCartItem.CreatedAt = DateTime.Now;
                newCartItem.UpdatedAt = DateTime.Now;

                _context.Carts.Add(newCartItem);
                _context.SaveChanges();
            }

            return Ok(new Res(201, "", true, null));
        }

        [HttpPut("/v1/carts")]
        public IActionResult updateOrder([FromBody] PutCartDTO cart)
        {
            var _groupId = _context.Customers.SingleOrDefault(item => item.Id == cart.customerId).GroupId;

            if (_groupId == null)
            {
                Cart cCartItem = (from _cart in _context.Carts
                                  where _cart.CustomerId == cart.customerId && _cart.ProductId == cart.productId
                                  select _cart).SingleOrDefault();
                cCartItem.QuantityInCart = cart.quantityInCart;
                cCartItem.UpdatedAt = DateTime.Now;

                Product cProduct = (from pro in _context.Products
                                    where pro.Id == cart.productId
                                    select pro).SingleOrDefault();

                cProduct.Quantity = cart.availableQuantity;

                _context.SaveChanges();

                return Ok(new Res(201, "", true, null));
            }

            var members = _context.Customers.Where(item => item.GroupId == _groupId).ToList();

            foreach (var item in members)
            {
                Cart cCartItem = (from _cart in _context.Carts
                                  where _cart.CustomerId == item.Id && _cart.ProductId == cart.productId
                                  select _cart).SingleOrDefault();
                cCartItem.QuantityInCart = cart.quantityInCart;
                cCartItem.UpdatedAt = DateTime.Now;

                Product cProduct = (from pro in _context.Products
                                    where pro.Id == cart.productId
                                    select pro).SingleOrDefault();

                cProduct.Quantity = cart.availableQuantity;

                _context.SaveChanges();
            }

            return Ok(new Res(200, "", true, null));
        }

        [HttpDelete("/v1/carts")]
        public IActionResult deleteOrder([FromBody] DeleteCartDTO cart)
        {
            var _groupId = _context.Customers.SingleOrDefault(item => item.Id == cart.customerId).GroupId;

            if (_groupId == null)
            {
                Cart cCartItem = (from _cart in _context.Carts
                                  where _cart.CustomerId == cart.customerId && _cart.ProductId == cart.productId
                                  select _cart).SingleOrDefault();
                _context.Carts.Remove(cCartItem);
                _context.SaveChanges();

                return Ok(new Res(201, "", true, null));
            }

            var members = _context.Customers.Where(item => item.GroupId == _groupId).ToList();

            foreach (var item in members)
            {
                Cart cCartItem = (from _cart in _context.Carts
                                  where _cart.CustomerId == item.Id && _cart.ProductId == cart.productId
                                  select _cart).SingleOrDefault();
                _context.Carts.Remove(cCartItem);
                _context.SaveChanges();
            }

            return Ok(new Res(200, "", true, null));

        }
    }
}
