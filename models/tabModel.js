export default class tabModel {
  constructor() {
    this.listArr = [];
    this.itemArr = [];

    this.addList = function (list) {
      this.listArr.push(list);
    };

    this.addItem = function (item) {
      this.itemArr.push(item);
    };
  }
}
