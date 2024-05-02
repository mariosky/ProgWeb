
## Formas en Django {#forms}

En el contexto del framework de Django, la clase `Form` es una representación
de un formulario HTML, y nos permite crear y gestionar la información de
formularios HTML de manera programática. Los formularios de Django se crean
utilizando una clase de formulario que hereda de `django.forms.Form`. 

De manera similar a los modelos de Django, `Form` también genera código HTML
considerando los campos y las validaciones definidos en la clase. En este caso,
por cada campo que necesitamos en el formulario, vamos a definir un atributo en
nuestra propia clase `Form`. Cada campo es a su vez una clase que herda de
`Field` la cual puede validar y gestionar los datos ingresados por el usuario.
La documentación de Django provee una lista de los campos disponibles en el
módulo `django.forms.fields` y sus respectivas opciones
(FormFields)[docs.djangoproject.com/en/5.0/ref/forms/fields/].

En este ejemplo de la documentación se utiliza la clase `EmailField` para un campo tipo correo electrónico:

```python
>>> from django import forms
>>> f = forms.EmailField()
>>> f.clean("foo@example.com")
'foo@example.com'
>>> f.clean("invalid email address")
Traceback (most recent call last):
...
ValidationError: ['Enter a valid email address.'] 
```

Como vemos en el ejemplo, el método `clean` puede validar los datos ingresados
por el usuario y lanzar una excepción `ValidationError` si los datos no cumplen
con las reglas definidas en el campo.

Como vemos, podemos probar de manera interactiva la funcionalidad de los campos
sin necesidad de crear una aplicación de Django. Simplemente creamos los objetos 
que deseamos en consola de Python y listo. 

Veamos algunos ejemplos de la documentación:

### `label`

```python
>>> from django import forms
>>> class CommentForm(forms.Form):
...     name = forms.CharField(label="Nombre")
...     url = forms.URLField(label="Tu website", required=False)
...     comment = forms.CharField()
...
>>> f = CommentForm(auto_id=False)
>>> print(f)
<div>Your name:<input type="text" name="name" required></div>
<div>Your website:<input type="url" name="url"></div>
<div>Comment:<input type="text" name="comment" required></div>
```

### `initial`
```python
```python
>>> class CommentForm(forms.Form):
...     name = forms.CharField(initial="Nombre")
...     url = forms.URLField(initial="http://")
...     comment = forms.CharField()
...
>>> data = {"name": "", "url": "", "comment": "Foo"}
>>> f = CommentForm(data)
>>> f.is_valid()
False
# The form does *not* fall back to using the initial values.
>>> f.errors
{'url': ['This field is required.'], 'name': ['This field is required.']}
````

### `help_text`
```python
>>> from django import forms
>>> class HelpTextContactForm(forms.Form):
...     subject = forms.CharField(max_length=100, help_text="100 characters max.")
...     message = forms.CharField()
...     sender = forms.EmailField(help_text="A valid email address, please.")
...     cc_myself = forms.BooleanField(required=False)
...
>>> f = HelpTextContactForm(auto_id=False)
>>> print(f)
<div>Subject:<div class="helptext">100 characters max.</div><input type="text" name="subject" maxlength="100" required></div>
<div>Message:<input type="text" name="message" required></div>
<div>Sender:<div class="helptext">A valid email address, please.</div><input type="email" name="sender" required></div>
<div>Cc myself:<input type="checkbox" name="cc_myself"></div>
```
### `error_messages`
```python
```python
>>> name = forms.CharField(error_messages={"required": "Please enter your name"})
>>> name.clean("")
Traceback (most recent call last):
  ...
ValidationError: ['Please enter your name']
```

### `Widgets`
```python
>>> from django import forms
>>> name = forms.TextInput(attrs={"size": 10, "title": "Your name"})
>>> name.render("name", "A name")
'<input title="Your name" type="text" name="name" value="A name" size="10">'
```

### Ejemplo de la plantilla de un formulario sencillo

```html 
{% extends "movies/base.html" %}

{% block article %}

<div class="flex flex-col w-2/3 ml-16 mt-8 mb-8">
    <form  action="/movies/your_name/" method="post">
        {% csrf_token %}
        {{ form }}
        
        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div> 
        
    </form>
</div>

{% endblock %}
```
