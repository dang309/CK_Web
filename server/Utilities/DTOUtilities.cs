using server.DTOs;
using server.Models;

namespace server.Utilities
{
    public class DTOUtilities
    {
        // public static GetCustomerDTO ToCustomerDTO(Customer customer)
        // {
        //     return new GetCustomerDTO
        //     {
        //         id = customer.id,
        //         name = customer.name,
        //         email = customer.email,
        //         hashedPassword = customer.hashedPassword,
        //         isAdmin = customer.isAdmin,
        //         avatar = customer.avatar,
        //         created_at = customer.created_at,
        //         updated_at = customer.updated_at
        //     };
        // }

        // public static GetOrderDTO ToOrderDTO(Order order)
        // {
        //     return new GetOrderDTO
        //     {
        //         id = order.id,
        //         transaction_id = new Transaction
        //         {
        //             id = order.transaction_id
        //         },
        //         product_id = new Product
        //         {
        //             id = order.product_id
        //         },
        //         quantity = order.quantity,
        //         amount = order.amount,
        //         status = order.status,
        //         created_at = order.created_at,
        //         updated_at = order.updated_at
        //     };
        // }

        // public static GetCategoryDTO ToCategoryDTO(Category category)
        // {
        //     return new GetCategoryDTO
        //     {
        //         id = category.id,
        //         // product_id = new Product
        //         // {
        //         //     id = category.product_id
        //         // },
        //         name = category.name,
        //         created_at = category.created_at,
        //         updated_at = category.updated_at
        //     };
        // }

        // public static GetProductDTO ToProductDTO(Product product)
        // {
        //     return new GetProductDTO
        //     {
        //         id = product.id,
        //         name = product.name,
        //         thumbUrl = product.thumbUrl,
        //         unitPrice = product.unitPrice,
        //         quantity = product.quantity,
        //         created_at = product.created_at,
        //         updated_at = product.updated_at
        //     };
        // }

        // public static GetTransactionDTO ToTransactionDTO(Transaction transation)
        // {
        //     return new GetTransactionDTO
        //     {
        //         id = transation.id,
        //         date = transation.date,
        //         totalAmount = transation.totalAmount,
        //         isPaid = transation.isPaid,
        //         paymentMethod = transation.paymentMethod,
        //         paymentInfo = transation.paymentInfo,
        //         created_at = transation.created_at,
        //         updated_at = transation.updated_at
        //     };
        // }

        // public static GetTransactionDetailDTO ToTransactionDetailDTO(TransactionDetail transactionDetail)
        // {
        //     return new GetTransactionDetailDTO
        //     {
        //         id = transactionDetail.id,
        //         transaction_id = new Transaction
        //         {
        //             id = transactionDetail.transaction_id
        //         },
        //         customer_id = new Customer
        //         {
        //             id = transactionDetail.customer_id
        //         },
        //         created_at = transactionDetail.created_at,
        //         updated_at = transactionDetail.updated_at
        //     };
        // }

        // public static GetVoucherDTO ToVoucherDTO(Voucher voucher)
        // {
        //     return new GetVoucherDTO
        //     {
        //         id = voucher.id,
        //         rate = voucher.rate,
        //         desc = voucher.desc,
        //         product_id = new Product
        //         {
        //             id = voucher.product_id
        //         },
        //         created_at = voucher.created_at,
        //         updated_at = voucher.updated_at
        //     };
        // }
    }
}