function Set(items = []) {
  this.items = items;

  this.add = function (item) {
    if (!this.contains(item)) {
      this.items.push(item);
    }
    return this;
  }

  this.contains = function (item) {
    return this.items.find(object => object === item);
  }

  this.isEmpty = function () {
    return this.items.length == 0;
  }

  this.intersect = function (set) {
    let result = [];
    for (item of this.items) {
      if (set.contains(item)) {
        return true;
      }
    }
    return false;
  }

  this.intersection = function (set) {
    let result = new Set();
    for (item of this.items) {
      if (set.contains(item)) {
        result.add(item);
      }
    }
    return result;
  }

  this.union = function (set) {
    let result = new Set();
    for (item of this.items) {
      result.add(item);
    }
    for (item of set.items) {
      result.add(item);
    }
    return result;
  }

  this.difference = function (set) {
    let result = new Set();
    for (item of this.items) {
      if (!set.contains(item)) {
        result.add(item);
      }
    }
    return result;
  }

  this.clone = function () {
    let result = new Set();
    for (item of this.items) {
      result.add(item);
    }
    return result;
  }

  this.filter = function (test) {
    let result = new Set();
    result.items = this.items.filter(test);
    return result;
  }

  this.map = function (callback) {
    let result = new Set();
    result.items = this.items.map(callback);
    return result;
  }

}