function ClazzesBox(clazz, style, svg){
  this.clazz = clazz;
  this.svg = svg;
  this.textBox = new TextBox(clazz.getName(), this.svg);
  this.style = style;
  this.topLeft = new Coordinate(0,0);
  this.derivatives = new Set();
  this.parts = new Set();
  this.associates = new Set();
  this.padding = new Coordinate(30, 90);

  this.addDerivatives = function(boxes){
    this.derivatives = this.derivatives.union(boxes);
  }

  this.addParts = function(boxes){
    this.parts = this.parts.union(boxes);
  }

  this.addAssociates = function(boxes){
    this.associates = this.associates.union(boxes);
  }
  
  this.getDerivatives = function(boxes){
    return boxes.filter(box => box.clazz.isDerivative(this.clazz));
  }

  this.getParts = function(boxes){
    return boxes.filter(box => this.clazz.isPart(box.clazz));
  }

  this.getAssociates = function(boxes){
    return boxes.filter(box => this.clazz.isAssociate(box.clazz));
  }

  this.configure = function(){
    this.mapEferents(box => box.configure());
    this.textBox.configure(this.style);
  }

  this.mapEferents = function(operation){
    this.parts.map(operation);
    this.derivatives.map(operation);
    this.associates.map(operation);
  }

  this.shift = function(){
    this.mapEferents(box => box.shift());
    this.shiftHDescendant();
    this.shiftVDescendant();
  }

  this.shiftVDescendant = function(){
    let height = this.textBox.getHeight() + this.padding.y;
    this.parts.map(box => box.shiftV(height));
    if (this.hasPartsPadding()){
      this.derivatives.map(box => box.shiftV(this.padding.y/2));
    }
    this.derivatives.map(box => box.shiftV(height));
    if (this.hasAssociatePadding()){
      this.associates.map(box => box.shiftV(this.padding.y/2));
    }
    this.associates.map(box => box.shiftV(height));
  }

  this.shiftHDescendant = function(){
    let shift = this.shiftComposition();
    if (this.hasPartsPadding()){
      shift += 2*this.padding.x;
    } 
    shift = this.shiftClassification(shift);
    if (shift > this.textBox.getWidth()){
      this.textBox.shiftH((shift - this.textBox.getWidth())/2);
    } else {
      this.mapEferents(box => box.shiftH((this.textBox.getWidth()-shift)/2));
    }
    if (this.hasAssociatePadding()){
      shift += 2*this.padding.x;
    }
    this.shiftAssociation(shift);
  }

  this.hasPartsPadding = function(){
    return !this.derivatives.isEmpty() && !this.parts.isEmpty();
  }

  this.hasAssociatePadding = function(){
    return (!this.derivatives.isEmpty() || !this.parts.isEmpty()) && !this.associates.isEmpty()
  }

  this.shiftComposition = function(){
    if (this.parts.isEmpty()){
      return 0;
    }
    let shift = 0;
    for(let part of this.parts.items){
      part.shiftH(shift);
      shift += part.getWidth() + this.padding.x;
    }
    return shift - this.padding.x;
  }

  this.shiftClassification = function(shift){
    if (this.derivatives.isEmpty()){
      return shift;
    }
    for(let derivative of this.derivatives.items){
      derivative.shiftH(shift);
      shift += derivative.getWidth() + this.padding.x;
    }
    return shift - this.padding.x;
  }

  this.shiftAssociation = function(shift){
    if (!this.associates.isEmpty()){
      shift = this.textBox.getWidth() + this.padding.x;
      for(let associate of this.associates.items){
        associate.shiftH(shift);
        shift += associate.getWidth() + this.padding.x;
      }
    }
  }

  this.shiftH = function(shift){
    this.mapEferents(box => box.shiftH(shift));
    this.textBox.shiftH(shift);
    this.topLeft.shiftH(shift);
  }

  this.shiftV = function(shift){
    this.mapEferents(box => box.shiftV(shift));
    this.textBox.shiftV(shift);
    this.topLeft.shiftV(shift);
  }

  this.getWidth = function(){
    return Math.max(
      this.textBox.getWidth(), 
      this.getWidthParts() + this.getWidthDerivatives() + this.getWidhAssociations());
  }

  this.getWidthParts = function(){
    if (this.parts.isEmpty()){
      return 0;
    }
    let width = - this.padding.x;
    for(let part of this.parts.items){
      width += part.getWidth() + this.padding.x;
    }
    return width;
  }

  this.getWidthDerivatives = function(){
    if (this.derivatives.isEmpty()){
      return 0;
    }
    let width = - this.padding.x;
    for(let derivative of this.derivatives.items){
      width += derivative.getWidth() + this.padding.x;
    }
    if (!this.parts.isEmpty()){
      width += 2*this.padding.x;
    }
    return width;
  }

  this.getWidhAssociations = function(){
    if (this.associates.isEmpty()){
      return 0;
    }
    let width = - this.padding.x;
    for(let associate of this.associates.items){
      width += associate.getWidth() + this.padding.x;
    }
    if (!this.associates.isEmpty()){
      width += this.textBox.getWidth() + 2*this.padding.x;
    }
    return width;
  }

  this.getHeight = function(){
    let maxHeightComposition = this.getHeightParts();
    let maxHeightDerivative = this.getHeightDerivatives();
    let maxHeightAssociation = this.getHeightAssociations();
    let height = this.textBox.getHeight();
    if (maxHeightComposition >= maxHeightDerivative 
        && maxHeightComposition >= maxHeightAssociation){
      height += maxHeightComposition;
    } else if (maxHeightDerivative > maxHeightComposition 
              && maxHeightDerivative > maxHeightAssociation) {
      height += maxHeightDerivative;
    } else {
      height += maxHeightAssociation;
    }
    return height;
  }

  this.getHeightParts = function(){
    if (this.parts.isEmpty()){
      return 0;
    }
    let maxHeight = 0;
    for(let part of this.parts.items){
      if (maxHeight < part.getHeight()){
        maxHeight = part.getHeight();
      }
    }
    return maxHeight + this.padding.y;
  }

  this.getHeightDerivatives = function(){
    if (this.derivatives.isEmpty()){
      return 0;
    }
    let maxHeight = 0;
    for(let derivative of this.derivatives.items){
      if (maxHeight < derivative.getHeight()){
        maxHeight = derivative.getHeight();
      }
    }   
    if (this.hasPartsPadding()){
      maxHeight += this.padding.y/2;
    }
    return maxHeight + this.padding.y;
  }

  this.getHeightAssociations = function(){
    if (this.associates.isEmpty()){
      return 0;
    }
    let maxHeight = 0;
    for(let associate of this.associates.items){
      if (maxHeight < associate.getHeight()){
        maxHeight = associate.getHeight();
      }
    }   
    if (!this.parts.isEmpty()){
      maxHeight += this.padding.y/2;
    }
    if (!this.derivatives.isEmpty()){
      maxHeight += this.padding.y/2;
    }
    return maxHeight + this.padding.y;
  }
  
  this.print = function(marginLeft, marginTop){
    this.mapEferents(box => box.print());
    this.printCompositions();
    this.printClassifications();
    this.printAssociations();
    this.textBox.print();
    this.printFrame();
  }

  this.printCompositions = function(){
    if (!this.parts.isEmpty()){
      let origin = this.textBox.getCoordinate("bottom");
      if (!this.derivatives.isEmpty()){
        origin.shiftH(-this.padding.y/3);
      }
      let right = origin.clone().shiftV(this.padding.y/6).shiftH(this.padding.y/3/2);
      new Line(origin, right, this.svg, this.style).print();
      let left = right.clone().shiftH(-this.padding.y/6).shiftH(-this.padding.y/3/2);
      new Line(origin, left, this.svg, this.style).print();
      let bottom = origin.clone().shiftV(this.padding.y/3);
      new Line(right, bottom, this.svg, this.style).print();
      new Line(left, bottom, this.svg, this.style).print();
      origin.shiftV(this.padding.y/3);
      let originBottom = origin.clone().shiftV(this.padding.y/3);
      new Line(origin, originBottom, this.svg, this.style).print();
      let previousTargetTop = null;
      for(let part of this.parts.items){
        let target = part.textBox.getCoordinate("top");
        let targetTop = target.clone().shiftV(-this.padding.y/3);
        new Line(target, targetTop, this.svg, this.style).print();
        if (previousTargetTop != null){
          new Line(previousTargetTop, targetTop, this.svg, this.style).print();
        }
        previousTargetTop = targetTop;
      }
      if (this.parts.items.length == 1){
        let target = this.parts.items[0].textBox.getCoordinate("top");
        let targetTop = target.shiftV(-this.padding.y/3);
        new Line(originBottom, targetTop, this.svg, this.style).print();
      }
    }
  }

  this.printClassifications = function(){
    if (!this.derivatives.isEmpty()){
      let origin = this.textBox.getCoordinate("bottom");
      if (!this.parts.isEmpty()){
        origin.shiftH(this.padding.y/3);
      }
      let right = origin.clone().shiftV(this.padding.y/3).shiftH(this.padding.y/3/2);
      new Line(origin, right, this.svg, this.style).print();
      let left = right.clone().shiftH(-this.padding.y/3);
      new Line(right, left, this.svg, this.style).print();
      new Line(left, origin, this.svg, this.style).print();
      origin.shiftV(this.padding.y/3);
      let originBottom = origin.clone().shiftV(this.padding.y/3);
      if (!this.parts.isEmpty()){
        originBottom.shiftV(this.padding.y/2);
      }
      new Line(origin, originBottom, this.svg, this.style).print();
      let previousTargetTop = null;
      for(derivative of this.derivatives.items){
        let target = derivative.textBox.getCoordinate("top");
        let targetTop = target.clone().shiftV(-this.padding.y/3);
        new Line(target, targetTop, this.svg, this.style).print();
        if (previousTargetTop != null){
          new Line(previousTargetTop, targetTop, this.svg, this.style).print();
        }
        previousTargetTop = targetTop;
      }
      if (this.derivatives.items.length == 1){
        let target = this.derivatives.items[0].textBox.getCoordinate("top");
        let targetTop = target.shiftV(-this.padding.y/3);
        new Line(originBottom, targetTop, this.svg, this.style).print();
      }
    }
  }

  this.printAssociations = function(){
    if (!this.associates.isEmpty()){
      let origin = this.textBox.getCoordinate("bottom");
      if (!this.derivatives.isEmpty()){
        origin.shiftH(-this.padding.y/3);
      }
      let previousTargetTop = null;
      for(let part of this.parts.items){
        let target = part.textBox.getCoordinate("top");
        let targetTop = target.clone().shiftV(-this.padding.y/3);
        new Line(target, targetTop, this.svg, this.style).print();
        if (previousTargetTop != null){
          new Line(previousTargetTop, targetTop, this.svg, this.style).print();
        }
        previousTargetTop = targetTop;
      }
      if (this.parts.items.length == 1){
        let target = this.parts.items[0].textBox.getCoordinate("top");
        let targetTop = target.shiftV(-this.padding.y/3);
        new Line(originBottom, targetTop, this.svg, this.style).print();
      }
    }
  }

  this.printFrame = function(){
    let style = {
      border: {
        width: 1,
        color: "red"
      }
    };
    let topRight = this.topLeft.clone().shiftH(this.getWidth());
    let bottomLeft = this.topLeft.clone().shiftV(this.getHeight());
    let bottomRight = bottomLeft.clone().shiftH(this.getWidth());
    new Line(this.topLeft, topRight, this.svg, style).print();
    new Line(topRight, bottomRight, this.svg, style).print();
    new Line(bottomRight, bottomLeft, this.svg, style).print();
    new Line(bottomLeft, this.topLeft, this.svg, style).print();
  }

}