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
utilizan bases de datos relacionales para la gestión de la información. Por lo
tanto, un componente importante es su ORM.

En esta sección nos concentraremos en el API de Django para realizar las
operaciones de CRUD (Create, Read, Update, Delete). Para esto, utilizaremos el
esquema de la base de datos (Modelo en términos del framework) de la aplicación
de *My Movies* que definimos anteriormente: 

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

Cada una de las clases del modelo representa una tabla en la base de datos y
cada objeto representa a un registro. Entonces para insertar un registro en la
base de datos, debemos crear un objeto de la clase correspondiente y llamar al
método `save()`. Al igual que en la contraparte relacional, debemos tener en
cuenta las restricciones de integridad referencial. Por ejemplo, si queremos
insertar un registro en la tabla `MovieCredit`, debemos tener en cuenta que
existan objetos tipo  `Person` , `Movie` y `Job` existan en la base de datos. 

Para este tutorial, asumiremos que ya tenemos nuestra aplicación de Django
configurada e insertamos con anterioridad algunas peliculas con todos los datos
asociados. Empezaremos por iniciar una sesión del shell de django:  

Primero, activamos el entorno virtual:
```bash
source django-venv/bin/activate
``` 

```bash
pyhton manage.py shell
``` 

Empecemos por crear un objeto tipo `Job`:

```python
from movies.models import Genre, Job, Person, Movie, MovieCredit
# primero veamos que trabajos existen
Job.objects.all()

# vamos a agregar un nuevo trabajo

job = Job(name='Database Administrator')
job.save()
```
El objeto `job` se insertó a la base de datos utilizando un comando `INSERT` de SQL. Podemos verificar esto imprimiendo el id del objeto, este se asignó automáticamente en la base de datos:

```python
In [6]: job.id
Out[6]: 22
```
### Inserción con objetos relacionados

Vamos ahora a insertar un objeto de tipo `MovieCredit` con el nuevo 'Job' que acabamos de crear. Para esto necesitamos un objeto de tipo `Person` y `Movie`, vemos que tenemos en la base de datos:

```python
In [8]: Person.objects.all()
Out[8]: <QuerySet [<Person: Leonardo DiCaprio>, <Person: Rebecca Huntley>, <Person: Viola Davis>, <Person: Christi Soper Hilt>, <Person: Mike Mitchell>, <Person: Ian McShane>, <Person: Bryan Cranston>, <Person: Peter Maynez>, <Person: Paul Duncan>, <Person: Betsy Nofsinger>, <Person: Justin Weg>, <Person: Mary M. Quinn>, <Person: Steve Mazzaro>, <Person: Stephanie Ma Stine>, <Person: Hans Zimmer>, <Person: Awkwafina>, <Person: Ronny Chieng>, <Person: Jonathan Aibel>, <Person: Dustin Hoffman>, <Person: Jack Black>, '...(remaining elements truncated)...']>

In [9]: Movie.objects.all()
Out[9]: <QuerySet [<Movie: The Revenant 2024>, <Movie: Kung Fu Panda 4 2024>, <Movie: Dune: Part Two 2024>]>
```

Podemos seleccionar un objeto de cada uno de estos modelos y crear un objeto de tipo `MovieCredit`:

```python
# primero vamos a ver los ids de los objeots tipo movie
In [10]: [m.id for m in Movie.objects.all()]
Out[10]: [6, 7, 8]

# ahora seleccionamos una pelicula por su id
movie = Movie.objects.get(id=8)

# el actor lo seleccionamos por su nombre 
actor = Person.objects.get(name='Jack Black')

# ahora si creamos el objeto MovieCredit
movie_credit = MovieCredit(person=actor, movie=movie, job=job)
movie_credit.save()
```

### Consultas

Las consultas se realizan utilizando las clases del modelo. Por ejemplo, para obtener todas las peliculas que se han insertado en la base de datos:
```python
In [32]: Movie.objects.all()
Out[32]: <QuerySet [<Movie: The Revenant 2024>, <Movie: Kung Fu Panda 4 2024>, <Movie: Dune: Part Two 2024>]>
```

Como vemos las consultas regresan un objeto tipo `QuerySet` que es iterable. Y
esto lo realiza un objeto de tipo `Manager` que se crea automáticamente para
cada modelo, por defecto el nombre es `objects`.

Podemos ver también los creditos de una pelicula en particular, como esta es una tabla relacionada, se utiliza el `Manager` llamado `credits`. Como recordarás, este atributo de `Movie` es una clave foránea: `credits = models.ManyToManyField(Person, through="MovieCredit")`.

```python
In [31]: movie.credits.all()
Out[31]: <QuerySet [<Person: Hans Zimmer>, <Person: Jack Black>, <Person: Christopher Walken>, <Person: Josh Brolin>, <Person: Javier Bardem>, <Person: Léa Seydoux>, <Person: Paul Lambert>, <Person: Ron Bartlett>, <Person: Florence Pugh>, <Person: Mary Parent>, <Person: Greig Fraser>, <Person: Patrice Vermette>, <Person: Byron Merritt>, <Person: Rebecca Ferguson>, <Person: Jon Spaihts>, <Person: Jon Spaihts>, <Person: Zendaya>, <Person: Joe Walker>, <Person: Austin Butler>, <Person: Frank Herbert>, '...(remaining elements truncated)...']>
```
En este caso obtendremos una lista de objetos de tipo `MovieCredit` que
corresponden a la pelicula `movie`. 

Podemos filtrar los resultados utilizando el método `filter`, revisemos si
existe un crédito para la pelicula `movie` con el actor 'Jack Black'.

```python
# Dentro de los creditos de la película, filtramos por el nombre de 'Jack Black'
movie.credits.all().filter(moviecredit__person__name='Jack Black')

# Películas donde trabaja Jack Black
Movie.objects.all().filter(moviecredit__person__name='Jack Black')

# Películas donde trabaja Jack Black que incluyen el 'Panda' en el título
# Nota: el método filter es case-insensitive (no importan mayúsculas o minúsculas)
Movie.objects.all().filter(moviecredit__person__name='Jack Black', title__icontains='pand')
```

### Relaciones Uno a Muchos

Para probar  las relaciones uno a muchos, vamos a insertar una reseña para una película. 
Para esto necesitamos utilzar el modelo `User` que viene incluido en Django. Este modelo incluye 
los siguienres campos:

* `username`
* `first_name` 
* `last_name`
* `email` 
* `password` 
* `is_staff`
* `is_active`
* `date_joined`

Como vemos esta es una implementación básica, en caso de que nuestro sistema requiera más 
información del usuario, podemos extender este modelo y agregar los campos necesarios. En este
caso estos campos son suficientes para nuestro propósito. 

Vamos a importar el modelo `User` y ver los usuarios que existen la base de datos.

```python
from django.contrib.auth.models import User

# primero importamos el modelo User
[user.username for user in users]

# ahora vamos imprimir los nombres de los usuarios utiiizando list comprehension
In [12]: user = User.objects.all()
In [13]: user
Out[13]: <QuerySet [<User: mariosky>, <User: juan>]>
```
Como mínimo deberiramos tener el usuario `admin` que se crea por defecto al iniciar un proyecto de Django.
Vamos a crear un nuevo usuario utilizando el método `create_user` incluido en el modelo `User`:
```python
# Este comando crea y guarda un usuario en la base de datos
user = User.objects.create_user("john", "lennon@thebeatles.com", "johnpassword")
# Podemos modificar otros campos del usuario
>>> user.last_name = "Lennon"
>>> user.save()
```
Cambiar la contraseña de un usuario es un poco más complicado, ya que la contraseña 
se guarda en la base de datos encriptada. Para cambiar la contraseña de un usuario, 
debemos utilizar el método `set_password`.
```python
u = User.objects.get(username="john")
u.set_password("new password")
u.save()
```

Ya que tenemos un nuevo usuario, vamos a insertar algunas reseñas de películas
con el usuario `john`. Utilizaremos el método `create` del `Manager` de
`MovieReview` para insertar un nuevo registro.

```python
from movies.models import MovieReview

In [15]: users
Out[15]: <QuerySet [<User: mariosky>, <User: juan>]>

In [16]: Movie.objects.all()
Out[16]: <QuerySet [<Movie: The Revenant 2024>, <Movie: Kung Fu Panda 4 2024>, <Movie: Dune: Part Two 2024>]>

In [17]: movie = Movie.objects.get(id=8)
In [18]: movie
Out[18]: <Movie: Dune: Part Two 2024>

user = User.objects.get(username='mariosky')
MovieReview.objects.create(user=user, movie=movie, rating=90, review="Great movie!")
MovieReview.objects.create(user=User.objects.get(username='juan'), movie=movie, rating=100, review="Perfect  movie!")
```

Como vemos, existe una relacion uno a muchos entre `User` y `MovieReview`, un
usuario puede tener muchas reseñas de películas, pero una reseña de película
solo puede pertenecer a un usuario. 

Veamos estos dos tipos de relaciones desde la perspectiva del ORM de Django.
Empecemos por verlo desde el punto de vista de `User`. Un usuario puede tener
muchas reseñas de películas, para acceder a estas reseñas utilizamos el
atributo `moviereview_set` que es un `Manager` que nos permite acceder a las
reseñas de un usuario. El ORM agrega automaticamente un `Manager` por cada
clase (o tabla) en la que se define una relación mediante una clave foránea. El
nombre de este `Manager` es el nombre de la clase sin espacios y en minúsculas
seguido de `_set`. Entonces para ver las reseñas que ha hecho el usuario `juan`
podemos escribir:

```python
In [40]: u = User.objects.get(username='juan')
In [41]: for review in u.moviereview_set.all():
    ...:     print(review.rating, review.review, review.user.username)
    ...: 
5 Si me gustó juan
100 Perfect  movie! juan
```

En este caso, el método `moviereview_set` regresa un `QuerySet` con todas las
reseñas que ha hecho el usuario `juan`. Ahora, una reseña en particular, puede
acceder directamente a su usuario utilizando el atributo `user`. Y directamente
podemos ver a los atributos de `User`. Esto requiere una consulta SQL que
involucra un `JOIN` entre las tablas `User` y `MovieReview`.

