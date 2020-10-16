export declare class stockInfo {
  name: String;
  price: number;
  count: number;
  img: String;
  catagory?: String[];
}
export declare class getAll {
  catagory: string;
  start: number;
}
export declare class getStockDto {
  data: stockInfo[];
  count: number;
}
