import {
  SessionInfoModel,
  SessionInfoProps,
} from "@/components/sessionInfo/sessionInfo.model";
import * as Curd from "@/lib/odm/curd";
import { FilterQuery } from "mongoose";

/**
 * 添加sessionInfo
 */
export function create(SessionInfoProps: SessionInfoProps) {
  return Curd.create(SessionInfoModel, SessionInfoProps);
}

/**
 * 更新会话信息活跃时间
 */
export function updateTheActiveAt(filter: FilterQuery<SessionInfoProps>) {
  return Curd.updateOne(SessionInfoModel, filter, {
    activeAt: new Date(),
  }).exec();
}

/**
 * 查找并删除sessionInfo，然后返回被删除的 SessionInfoProps
 * @param filter 筛选条件
 * @returns 被删除的 SessionInfoProps
 */
export function findOneAndDelete(filter: FilterQuery<SessionInfoProps>) {
  return Curd.findOneAndDelete(SessionInfoModel, filter).exec();
}

/**
 * 删除过期的sessionInfo
 */
export function removeExpired(cb: (err: any) => void) {
  return Curd.deleteMany(SessionInfoModel, {
    expireAt: { $lt: new Date() },
  }).then(cb);
}
