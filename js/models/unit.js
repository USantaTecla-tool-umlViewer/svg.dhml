function Unit(name) {
  this.name = name;
  //TODO pasar a conjuntos
  this.bases = [];
  this.derivatives = [];
  this.parts = [];
  this.wholes = [];
  this.elements = [];
  this.aggregates = [];
  this.associates = [];
  this.associatesOf = [];
  this.useds = [];
  this.usedsBy = [];

  this.getName = function () {
    return this.name;
  }

  this.isClassificationRoot = function (units) {
    return this.bases.filter(unit => units.contains(unit)).length == 0;
  }

  this.isCompositionRoot = function (units) {
    return this.wholes.filter(unit => units.contains(unit)).length == 0;
  }

  this.isAssociationRoot = function (units) {
    return this.associatesOf.filter(unit => units.contains(unit)).length == 0;
  }

  this.isDerivative = function (unit) {
    for (clazz of this.bases) {
      if (clazz === unit) {
        return true;
      }
    }
    return false;
  }

  this.isPart = function (unit) {
    for (clazz of this.parts) {
      if (clazz === unit) {
        return true;
      }
    }
    return false;
  }

  this.isElement = function (unit) {
    for (clazz of this.elements) {
      if (clazz === unit) {
        return true;
      }
    }
    return false;
  }

  this.isAssociate = function (unit) {
    for (clazz of this.associates) {
      if (clazz === unit) {
        return true;
      }
    }
    return false;
  }

  this.getDerivativesDescendand = function () {
    let derivatives = new Set();
    if (this.derivatives.length > 0) {
      for (derivative of this.derivatives) {
        derivatives.add(derivative);
        derivatives = derivatives.union(derivative.getDerivativesDescendand());
      }
    }
    return derivatives;
  }

  this.getPartsDescendand = function () {
    let parts = new Set();
    if (this.parts.length > 0) {
      for (part of this.parts) {
        parts.add(part);
        parts = parts.union(part.getPartsDescendand());
      }
    }
    return parts;
  }

  this.getElementsDescendand = function () {
    let elements = new Set();
    if (this.elements.length > 0) {
      for (element of this.elements) {
        elements.add(element);
        elements = elements.union(element.getElementsDescendand());
      }
    }
    return elements;
  }

  this.getAssociatesDescendand = function () {
    let associates = new Set();
    if (this.associates.length > 0) {
      for (associate of this.associates) {
        associates.add(associate);
        associates = associates.union(associate.getAssociatesDescendand());
      }
    }
    return associates;
  }

  this.getUsedsDescendand = function () {
    let useds = new Set();
    if (this.useds.length > 0) {
      for (used of this.useds) {
        useds.add(used);
        useds = used.union(associate.getUsedsDescendand());
      }
    }
    return useds;
  }

  this.getDescendand = function () {
    let descendands = this.getDerivativesDescendand().union(
      this.getPartsDescendand().union(
      this.getElementsDescendand().union(
      this.getAssociatesDescendand().union(
      this.getUsedsDescendand()))));
    for(let descendand of descendands.items){
      descendands = descendands.union(descendand.getDescendand());
    }
    return descendands;
  }

  this.addBase = function (baseUnit) {
    this.bases.push(baseUnit);
    baseUnit.derivatives.push(this);
  }

  this.addPart = function (partUnit) {
    this.parts.push(partUnit);
    partUnit.wholes.push(this);
  }

  this.addElement = function (elementUnit) {
    this.elements.push(elementUnit);
    elementUnit.aggregates.push(this);
  }

  this.addAssociate = function (associateUnit) {
    this.associates.push(associateUnit);
    associateUnit.associatesOf.push(this);
  }

  this.addUsed = function (usedUnit) {
    this.useds.push(usedUnit);
    usedUnit.usedsBy.push(this);
  }

}