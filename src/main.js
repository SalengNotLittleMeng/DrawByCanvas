import DrawBoard from './board/index';
import DrawEvent from './event/drawEvent';
import Tools from './tools/index';
export default class Draw {
  constructor(options) {
    this.options = options;
    this.root = null;
    this.el = null;
    this.ctx = null;
    this.tools = null;
    this.drawEvent = null;
    this.initCtx();
    this.initDrawBoard();
    this.initDrawEvent();
    this.initTools();
  }
  // 初始化上下文
  initCtx() {
    const ElName = this.options.el;
    this.root = document.querySelector(ElName);
    this.el = document.createElement('canvas');
    this.root.appendChild(this.el);
    this.ctx = this.el.getContext('2d');
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;
    this.el.width = pageWidth;
    this.el.height = pageHeight;
  }
  // 初始化画板，之后需要在这里处理鼠标和画面的偏移问题
  initDrawBoard() {
    // this.drawBoard = new DrawBoard(this.options);
  }
  // 初始化绘制事件
  initDrawEvent() {
    this.drawEvent = new DrawEvent(this.el, this.ctx);
  }
  // 初始化工具栏
  initTools() {
    this.tools = new Tools(this.root, this);
  }
}
