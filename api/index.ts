import express from 'express';
import dotenv from 'dotenv';
import {connection} from './src/utils/connection';
import { importProducts, importSales } from './src/scripts/import-data';
import analyticsRoutes from './src/routes/analytics';
import bodyParser from 'body-parser';

dotenv.config({path:'./.env'});

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/analytics',analyticsRoutes);

connection().then(async() =>{
   await importProducts();
   await importSales()
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});