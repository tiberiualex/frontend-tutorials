import { ApiProduct, Product } from "../types";

export const mapProduct = (product: ApiProduct): Product => {
  return {
    title: product.Title,
    id: product.MoonpigProductNo,
    price: product.Price.Value,
    currencyCode: product.Price.CurrencyCode,
    imageUrl: product.ProductImage.Link.Href,
  };
};
