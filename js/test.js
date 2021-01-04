function rupTest() {

  let model = new RupModel();
  model
    .addClazz("Otra")
    .addAssociate("RUP");

  let clazzDiagram = new ClassDiagram("svg");
  clazzDiagram
    .setBorder(3, "orange")
    .setPadding(3)
    .addClazzes(model.getClazz("RUP"))
    .addClazzes(model.getClazz("Actividad").getDescendand())
    .print();
}

function load() {

  let model = new Model();
  model
    .addClazz("Cirujano")
    .addPart("Cortante")
    .addPart("Empapable")
    .addPart("Bisturí")
    .addPart("Navaja")
    .addPart("Succionador")
    .addPart("Compresa")

    .addClazz("Cortante")
    .addClazz("Empapable")

    .addClazz("Bisturí")
    .addBase("Cortante")

    .addClazz("Navaja")
    .addBase("Cortante")

    .addClazz("Succionador")
    .addBase("Empapable")

    .addClazz("Compresa")
    .addBase("Empapable");

  let clazzDiagram = new ClassDiagram("svg");
  clazzDiagram
    .setBorder(5, "orange")
    .setPadding(5)
    .addClazz(model.getClazz("Cirujano"))
    .addClazzes(model.getClazz("Cirujano").getDescendand())
    .print();

  let clazzDiagram = new ClassDiagram("svg");
  clazzDiagram
    .setBorder(5, "orange")
    .setPadding(5)
    .addClazz(model.getAllClazz())
    .print();
}


