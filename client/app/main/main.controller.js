'use strict';

angular.module('mscApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.loading = false;

    $scope.config = {
      token: "Or6smnHiEKHp",
      estado: "",
      partido: ""
    }
    $scope.dilma = {
        "id": "1511135",
        "apelido": "DILMA",
        "nome": "DILMA VANA ROUSSEFF",
        "numero": "13",
        "titulo": "022370630434",
        "matricula": "280000000083",
        "cargo": "Presidente",
        "estado": "BR",
        "partido": "PT",
        "idade": "66",
        "instrucao": "SUPERIOR COMPLETO",
        "ocupacao": "PRESIDENTE DA REPÚBLICA",
        "miniBio": "É formada em economia. É mineira.\r\nFez militância política armada contra a Ditadura Militar (1964-1985), integrando o Comando de Libertação Nacional (Colina) e a Vanguarda Armada Revolucionária Palmares (VAR-Palmares). Passou três anos presa (1970-1972), quando foi submetida a sessões de tortura. Ajudou a fundar o PDT.",
        "cargos": "É presidente da República. Foi secretária da Fazenda de Porto Alegre (1986-1988), presidente da Fundação de Economia e Estatística do Rio Grande do Sul (1991-1993) e secretária de Energia, Minas e Comunicações duas vezes (1993-1994/ 1999-2000). Já no PT, foi ministra de Minas e Energia (2003-2005) e ministra-chefe da Casa Civil (2005-2010). Eleita presidente da República em 2010.",
        "reeleicao": true,
        "foto": "http://divulgacand2014.tse.jus.br/divulga-cand-2014/eleicao/2014/UF/BR/foto/280000000083.jpg",
        "casaAtual": "0",
        "previsao": "0",
        "bancadas": ""
    };

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
      $scope.loading = true;
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
        $scope.loading = false;
      });
    }

    reqR();

    function randomize(arr){
      var toRandomize = arr.length;
      return Math.floor(Math.random() * toRandomize);
    }

    $scope.vote = function($event, id) {
      $scope.loading = true;
      var reqVoto = {
        method: "POST",
        url: "api/votos",
        data: {
          "id_votado": id
        }
      };


      $http(reqVoto).success(function(){
        reqR();
      });

      $event.preventDefault();
    };
  });
