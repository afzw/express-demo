import { QueryOptions } from "mongoose";
import { SessionInfoModel } from "@/components/sessionInfo/sessionInfo.model";
import { SessionInfoDoc, SessionInfoFilter, SessionInfoProps, SessionInfoUpdate } from "@/components/sessionInfo/sessionInfo";
import Curd from "@/lib/odm/curd";
import mongodb from 'mongodb'

const SessionInfoDao = {
  create: function (SessionInfoProps: SessionInfoProps) {
    return Curd.create(SessionInfoModel, SessionInfoProps);
  },

  createMany: function (createDocs: SessionInfoProps[]) {
    return Curd.insertMany(SessionInfoModel, createDocs)
  },

  findDocsByFilter: function (filter: SessionInfoFilter, projection?: unknown, options?: QueryOptions): Promise<SessionInfoDoc[]> {
    return Curd.find(SessionInfoModel, filter, projection, options).exec()
  },

  findObjsByFilter: function (filter: SessionInfoFilter, projection?: unknown, options?: QueryOptions): Promise<SessionInfoProps[]> {
    return Curd.find(SessionInfoModel, filter, projection, options).lean().exec()
  },

  findOneDocByFilter: function (filter: SessionInfoFilter, projection?: unknown, options?: QueryOptions): Promise<SessionInfoDoc> {
    return Curd.findOne(SessionInfoModel, filter, projection, options).exec()
  },

  findOneObjByFilter: function (filter: SessionInfoFilter, projection?: unknown, options?: QueryOptions): Promise<SessionInfoProps> {
    return Curd.findOne(SessionInfoModel, filter, projection, options).lean().exec()
  },

  findOneDocAndUpdate: function (filter: SessionInfoFilter, updateDoc: SessionInfoUpdate, options?: QueryOptions): Promise<SessionInfoDoc> {
    return Curd.findOneAndUpdate(SessionInfoModel, filter, updateDoc, options).exec()
  },

  findOneObjAndUpdate: function (filter: SessionInfoFilter, updateDoc: SessionInfoUpdate, options?: QueryOptions): Promise<SessionInfoProps> {
    return Curd.findOneAndUpdate(SessionInfoModel, filter, updateDoc, options).lean().exec()
  },

  updateMany: function (filter: SessionInfoFilter, updateDoc: SessionInfoUpdate, options?: QueryOptions): Promise<mongodb.UpdateResult> {
    return Curd.updateMany(SessionInfoModel, filter, updateDoc, options).exec()
  },

  findOneDocAndDelete: function (filter: SessionInfoFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(SessionInfoModel, filter, options).exec()
  },

  findOneObjAndDelete: function (filter: SessionInfoFilter, options?: QueryOptions) {
    return Curd.findOneAndDelete(SessionInfoModel, filter, options).lean().exec()
  },

  deleteMany: function (filter: SessionInfoFilter): Promise<mongodb.DeleteResult> {
    return Curd.deleteMany(SessionInfoModel, filter).exec()
  },

  count: function (filter: SessionInfoFilter) {
    return Curd.countDocuments(SessionInfoModel, filter).exec()
  },

  distinct: function (field: string, filter: SessionInfoFilter) {
    return Curd.distinct(SessionInfoModel, field, filter).exec()
  }
}

export default SessionInfoDao
