## Eliminar elementos

Vamos a partir de la solución del ejercicio anterior y vamos a agregar la funcionalidad de remover las imágenes que no nos
gusten (puede ser difícil la mayoría de los gatos son adorables).

Para esto, vamos a agregar un boton de `remove` a cada imagen que se agregue al elemento `#main-images`.
Un elemento debería tener esta estructura:

```html
<div class="post">
  <img
    src="https://cdn2.thecatapi.com/images/MTYwNzQxMg.jpg"
    width="400"
    class="post-image"
  />
  <button class="remove">Remove</button>
</div>
```

Para esto vamos a modificar el método `addImage` para que agregue un `button` y un `div` que incluya
a ambos elementos.

````javascript

```javascript
function addImage(src) {
  // Creamos los tres elementos
  const post = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");

  button.innerHTML = "Remove";
  // Agregamos un handler al evento click del botón para remover el div padre (que incluye a la imagen y al botón)
  button.onclick = () => {
    button.parentNode.remove();
  };

  image.src = src;
  image.width = 400;
  image.className = "post-image";

  post.append(button);
  post.append(image);
  post.className = "post";
  document.querySelector("#main-images").append(post);
}
````

Algo que podemos observar es que primero se carga el botón y luego la imagen. Esto es
porque la imagen puede tardar en cargarse y si el botón está antes, el usuario podría intentar
presionar el botón antes de que la imagen esté cargada. Para evitar esto, vamos a agregar el
botón después de que la imagen haya sido cargada, esto significa cambiar el método `addImage`:

```javascript
function addImage(src) {
  const post = document.createElement("div");
  const image = document.createElement("img");

  // Cuando se crea la imagen, esta tarda en cargar
  // vamos a esperar a que se cargue para agregar el botón.
  // Para esto, vamos a agregar un handler al evento onload de la imagen.
  image.onload = () => {
    const button = document.createElement("button");
    button.innerHTML = "Remove";
    button.onclick = () => {
      button.parentNode.remove();
    };
    image.after(button); // el botón se agrega al div padre después de la imagen.
  };
  image.src = src;
  image.width = 400;
  image.class = "post-image";

  post.append(image);
  document.querySelector("#main-images").append(post);
}
```

En este caso estamos dejando el ancho de la imagen fijo a `400px` pero si queremos que la imagen
se muestre de tamaño completo, podríamos leer de los datos de la imagen que recibimos del API.
Para esto deveriamos recibir el objeto completo y no solo la url de la imagen. Como ejercicio, intenta
recuperar las imágenes y especificar el alto y ancho de la imagén. Pero en caso de que sobrepase cierto
tamaño, establecer un ancho máximo de `400px` y el alto se ajuste proporcionalmente.
