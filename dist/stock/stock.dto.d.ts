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
  start: string;
}
export declare class getStockDto {
  data: stockInfo[];
  count: number;
}
