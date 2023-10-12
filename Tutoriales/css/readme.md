## Tailwindcss 

A diferencia de otros framworks de css, por ejemplo [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/), Tailwindcss no incluye hojas de estilo asociadas a clases especificas según 
el componente que se esté utilizando. Por ejemplo el componente `Card` tiene clases específicas para
cada elemento:

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

En este caso, tenemos las clases `card`, `card-img-top`, `card-body`, `card-text` y `btn btn-primary`. 
con ellas creamos un componente como el que se muestra a continuación:

![Card](./img/card-example.png)

Para que esto funcione debemos incluir el archivo css de bootstrap y listo. El framwork le da el estilo y 
tenemos un componente que se ve muy bien y además de puede adaptar a necesidades específicas, modificando el 
archivo .css por medio del preprocesador `Sass` (syntactically awesome style sheets) y variables específicas 
que podemos modificar. 

En el caso de `Tailwindcss` se sigue una estratégia muy distinta. En lugar de específicar en los elementos
el tipo de componente que necesitamos, por ejemplo una `Card`, especificamos (casi literalmente) como 
queremos que se aplique el estilo. Por ejemplo, en el landing page de tailwindcss.com, se muestra actualmente el 
siguiente diseño:

<figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>

Nos genera la siguiente tarjeta:

![Card](./img/card-example-tw.png)

Vemos como en las clases se especifíca el estilo, por ejemplo `md:flex` nos dice
que los elementos internos de `figure` tendrán la propiedad `flex` *siempre y
cuando* el tamaño del dispositivo o navegador tenga un ancho mínimo de `768px`.
Esto es similar en css a un *media query* como este  `@media (min-width: 768px)
{ ... }`.  Entonces, Tailwind nos permite especificar el 
[diseño web responsivo](https://es.wikipedia.org/wiki/Dise%C3%B1o_web_adaptable), 
directamente en los elementos html utilizando una  especificación compacta de
las propiedades css que se aplicarían en cada caso. Esto es contra intuitivo
para un desarrollador de software. Nos gusta separar el estilo de la estructura
y desacoplar las dependencias.  En este caso, no hay propiamente un archivo
`.css` dónde se contenga la especificación como antes. Ya que este se genera con
un preprocesador que recorre los archivos que incluyen los elementos y clases
html, para generar un archivo compacto `.css`. Decimos que es compacto pues solo
incluye aquellas clases que utilizamos en este momento. Entonces todo está
integrado en un solo lugar, no hay 
[separation of concerns](https://es.wikipedia.org/wiki/Separaci%C3%B3n_de_intereses). ¿Esto es
mal diseño?. Los desarrolladores de tailwindcss promueven el concepto de
[`Utility-First` (inglés)](https://tailwindcss.com/docs/utility-first).
Básicamente se justifíca el uso de clases utilitarias para crear componentes
adaptados a cierta necesidad. Los cambios se ven directamente y solo afectan al
componente en cuestión. Esto evita el caso de hacer un cambio en el archvio
`.css` que modifica los componentes en todas las páginas lo cual hace difícil
detectar algún problema ocasionado por el cambio.




