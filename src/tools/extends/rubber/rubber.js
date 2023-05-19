import { addStyle } from '../../../style/addStyle';
import { BaseButtonStyleSheet } from '../../../style/baseStyle';
import statePool from '../../state/toolState';
// 注册新的工具状态
statePool.addState('isRubber', false);
// 橡皮檫工具
export default {
  /*  */
  registered(vm) {
    // 初始化UI
    const buttton = document.createElement('div');
    buttton.innerHTML = `橡皮`;
    addStyle(buttton, BaseButtonStyleSheet);
    const ctx = vm.ctx;
    const canvas = vm.el;
    const callBack = function (x1, y1, x2, y2) {
      if (statePool.getState('isRubber')) {
        // 利用canvas的裁剪实现擦除功能
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        return false;
      }
      return true;
    };
    // 添加到绘制事件中的钩子上
    vm.drawEvent.appendEventHook('drawline', callBack);
    vm.drawEvent.appendEventHook('mousedown', callBack);
    // 添加点击事件，更改工具状态
    buttton.onclick = function () {
      statePool.setState('isRubber', true);
    };
    return buttton;
  },
};
