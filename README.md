<h1 align="center">
  cashbook-react
</h1>
<h4 align="center">React 实战：从 0 到 1 实现记账本</h4>

---

## 简介

**cashbook-react** 使用了最新的`React18`、`React-Router v6`、`React-Hooks`、`Vite4`、`Zustand`、`React Vant`、`Typescript`、`Echarts`等主流技术开发，集成了代码规范检查工具`Eslint`、`Prettier`、`Stylelint`。

此项目涉及注册、登录、记账、统计、个人中心等等功能，记账本的基本功能都全部实现了，相信从 0 到 1 实现该项目，可以让你快速的上手 React Hooks，并且熟悉 React router 和 Zustand 数据持久化存储的操作，而且该项目使用了 Echarts，可以让你对数据可视化有个基本的了解和应用。

本项目只是前端项目，不涉及任何后端接口服务开发，本项目所有数据接口均是 mock 数据

**注 1：如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！**

**注 2：或者您可以 "follow" 一下，我会不断开源更多的有趣的项目**

## 目标功能

- [x] 新增账单 -- 完成
- [x] 账单统计 -- 完成
- [x] 账单详情页 -- 完成
- [x] 登录、注册 -- 完成
- [x] 账单图表统计 -- 完成

## 项目运行

```bash
# 克隆项目
git clone https://github.com/sankeyangshu/cashbook-react.git

# 进入项目目录
cd cashbook-react

# 安装依赖 - 推荐使用pnpm
pnpm install

# 启动服务
pnpm dev

# 打包发布
pnpm build
```

## 项目截图

### 用户中心

<img src="/media/user.png" width="365" height="619"/> <img src="/media/login.png" width="365" height="619"/>

### 账单中心

<img src="/media/list.png" width="365" height="619"/> <img src="/media/detail.png" width="365" height="619"/>

### 统计中心

<img src="/media/add.png" width="365" height="619"/> <img src="/media/data.png" width="365" height="619"/>

## 如何贡献

你可以[提一个 issue](https://github.com/sankeyangshu/cashbook-react/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor`: 代码重构（不包括 bug 修复、功能新增）
- `perf`: 性能优化
- `test`: 添加、修改测试用例
- `build`: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
- `ci`: 修改 CI 配置、脚本
- `chore`: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert`: 回滚 commit

## 许可证

[MIT License](https://github.com/sankeyangshu/cashbook-react/blob/master/LICENSE)
