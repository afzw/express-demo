import Curd from '@/lib/odm/curd'
import { QueryOptions } from 'mongoose'
import { ItemDoc, ItemFilter, ItemProps, ItemUpdate } from './item'
import ItemModel from './item.model'
import mongodb from 'mongodb'

const ItemDao = {
  create: function (createDoc: ItemProps) {
    return Curd.create(ItemModel, createDoc)
  },

  createMany: function (createDocs: ItemProps[]) {
    return Curd.insertMany(ItemModel, createDocs)
  },

  findDocsByFilter: function (filter: ItemFilter, projection: unknown, options: QueryOptions): Promise<ItemDoc[]> {
    return Curd.find(ItemModel, filter, projection, options).exec()
  },

  findObjsByFilter: function (filter: ItemFilter, projection: unknown, options: QueryOptions): Promise<ItemProps[]> {
    return Curd.find(ItemModel, filter, projection, options).lean().exec()
  },

  findOneDocByFilter: function (filter: ItemFilter, projection: unknown, options: QueryOptions): Promise<ItemDoc> {
    return Curd.findOne(ItemModel, filter, projection, options).exec()
  },

  findOneObjByFilter: function (filter: ItemFilter, projection: unknown, options: QueryOptions): Promise<ItemProps> {
    return Curd.findOne(ItemModel, filter, projection, options).lean().exec()
  },

  findOneDocAndUpdate: function (filter: ItemFilter, updateDoc: ItemUpdate, options: QueryOptions): Promise<ItemDoc> {
    return Curd.findOneAndUpdate(ItemModel, filter, updateDoc, options).exec()
  },

  findOneObjAndUpdate: function (filter: ItemFilter, updateDoc: ItemUpdate, options: QueryOptions): Promise<ItemProps> {
    return Curd.findOneAndUpdate(ItemModel, filter, updateDoc, options).lean().exec()
  },

  updateMany: function (
    filter: ItemFilter,
    updateDoc: ItemUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ItemModel, filter, updateDoc, options).exec()
  },

  findOneDocAndDelete: function (filter: ItemFilter, options: QueryOptions) {
    return Curd.findOneAndDelete(ItemModel, filter, options).exec()
  },

  findOneObjAndDelete: function (filter: ItemFilter, options: QueryOptions) {
    return Curd.findOneAndDelete(ItemModel, filter, options).lean().exec()
  },

  deleteMany: function (filter: ItemFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ItemModel, filter).exec()
  },

  count: function (filter: ItemFilter) {
    return Curd.countDocuments(ItemModel, filter).exec()
  },

  distinct: function (field: string, filter: ItemFilter) {
    return Curd.distinct(ItemModel, field, filter).exec()
  }
}

export default ItemDao
