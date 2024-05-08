## ORM de Django (Object-Relational Mapping)

SQL es un gran lenguaje de consulta y de gestión de bases de datos
relacionales. SQL es un lenguaje declarativo y por alguna razón existe la
nocion de que es más difícil de utilizar que lenguajes imperativos como Python.
Además de esto, cada sistema gestor de base de datos define su propio dialecto
de SQL intentando agregar funcionalidades propias. Esto hace dificil migrar
bases de datos de un sistema a otro sin tener que hacer modificaciones a las
consultas o la definición del esquema. 

Por otro lado, los lenguajes orientados a objetos tienen la capacidad de
representar datos de una forma más natural, ya que cada registro de una tabla
puede ser representado como un objeto y cada columna como un atributo. Un ORM
(Object-Relational Mapping) es una técnica de programación que nos permite
operar con bases de datos relacionales utilizando objetos en lugar de SQL. Los
ORMs permiten a los desarrolladores de software, utilizar el mismo lenguaje
para la implementación de la lógica de negocio y la interacción con la base de
datos. El uso de un ORM, es entonces una decisión de diseño que dependerá de
las necesidades del proyecto.

Django es un framework diseñado principalmente para crear applicaciones web que
utilizan bases de datos relacionales para la gestión de la información. Por lo tanto, un componente importante es su ORM.

En esta sección nos concentraremos en el API de Django para realizar 
las operaciones de CRUD (Create, Read, Update, Delete). Para esto, utilizaremos el esquema de la base de datos (Modelo en términos del framework) de la aplicación de *My Movies* que definimos anteriormente: 

```python
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Person(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=200)
    overview = models.TextField()
    release_date = models.DateTimeField()
    running_time = models.IntegerField()
    budget = models.IntegerField(blank=True)
    tmdb_id = models.IntegerField(blank=True, unique=True)
    revenue = models.IntegerField(blank=True)
    poster_path = models.URLField(blank=True)
    genres = models.ManyToManyField(Genre)
    credits = models.ManyToManyField(Person, through="MovieCredit")

    def __str__(self):
        return self.title


class MovieCredit(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)


class MovieReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1),
                                                          MaxValueValidator(100)])
    review = models.TextField(blank=True)
```

### Creación de Objetos

Cada una de las clases del modelo representa una tabla en la base de datos y cada objeto representa a un registro. Entonces para insertar un registro en la base de datos, debemos crear un objeto de la clase correspondiente y llamar al método `save()`.
Al igual que en la contraparte relacional, debemos tener en cuenta las restricciones de integridad referencial. Por ejemplo, si queremos insertar un registro en la tabla `MovieCredit`, debemos tener en cuenta que existan objetos tipo  `Person` , `Movie` y `Job` existan en la base de datos. 

Para este tutorial, asumiremos que ya tenemos nuestra aplicación de Django configurada e insertamos con anterioridad algunas peliculas con todos los datos asociados. Empezaremos por iniciar una sesión del shell de django:  

Primero, activamos el entorno virtual:
```bash
source django-venv/bin/activate
``` 

```bash
pyhton manage.py shell
``` 

Empecemos por crear un objeto tipo `Job`:
```python

```

