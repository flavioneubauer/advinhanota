angular.module('starter.services', [])

.factory('Notas', function() {

    var notas = ["Dó", "Ré", "Mi", "Fá", "Sól", "Lá", "Sí"];

    var ultimaNota = null;
    var minInterval = -3;
    var maxInterval = +3;

    function getRandom(max){
        return Math.floor((Math.random()*max));
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        proximaNota : function(){
            var n = ultimaNota;
            while(n == ultimaNota)
                n = getRandom(notas.length) || 1;
            ultimaNota = n;
            return n;
        },
        proximoIntervalo :function(){
            var n = getRandomInt(minInterval, maxInterval);
            while(n == 0)
                n = getRandomInt(minInterval, maxInterval);

            return n;
        },
        setIntervalos: function(min, max) {
          minInterval = min;
          maxInterval = max;
        },
        all: function() {
          return notas;
        },
        size: function(){
          return notas.length;
        },
        isIntervaloCorreto: function(indiceNota, intervalo, escolhida) {

            var experada = (indiceNota + (intervalo+notas.length)) % notas.length;
            console.log(experada, escolhida)
            return experada == escolhida;
        },
        get: function(pos){
          return notas[pos];
      },
      getWithInterval: function(pos, interval){
        return notas[(pos+interval+notas.length) % notas.length];
      }
  };
 });
