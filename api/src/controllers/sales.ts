import Sales from "../models/sales"
import Product from "../models/product";

// get total sales
export const totalSales = async(start_date: Date,end_date: Date) => {
    const totalSales = await Sales.aggregate([
        {
          $match: {
            Date: {
              $gte: start_date,
              $lt: end_date,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$TotalAmount' },
          },
        },
      ]);
    
      return totalSales.length > 0 ? totalSales[0].totalAmount : 0;
}

export const categorySales = async () => {
  const totalSales = await Sales.aggregate([
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$Quantity" },
      },
    },
  ]);

  const total = totalSales[0]?.totalQuantity || 0;

  const salesByCategory = await Sales.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "ProductID",
        foreignField: "ProductID",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$productDetails.Category",
        totalSales: { $sum: "$Quantity" },
      },
    },
    {
      $project: {
        Category: "$_id",
        totalSales: 1,
        percentage: {
          $cond: {
            if: { $eq: [total, 0] },
            then: 0,
            else: { $multiply: [{ $divide: ["$totalSales", total] }, 100] },
          },
        },
      },
    },
    {
      $sort: { totalSales: -1 },
    },
  ]);

  return salesByCategory;
};