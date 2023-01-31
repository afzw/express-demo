import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import { ScriptDoc, ScriptFilter, ScriptProps, ScriptUpdate } from './script'
import { ScriptModel } from './script.model'
import Curd from '@/lib/odm/curd'
import mongodb from 'mongodb'

const ScriptDao = {
  create: function (createProps: ScriptProps) {
    return Curd.create(ScriptModel, createProps)
  },

  createMany: function (createDocs: ScriptProps[]) {
    return Curd.insertMany(ScriptModel, createDocs)
  },

  findDocsByFilter: function (
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptDoc[]> {
    return Curd.find(ScriptModel, filter, projection, options).exec()
  },

  findObjsByFilter: function (
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptProps[]> {
    return Curd.find(ScriptModel, filter, projection, options).lean().exec()
  },

  findOneDocByFilter: function (
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptDoc> {
    return Curd.findOne(ScriptModel, filter, projection, options).exec()
  },

  findOneObjByFilter: function (
    filter: ScriptFilter,
    projection?: unknown,
    options?: QueryOptions
  ): Promise<ScriptProps> {
    return Curd.findOne(ScriptModel, filter, projection, options).lean().exec()
  },

  findOneDocAndUpdate: function (
    filter: ScriptFilter,
    updateDoc: ScriptUpdate,
    options?: QueryOptions
  ): Promise<ScriptDoc> {
    return Curd.findOneAndUpdate(ScriptModel, filter, updateDoc, options).exec()
  },

  findOneObjAndUpdate: function (
    filter: ScriptFilter,
    updateDoc: ScriptUpdate,
    options?: QueryOptions
  ): Promise<ScriptProps> {
    return Curd.findOneAndUpdate(ScriptModel, filter, updateDoc, options).lean().exec()
  },

  updateMany: function (
    filter: ScriptFilter,
    updateDoc: ScriptUpdate,
    options?: QueryOptions
  ): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(ScriptModel, filter, updateDoc, options).exec()
  },

  findOneDocAndDelete: function (filter: ScriptFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ScriptModel, filter, options).exec()
  },

  findOneObjAndDelete: function (filter: ScriptFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(ScriptModel, filter, options).lean().exec()
  },

  deleteMany: function (filter: ScriptFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(ScriptModel, filter).exec()
  },

  count: function (filter: ScriptFilter) {
    return Curd.countDocuments(ScriptModel, filter).exec()
  },

  distinct: function (field: string, filter: ScriptFilter) {
    return Curd.distinct(ScriptModel, field, filter).exec()
  }
}

export default ScriptDao
