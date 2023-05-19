// 目前仅考虑各种状态互斥的情况，之后可以考虑添加到多种状态共存
// 工具栏状态管理工具
class ToolState {
  constructor() {
    this.statePool = {};
    this.stateCopy = {};
  }
  addState(name, initValue) {
    if (this.statePool[name]) {
      return;
    }
    this.statePool[name] = initValue;
    this.stateCopy[name] = initValue;
  }
  initState() {
    Object.keys(this.stateCopy).forEach((key) => {
      this.statePool[key] = this.stateCopy[key];
    });
  }
  setState(name, value) {
    this.initState();
    this.statePool[name] = value;
  }
  getState(name) {
    return this.statePool[name];
  }
}

export default new ToolState();
