import { toolUiStyleSheet } from '../style/toolStyle';
import { addStyle } from '../style/addStyle';
import defaultExtends from './extends/index';
// 工具栏
// 这里使用扩展机制，利用扩展将各个工具进行解耦
export default class Tools {
  constructor(root, vm) {
    this.root = root;
    this.extendsList = [];
    this.registerExtend(vm);
    this.toolUi = document.createElement('div');
    addStyle(this.toolUi, toolUiStyleSheet);
    this.render();
  }
  render() {
    this.extendsList.forEach((extend) => {
      this.toolUi.appendChild(extend);
    });
    this.root.appendChild(this.toolUi);
  }
  // 注册所有默认的功能扩展
  registerExtend(vm) {
    Object.keys(defaultExtends).forEach((extend) => {
      this.extendsList.push(defaultExtends[extend].registered(vm));
    });
  }
}
