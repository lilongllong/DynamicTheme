# DynamicTheme
高度兼容低版本的 antd 的动态主题方案

本项目用于存放一些动态主题的具体实现代码，方便大家自行取用

本项目需要配合文章一起学习更佳。

文章地址：[高度兼容低版本的 antd 的动态主题方案](https://juejin.cn/post/7152017335418224648)，欢迎大家点赞ღ( ´･ᴗ･` )比心

## 运行
```
npm run dev
```

## 关键命令
- 从 `Less Variables` 转换成 `CSS Variables`。
```
lessc --js --modify-var="ant-prefix=custom" antd/dist/antd.variable.less modified.css
```



