# 主页修改说明

本次在原静态主页上直接修改，仍可用于 GitHub Pages，无需安装依赖或构建。

## 本次修改

- 参考 https://www.jiangjingyan.com/ 的布局：固定顶部导航、桌面左侧个人信息、右侧内容，浅色背景、衬线标题、编号分节、蓝色和暖棕色强调；个人头像保留原先的圆框样式。
- 论文区域右上角新增 **Full list on Google Scholar**，使用原主页账号 `35tLJkoAAAAJ`；脚本从 `site-data.js` 的 Google Scholar 条目读取链接。
- GeoLink、InfoGeo、RadarPos、MiKeCoCo 新增真实论文框图，点击可放大，支持 Escape 关闭。
- 显示论文描述、Paper 和 Code 入口；纠正 GeoLink / InfoGeo 相互填反的 Code 链接。
- 修复新闻里的 Markdown 链接、奖项中的未闭合标签，以及照片的 EXIF 方向。
- 手机端改为单列和折叠菜单，保留暗色模式；移除 CV 中尚未填写的 Education 占位项。

## 上传到原 GitHub 仓库

将修改文件包中的文件按目录覆盖到原仓库根目录；`images/publications/` 是新增的图片目录，须一起上传。完整源码包也包含原仓库的其他文件。

主要文件：`index.html`、`styles.css`、`script.js`、`site-data.js`、`.nojekyll`、`images/hongyang-zhang.webp`、`images/publications/`。

`.nojekyll` 让 GitHub Pages 按静态网站发布，避免原模板的 `_pages/about.md` 与新首页争用根路径。旧 Jekyll 模板源文件仍保留在完整源码中；它们不会被静态发布流程渲染。

本次未推送或发布到 GitHub。上传后，继续使用原仓库的 Pages 分支发布设置。

## 后续更新论文

在 `site-data.js` 的 `publications` 数组维护论文条目。支持：

```js
{
  title: "Paper title",
  authors: "Hongyang Zhang, ...",
  venue: "Conference / Journal, year",
  selected: true,
  description: "A short description.",
  image: "images/publications/paper-framework.webp",
  imageAlt: "Paper method framework",
  topic: "Research topic",
  link: "https://...",
  code: "https://github.com/..."
}
```

未提供 `image` 的论文会使用文字布局，未提供链接的条目不会生成空按钮。图片均使用相对路径，也适用于 `/hyzhang.github.io/` 子路径。

## 框图来源

- GeoLink： https://arxiv.org/abs/2604.13183 ，第 4 页 Figure 3。
- InfoGeo： https://arxiv.org/abs/2605.07099 ，第 4 页 Figure 2。
- RadarPos： https://arxiv.org/abs/2602.11196 ，第 3 页 Figure 2。
- MiKeCoCo： https://arxiv.org/abs/2407.07351 ，第 4 页 Figure 4。

图像由上述论文页面裁切得到。MiKeCoCo 公开预印本作者列表与原主页所填作者列表不同；本次保留用户提供的主页作者与接收信息，未据预印本改写。

## 本地预览

在仓库根目录运行 `python -m http.server 8765`，打开 http://localhost:8765/ 。也可直接打开 `index.html`。
