function RupModel(){
  let model = new Model();

  model
    .addClazz("Otra")
    .addAssociate("RUP")

    .addClazz("RUP")
    .addBase("Método de Desarrollo Software")
    .addPart("Rol")
    .addPart("Fase", "4")
    .addPart("Artefacto") 
    
    .addClazz("Analista")
    .addBase("Rol")

    .addClazz("Arquitecto")
    .addBase("Rol")

    .addClazz("Especificador de Casos de Uso")
    .addBase("Rol")

    .addClazz("Diseñador del Prototipo de Interfaz")
    .addBase("Rol")

    .addClazz("Ingeniero de Casos de Uso")
    .addBase("Rol")

    .addClazz("Ingeniero de Componentes")
    .addBase("Rol")

    .addClazz("Ingeniero de Pruebas")
    .addBase("Rol")

    .addClazz("Integrador de Sistemas")
    .addBase("Rol")

    .addClazz("Ingeniero de Pruebas de Integración")
    .addBase("Rol")

    .addClazz("Ingeniero de Pruebas de Sistema")
    .addBase("Rol")

    .addClazz("Fase")
    .addPart("Iteración")

    .addClazz("Inicio")
    .addBase("Fase")

    .addClazz("Elaboración")
    .addBase("Fase")

    .addClazz("Construcción")
    .addBase("Fase")

    .addClazz("Transición")
    .addBase("Fase")

    .addClazz("Iteración")
    .addPart("Disciplina")

    .addClazz("Disciplina")
    .addPart("Actividad")

    .addClazz("Disciplina de Modelo del Dominio")
    .addBase("Disciplina")

    .addClazz("Disciplina de Requisitos")
    .addBase("Disciplina")
    .addPart("Encontrar Actores y Casos de Uso")
    .addPart("Priorizar Casos de Uso")
    .addPart("Especificar Caso de Uso")
    .addPart("Estructurar Modelo de Casos de Uso")
    .addPart("Prototipar Interfaz de Usuario")

    .addClazz("Disciplina de Análisis")
    .addBase("Disciplina")
    .addPart("Analizar la Arquitectura")
    .addPart("Analizar Caso de Uso")
    .addPart("Analizar Clase")
    .addPart("Analizar Paquete")

    .addClazz("Disciplina de Diseño")
    .addBase("Disciplina")
    .addPart("Diseñar la Arquitectura")
    .addPart("Diseñar Caso de Uso")
    .addPart("Diseñar Clase")
    .addPart("Diseñar Paquete")

    .addClazz("Disciplina de Implementación")
    .addBase("Disciplina")
    .addPart("Implementar la Arquitectura")
    .addPart("Integrar Sistemas")
    .addPart("Implementar Clase")
    .addPart("Implementar Pruebas Unitarias")
    .addPart("Implmentar Subsistema")

    .addClazz("Disciplina de Pruebas")
    .addBase("Disciplina")
    .addPart("Planificar Pruebas")
    .addPart("Diseñar Pruebas")
    .addPart("Implementar Pruebas")
    .addPart("Realizar Pruebas de Sistemas")
    .addPart("Realziar Preubas de Integración")
    .addPart("Evaluar Pruebas")

    .addClazz("Disciplina de Despliegue")
    .addBase("Disciplina")

    .addClazz("Encontrar Actores y Casos de Uso")
    .addBase("Actividad")
    .addAssociate("Analista de Sistemas")
    .addClazz("Priorizar Casos de Uso")
    .addBase("Actividad")
    .addAssociate("Arquitecto")

    .addClazz("Especificar Caso de Uso")
    .addBase("Actividad")
    .addAssociate("Especificador de Casos de Uso")

    .addClazz("Estructurar Modelo de Casos de Uso")
    .addBase("Actividad")
    .addAssociate("Analista de Sistemas")

    .addClazz("Prototipar Interfaz de Usuario")
    .addBase("Actividad")
    .addAssociate("Diseñador de Prototipo de Interfaz")

    .addClazz("Analizar la Arquitectura")
    .addBase("Actividad")
    .addAssociate("Arquitecto")

    .addClazz("Analizar Caso de Uso")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Casos de Uso")

    .addClazz("Analizar Clase")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Analizar Paquete")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Diseñar la Arquitectura")
    .addBase("Actividad")
    .addAssociate("Arquitecto")

    .addClazz("Diseñar Caso de Uso")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Casos de Uso")

    .addClazz("Diseñar Clase")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Diseñar de Subsistema")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Implementar la Arquitectura")
    .addBase("Actividad")
    .addAssociate("Arquitecto")

    .addClazz("Integrar Sistemas")
    .addBase("Actividad")
    .addAssociate("Integrador de Sistemas")

    .addClazz("Implementar Clase")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Implementar Pruebas Unitarias")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Implementar Subsistema")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Planificar Pruebas")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Pruebas")

    .addClazz("Diseñar Pruebas")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Pruebas")

    .addClazz("Implementar Pruebas")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Componentes")

    .addClazz("Realizar Pruebas de Sistemas")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Pruebas de Sistemas")

    .addClazz("Realizar Pruebas de Integración")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Pruebas de Integración")

    .addClazz("Evaluar Pruebas")
    .addBase("Actividad")
    .addAssociate("Ingeniero de Pruebas")

    .addClazz("Modelo del Dominio")
    .addBase("Artefacto")

    .addClazz("Modelo de Casos de Uso")
    .addBase("Artefacto")
    .addAssociate("Encontrar Actores y Casos de Uso")
    .addAssociate("Priorizar Casos de Uso")
    .addAssociate("Especificar Casos de Uso")
    .addAssociate("Estructurar el Modelo de Casos de Uso")
    .addAssociate("Prototipar Interfaz de Usuario")
    .addPart("Actor X")
    .addPart("Caso de Uso X")

    .addClazz("Modelo de Diseño")
    .addBase("Artefacto")
    .addAssociate("Análisis de la Arquitectura")
    .addAssociate("Análisis de Casos de Uso")
    .addAssociate("Análisis de Clase")
    .addAssociate("Análisis de Paquete")
    .addAssociate("Diseño de la Arquitectura")
    .addAssociate("Diseño de Casos de Uso")
    .addAssociate("Diseño de Clase")
    .addAssociate("Diseño de Paquete")
    .addPart("Class X")
    .addPart("Paquete X")

    .addClazz("Modelo de Implementación")
    .addBase("Artefacto")
    .addAssociate("Diseño de la Arquitectura")
    .addAssociate("Implementar la Arquitectura")
    .addAssociate("Integrar Sistemas")
    .addAssociate("Implementar Clase")
    .addAssociate("Implementar Prueba Unitaria")
    .addAssociate("Implementar Subsistema")
    .addPart("Software X")

    .addClazz("Modelo de Despliegue")
    .addBase("Artefacto")
    .addAssociate("Diseño de la Arquitectura")
    .addAssociate("Planificar de Pruebas")
    .addAssociate("Diseño de Pruebas")
    .addAssociate("Implmentar Pruebas")
    .addAssociate("Realizar Pruebas de Sistemas")
    .addAssociate("Realizar Pruebas de Integración")
    .addAssociate("Evaluar Pruebas")
    .addPart("Hardware X");
  return model;
}