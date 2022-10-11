# DynamicTheme
高度兼容低版本的 antd 的动态主题方案

本项目用于存放一些动态主题的具体实现代码，方便大家自行取用

## 运行
```
npm run dev
```

## 关键命令
- 从 `Less Variables` 转换成 `CSS Variables`。
```
lessc --js --modify-var="ant-prefix=custom" antd/dist/antd.variable.less modified.css
```



