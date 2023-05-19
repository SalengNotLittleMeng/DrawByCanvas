import { addStyle } from '../../../style/addStyle';
import { BaseButtonStyleSheet } from '../../../style/baseStyle';
import statePool from '../../state/toolState';
// 画笔工具
export default {
  registered(vm) {
    const buttton = document.createElement('div');
    buttton.innerHTML = `画笔`;
    addStyle(buttton, BaseButtonStyleSheet);
    buttton.onclick = function () {
      statePool.initState();
    };
    return buttton;
  },
};
