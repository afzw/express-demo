const LocalAuthStore = {
  /**
   * 登录时填写的表单字段
   */
  theSignInKeys: () => ['email', 'password'],
  /**
   * 注册时填写的表单字段
   */
  theSignUpKeys: () => LocalAuthStore.theSignInKeys()
}

export default LocalAuthStore
