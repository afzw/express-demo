const LocalAuthStore = {
  /** 登录信息字段名 */
  theLoginInfoKeys: () => ['email', 'password'],
  /** 注册信息字段名 */
  theRegisterInfoKeys: () => [...LocalAuthStore.theLoginInfoKeys()]
}

export { LocalAuthStore }
