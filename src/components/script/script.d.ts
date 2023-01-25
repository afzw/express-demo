import { FilterQuery, HydratedDocument, Types, UpdateQuery } from "mongoose"

/**
 * 脚本属性
 */
export interface ScriptProps {
    /**
     * 数据库唯一标识
     */
    _id?: Types.ObjectId
    /**
     * 脚本名称
     */
    name: string,
    /**
     * 脚本执行状态
     */
    status: 'done' | 'error',
    /**
     * 脚本执行时间
     */
    duration?: number,
    /**
     * 备注信息
     */
    message?: string
}

export type ScriptFilter = FilterQuery<ScriptProps>
export type ScriptUpdate = UpdateQuery<ScriptProps>
export type ScriptDoc = HydratedDocument<ScriptProps>
export type ScriptKey = keyof ScriptProps
