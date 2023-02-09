import events from 'events'

/**
 * 为程序进程设置一个事件发射器，可用于监听程序事件并与其他系统交互
 */
function loadEventEmitter() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter = new events.EventEmitter()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.on('signIn', (user, session) => {
    console.log(`用户${user.username}已登录！相应会话${session.sessionId}已建立！`)
    // TODO 限制最多会话数
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.on('signUp', user => {
    console.log(`欢迎新用户${user.username}`)
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.eventEmitter.on('signOut', (user, session) => {
    console.log(`用户${user.username}已登出！相应的会话${session.sessionId}已销毁！`)
  })
}

export default loadEventEmitter
