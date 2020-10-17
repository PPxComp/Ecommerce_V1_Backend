export declare class stockInfo {
  _id: String;
  id: String;
  name: String;
  price: number;
  count: number;
  description: String;
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
