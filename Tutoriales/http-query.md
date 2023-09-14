
```
Python 3.10.12 (main, Jun 11 2023, 05:26:28) [GCC 11.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from urllib.parse import parse_qsl, urlparse

>>> url = urlparse("/Books/2?id=12&name=hola")

>>> url
ParseResult(scheme='', netloc='', path='/Books/2', params='', query='id=12&name=hola', fragment='')

>>> url.query
'id=12&name=hola'

>>> url.query
'id=12&name=hola'

>>> parse_qsl(url.query)
[('id', '12'), ('name', 'hola')]

>>> url = urlparse("/Books/2?id=12&name=hola,bye")
>>> parse_qsl(url.query)
[('id', '12'), ('name', 'hola,bye')]

>>> url.path
'/Books/2'

>>> import re

>>> re.findall(r'/Books/(\d+)', url.path)
['2']

>>> re.findall(r'^/Books/(\d+)$', url.path)
['2']
```
