import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ScriptDoc, ScriptModel } from "./script.schema";
import * as Curd from "@/lib/mongo/curd"

export async function updateOne(filter: FilterQuery<ScriptDoc>, update: UpdateQuery<ScriptDoc>, options?: QueryOptions<ScriptDoc>) {
  return Curd.updateOne(ScriptModel, filter, update, options)
}

export async function findOneAndUpdate(filter: FilterQuery<ScriptDoc>, update: UpdateQuery<ScriptDoc>, options?: QueryOptions<ScriptDoc>) {
  return Curd.findOneAndUpdate(ScriptModel, filter, update, options)
}