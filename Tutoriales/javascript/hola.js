  function hola(){
    if (document.querySelector('h1').innerHTML === 'Bye' )
    document.querySelector('h1').innerHTML = 'Hola';
    else 
    document.querySelector('h1').innerHTML = 'Bye';
  }
  
  document.addEventListener('DOMContentLoaded', function(){  
    document.querySelector('button').onclick = hola;
  });
