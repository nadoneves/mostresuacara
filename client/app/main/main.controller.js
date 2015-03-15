'use strict';

angular.module('mscApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.config = {
      token: "Or6smnHiEKHp",
      estado: "",
      partido: ""
    }
    $scope.candidato = [];

    $scope.partidos = [{
      "partido": "1"
    },{
      "partido": "2"
    },{
      "partido": "31"
    },{
      "partido": "20"
    },{
      "partido": "8"
    },{
      "partido": "16"
    },{
      "partido": "19"
    }];
    $scope.estados = [{
        "estado": "DF",
      },{
        "estado": "RJ",
      },{
        "estado": "SP",
      },{
        "estado": "MG",
      },{
        "estado": "PA",
      },{
        "estado": "PR",
      },{
        "estado": "MA"
      }];


    function reqR () {
      $scope.config.partido = $scope.partidos[randomize($scope.partidos)]["partido"];
      $scope.config.estado = $scope.estados[randomize($scope.estados)]["estado"];
      
      var reqP = {
        method: "GET",
        url:'http://api.transparencia.org.br:80/sandbox/v1/candidatos?estado='+ $scope.config.estado +'&partido='+ $scope.config.partido +'',
        headers: {
         "App-token": $scope.config.token
        }
      };

      return $http(reqP).success(function(data){
        if(data.length == 0){
          reqR();
        }else{
          $scope.candidato = data[randomize(data)];
        }
      });
    }

    reqR();

    function randomize(arr){
      var toRandomize = arr.length;
      return Math.floor(Math.random() * toRandomize);
    }

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
