import util from "util";

/**
 * 单行语句获取Promise结果值和错误原因
 * @param promise Promise实例
 * @returns [错误, Promise结果值]
 */
export function callAsync<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, null]>((err: U) => [err, null])
}

/**
 * 将【回调类】方法转换为【Promise类】方法，并单行语句获取其结果值和错误原因
 * @param func
 * @param args
 */
export function call<T, U = any>(func: Function, ...args: any[]): Promise<[U | null, T | null]> {
  const promise = util.promisify(func)

  // promise is object type
  if (typeof promise !== 'object') {
    return Promise.reject('func should match utilpromisify')
  }

  const _promise = promise as Promise<any>
  return callAsync<T, U>(_promise)
}
