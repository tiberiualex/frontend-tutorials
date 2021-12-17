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

export type ProductImage = {
  Link: Link;
  MimeType: "image/jpeg";
};

export type ApiProduct = {
  Price: Price;
  Title: string;
  MoonpigProductNo: string;
  ProductImage: ProductImage;
};

export type ApiProducts = {
  Products: ApiProduct[];
};
