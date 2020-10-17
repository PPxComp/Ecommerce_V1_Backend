import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { stockInfo } from "./stock.dto";

const LIMIT: number = 12;
@Injectable()
export class StockService {
  constructor(@InjectModel("stocks") private stockModel: Model<any>) {}

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
    const max = min + LIMIT < count ? min + LIMIT : count;
    let result: stockInfo[] = [];

    for (let i = min; i < max; i++) {
      result.push(data[i]);
    }
    return { data: result, count };
  }

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
    const min = at < count ? at : count;
    const max = min + LIMIT < count ? min + LIMIT : count;
    let result = [];

    for (let i = min; i < max; i++) {
      data[i]._doc.id = data[i]._id;
      const tmp = { ...data[i] };

      result.push({ id: data[i].id, ...tmp._doc });
    }

    return { data: result, count };
  }

  async getStockById(id: string) {
    const result = await this.stockModel.findById(id);
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }

  async createStock(data: stockInfo) {
    const result = await this.stockModel.create(data);
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }

  async updateStock(data: stockInfo, id: string) {
    const result = await this.stockModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }

  async deleteStockById(id: string) {
    const result = await this.stockModel.findByIdAndRemove(id);
    if (result) return result;
    throw new NotFoundException("Not found this stock");
  }
}
