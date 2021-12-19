using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

using server.DTOs;
using server.Models;
using server.Utilities;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly N12Context _context;

        public ProductController(N12Context context)
        {
            _context = context;
        }

        [HttpGet("/v1/products")]
        public IActionResult getProducts(string category = "", int limit = 8, int skip = 1)
        {
            if (category == "" || category == "all") return Ok(new Res(200, "", true, (from pro in _context.Products
                                                                                       select pro).Skip((skip - 1) * limit).Take(limit), new
                                                                                       {
                                                                                           page = skip,
                                                                                           page_size = limit,
                                                                                           total = (from pro in _context.Products
                                                                                                    select pro).Count()
                                                                                       }));
            return Ok(new Res(200, "", true, (from pro in _context.Products
                                              where (pro.Category).Equals(category)
                                              select pro).Skip((skip - 1) * limit).Take(limit), new
                                              {
                                                  page = skip,
                                                  page_size = limit,
                                                  total = (from pro in _context.Products
                                                           where (pro.Category).Equals(category)
                                                           select pro).Count()
                                              }));
        }

        [HttpGet("/v1/products/{product_id:int}")]
        public IQueryable getProductById(int product_id)
        {
            var query = (from pro in _context.Products
                         where pro.Id == product_id
                         select pro).Take(1);
            return query;
        }

        [HttpPost("/v1/products")]
        public void createProduct([FromBody] PostProductDTO product)
        {
            var newProduct = new Product();
            newProduct.Id = _context.Products.Count() == 0 ? 1 : _context.Products.Max(item => item.Id) + 1;
            newProduct.Name = product.name ?? "";
            newProduct.ThumbUrl = product.thumbUrl ?? "";
            newProduct.UnitPrice = product.unitPrice;
            newProduct.Quantity = product.quantity;
            newProduct.Discount = product.discount;
            newProduct.Category = product.category ?? "";
            newProduct.CreatedAt = DateTime.Now;
            newProduct.UpdatedAt = DateTime.Now;

            _context.Products.Add(newProduct);
            _context.SaveChanges();
        }

        [HttpPut("/v1/products/{product_id}")]
        public void updateProduct(int product_id, [FromBody] PutProductDTO product)
        {
            Product cProduct = (from pro in _context.Products
                                where pro.Id == product_id
                                select pro).SingleOrDefault();
            cProduct.Name = product.name ?? cProduct.Name;
            cProduct.ThumbUrl = product.thumbUrl ?? cProduct.ThumbUrl;
            cProduct.UnitPrice = product.unitPrice != null ? product.unitPrice : cProduct.UnitPrice;
            cProduct.Quantity = product.quantity != null ? product.quantity : cProduct.Quantity;
            cProduct.Discount = product.discount != null ? product.discount : cProduct.Discount;
            cProduct.Category = product.category ?? cProduct.Category;
            cProduct.UpdatedAt = DateTime.Now;

            _context.SaveChanges();

        }

        [HttpDelete("/v1/products/{product_id}")]
        public void deleteProduct(int product_id)
        {
            Product cProduct = (from pro in _context.Products
                                where pro.Id == product_id
                                select pro).SingleOrDefault();
            _context.Products.Remove(cProduct);
            _context.SaveChanges();
        }
    }
}
