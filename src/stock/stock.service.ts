import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { deleteDto, stockInfo } from "./stock.dto";

//-------------------------------------------------------------------------//
// TODO : initialize  LIMIT when get All stock
const LIMIT: number = 12;
//-------------------------------------------------------------------------//

@Injectable()
export class StockService {
  constructor(@InjectModel("stocks") private stockModel: Model<any>) {}

  //-------------------------------------------------------------------------//
  // TODO : Get stock by catagory if catagory exist and LIMIT : 12
  //        this function didn't return stock that count > 0
  //-------------------------------------------------------------------------//
  async getAll(catagory: string[], at: number) {
    let data: stockInfo[] = [];
    let count: number = 0;
    if (catagory.length > 0) {
      data = await this.stockModel
        .find({ catagory: { $all: catagory }, count: { $gt: 0 } })
        .sort({ _id: -1 });
    } else {
      data = await this.stockModel
        .find({ count: { $gt: 0 } })
        .sort({ _id: -1 });
    }
    count = data.length;
    const min = at < count ? at : count;

    let max: number = min + LIMIT;

    max = max < count ? max : count;
    let result: stockInfo[] = [];

    for (let i = min; i < max; i++) {
      result.push(data[i]);
    }
    return { data: result, count };
  }

  //-------------------------------------------------------------------------//
  // TODO : Get stock by catagory if catagory exist and LIMIT : 12
  //        this function return anything in catatogy include stock that count == 0
  //-------------------------------------------------------------------------//
  async getAdminStockAll(catagory: string[], at: number) {
    let data = [];
    let count: number = 0;
    if (catagory.length > 0) {
      data = await this.stockModel
        .find({ catagory: { $all: catagory } })
        .sort({ id: -1 });
    } else {
      data = await this.stockModel.find({}).sort({ _id: -1 });
    }

    count = data.length;
    let result = [];
    for (let i = 0; i < count; i++) {
      data[i]._doc.id = data[i]._id;
      const tmp = Object.assign({}, data[i]);
      result.push(Object.assign({ id: data[i].id }, tmp._doc));
    }

    return { data: result, count };
  }

  //-------------------------------------------------------------------------//
  // TODO : get Stock By Id
  //-------------------------------------------------------------------------//
  async getStockById(id: string) {
    const result = await this.stockModel.findById(id);
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }

  //-------------------------------------------------------------------------//
  // TODO : Create Stock   if not found stock return Notfound exception
  //-------------------------------------------------------------------------//
  async createStock(data: stockInfo) {
    const result = await this.stockModel.create(data);
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }

  //-------------------------------------------------------------------------//
  // TODO : Update stock by id  if not found stock return Notfound exception
  //-------------------------------------------------------------------------//
  // NOTE :  push {new : true}  when need to return stock that updated
  //-------------------------------------------------------------------------//
  async updateStock(data: stockInfo, id: string) {
    const result = await this.stockModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }

  //-------------------------------------------------------------------------//
  // TODO : delete Stock by id if not found stock return Notfound exception
  // NOTE :  push {new : true}  when need to return stock that updated
  //-------------------------------------------------------------------------//
  async deleteStockById(data: string[]) {
    const id: ObjectId[] = data.map((element) => {
      return new ObjectId(element);
    });
    const result = await this.stockModel.deleteMany({ _id: { $in: id } });
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }
}
