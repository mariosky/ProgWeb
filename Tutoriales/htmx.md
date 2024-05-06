## </> htmx 

Vamos a darle un vistazo a [htmx](http:\\htmx.org), una librería que nos
permite hacer aplicaciones web modernas sin tener que escribir JavaScript.
Nuestro formulario acutalmente envía mensajes a un servidor y recarga la
página, ya sea para mostrar los errores o para continuar a una página
informativa. Vamos a cambiar esto para que el formulario muestre los errores
sin que el usuario persiva que la página se recarga. Internamente vamos a
enviar los datos del formulario y dinámicamente vamos a actualizar los
elementos de la página con la información necesaria.

Para lograr esta funcionalidad normalmente se utiliza JavaScript, enviando
peticiones asíncronas al servidor, recibiendo la respuesta en formato JSON y
actualizando los elementos de la página. `htmx` nos permite hacer esto sin
tener que escribir JavaScript, ni romper con la filosofía de la Web, la cual se
basa en concepto de **hipertexto**. En lugar de enviar peticiones asíncronas,
la librería nos permite enviar peticiones que reciben **hipertexto**. Nosotros ya
sabemos como enviar mensajes al servior, procesar la petición y devolver una
respuesta en formato HTML. Utilizando `htmx` podemos trabajar como hasta ahora,
pero agragando la posibilidad de intercambiar elementos de nuestra página por
HTML que recibimos dinámicamente desde el servidor. 

htmx utiliza atributos HTML para brindarnos la funcionalidad de AJAX,
Transiciones CSS, WebSockets y SSE directamente en HTML. Vamos a ver un ejemplo. 

### Instalación

Podemos descargar `htmx` desde su [página oficial](http://htmx.org) o utilizar
un CDN. Vamos a utilizar un CDN para que sea más sencillo. Vamos a instalar de
una vez [hyperscript](http:\\hyperscript.org) así que agregamos los siguientes scripts en el `<head>`
de nuestro template `base.html`.

```html
  <script src="https://unpkg.com/htmx.org@1.9.12"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
```

Como estamos utilizando Django, recordemos que las peticiones tipo `POST`
requieren un token CSRF. Para evitar problemas vamos agregar el atributo
`hx-headers` al elemento `body` de nuestro template `base.html`: 

```html
<body class="bg-white dark:bg-slate-900" hx-headers='{"X-CSRFToken": "{{ csrf_token }}"}'>
</body>
```
Con este atributo, `htmx` va a enviar el token CSRF en todas las peticiones que realice.

### POST con htmx

Modifica el formularion en `name.html` para que se vea de la siguiente manera:
```html
{% extends "movies/base.html" %}

{% block article %}

<div class="flex flex-col w-2/3 ml-16 mt-8 mb-8">
    <form>
        {% csrf_token %}
        {{ form }}
        
        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" 
                    class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    hx-post="/movies/your_name/" 
                    hx-swap="outerHTML">
                Save
            </button>
        </div> 
    </form>
</div>

{% endblock %}
```
Estamos indicando que cuando el usuario haga click en el botón `Save`, se envíe una petición `POST` al servidor y 
que el elemento `button` se reemplaze con el HTML que recibamos. Es importante que veas la documentación de los 
atributos de [htmx](https://htmx.org/reference/) 

Podemos agregar código adicional en (hyperscript)[http:\\hyperscript.org] para
que cambie el contenido de manera dinámica. Por ejemplo, agrega el siguiente
atributo al elemento `form`: 

```html
_="on htmx:afterOnLoad log 'Saved'"
```


