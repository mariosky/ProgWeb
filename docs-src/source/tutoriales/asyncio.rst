```rst
Programación Asíncrona con asyncio
==================================

Introducción
------------

La programación asíncrona en Python permite ejecutar múltiples tareas de manera concurrente sin bloquear la ejecución
del programa. Este modelo es especialmente útil cuando trabajamos con operaciones de entrada/salida (*I/O*), por ejemplo:

* Peticiones HTTP
* Bases de datos
* Redis
* WebSockets
* Lectura y escritura de archivos
* Servicios web

En aplicaciones modernas, particularmente utilizando frameworks como
:contentReference[oaicite:0]{index=0},
la programación asíncrona permite atender miles de conexiones concurrentes utilizando pocos recursos.

La idea principal es simple:

    Cuando una tarea está esperando una operación lenta de I/O, el programa puede continuar ejecutando otras tareas.

Funciones asíncronas
--------------------

Las funciones asíncronas se definen utilizando la palabra reservada ``async``:

.. code-block:: python

    async def hola():
        print("Hola")

Estas funciones no se ejecutan inmediatamente. Al invocarlas regresan un objeto especial llamado *coroutine*.

.. code-block:: python

    c = hola()

    print(c)

Resultado:

.. code-block:: text

    <coroutine object hola at 0x...>

Para ejecutar una coroutine necesitamos un *event loop*.

El event loop
-------------

El *event loop* es el mecanismo encargado de coordinar y ejecutar las tareas asíncronas.

La manera moderna de iniciar un event loop en Python es mediante:

.. code-block:: python

    import asyncio

    asyncio.run(hola())

Internamente sucede algo similar a:

.. code-block:: python

    loop = crear_event_loop()

    loop.run_until_complete(hola())

    loop.close()

La función ``asyncio.run()``:

* crea el event loop
* ejecuta la coroutine principal
* mantiene vivo el loop
* lo cierra al terminar

La palabra await
----------------

La palabra reservada ``await`` indica:

    Espera este resultado sin bloquear el programa.

Veamos un ejemplo:

.. code-block:: python

    import asyncio

    async def hola():

        print("Inicio")

        await asyncio.sleep(2)

        print("Fin")

    asyncio.run(hola())

Resultado:

.. code-block:: text

    Inicio
    (espera 2 segundos)
    Fin

Durante la espera de ``asyncio.sleep(2)``, el event loop puede ejecutar otras tareas.

Importante
~~~~~~~~~~

La instrucción:

.. code-block:: python

    await algo()

no significa:

    «detener el programa completamente»

sino:

    «pausar esta coroutine y ejecutar otras tareas mientras esperamos»

Diferencia entre time.sleep y asyncio.sleep
-------------------------------------------

Una confusión común consiste en pensar que ``asyncio.sleep()`` es equivalente a ``time.sleep()``.

No es así.

``time.sleep()``
~~~~~~~~~~~~~~~~

.. code-block:: python

    import time

    time.sleep(5)

Bloquea completamente el hilo actual.

Durante esos cinco segundos el programa no puede continuar.

``asyncio.sleep()``
~~~~~~~~~~~~~~~~~~~

.. code-block:: python

    await asyncio.sleep(5)

Pausa únicamente la coroutine actual y permite que el event loop siga ejecutando otras tareas.

Esto es fundamental para aplicaciones web concurrentes.

Concurrencia
------------

La programación asíncrona no implica necesariamente paralelismo.

Por ejemplo:

.. code-block:: python

    import asyncio

    async def hola():
        await asyncio.sleep(2)

    for i in range(6):
        asyncio.run(hola())

Este código tarda aproximadamente doce segundos porque las tareas se ejecutan secuencialmente.

Cada llamada a ``asyncio.run()``:

* crea un nuevo event loop
* ejecuta una sola coroutine
* termina el loop

Para ejecutar tareas concurrentemente debemos utilizar múltiples coroutines dentro del mismo event loop.

Ejemplo:

.. code-block:: python

    import asyncio

    async def hola(i):

        print(f"Inicio {i}")

        await asyncio.sleep(2)

        print(f"Fin {i}")

    async def main():

        await asyncio.gather(
            hola(1),
            hola(2),
            hola(3),
            hola(4),
            hola(5),
            hola(6)
        )

    asyncio.run(main())

Ahora el programa tarda aproximadamente dos segundos.

asyncio.gather()
----------------

La función ``asyncio.gather()`` permite ejecutar múltiples coroutines concurrentemente.

Ejemplo:

.. code-block:: python

    await asyncio.gather(
        tarea1(),
        tarea2(),
        tarea3()
    )

Todas las tareas se ejecutan dentro del mismo event loop.

La función espera a que todas terminen.

create_task()
-------------

Otra función importante es ``asyncio.create_task()``.

Esta función programa una coroutine para ejecutarse concurrentemente.

Ejemplo:

.. code-block:: python

    import asyncio

    async def worker():

        print("Inicio")

        await asyncio.sleep(3)

        print("Fin")

    async def main():

        asyncio.create_task(worker())

        print("Main continúa")

        await asyncio.sleep(5)

    asyncio.run(main())

Resultado:

.. code-block:: text

    Main continúa
    Inicio
    (3 segundos)
    Fin

A diferencia de ``await``, ``create_task()`` no espera automáticamente el resultado.

La tarea se ejecuta «en segundo plano» dentro del event loop.

Importante
~~~~~~~~~~

``create_task()`` devuelve un objeto ``Task``.

.. code-block:: python

    task = asyncio.create_task(worker())

Posteriormente podemos esperar su resultado:

.. code-block:: python

    await task

Programación asíncrona y operaciones de I/O
-------------------------------------------

La programación asíncrona es especialmente útil para operaciones lentas de entrada/salida.

Por ejemplo:

* consultas Redis
* acceso a bases de datos
* peticiones HTTP
* lectura de archivos
* WebSockets

Ejemplo con Redis:

.. code-block:: python

    val = await redis.get("archivo")

Aquí:

1. Python envía una petición a Redis
2. Redis procesa la solicitud
3. Mientras llega la respuesta, el event loop ejecuta otras tareas
4. Cuando Redis responde, la coroutine continúa

Esto permite manejar miles de conexiones concurrentes eficientemente.

Polling y asyncio.sleep()
-------------------------

Supongamos el siguiente código:

.. code-block:: python

    while True:

        val = await redis.get(filename)

        if val == "ok":
            break

Sin una pausa, este ciclo consultaría Redis miles o millones de veces por segundo.

Para evitarlo utilizamos:

.. code-block:: python

    await asyncio.sleep(1)

Esto significa:

    «espera un segundo antes de volver a consultar»

Además, durante esa espera el event loop puede continuar ejecutando otras tareas.

Importante
~~~~~~~~~~

``asyncio.sleep()`` NO espera a Redis.

Redis ya fue esperado aquí:

.. code-block:: python

    await redis.get(filename)

La pausa es adicional y voluntaria.

Generadores asíncronos
----------------------

Los generadores asíncronos combinan:

* ``await``
* ``yield``

Ejemplo:

.. code-block:: python

    async def generador():

        await asyncio.sleep(1)

        yield "Hola"

Estos generadores son ideales para:

* Server-Sent Events (SSE)
* WebSockets
* Streaming HTTP
* generación incremental de datos
* APIs de inteligencia artificial

Ejemplo de SSE con FastAPI
--------------------------

El siguiente ejemplo implementa un flujo SSE utilizando
:contentReference[oaicite:1]{index=1}
y
:contentReference[oaicite:2]{index=2}.

.. code-block:: python

    import asyncio
    import json

    import redis.asyncio as redis

    from fastapi import FastAPI, Request
    from fastapi.responses import StreamingResponse

    app = FastAPI()

    redis_client = redis.from_url(
        "redis://localhost:6379",
        encoding="utf-8",
        decode_responses=True
    )

    async def event_generator(filename: str):

        while True:

            val = await redis_client.get(filename)

            if val == "ok":

                data = json.dumps({
                    "content": filename
                })

                yield f"data: {data}\n\n"

                break

            await asyncio.sleep(1)

    @app.get("/events/{filename}")
    async def events(request: Request, filename: str):

        return StreamingResponse(
            event_generator(filename),
            media_type="text/event-stream"
        )

En este ejemplo:

* la coroutine consulta Redis
* espera asincrónicamente
* produce eventos incrementalmente mediante ``yield``

Esto permite implementar notificaciones en tiempo real de manera eficiente.

Resumen
-------

En esta sección vimos los conceptos fundamentales de la programación asíncrona en Python:

* ``async def`` define funciones asíncronas
* ``await`` pausa una coroutine sin bloquear el programa
* ``asyncio.run()`` crea y ejecuta el event loop
* ``asyncio.gather()`` ejecuta múltiples coroutines concurrentemente
* ``asyncio.create_task()`` programa tareas concurrentes
* ``asyncio.sleep()`` pausa cooperativamente una coroutine
* los generadores asíncronos permiten producir datos incrementalmente

La programación asíncrona es uno de los pilares fundamentales del desarrollo moderno de APIs, servicios web y sistemas distribuidos en Python.
```
.. note::
 
 Contenido creado utilizando asistente ChatGPT.
