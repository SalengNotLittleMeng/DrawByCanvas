// 绘制事件
export default class DrawEvent {
  constructor(cavansEl, ctx) {
    this.cavans = cavansEl;
    this.ctx = ctx;
    // 是否正在绘制中
    this.painting = false;
    // 保存上一次的绘制点位
    this.lastPoint = { x: undefined, y: undefined };
    this.initDrawEvent();
    // 事件池
    this.eventHookPool = {};
  }
  initDrawEvent() {
    const canvas = this.cavans;
    const ctx = this.ctx;
    const vm = this;
    //鼠标按下事件
    canvas.onmousedown = function (e) {
      this.painting = true;
      let x = e.clientX;
      let y = e.clientY;
      this.lastPoint = { x: x, y: y };
      drawCircle(ctx, x, y, 2);
      vm.emitEventHook('mousedown');
    };

    //鼠标移动事件
    canvas.onmousemove = function (e) {
      if (this.painting) {
        let x = e.clientX;
        let y = e.clientY;
        let newPoint = { x: x, y: y };
        vm.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y);
        this.lastPoint = newPoint;
      }
      vm.emitEventHook('mousemove');
    };

    //鼠标松开事件
    canvas.onmouseup = function () {
      this.painting = false;
      vm.emitEventHook('mouseup');
    };
  }
  // 注册新的绘制中事件
  appendEventHook(event, callback) {
    if (this.eventHookPool[event]) {
      this.eventHookPool[event].push(callback);
    } else {
      this.eventHookPool[event] = [callback];
    }
  }
  // 熔断钩子，执行对应的事件
  emitEventHook(event, ...params) {
    if (this.eventHookPool[event]) {
      return this.eventHookPool[event].every((cb) => {
        return cb.call(this, ...params);
      });
    }
  }
  // 绘制线条
  drawLine(x1, y1, x2, y2) {
    // 初始化线条，之后会做抽离
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    // 利用熔断决定是否之后后续的绘制
    if (!this.emitEventHook('drawline', x1, y1, x2, y2)) {
      return;
    }
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

// 绘制像素点
function drawCircle(ctx, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
