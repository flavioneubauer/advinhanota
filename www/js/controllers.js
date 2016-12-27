angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Notas,ionicToast,$timeout,$interval) {

    $scope.nota = null;
    $scope.escolhida = null;
    $scope.playing = false;
    $scope.response = null;
    $scope.count = 0;
    $scope.intervalTimer = null;
    $scope.totalTimer = 5;
    $scope.minInterval = -3;
    $scope.maxInterval = +3;
    $scope.notaResultado = "?";

    function showToast(status){
        var message = 'Nota incorreta. Tente novamente';
        if(status)
            message = 'Muito bem !';

        ionicToast.show(message,'bottom',false, 2500);
    }

    function setTimer() {

        if($scope.intervalTimer){
            $interval.cancel($scope.intervalTimer);
        }

        $scope.timer = 0;

        $scope.intervalTimer = $interval(function(){

            $scope.timer++;

            if($scope.timer == $scope.totalTimer){
                $scope.timer = 0;

                if($scope.playing){
                    proximaNota();
                }
            }

        },1000);

    }

    function proximaNota(){

        $scope.indiceNota = Notas.proximaNota();
        $scope.nota = Notas.get($scope.indiceNota);
        $scope.intervalo = Notas.proximoIntervalo();
        $scope.escolhida = null;
        $scope.notaResultado = "?";

        setTimer();

    }

    $scope.escolher = function(indice){

        if(Notas.isIntervaloCorreto($scope.indiceNota, $scope.intervalo, indice)){
            $interval.cancel($scope.intervalTimer);
            $scope.notaResultado = Notas.getWithInterval($scope.indiceNota, $scope.intervalo);
            $timeout(function(){
                proximaNota();
            }, 2000);

        }else{
            showToast(false);
        }
    }

    $scope.getNotas = function(){
        return Notas.all();
    }

    $scope.play = function(totalTimer, minInterval, maxInterval){

        Notas.setIntervalos(minInterval, maxInterval);

        $scope.totalTimer = totalTimer;
        $scope.playing = true;
        $scope.count = $scope.totalTest;

        proximaNota();

    }

    $scope.pause = function(){
        $scope.playing = false;

        if($scope.intervalTimer){
            $interval.cancel($scope.intervalTimer);
        }
    }

});
