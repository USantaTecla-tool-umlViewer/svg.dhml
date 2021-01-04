function ClassDiagram(id) {
  this.svg = document.getElementById(id);
  this.style = {
    text: {
      height: 20,
      color: "orange"
    },
    border: {
      width: 1,
      color: "orange"
    },
    padding: 1000
  };
  this.clazzes = new Set();

  this.setText = function (height, color) {
    this.style.text = { 
      "height" : height,
      "color" : color
    };
    return this;
  }

  this.setBorder = function (width, color) {
    this.style.border = { 
      "width" : width,
      "color" : color
    };
    return this;
  }

  this.setPadding = function (padding) {
    this.style.padding = padding;
    return this;
  }

  this.addClazz = function (clazz) {
    this.clazzes.add(clazz);
    return this;
  }

  this.addClazzes = function (clazzes) {
    clazzes.map(clazz => this.addClazz(clazz));
    return this;
  }

  this.removeClazz = function (clazz) {
    this.clazzes = this.clazzes.difference(new Set().add(clazz));
    return this;
  }

  this.removeClazzes = function (clazzes) {
    clazzes.map(clazz => this.removeClazz(clazz));
    return this;
  }

  this.print = function () {
    let boxes = this.clazzes.map(clazz => new ClazzesBox(clazz, this.style, this.svg));
    boxes = this.nestClassificationBoxes(boxes);
    boxes = this.nestCompositionBoxes(boxes);
    boxes = this.nestAssociationBoxes(boxes);
    let position = 200;
    for (box of boxes.items) {
      box.configure();
      box.shift();
      box.shiftH(50);
      box.shiftV(position);
      position += 200 + box.getHeight();
      box.print();
    }
  }

  this.nestClassificationBoxes = function(boxes){
    let initialRootBoxes = 
      boxes.filter(box => box.clazz.isClassificationRoot(this.getClazzes(boxes)));
    let rootBoxes = initialRootBoxes.clone();
    let notRootBoxes = boxes.difference(rootBoxes);
    while (!rootBoxes.isEmpty()){
      let nextRootBoxes = new Set();
      for (rootBox of rootBoxes.items) {
        let derivatives = rootBox.getDerivatives(notRootBoxes);
        rootBox.addDerivatives(derivatives);
        nextRootBoxes = nextRootBoxes.union(derivatives); 
        notRootBoxes = notRootBoxes.difference(derivatives);
      }
      rootBoxes = nextRootBoxes;
    }
    return initialRootBoxes.union(notRootBoxes);
  }

  this.nestCompositionBoxes = function(boxes){
    let initialRootBoxes = 
      boxes.filter(box => box.clazz.isCompositionRoot(this.getClazzes(boxes)));
    let rootBoxes = initialRootBoxes.clone();
    let notRootBoxes = boxes.difference(rootBoxes);
    while (!rootBoxes.isEmpty()){
      let nextRootBoxes = new Set();
      for (rootBox of rootBoxes.items) {
        let derivatives = rootBox.getParts(notRootBoxes);
        rootBox.addParts(derivatives);
        nextRootBoxes = nextRootBoxes.union(derivatives); 
        notRootBoxes = notRootBoxes.difference(derivatives);
      }
      rootBoxes = nextRootBoxes;
    }
    return initialRootBoxes.union(notRootBoxes);
  }

  this.nestAssociationBoxes = function(boxes){
    let initialRootBoxes = 
      boxes.filter(box => box.clazz.isAssociationRoot(this.getClazzes(boxes)));
    let rootBoxes = initialRootBoxes.clone();
    let notRootBoxes = boxes.difference(rootBoxes);
    while (!rootBoxes.isEmpty()){
      let nextRootBoxes = new Set();
      for (rootBox of rootBoxes.items) {
        let derivatives = rootBox.getAssociates(notRootBoxes);
        rootBox.addAssociates(derivatives);
        nextRootBoxes = nextRootBoxes.union(derivatives); 
        notRootBoxes = notRootBoxes.difference(derivatives);
      }
      rootBoxes = nextRootBoxes;
    }
    return initialRootBoxes.union(notRootBoxes);
  }

  this.getClazzes = function(boxes){
    return boxes.map(box => box.clazz);
  }

}