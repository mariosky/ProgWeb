# Autenticación de Usarios

En este tutorial vamos a utilizar la librería de Autenticación incluida
en django para implementar una forma para que los usuarios inicien una sesión en
nuestra página.

Como prerrequisito debemos haber creado algunos usuarios en la base de datos
utilizando la aplicación del administrador. En este ejemplo solo nos vamos a
concentrar en la autenticación no en registrar nuevos usuarios, ni permitirles
recordar o cambiar su contraseña.

## Nueva aplicación

Para poder utilizar esta funcionalidad en otros proyectos, vamos a
aislar la funcionalidad como una nueva aplicación.

```bash
python manage.py startapp users
```

Agregamos la aplicación `'movies.apps.MoviesConfig'` a nuestras aplicaciones instaladas en `settings.py`.

Como ahora tenemos varias aplicaciones vamos a separar nuestros URLs
asignando a cada aplicación su propio archivo de `url.py`:

Para esto debemos cambiar el archivo `urls.py` del proyecto en `mymovies`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('movies/', include('movies.urls')),
    path('users/', include('users.urls')),
]
```

En movies:

```python
from django.urls import path
from .views import *

urlpatterns = [
    path('<int:movie_id>/', movie, name='movie')
]
```

En users:

```python
from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('login', login, name='login'),
    path('logout', login, name='logout'),
]
```

# Vistas

[Documentación](https://docs.djangoproject.com/en/5.1/topics/auth/default/#django.contrib.auth.login)

```python

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout

def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    else:
        return render(request,'users/profile.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return HttpResponseRedirect(reverse('index'))
        else:
            # Return an 'invalid login' error message.
            return render(request, 'users/login.html', {'errors':['Invalid Login']})
    else:
        return render(request, 'users/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))
```

## Plantillas

```django
{% if errors %}
<p> No se pudo hacer login</p>
{% endif %}

<form method="post" action="{% url 'login' %}">
{% csrf_token %}
    <input type="text" name="username" placeholder='Usuario'/>
    <input type="password" name="password" placeholder='Contraseña'/>
    <input type="submit" value="login">
</form>
```

```django
<h1>Hola {{request.user}}</h1>
<p> <a href='{% url "logout" %}'> Cerrar Sesión</a>  </p>
```
