function Model() {
  this.clazzes = [];
  this.activeClazz = null;

  this.getClazz = function (clazzName) {
    let clazz = this.clazzes.find(clazz => clazz.name == clazzName);
    if (clazz == null) {
      clazz = new Unit(clazzName);
      this.clazzes.push(clazz);
    }
    return clazz;
  }

  this.getAllClazzes = function () {
    return this.clazzes;
  }

  this.addClazz = function (clazzName) {
    this.activeClazz = this.getClazz(clazzName);
    return this;
  }

  this.addBase = function (baseName) {
    this.activeClazz.addBase(this.getClazz(baseName));
    return this;
  }

  this.addPart = function (partName) {
    this.activeClazz.addPart(this.getClazz(partName));
    return this;
  }

  this.addElement = function (elementName) {
    this.activeClazz.addElement(this.getClazz(elementName));
    return this;
  }

  this.addAssociate = function (associateName) {
    this.activeClazz.addAssociate(this.getClazz(associateName));
    return this;
  }

  this.addUsed = function (usedName) {
    this.activeClazz.addUsed(this.getClazz(usedName));
    return this;
  }

}