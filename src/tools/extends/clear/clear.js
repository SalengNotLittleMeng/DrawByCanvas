import { addStyle } from '../../../style/addStyle';
import { BaseButtonStyleSheet } from '../../../style/baseStyle';
// 清除工具
export default {
  registered(vm) {
    const buttton = document.createElement('div');
    buttton.innerHTML = `清除`;
    addStyle(buttton, BaseButtonStyleSheet);
    buttton.onclick = function () {
      const canvas = vm.el;
      vm.ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    return buttton;
  },
};
