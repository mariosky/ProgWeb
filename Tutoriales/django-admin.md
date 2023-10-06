# Django Admin

Esta es una de las aplicaciones más útiles incluidas en Django pues genera
automáticamente una interfaz de usurario para administrar nuesto sitio. 
La aplicación lee el modelo de una aplicación y genera un sitio de administación
que nos permite gesitionar el contenido que vamos a mostrar en el sitio. Este sitio 
es para uso interno de los creadores de contenido y administradores.

La aplicación está abilitada por defecto en todos los proyectos generados con el 
comando `startproject`, en este breve tutorial vamos a utilizar y adaptar la aplicación 
admin de Django para nuestra aplicación MyMovies. Como siempre la [documentación](https://docs.djangoproject.com/en/4.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin) es la mejor fuente de información.

Pasos para habilitar el sitio de admin:

1. Para ingresar al sitio de administración los usuarios deben contar con el 
atributo de `is_staff`, para esto debemos crear un usuario administrador 
con el comando `createsuperuser`. 

2. Debemos indicar que modelos vamos a gestionar desde la interfaz del admin y
de manera opcional configurar la interfaz para cubrir con las necesidades particulares
de nuestra aplicación.

La configuración del admin se realiza editando el archivo `admin.py` dentro de nuesta 
aplicación.

Vamos editando el archivo  para incluir en el admin todos nuestros modelos:



