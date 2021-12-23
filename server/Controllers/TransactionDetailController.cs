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
    public class TransactionDetailController : ControllerBase
    {
        private readonly N12Context _context;

        public TransactionDetailController(N12Context context)
        {
            _context = context;
        }

        [HttpGet("/v1/transaction-details")]
        public IActionResult getTransactionDetails(int customer_id)
        {
            return Ok(new Res(200, "", true, (from trans in _context.TransactionDetails
                                              where trans.CustomerId == customer_id
                                              select trans)));
        }

        [HttpGet("/v1/transaction-details/{transaction_detail_id}")]
        public IQueryable getTransactionById(Guid transaction_detail_id)
        {
            var query = (from td in _context.TransactionDetails
                         where td.Id == transaction_detail_id
                         select td).Take(1);
            return query;
        }

        [HttpPost("/v1/transaction-details")]
        public void createTransactionDetail([FromBody] PostTransactionDetailDTO transactionDetail)
        {
            var newTransactionDetail = new TransactionDetail();
            newTransactionDetail.Id = Guid.NewGuid();
            newTransactionDetail.TransactionId = transactionDetail.transactionId;
            newTransactionDetail.CustomerId = transactionDetail.customerId;
            newTransactionDetail.CreatedAt = DateTime.Now;
            newTransactionDetail.UpdatedAt = DateTime.Now;

            _context.TransactionDetails.Add(newTransactionDetail);
            _context.SaveChanges();
        }

        [HttpPut("/v1/transaction-details/{transaction_detail_id}")]
        public void updateTransaction(Guid transaction_detail_id, [FromBody] PutTransactionDetailDTO transactionDetail)
        {
            TransactionDetail cTransactionDetail = (from td in _context.TransactionDetails
                                                    where td.Id == transaction_detail_id
                                                    select td).SingleOrDefault();
            cTransactionDetail.TransactionId = transactionDetail.transactionId != null ? transactionDetail.transactionId : cTransactionDetail.TransactionId;
            cTransactionDetail.CustomerId = transactionDetail.customerId != null ? transactionDetail.customerId : cTransactionDetail.CustomerId;
            cTransactionDetail.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
        }

        [HttpDelete("/v1/transaction-details/{transaction_detail_id}")]
        public void deleteTransaction(Guid transaction_detail_id)
        {
            TransactionDetail cTransactionDetail = (from td in _context.TransactionDetails
                                                    where td.Id == transaction_detail_id
                                                    select td).SingleOrDefault();
            _context.TransactionDetails.Remove(cTransactionDetail);
            _context.SaveChanges();
        }
    }
}
