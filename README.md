# 见室书架 · 静态演示版

一个用 three.js 搭的 3D 书房书架，所有书正面朝外摆在柜子里。

**这个仓库是纯静态演示版**：书架上的书目由 `lib/demo.mjs` 合成（经典书单，非任何人的真实阅读数据），
不含服务端、不连接微信读书，打开即看。

- 在线预览：https://daheitian.github.io/bookshelf-demo/
- 拖动逛书架，滚轮横向移动，⌘/Ctrl+滚轮或双击放大
- 右下角可以切换 **Spines / Covers** 两种视图，以及 **默认 / 按评分** 排序
  —— 选「按评分」会自动切到封面模式，每个分类内按推荐值从高到低排

## 完整版

带真实书架的版本在私有仓库 `daheitian/bookshelf`，用 Node 提供服务端、
通过微信读书 API 拉取真实的书架与笔记，需要 `.env` 里配置自己的 Key。

## 结构

```
index.html          页面骨架（相对路径，可直接放在子目录托管）
style.css           版式与界面
js/app.js           交互：搜索、视图切换、排序、阅读器
js/scene.js         三维场景：柜体、书、灯光、摆件
js/atlas.js         封面/书脊图集，程序化生成占位封面
js/demo-data.js     合成书架数据（自动生成）
js/demo-shim.js     把 /api/* 请求接到内嵌数据上
fonts/              字体
```

数据由 `bookshelf-site/tools/export-demo.mjs` 从 `lib/demo.mjs` 导出，改书单请改那里再重新生成。
