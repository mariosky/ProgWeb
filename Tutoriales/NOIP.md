## Nombres y direcciones IP en AWS-EC2 

Cuando lanzamos una nueva instancia de EC2 se le asigna automáticamente una
dirección IP pública y un nombre DNS (Domain Name System). Podemos utilizar el
nombre en lugar de la IP, pero es muy largo. Es algo parecido a esto:
`ec2-12-34-56-78.us-west-2.compute.amazonaws.com`. El problema principal es que
tanto la IP y el nombre se vuelven a generar cada vez que terminamos (apagamos)
la instancia. 

En nuestro caso, debemos apagar y reiniciar constantemente nuestros servidores para 
ahorrar recursos. Tenemos que estar vistando el Dashboard de EC2 para ver cual es 
la nueva dirección IP para conectarnos al server por medio de una sesión SSH. 

## DNS Dinámicos

Los servicios de DNS dinámicos nos permiten configurar de manera gratuita 
nombres de host utilizando alguno de sus subdominios. Por ejemplo:`miserver.ddns.me`.
Este nombre es más corto y fácil de recordar para nuestros servidores de desarrollo y 
en nuestro caso no es necesario contar con un nombre de host específico. 

Estos servicios nos permiten cambiar fácilmente la dirección IP destino de nuesto 
nombre de host. Por ejemplo, al reinicar la instancia, podemos ejecutar un script o 
servicio que actualice la IP en el servicio de DNS Dinámico. De esta manera nos 
podemos conectar al servidor sin necesidad de saber cual es la nueva IP que le 
asignó AWS al arrancar.

Existen varias opciones de servicios de DNS dinámicos, entre ellas podemos resaltar: 

* [NO-IP](https://www.noip.com/) Esta es una de las opciones más populares y ofrece 
otros servicios profesionales. 
* [DuckDNS](https://duckdns.org) Servicio minimalista que ofrece justo la funcionalidad 
que necesitatmos. 
* [Cloudflare]() Servicio de alto desempeño con una capa gratuita. Múltiples servicios de 
gran calidad.
* [afraid.org](https://freedns.afraid.org/) Otro servicio básico.

En este caso utilizaremos el servicio de NO-IP. Una razón importante para elegir este 
servicio es la posibilidad de instalar el cliente de actualización como un servicio 
de la instancia. Esto nos permite ver fácilmente su estatus y nos aseguramos de que 
inicie al momento de lanzar la instancia.

## NOIP en Ubuntu 22.04 
Como primer paso debes de crear una cuenta en el sitio [NO-IP](https://www.noip.com/)
y después agrega un subdominio de tu elección. Ahora solo debemos instalar el cliente y
asignarlo como un servicio de arranque en nuestra instancia. 

Inicia sesión a tu instancia utilizando el IP asignado. Después de estos 
pasos lo haremos utilizando nuestro nombre de host asignado. 

Vamos a descargar el programa comprimido: 
```
wget https://dmej8g5cpdyqd.cloudfront.net/downloads/noip-duc_3.0.0-beta.7.tar.gz
```
Extraemos el contenido
```
tar xf noip-duc_3.0.0-beta.7.tar.gz
```
Instalamos el programa 
```
cd /home/$USER/noip-duc_3.0.0-beta.7/binaries && sudo apt install ./noip-duc_3.0.0-beta.7_amd64.deb
```

Ya instaldo el DUC (No-IP Dynamic Update Client) lo vamos a configurar 
para que funcione con [systemd](https://es.wikipedia.org/wiki/Systemd). 
Desde el directorio `noip-duc_3.0.0-beta.7` copiamos el folder `debian\server` 
al directorio de systemd

``` 
sudo cp debian/service /etc/systemd/system/noip-duc.service
```

Utilizando `sudo`, crea un archivo de configuración en esta ruta: `/etc/default/noip-duc`

``` 
sudo nvim /etc/default/noip-duc
```

El archivo debe incluir los datos necesarios para la conexión con NO-IP:

``` 
## File: /etc/default/noip-duc
NOIP_USERNAME=
NOIP_PASSWORD=
NOIP_HOSTNAMES=
```

Por ejemplo:

``` 
## File: /etc/default/noip-duc
NOIP_USERNAME=myusername
NOIP_PASSWORD=mypassword
NOIP_HOSTNAMES=example.ddns.net,exampledomain.com,noiptest.redirectme.net
```

Reiniciamos `systemd`:

``` 
sudo systemctl daemon-reload
```

Habilitamos el servicio:

``` 
sudo systemctl enable noip-duc
```
Por último iniciamos el programa: 

``` 
sudo systemctl start noip-duc
```

Para ver el estatus lo hacemos como para cualquier otro sercicio:

``` 
sudo systemctl status noip-duc
```

Reinicia tu instancia y prueba conectarte con tu dominio.
Para que revises si el IP está sido asignado correctamente puedes utilizar un 
servicio como el de (https://mxtoolbox.com/DNSLookup.aspx).

### Reto
Crea un script de Ansible para instalar el DUC.
Los parametros del archivo se deben especificar utilizando variables desde 
un archivo sin control de versiones. Puedes utilizar el concepto de plantillas 
para crear el archivo de configuración.


### Otras fuentes 
* [Set up dynamic DNS on your Amazon Linux instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dynamic-dns.html)
* [How to Install the Linux 3.x Dynamic Update Client (DUC)](https://www.noip.com/support/knowledgebase/install-linux-3-x-dynamic-update-client-duc#install_from_source)  
* [Running the Linux DUC v3.0 at startup](https://www.noip.com/support/knowledgebase/running-linux-duc-v3-0-startup-2)
