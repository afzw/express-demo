import { FilterQuery, HydratedDocument, Types, UpdateQuery } from "mongoose"

export interface UserProps {
    /* base fields */
    _id?: Types.ObjectId
    email: string
    username: string
    password: string
    salt?: string
    roles?: string[]
    disabled?: boolean
    deleted?: boolean
    nickname?: string
    avatar?: string
    createdAt?: Date
    updatedAt?: Date
    activedAt?: Date
    deletedAt?: Date

    /* custom fields */
}

export type UserFilter = FilterQuery<UserProps>
export type UserUpdate = UpdateQuery<UserProps>
export type UserDoc = HydratedDocument<UserProps>