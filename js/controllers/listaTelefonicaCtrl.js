var app = angular.module("listaTelefonica", ["ngMessages"]);
app.controller("listaTelefonicaCtrl", function ($scope, $http) {
    $scope.app = "Lista telefônica";
    $scope.contatos = [];

    var carregarContatos = function () {
        $http.get("http://localhost:3001/contatos")
            .then(function s(resp) {
                $scope.contatos = resp.data;
                console.log(resp.data);
        }, function e(data) {
            $scope.message = "Aconteceu um problema:" + data;
        });
    };

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    $scope.adicionarContato = function (contato) {
        $scope.contatos.push(angular.copy(contato));
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };
    $scope.operadoras = [
        { nome: "Oi", código: 14, categoria: "Celular" },
        { nome: "Tim", código: 15, categoria: "Celular" },
        { nome: "Vivo", código: 16, categoria: "Celular" },
        { nome: "GVT", código: 25, categoria: "Fixo" },
        { nome: "Embratel", código: 21, categoria: "Fixo" }
    ];
    $scope.classe1 = "selecionado";
    $scope.classe2 = "negrito";

    carregarContatos();

});
