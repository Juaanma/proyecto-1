# infesim
## Introducción
Este repositorio corresponde a la aplicación web [**infesim**](https://juaanma.github.io/proyecto-1/), 
que permite realizar simulaciones sobre la evolución de enfermedades infecciosas, utilizando
modelos matemáticos.

### Modelo SIR
En particular, se utiliza el [modelo SIR](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model), que divide a la población en tres grupos:

* Población susceptible (S): individuos que pueden ser contagiados.
* Población infectada (I): individuos que tienen la enfermedad.
* Población recuperada (R): individuos que ya no tienen la enfermedad.

La evolución de la población se modela mediante un [conjunto de ecuaciones diferenciales](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model_without_vital_dynamics).

### Simulación
La simulación entonces se resume a resolver este sistema de ecuaciones.
En particular, se trata de un sistema de ecuaciones diferenciales ordinarias (ODE, por sus siglas en inglés), que puede resolverse fácilmente con el [**método de Euler**](https://en.wikipedia.org/wiki/Euler_method).
Este método consta de tomar pequeños pasos, sumando a la variable el incremento estimado por la pendiente.

## Implementación
### Arquitectura
La estructura utilizada para los archivos JS está inspirada en la arquitectura MVC.

En particular, se pueden distinguir cuatro grupos de componentes, correspondientes a: la navegación,
la configuración, los parámetros y la simulación.

Para facilitar la claridad y la modularidad, cada archivo JS contiene un módulo con imports y exports.

### Navegación
Este componente se encarga de actualizar el header según la sección seleccionada (obtenida del URL), y
de seleccionar la sección por defecto en caso de que la actual sea inválida.

### Parámetros
Estos componentes se encargan de mostrar los parámetros, almacenarlos, y recibir eventos relacionados.

Una observación importante es que cada parámetro consta de dos atributos: _input_ (el valor obtenido
del DOM) y _value_ (el valor al que se mapea el _input_ en la aplicación). Por ejemplo, si la 
_range bar_ de la población se encuentra en la segunda posición, _input_ es 2 mientras que _value_ es 16.

### Configuración
Estos componentes se encargan de mostrar la configuración actual (el estilo light o dark), almacenarla,
y recibir eventos relacionados.

### Simulación
Estos componentes se encargan de recibir eventos de cambios de parámetro, realizar la simulación correspondiente,
y mostrar los resultados.

En particular, es importante destacar:

* La "clase" _SIRModel_ representa el sistema de ecuaciones a resolver.
* La "clase" _ODESolver_ permite resolver un sistema de ecuaciones diferenciales ordinarias.
* El controlador mapea los parámetros ingresados por el usuario a aquellos utilizados por el modelo.
* La vista _plot_ provee métodos para graficar un conjunto de datos y define las opciones del gráfico.

## Compatibilidad
Se comprobó que la aplicación funciona correctamente en las últimas versiones de: Chrome, Firefox, Opera y Edge. Además, la UI es responsive y se adapta a dispositivos móviles.

## Fuentes
### Inspiración
El desarrollo de esta aplicación está fuertemente inspirado en el video [Simulating an epidemic](https://www.youtube.com/watch?v=gxAaO2rsdIs) de _3blue1brown_.

### Librerías
* Para simplificar el código JS: [jQuery 3.5.0](https://code.jquery.com/)
* Framework CSS para facilitar el diseño: [Bootstrap 4.3.1](https://getbootstrap.com/docs/4.3/getting-started/download/)
* Renderizado de LaTeX en la web: [KaTeX 0.11.1](https://katex.org/docs/browser.html)
* Gráficos interactivos: [Chart.js 2.9.3](https://www.chartjs.org/docs/latest/getting-started/installation.html)

### Otros recursos
* Para íconos _material_: [Material Icons](https://google.github.io/material-design-icons/)
* Estilo basado en: [Cover template - Bootstrap](https://getbootstrap.com/docs/4.3/examples/cover/#)