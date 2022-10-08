const postcss = require('postcss');

module.exports = postcss.plugin('postcss-add-css-prefix', function(opts = {}) {
  const {
    prefix = 'industryAnt'
  } = opts

  // 接收两个参数，第一个是每个css文件的ast，第二个参数中可获取转换结果相关信息(包括当前css文件相关信息)
  function plugin(css, result) {
    if (!prefix) return; // 没传入prefix，不执行下面的逻辑
    css.walkRules(rule => { // 遍历当前ast所有rule节点
      const {
        selector
      } = rule;
      // 只有当节点是ast根节点直属子节点时才添加前缀
      // 简单做了容错处理，只要带有根选择器的都不添加前缀，本身带有前缀了也不添加
      // 加了个flag，防止节点更新后重复执行该逻辑进入死循环
      if (rule.parent.type === 'root' && selector.indexOf('.ant-') >= 0 && selector.indexOf(`${prefix}-`) < 0 && !rule.flag) {
        rule.flag = true
        const clone = rule.clone();
        // const newSelector = selector.split(' ').map(item => item.replace('.ant-', `.${prefix}-`)).join(' ');
        clone.selector = selector.split(' ').map(item => item.replace('.ant-', `.${prefix}-`)).join(' ');
        rule.replaceWith(clone)
      }
    })
  }

  return plugin
})
