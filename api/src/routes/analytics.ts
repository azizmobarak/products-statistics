import { Request, Response, Router} from 'express';
import { categorySales, totalSales } from '../controllers/sales';
import { IRequestBody } from '../types/Request';
import { Errors } from '../utils/errorsText';
import moment from 'moment';
import { trendingProducts } from '../controllers/products';

const router = Router();

interface DateRange {
  start_date: string;
  end_date: string;
}


router.get(
    '/total_sales',
   async (req: IRequestBody<DateRange>, res: Response) => {
  try{
      const { start_date, end_date } = req.body;

    if(!start_date || !end_date){
      res.status(400).send({ok: false, error: Errors.BAD_REQUEST})
    }else {
      const startDate = moment(start_date, 'MM/DD/YYYY').toDate();
      const endDate = moment(end_date, 'MM/DD/YYYY').toDate();
      if(startDate > endDate) {
        res.status(400).send({ok: false, error: Errors.BAD_REQUEST})
      } else {
        const result = await totalSales(startDate, endDate);
        res.status(200).send({ok: true, data: result});
      }
    }
  }catch{
      res.status(500).send({ok: false, error: Errors.SERVER_ERROR});
  }
    }
  );


  router.get(
    '/trending_products',
   async (req: Request, res: Response) => {
  try{
      const trendPrducts = await trendingProducts();
      res.status(200).send({ok: true, data: trendPrducts});
  }catch{
      res.status(500).send({ok: false, error: Errors.SERVER_ERROR});
  }
    }
  );

  router.get(
    '/category_sales',
   async (req: Request, res: Response) => {
  try{
    const sales = await categorySales();
    if(!sales){
      res.status(404).send({ok: false, error: Errors.NOT_FOUND});
    }else {
      res.status(200).send({ok: true, data: sales});
    }
  }catch{
      res.status(500).send({ok: false, error: Errors.SERVER_ERROR});
  }
    }
  );
  
  export default router;