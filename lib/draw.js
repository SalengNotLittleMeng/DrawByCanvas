class p {
  constructor(t, e) {
    this.cavans = t, this.ctx = e, this.painting = !1, this.lastPoint = { x: void 0, y: void 0 }, this.initDrawEvent(), this.eventHookPool = {};
  }
  initDrawEvent() {
    const t = this.cavans, e = this.ctx, o = this;
    t.onmousedown = function(n) {
      this.painting = !0;
      let s = n.clientX, l = n.clientY;
      this.lastPoint = { x: s, y: l }, x(e, s, l, 2), o.emitEventHook("mousedown");
    }, t.onmousemove = function(n) {
      if (this.painting) {
        let s = n.clientX, l = n.clientY, a = { x: s, y: l };
        o.drawLine(this.lastPoint.x, this.lastPoint.y, a.x, a.y), this.lastPoint = a;
      }
      o.emitEventHook("mousemove");
    }, t.onmouseup = function() {
      this.painting = !1, o.emitEventHook("mouseup");
    };
  }
  // 注册新的绘制中事件
  appendEventHook(t, e) {
    this.eventHookPool[t] ? this.eventHookPool[t].push(e) : this.eventHookPool[t] = [e];
  }
  // 熔断钩子，执行对应的事件
  emitEventHook(t, ...e) {
    if (this.eventHookPool[t])
      return this.eventHookPool[t].every((o) => o.call(this, ...e));
  }
  // 绘制线条
  drawLine(t, e, o, n) {
    this.ctx.lineWidth = 3, this.ctx.lineCap = "round", this.ctx.lineJoin = "round", this.emitEventHook("drawline", t, e, o, n) && (this.ctx.moveTo(t, e), this.ctx.lineTo(o, n), this.ctx.stroke(), this.ctx.closePath());
  }
}
function x(i, t, e, o) {
  i.save(), i.beginPath(), i.arc(t, e, o, 0, Math.PI * 2), i.fill();
}
const v = {
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  width: "300px",
  padding: "20px",
  height: "100vh",
  background: "#888"
};
function r(i, t) {
  Object.keys(t).forEach((e) => {
    i.style[e] = t[e];
  });
}
const c = {
  width: "60px",
  lineHeight: "30px",
  height: "30px",
  background: "white",
  textAlign: "center",
  borderRadius: "6px",
  cursor: "default"
};
class E {
  constructor() {
    this.statePool = {}, this.stateCopy = {};
  }
  addState(t, e) {
    this.statePool[t] || (this.statePool[t] = e, this.stateCopy[t] = e);
  }
  initState() {
    Object.keys(this.stateCopy).forEach((t) => {
      this.statePool[t] = this.stateCopy[t];
    });
  }
  setState(t, e) {
    this.initState(), this.statePool[t] = e;
  }
  getState(t) {
    return this.statePool[t];
  }
}
const h = new E();
h.addState("isRubber", !1);
const f = {
  /*  */
  registered(i) {
    const t = document.createElement("div");
    t.innerHTML = "橡皮", r(t, c);
    const e = i.ctx, o = i.el, n = function(s, l, a, u) {
      return h.getState("isRubber") ? (e.save(), e.globalCompositeOperation = "destination-out", e.moveTo(s, l), e.lineTo(a, u), e.stroke(), e.closePath(), e.clip(), e.clearRect(0, 0, o.width, o.height), e.restore(), !1) : !0;
    };
    return i.drawEvent.appendEventHook("drawline", n), i.drawEvent.appendEventHook("mousedown", n), t.onclick = function() {
      h.setState("isRubber", !0);
    }, t;
  }
}, g = {
  registered(i) {
    const t = document.createElement("div");
    return t.innerHTML = "清除", r(t, c), t.onclick = function() {
      const e = i.el;
      i.ctx.clearRect(0, 0, e.width, e.height);
    }, t;
  }
}, m = {
  registered(i) {
    const t = document.createElement("div");
    return t.innerHTML = "画笔", r(t, c), t.onclick = function() {
      h.initState();
    }, t;
  }
}, d = {
  paint: m,
  rubber: f,
  clear: g
};
class w {
  constructor(t, e) {
    this.root = t, this.extendsList = [], this.registerExtend(e), this.toolUi = document.createElement("div"), r(this.toolUi, v), this.render();
  }
  render() {
    this.extendsList.forEach((t) => {
      this.toolUi.appendChild(t);
    }), this.root.appendChild(this.toolUi);
  }
  // 注册所有默认的功能扩展
  registerExtend(t) {
    Object.keys(d).forEach((e) => {
      this.extendsList.push(d[e].registered(t));
    });
  }
}
class b {
  constructor(t) {
    this.options = t, this.root = null, this.el = null, this.ctx = null, this.tools = null, this.drawEvent = null, this.initCtx(), this.initDrawBoard(), this.initDrawEvent(), this.initTools();
  }
  // 初始化上下文
  initCtx() {
    const t = this.options.el;
    this.root = document.querySelector(t), this.el = document.createElement("canvas"), this.root.appendChild(this.el), this.ctx = this.el.getContext("2d");
    let e = document.documentElement.clientWidth, o = document.documentElement.clientHeight;
    this.el.width = e, this.el.height = o;
  }
  // 初始化画板，之后需要在这里处理鼠标和画面的偏移问题
  initDrawBoard() {
  }
  // 初始化绘制事件
  initDrawEvent() {
    this.drawEvent = new p(this.el, this.ctx);
  }
  // 初始化工具栏
  initTools() {
    this.tools = new w(this.root, this);
  }
}
export {
  b as default
};
//# sourceMappingURL=draw.js.map
