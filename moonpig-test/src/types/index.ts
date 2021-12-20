export type Currency = "£" | "€";
export type CurrencyCode = "GBP" | "EUR";

export type Price = {
  Value: number;
  Currency: Currency;
  CurrencyCode: CurrencyCode;
};

export type Link = {
  Href: string;
  Method: string;
  Rel: string;
  Title: string;
};

export type ApiProductImage = {
  Link: Link;
  MimeType: "image/jpeg";
};

export type ApiBatchProductVariant = {
  Id: number;
  Price: number;
  // Images: ApiProductImage;
  Name: string;
};

export type ApiBatchProduct = {
  Price: Price;
  Title: string;
  MoonpigProductNo: string;
  ProductImage: ApiProductImage;
  DefaultSizeId: number;
  ProductVariants: ApiBatchProductVariant[];
};

export type ApiBatchProducts = {
  Products: ApiBatchProduct[];
};

export type SingleProductSize = {
  Name: string;
  Id: number;
  Price: number;
  Currency: Currency;
};

export type ApiImageUrl = {
  ImageNo: number;
  ImageUrl: string;
};

export type ApiSingleProduct = {
  MoonpigProductNo: string;
  Description: string;
  Size: SingleProductSize;
  AvailableSizes: SingleProductSize[];
  ThumbnailUrl: string;
  ImageUrls: ApiImageUrl[];
};

export type Image = {
  imageNo: number;
  imageUrl: string;
};

export type Status = "LOADING" | "ERROR" | "IDLE";

export type ProductSize = {
  id: number;
  price: number;
  name: string;
  currency: Currency;
};

export type Product = {
  title: string;
  price: number;
  currency: Currency;
  imageUrl: string;
  id: string;
  defaultSizeId: number;
  sizes: ProductSize[];
  images: Image[];
};
