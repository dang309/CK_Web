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
    public class OrderController : ControllerBase
    {
        private readonly N12Context _context;

        public OrderController(N12Context context)
        {
            _context = context;
        }

        [HttpGet("/v1/orders")]
        public IQueryable getOrders(int limit = 0, int skip = 0)
        {
            if (limit == 0 && skip == 0)
            {
                return (from ord in _context.Orders
                        select ord);
            }
            else if (limit == 0)
            {
                return (from ord in _context.Orders
                        select ord).Skip(skip);
            }
            else if (skip == 0)
            {
                return (from ord in _context.Orders
                        select ord).Take(limit);
            }
            else
            {
                return (from ord in _context.Orders
                        select ord).Skip(skip).Take(limit);
            }
        }

        [HttpGet("/v1/orders/{order_id}")]
        public IQueryable getOrderById(int order_id)
        {
            var query = (from ord in _context.Orders
                         where ord.Id == order_id
                         select ord).Take(1);
            return query;
        }

        [HttpPost("/v1/orders")]
        public void createOrder([FromBody] PostOrderDTO order)
        {
            var newOrder = new Order();
            newOrder.Id = _context.Orders.Count() == 0 ? 1 : _context.Orders.Max(item => item.Id) + 1;
            newOrder.TransactionId = order.transactionId;
            newOrder.ProductId = order.productId;
            newOrder.Quantity = order.quantity;
            newOrder.Amount = order.amount;
            newOrder.Status = order.status;
            newOrder.CreatedAt = DateTime.Now;
            newOrder.UpdatedAt = DateTime.Now;

            _context.Orders.Add(newOrder);
            _context.SaveChanges();
        }

        [HttpPut("/v1/orders/{order_id}")]
        public void updateOrder(int order_id, [FromBody] PostOrderDTO order)
        {
            Order cOrder = (from ord in _context.Orders
                            where ord.Id == order_id
                            select ord).SingleOrDefault();
            cOrder.TransactionId = order.transactionId != null ? order.transactionId : cOrder.TransactionId;
            cOrder.ProductId = order.productId != null ? order.productId : cOrder.ProductId;
            cOrder.Quantity = order.quantity != null ? order.quantity : cOrder.Quantity;
            cOrder.Amount = order.amount != null ? order.amount : cOrder.Amount;
            cOrder.Status = order.status != null ? order.status : cOrder.Status;
            cOrder.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
        }

        [HttpDelete("/v1/orders/{order_id}")]
        public void deleteOrder(int order_id)
        {
            Order cOrder = (from ord in _context.Orders
                            where ord.Id == order_id
                            select ord).SingleOrDefault();
            _context.Orders.Remove(cOrder);
            _context.SaveChanges();
        }
    }
}
