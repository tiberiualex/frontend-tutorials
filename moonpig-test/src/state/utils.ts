import { ApiBatchProduct, ApiSingleProduct, Product } from "../types";

export const mapBatchProduct = (product: ApiBatchProduct): Product => {
  return {
    title: product.Title,
    id: product.MoonpigProductNo,
    price: product.Price.Value,
    currency: product.Price.Currency,
    imageUrl: product.ProductImage.Link.Href,
    defaultSizeId: product.DefaultSizeId,
    images: [],
    sizes: product.ProductVariants.map((p) => ({
      id: p.Id,
      price: p.Price,
      name: p.Name,
      currency: product.Price.Currency,
    })),
  };
};

export const mapSingleProduct = (product: ApiSingleProduct): Product => ({
  title: product.Description,
  id: product.MoonpigProductNo,
  price: product.Size.Price,
  currency: product.Size.Currency,
  imageUrl: product.ThumbnailUrl,
  defaultSizeId: product.Size.Id,
  images: product.ImageUrls.map((i) => ({
    imageNo: i.ImageNo,
    imageUrl: i.ImageUrl,
  })),
  sizes: product.AvailableSizes.map((p) => ({
    id: p.Id,
    price: p.Price,
    name: p.Name,
    currency: p.Currency,
  })),
});
