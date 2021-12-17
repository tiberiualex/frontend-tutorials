import axios from "axios";
import { ApiProducts, ApiProduct } from "../types/index";

export const getCards = async (
  size: number = 20,
  start: number = 0
): Promise<ApiProducts> =>
  await axios.get(
    `https://search.moonpig.com/api/products?size=${size}&fq=card_shop_id:1&start=${start}`
  );

export const getCard = async (id: string): Promise<ApiProduct> =>
  await axios.get(`https://www.moonpig.com/uk/api/product/product/?mpn=${id}`);
