/**
 * @file 公共路由控制器
 */
import _ from "lodash";
import utils from "@/lib/utils/common";
import { callAsync } from "@/lib/utils/callAsync";
import UserDao from "@/modules/user/user.dao";
import { Request, Response } from "express";
import { saveSessionInfo } from "@/lib/session";
import * as sessionInfoDao from "@/components/sessionInfo/sessionInfo.dao";

/**
 * 登录
 */
export async function signIn(req: Request, res: Response) {
  const signInProfile = _.pick(req.body, "email", "password");
  if (!signInProfile.email || !signInProfile.password)
    return res.status(400).send({ error: "邮箱或密码未填写" });

  const [err, user] = await callAsync(
    UserDao.findUserByFilter({
      email: signInProfile.email,
      deleted: { $ne: true },
    })
  );
  if (err) return res.status(500).send(`查询用户失败${err}`);
  if (!user) return res.status(401).send({ error: "邮箱或密码错误" });

  const salt = user.salt;
  const enPass = utils.md5(salt + signInProfile.password);
  if (enPass !== user.password)
    return res.status(401).send({ error: "邮箱或密码错误" });

  if (user.disabled) {
    req.logout(function (err: any) {
      if (err) console.log("登录失败，用户已禁用");
      res.status(400).send({ error: "登录失败，用户已禁用" });
    });
  }

  req.login(user, async (error: any) => {
    if (error) return res.status(500).send(`passport登录失败！详情：${error}`);

    //  记录sessionInfo
    const [saveSessionErr, sessionInfo] = await callAsync(saveSessionInfo(req));
    if (saveSessionErr)
      return res
        .status(500)
        .send(`登录失败！记录session信息失败！详情：${saveSessionErr}`);

    // @ts-ignore
    process.eventEmitter.emit("signIn", user, sessionInfo);

    res.sendStatus(200);
  });
}

/**
 * 注册
 */
export async function signUp(req: Request, res: Response) {
  const signUpProfile = _.pick(
    req.body,
    "email",
    "password",
    "username",
    "nickname"
  );
  if (
    !signUpProfile.email ||
    !signUpProfile.password ||
    !signUpProfile.username
  )
    return res.status(400).send("信息填写不全");

  const salt = utils.genRandom();
  const password = utils.md5(salt + signUpProfile.password);

  const newUserDoc = {
    password,
    salt,
    email: signUpProfile.email,
    username: signUpProfile.username,
    nickname: signUpProfile.nickname,
  };

  const [err, user] = await callAsync(UserDao.create(newUserDoc));
  if (err) return res.status(500).send(`注册失败！详情：${err}`);

  // @ts-ignore
  process.eventEmitter.emit("signUp", user);

  res.sendStatus(200);
}

/**
 * 登出
 */
export async function signOut(req: Request, res: Response) {
  const [err, session] = await callAsync(
    sessionInfoDao.findOneAndDelete({ sessionId: req.sessionID })
  );
  if (err) return console.log("sessionInfo销毁失败");

  req.session.destroy((err: any) => {
    if (err) console.log("session销毁失败");
  });

  // @ts-ignore
  process.eventEmitter.emit("signOut", req.user, session);

  req.logout(() => {
    res.sendStatus(200);
  });
}

/**
 * 获取版本信息
 */
export function getVersionInfo(req: Request, res: Response) {
  return res.send("0.0.1 (dev)");
}
