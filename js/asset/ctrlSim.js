myApp.controller('simsCtrl', function ($scope, sims) {
    $scope.list = sims.list;
});
myApp.controller('simCtrl', function ($scope, $http, $routeParams, $rootScope, sims, parameters, $route, $templateCache) {
    var v_id;
    var v_operator;
    var v_number;
    var v_icc;
    $scope.isDisabled = "disabled";
    //
    //
    $scope.sim = sims.list;
    //
    //
    $http.get(myUrl + "Sims/Operator").success(function (data) {
        OperatorArray = data;
        var newArray = OperatorArray.map(function (item) {
            return {
                'name': item
            }
        })
        $scope.operator = newArray;
    });
    //
    //
    $scope.clickevent = function ($index, id, operator, number, icc) {
            v_id = id;
            v_operator = operator;
            v_number = number;
            v_icc = icc;
            $scope.id = id;
            $scope.number = number;
            $scope.icc = icc;
            $scope.selectedOperator = operator;
        $scope.isDisabled = "";
        }
        //
        //
    $scope.updateSim = function () {
            var dataSim = {
                "id": $scope.id,
                "operador": $scope.selectedOperator,
                "number": $scope.number,
                "icc": $scope.icc
            };
            $http.put(myUrl + "Sims/Update", JSON.stringify(dataSim)).then(function () {
                Materialize.toast('SIM actualizado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.insertSim = function () {
            var dataSim = {
                "id": 0,
                "operador": $scope.selectedOperator,
                "number": $scope.number,
                "icc": $scope.icc
            };
            $http.post(myUrl + "Sims/Insert", JSON.stringify(dataSim)).then(function () {
                Materialize.toast('SIM insertado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.deleteSim = function () {
            $http.delete(myUrl + "Sims/delete?id=" + $scope.id).then(function () {
                Materialize.toast('Elemento borrado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.cancelSim = function () {
            $scope.clickevent(1, v_id, v_operator, v_number, v_icc)
        }
        //
        //
    $scope.limpiarSim = function () {
        $scope.id = "";
        $scope.opertator = "";
        $scope.number = "";
        $scope.icc = "";
        $scope.selectedOperator = "";
        $("#operator").val('');
        $("#number").val('');
        $("#icc").val('');
        $("#updateSim").hide();
        $("#insertSim").show();
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'sim');
            }, 1000);
        }, 1000);
    }
});