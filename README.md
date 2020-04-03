Component Tracer
================
a Component Tracer is a small utility that allows a developer to click on
a component on the page and be taken to the the source file at the position
where the component instance was created. This is to ease navigation between
the UI and the code that produced it.

Currently only Chrome works propertly and there are component tracers for:

 * document.createElement
 * Preact

More should come, and contributions are welcome of course.

How to use it
-------------
Pick a componen tracer you want to use and import it:

 `import { installTracer } from `create-element-tracer';`

Then install the tracer at the top of your program:

 `installTracer('/absolute/path/to/project/sources');`



