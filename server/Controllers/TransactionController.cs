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
    public class TransactionController : ControllerBase
    {
        private readonly N12Context _context;

        public TransactionController(N12Context context)
        {
            _context = context;
        }

        [HttpGet("/v1/transactions")]
        public IQueryable getTransactions(string category = "", int limit = 0, int skip = 0)
        {
            if (limit == 0 && skip == 0)
            {
                return (from trans in _context.Transactions
                        select trans);
            }
            else if (limit == 0)
            {
                return (from trans in _context.Transactions
                        select trans).Skip(skip);
            }
            else if (skip == 0)
            {
                return (from trans in _context.Transactions
                        select trans).Take(limit);
            }
            else
            {
                return (from trans in _context.Transactions
                        select trans).Skip(skip).Take(limit);
            }
        }

        [HttpGet("/v1/transactions/{transaction_id}")]
        public IQueryable getTransactionById(int transaction_id)
        {
            var query = (from trans in _context.Transactions
                         where trans.Id == transaction_id
                         select trans).Take(1);
            return query;
        }

        [HttpPost("/v1/transactions")]
        public void createTransaction(PostTransactionDTO transaction)
        {
            var newTransaction = new Transaction();
            newTransaction.Id = _context.Transactions.Count() == 0 ? 1 : _context.Transactions.Max(item => item.Id) + 1;
            newTransaction.Date = transaction.date;
            newTransaction.TotalAmount = transaction.totalAmount;
            newTransaction.IsPaid = transaction.isPaid;
            newTransaction.PaymentMethod = transaction.paymentMethod;
            newTransaction.PaymentInfo = transaction.paymentInfo;
            newTransaction.CreatedAt = DateTime.Now;
            newTransaction.UpdatedAt = DateTime.Now;

            _context.Transactions.Add(newTransaction);
            _context.SaveChanges();
        }

        [HttpPut("/v1/transactions/{transaction_id}")]
        public void updateTransaction(int transaction_id, [FromBody] PutTransactionDTO transaction)
        {
            Transaction cTransaction = (from trans in _context.Transactions
                                        where trans.Id == transaction_id
                                        select trans).SingleOrDefault();
            cTransaction.Date = transaction.date != null ? transaction.date : cTransaction.Date;
            cTransaction.TotalAmount = transaction.totalAmount != null ? transaction.totalAmount : cTransaction.TotalAmount;
            cTransaction.IsPaid = transaction.isPaid != null ? transaction.isPaid : cTransaction.IsPaid;
            cTransaction.PaymentMethod = transaction.paymentMethod != null ? transaction.paymentMethod : cTransaction.PaymentMethod;
            cTransaction.PaymentInfo = transaction.paymentInfo != null ? transaction.paymentInfo : cTransaction.PaymentInfo;
            cTransaction.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
        }

        [HttpDelete("/v1/transactions/{transaction_id}")]
        public void deleteTransaction(int transaction_id)
        {
            Transaction cTransaction = (from trans in _context.Transactions
                                        where trans.Id == transaction_id
                                        select trans).SingleOrDefault();
            _context.Transactions.Remove(cTransaction);
            _context.SaveChanges();
        }
    }
}
