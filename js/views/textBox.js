function TextBox(text, svg) {
  this.text = text;
  this.svg = svg;
    
  this.style = {
    text : {
      height : 20,
      color : "white"
    },
    border : {
      width: 1,
      color: "black"
    },
    padding : 3
  };

  this.rectNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  this.textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
  this.spanNodes = [];

  this.configure = function(style){
    this.style.text.height = style.text.height;
    this.style.text.color = style.text.color;
    let texts = this.text.split(" ");
    this.textNode.setAttribute("font-size", this.style.text.height);
    this.textNode.setAttribute("fill", this.style.text.color);
    for(let i=0; i<texts.length; i++){
      this.spanNodes.push(document.createElementNS("http://www.w3.org/2000/svg", "tspan"));
      let text = document.createTextNode(texts[i]);
      this.spanNodes[i].appendChild(text); 
      this.textNode.appendChild(this.spanNodes[i]); 
    }
    this.svg.appendChild(this.textNode);
    
    this.style.border.width = style.border.width;
    this.style.border.color = style.border.color;
    this.style.padding = style.padding;
    this.svg.appendChild(this.rectNode);
  }

  this.getHeight = function(){
    let result = 2*(this.style.border.width + this.style.padding) + this.style.text.height; 
    result += this.style.text.height*(this.spanNodes.length-1);
    return result;
  }

  this.getWidth = function(){
    let result = 2*(this.style.border.width + this.style.padding);
    let maxWidth = 0;
    for(spanNode of this.spanNodes){
      let width = spanNode.getComputedTextLength();
      if (maxWidth < width){
        maxWidth = width;
      }
    }
    return  result + maxWidth;
  }

  this.position = {
    x : 0,
    y : 0
  }
  
  this.shiftH = function(x){
    this.position.x += x;
  }
 
  this.shiftV = function(y){
    this.position.y += y;
  }

  this.print = function () {
    this.textNode.setAttribute("x", 
      (this.position.x + this.style.border.width + this.style.padding) + "px");
    this.textNode.setAttribute("y", 
      (this.position.y + this.style.border.width + this.style.padding + this.style.text.height*0.9) + "px");
    let height = this.style.text.height*0.9;
    for(spanNode of this.spanNodes){
      spanNode.setAttribute("x", 
        (this.position.x + this.style.border.width + this.style.padding) + "px");
      spanNode.setAttribute("y", 
        (this.position.y + this.style.border.width + this.style.padding + height) + "px");
      height += this.style.text.height*0.9;
    }
    this.rectNode.style.stroke = this.style.border.color;
    this.rectNode.style.strokeWidth = this.style.border.width + "px";
    this.rectNode.style.fill = "none";
    this.rectNode.setAttributeNS(null, "x", this.position.x + "px");
    this.rectNode.setAttributeNS(null, "y", this.position.y + "px");
    this.rectNode.setAttributeNS(null, "width", this.getWidth() + "px");
    this.rectNode.setAttributeNS(null, "height", this.getHeight() + "px");
    return this;
  }

  this.getCoordinate = function(direction){
    let coordinate = new Coordinate(this.position.x, this.position.y);
    coordinate.shiftH(this.getWidth()/2);
    if (direction == "bottom"){
      coordinate.shiftV(this.getHeight());
    }
    return coordinate;
  }
}