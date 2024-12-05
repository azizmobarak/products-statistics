import Product from '../models/product';
import Sales from '../models/sales';
import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';

export const importProducts = async () => {
  const count = await Product.countDocuments();
  if(count !==0) {
    console.log('data already inserted')
    return;
  }
  try {
    const products: any[] = [];
    const csvFilePath = path.resolve(__dirname, '../scripts/data/products.csv');
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        products.push({
          ProductID: row.ProductID,
          ProductName: row.ProductName,
          Category: row.Category || 'uncategorized',
          Price: parseFloat(row.Price),
        });
      })
      .on('end', async () => {
        try {
          await Product.insertMany(products);
          console.log('Products imported successfully');
        } catch (error) {
          console.error('Error inserting products:', error);
        }
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};


export const importSales = async () => {
  try {
    const count = await Sales.countDocuments();
  if(count !==0) {
    console.log('data already inserted')
    return;
  }
    const sales: any[] = [];
    const csvFilePath = path.resolve(__dirname, '../scripts/data/sales.csv');
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        sales.push({
          SaleID: row.SaleID,
          ProductID: row.ProductID,
          Quantity: row.Quantity || 0,
          Date: row.Date,
          TotalAmount: row.TotalAmount,
        });
      })
      .on('end', async () => {
        try {
          await Sales.insertMany(sales);
          console.log('Sales imported successfully');
        } catch (error) {
          console.error('Error inserting Sales:', error);
        }
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

