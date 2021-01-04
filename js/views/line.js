function Line(origin, target, svg, style){
  this.origin = origin;
  this.target = target;
  this.svg = svg;
  this.lineNode = document.createElementNS("http://www.w3.org/2000/svg", "line");

  this.style = {
    border : {
      width: 1,
      color: "black"
    }
  };

  this.print = function(){
    this.lineNode.style.strokeWidth = style.border.width + "px";
    this.lineNode.style.stroke = style.border.color;
    this.lineNode.setAttributeNS(null, "x1", this.origin.x + "px");
    this.lineNode.setAttributeNS(null, "y1", this.origin.y + "px");
    this.lineNode.setAttributeNS(null, "x2", this.target.x + "px");
    this.lineNode.setAttributeNS(null, "y2", this.target.y + "px");
    this.svg.appendChild(this.lineNode);
  }

}