import Sales from "../models/sales";

export const trendingProducts = async () => {
  const topProducts = await Sales.aggregate([
    {
      $group: {
        _id: "$ProductID",
        totalQuantity: { $sum: "$Quantity" },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "ProductID",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        ProductID: "$_id",
        ProductName: "$productDetails.ProductName",
        Category: "$productDetails.Category",
        Price: "$productDetails.Price",
        totalQuantity: 1,
        _id: 0,
      },
    },
  ]);

  return topProducts;
};
