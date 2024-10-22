# Animación utilizando CSS

Podemos utilzar CSS para animar elementos en nuestra página.
Esto nos puede servir por ejemplo para hacer que una imagen se desvanezca cuando se elimina.
Antes de agregar esta animación a nuestra página, vamos a ver un ejemplo sencillo para ver como
funciona.
Crea un archivo llamado `anime.html` con un solo elemnto `h1` y agrega el siguiente código para
definir el estilo CSS:

```css
h1 {
  animation-name: slide-right;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

@keyframes slide-right {
  from {
    margin-left: 0px;
  }

  to {
    margin-left: 200px;
  }
}
```

La propiedad `animation-name` define el nombre de la animación, en este caso `slide-right`, la cual se
define más abajo con `@keyframes slide-right`. Esta animación va a durar 4 segundos y va a mantener
el estilo final de la animación con `animation-fill-mode: forwards`.

La animación se define con `@keyframes slide-right` y se especifica que el elemento va a cambiar
de la propiedad `margin-left` de `0px` a `200px`. Esto nos dice que el valor empieza en `0px` y
durante cuatro segundos va a cambiar hasta `200px`. Si queremos que se mueve más rapido, podemos
reducir el tiempo de la animación.

Vamos a agregar ademas del márgen el tamaño de la fuente y el color del texto a la animación.
Vamos a crecer de `font-size: 20px` a `40px` y de `color: black` a `red`.

En este caso estamos especificando el valor de las propiedades del inicio al final de la animación,
pero lo interesante es que podemos especificar varios valores intermedios. Por ejemplo, podemos indicar
un punto inicial, un punto intermedio y un punto final. Para esto vamos a modificar la animación:

```css
h1 {
  animation-name: slide-right;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

@keyframes slide-right {
  0% {
    margin-left: 0px;
  }

  50% {
    margin-left: 200px;
  }

  100% {
    margin-left: 0px;
  }
}
```

Esta animación va a hacer que el elemento se mueva a la derecha, y luego regresará al punto inicial.
Podemos repetir la animación una y otra vez, agregando la propiedad `animation-iteration-count` con un valor de `infinite`.
también podemos especificar un numero específico de veces que queremos que se repita la animación.

Aunque podemos iniciar, pausar y detener la animación utilizando JavaScript. Vamos a iniciar la animación en pausa y luego la vamos a iniciar al momento de hacer click en el elemento `h1`. Para esto vamos a agregar un evento `click` al elemento `h1` y vamos a iniciar la animación con JavaScript.

```html
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const h1 = document.querySelector("h1");
    h1.style.animationPlayState = "paused";

    h1.onclick = function () {
      if (h1.style.animationPlayState === "running") {
        h1.style.animationPlayState = "paused";
        return;
      }
      h1.style.animationPlayState = "running";
    };
  });
</script>
```

Para dar un mejor efecto visual, vamos a cambiar el cursor cuando pasemos sobre el elemento `h1`. Para esto vamos a agregar la propiedad `cursor: pointer;` al estilo del `h1`.

```css
h1:hover {
  cursor: pointer;
}
```

## Animación al eliminar una imagen

Ahora vamos a aplicar los que hemos visto para animar la eliminación de una imagen. Vamos a modificar el método `addImage` para que cuando se elimine una imagen, esta se desvanezca. Recordemos que las imagenes tienen un estilo de post, agreguemos una
animación que reduzca la opacidad del valor máximo de uno a cero. Algo importante es que
la animación se va a ejecutar hasta que se presione el botón de eliminar, por lo que vamons a inciar su estado
en pausa.

```css
.post {
  animation-name: hide;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}

@keyframes hide {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
```

Ahora vamos a modificar el método `addImage` para que cuando se presione el botón de eliminar,
se inicie la animación y agregaremos un `eventListener` para el evento `animationended` que nos
notifica cuando la animación terminó. Una vez recibido este evento eliminamos el post:

```javascript
    button.onclick = () => {
      button.parentNode.style.animationPlayState = "running";
      button.parentNode.addEventListener("animationend", () => {
        button.parentNode.remove();
      });
```

Podemos mejorar aun mas la animación, por ejemplo, reduciendo el tamaño de la
imagen a cero y moviendola a la izquierda, este tipo de mejoras quedan como
ejercicio. También podemos observar que si eliminamos varias imagenes y ya no
es necesario hacer schroll para ver todas las imagenes, el scroll bar
desaparece y no se cargan nuevas imágenes, resuelve este problema como ejercicio.
