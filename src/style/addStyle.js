// 给节点添加CSS属性
export function addStyle(el, styleSheet) {
  Object.keys(styleSheet).forEach((key) => {
    el.style[key] = styleSheet[key];
  });
}
