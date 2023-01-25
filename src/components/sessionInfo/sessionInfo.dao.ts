import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { SessionInfoModel } from "@/components/sessionInfo/sessionInfo.model";
import { SessionInfoProps } from "@/components/sessionInfo/sessionInfo";
import Curd from "@/lib/odm/curd";

const SessionInfoDao: any = {
  create: function (SessionInfoProps: SessionInfoProps) {
    return Curd.create(SessionInfoModel, SessionInfoProps);
  },

  updateOne: function (filter: FilterQuery<SessionInfoProps>, updateDoc: UpdateQuery<SessionInfoProps>, options?: QueryOptions<SessionInfoProps>) {
    return Curd.updateOne(SessionInfoModel, filter, updateDoc, options).exec()
  },
  
  findOneAndDelete: function (filter: FilterQuery<SessionInfoProps>) {
    return Curd.findOneAndDelete(SessionInfoModel, filter).exec();
  },
  
  deleteMany: function (filter: FilterQuery<SessionInfoProps>) {
    return Curd.deleteMany(SessionInfoModel, filter).exec()
  }
}

export default SessionInfoDao
