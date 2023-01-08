import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ScriptProps } from "./script";
import { ScriptModel } from "./script.model"
import * as Curd from "@/lib/odm/curd"

const ScriptDao: any = {
  updateOne(filter: FilterQuery<ScriptProps>, update: UpdateQuery<ScriptProps>, options?: QueryOptions<ScriptProps>) {
    return Curd.updateOne(ScriptModel, filter, update, options)
  },

  findOneAndUpdate(filter: FilterQuery<ScriptProps>, update: UpdateQuery<ScriptProps>, options?: QueryOptions<ScriptProps>) {
    return Curd.findOneAndUpdate(ScriptModel, filter, update, options)
  }
}

export default ScriptDao
