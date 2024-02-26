
Es muy común que al implementar un sitio como `GoodReads` queramos establecer un 
mapeo entre ciertos patrones de URL y algún método encargado de responder a 
ese patrón. Por ejemplo, en la versión estática del sitio, los usuarios podrían 
indicar la ruta a una página html para ver la información de un libro en particular:

```
http://ittweb.ddns.net:8000/books/book1.html 
```
En este caso, el patrón que podríamos utilizar es el siguiente:

```
/books/<book_id>
```

De esta manera se evita indicar la extensión del archivo y se incluye solo 
su identificador. Esto es más acorde a la convención de nombres de APIs web que 
utilizan el estilo de arquitectura [REST](https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional).
En este caso, lo que vamos a consultar es una colección de libros, de manera
general una colección de recursos. La colección **books** la identificamos utilizando 
el URI `/books`, mientras que a un libro **book** en particular lo identificamos por 
el URI `/books/<book_id>`, en este caso `<book_id>` es un identificador. 
Un libro especiífico podría tener otras subcolecciones, por ejemplo un libro 
podría tener reseñas, en este caso los URIs se prodrían especificar de esta manera: 

```
/books/<book_id>/reviews
/books/<book_id>/reviews/<review_id>
```

No debemos utilizar la barra inclinada al final del URI:

```
/books/<book_id>/
```

Después vamos a utilizar los métodos de las peticiones HTTP como verbos que 
realizaremos sobre estos recursos, `GET` recupera un recurso, `POST` agrega un 
nuevo recurso, `DELETE` lo borra y `PUT` lo actualiza. 

Es importante entonces utilizar la ruta para decidir que método será el encargado 
de realizar la acción sobre el recurso especificado. 

Una manera básica de realizar esto en Python es utilizando la librería de expresiones regulares
para identificar y extraer en un solo paso los parametros e identificadores necesarios. 
Veamos este ejemplo:

```python
>>> import re

>>> re.findall(r'^/Book/(\d+)$', '/Book/12')
['12']

>>> re.match(r'^/Book/(\d+)$', '/Book/12')
<re.Match object; span=(0, 8), match='/Book/12'>

>>> m = re.match(r'^/Book/(\d+)$', '/Book/12')
>>> m.group(0)

'/Book/12'
>>> m = re.match(r'^/Book/(\d+)$', '/Book12')
>>> m.group(0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'group'

>>> m = re.match(r'^/Book/(?P<id>\d+)$', '/Book/12')
>>> m.group(0)
'/Book/12'

>>> m['id']
'12'
>>> m.groupdict()
{'id': '12'}
```

Como vemos, el método `match` nos permite validar que la ruta tiene el 
patrón que buscamos y además una vez emparejado selecciona las variables 
y nos las entrega como un diccionario. 

De esta manera podemos atar a los patrones de ruta que necesitamos, con 
el nombre del método que se encargara de ejecutar el verbo REST que deseamos 
aplicar a nuestros recursos.

Para esto, podemos incluir una lista de tuplas dónde indiquemos los patrones 
y el nombre del método responsable de responder a ese URI.

```python
mapping = [
            (r'^/Book/(?P<book_id>\d+)$', 'get_book'),
            (r'^/$', 'get_index')
        ]
```

En este caso es necesario agregar los métodos `get_book` y `get_index` a 
nuestra clase `WebRequestHandler`. Por ejemplo: 

```python
    def get_book(self, book_id):
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.end_headers()
        response = f"""
         {books[book_id]}
    <p>  Ruta: {self.path}            </p>
    <p>  URL: {self.url}              </p>
    <p>  HEADERS: {self.headers}      </p>
"""
        self.wfile.write(response.encode("utf-8"))
```

Recuerda que el método es miembro de la clase  `WebRequestHandler`, por lo que 
debe incluir como primer parámetro a `self`. 

El problema entonces es hacer un método que tome una ruta que nos han emviado 
en el HTTP request y nos regrese el método a ejecutar y el diccionario con 
los parámetros necesarios: 

```python
    def get_method(self, path):
        for pattern, method in mapping:
            match = re.match(pattern, path)
            if match:
                return (method, match.groupdict())
```

Para que entiendas mejor la lócica del método te recomiendo que lo implementes 
primero en el REPL de python y veas como funciona el ciclo, imprimiendo los valores.

Por ejemplo:

```python
Python 3.11.3 (main, Apr  7 2023, 20:13:31) [Clang 14.0.0 (clang-1400.0.29.202)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> mapping = [('map1', 'method1'), ('map2', 'method2'), ('map3', 'method3')]
>>> for map, method in mapping:
...     print(map, method)
...
map1 method1
map2 method2
map3 method3
```
Cuando se hace el ciclo, se desempaca cada elemento de las tuplas y se asigna 
a cada uno de los nombres.

En `get_method`: en el caso de que haya un match en alguno de los patrones
`match` no será `None` por lo que la condición `if match:` se cumple 
y podemos regresar la tupla `(method, match.groupdict())` con el método y 
los parámetros en forma del diccionario (ver `groupdict()`).

El método handler `do_GET(self)` quedaría de esta manera: 

```python
    def do_GET(self):
        method = self.get_method(self.url.path)
        if method:
            method_name, dict_params = method
            method = getattr(self, method_name)
            method(**dict_params)
            return 
        else:
                self.send_error( 404, "Not Found") 
```
Es importente que entiendas estos puntos:

1. El método `self.get_method` regresa nulo en caso de que no se
haya encontrado concordancia con algún patrón.
2. El método incluido de fábrica `getattr`, nos regresa el método 
que especificamos como cadena en el segundo parámetro. Por ejemplo: 

```python
>>> m = getattr("hola", 'upper')
>>> m()
'HOLA'
```
El objeto `"hola"` que es una cadena, incluye un método `upper` el cual 
al ejecutarlo nos regresa la cadena en mayúsculas. Con `getattr` recuperamos ese 
método y lo atamos a el nombre `m`. Ahora podemos ejecutar el método llámandolo 
con paréntesis. Algo importante es que el método sigue asociado al objeto `"hola"`
por lo que despliega `'HOLA'`. 

Por último, podemos llamar a un método enviando los parámetros en un 
diccionario. Para esto enviamos los parametros anteponiendo `**`. 


