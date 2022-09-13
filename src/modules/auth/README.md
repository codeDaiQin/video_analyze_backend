# 登录注册逻辑

## 注册

1. 输入邮箱
2. 点击获取验证码 校验通过后 获取验证码
```ts
  if (emailReg.test(email)) {
  // 如果 已经存在 需要 提示用户是否直接登录
    const { type, code } = await getCode(email)
    // type: 区分当前账户的状态 （未注册、已注册等）
    // code: 4位验证码
  }
```
3. 点击注册
4. 校验验证码是否正确 
```ts
  await register({ email, code })
  // 后端先占位 其他信息通过 update修改
```
5. 引导用户填写其他信息 (昵称 密码等)
6. 保存

## 登录

登录方式
- 邮箱 + 密码
- 邮箱 + 验证码

## 忘记密码

1. 输入邮箱
2. 点击获取验证码 校验通过后 获取验证码
3. 点击下一步
4. 校验验证码是否正确 
5. 引导输入新密码 确认密码
6. 保存