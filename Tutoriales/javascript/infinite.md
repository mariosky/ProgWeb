## Scroll Infinito

Como primer paso vamos a crear un archivo llamado `cat-infinite.html` y vamos a agregar el siguiente código:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Cat Dog</title>
    <script src="cat-infinite.js" lang="javascript" charset="utf-8"></script>
  </head>
  <body>
    <div id="main-images"></div>
  </body>
</html>
```

Ademas de agregar la dirección del archivo `cat-infinte.js`, estamos agregando un `div` con un `id` de `main-images` aquí es
donde vamos a agregar las imágenes de los gatos que nos va a entregar el API de [The Cat API](https://thecatapi.com/).

Ahora vamos a crear el archivo `cat-infinite.js` y vamos a agregar la funcionalidad de un scroll infinito para cargar cierto
número de imágenes de gatos y cuando el usuario haga scroll hasta la parte de abajo de la página se cargen más imágenes, similar
a lo que sucede en los sitios de redes sociales.

Como primer paso vamos a agregar una función llamada `addImage` la cual recibe como parámetro la URL de la imagen que vamos a
agregar al `div` con `id` de `main-images`. A la imagen le vamos a agregar un `width` de `400px` y una clase llamada `post-image`.

```javascript
function addImage(src) {
  const image = document.createElement("img");
  image.src = src;
  image.width = 400;
  image.class = "post-image";
  document.querySelector("#main-images").append(image);
}
```

Podemos probar la función `addImage` desde la consola del navegador, ejecutando el método y pasando como parametro la URL de una imagen.
Asumiendo que tenemos la imágen ´cat.jpg´ en la carpeta donde tenemos los archivos HTML y JavaScript:

```javascript
addImage("cat.jpg");
```

Debe agregar la imagen `cat.jpg` al `div`.

Ahora vamos a recuperar varias imágenes desde el API y vamos a llamar el método de `addImage` para cada una.

Esto lo haremos en la funcion `addImages` la cual recibe como parametro el tipo de API que vamos a utilizar,
ya que podemos también descargar imágenes de perros utilizando otro endpoint del mismo API. Antes de hacer
la llamada al API creamos los `headers` y `requestOptions` que vamos a utilizar para hacer la llamada al API.

```javascript
const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key":
    "Tu_Propia_Key_Kzi2Qw1CDRgWDsNIWyiM7UbAEHu3rlteKy0N0vZccuXU2CCrRqtEEgDGH",
});

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};
```

En este caso estamos utilizando un API Key que se puede obtener registrandose en [The Cat API](https://thecatapi.com/).
Especificamos el `Content-Type` como `application/json` y el método como `GET`.

El método `addImages` recibe como parámetro el tipo de animal que vamos a descargar, en este caso `cat` o `dog`.

```javascript
function addImages(api) {
  // Se pueden agegar aquí las definiciones de headers y requestOptions.
  // Depende si se quieren utilizar en otros métodos.
  fetch(
    `https://api.the${api}api.com/v1/images/search?format=json&order=RANDOM&page=0&limit=5`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Verificamos la respuesta del API
      data.forEach((image) => {
        addImage(image);
      });
    });
}
```

Al recibir la respuesta del API, la convertimos a JSON y luego iteramos sobre cada imagen para llamar al método `addImage`.
Podemos ver que en el query string espcificamos que queremos 5 imágenes aleatorias, pero podemos cambiar el valor de `limit` para recibir otra cantidad de imágenes.
Como ejercicio, podemos agregar como parámetro valor de `limit` para que el el método pueda agregar distintas cantidades de imágenes.
Del mismo modo que antes, podemos probar el método `addImages` desde la consola del navegador, pasando como parametro `cat` o `dog`.

```javascript
addImages("cat");
```

Se deberían agregar 5 imágenes de gatos al `div`.

Para que se muestren las imágenes al cargar la página, vamos a llamar al método `addImages` en el `window.onload`.
También para implementar el scroll infinito vamos a agregar un `eventListener` al `window` que escuche el evento `scroll` y cuando el usuario
llege al final de la página vamos a llamar al método `addImages` para agregar más imágenes al `div`.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  addImages("cat"); // Cargar imágenes al cargar la página

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addImages("cat");
    }
  };
});
```

Un problema que podemos tener es que el usuario haga scroll muy rápido y se hagan muchas llamadas al API, para evitar esto vamos a agregar
una variable global `loading` que va a indicar si se esta cargando una petición al API. Vamos a cambiar el valor de `loading` a `true` cuando se
este cargando una petición y a `false` cuando termine la petición:

```javascript
var loading = false; // variable global para evitar multiples llamadas al API

document.addEventListener("DOMContentLoaded", () => {
  addImages("cat");
  window.onscroll = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      // Verificamos si no se esta cargando una petición
      loading = true;
      addImages("cat");
    }
  };
});
```

Al terminar el `fetch` cambiamos el valor de `loading` a `false`.

```javascript
    // Ultimo callback del fetch:
    .then((data) => {
      console.log(data); // Verificamos la respuesta del API
      data.forEach((image) => {
        addImage(image);
      });
      loading = false;
    });
```

Es importante recalcar que esta es una solución simple para evitar que se llame varias veces el API. También se
puede agregar algún método para limitar durante cierto tiempo la cantidad de llamadas al API. A esto se le conoce
como `throttle`. Para esto se pude utilizar la función `setTimeout` para esperar cierto tiempo antes de hacer otra petición. Otra
opción es utilizar librerías como `lodash` o `Underscore.js` que tienen un métodos para hacer `throttle` y `debounce`.
