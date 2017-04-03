myApp.controller('fleetsCtrl', function ($scope, fleets) {
    $scope.list = fleets.list;
});
myApp.controller('fleetCtrl', function ($scope, $http, $routeParams, $rootScope, fleets, vehicles, parameters, $route, $templateCache) {
    var v_id;
    var v_nameFleet;
    $scope.isDisabled = "disabled";
    //
    //
    $scope.init = function () {
        $scope.id = null;
        $scope.fleet = fleets.getFleet(parseInt($routeParams.id));
    }
    $scope.init();
    $scope.clickevent = function (id, name) {
        $scope.id = id
        $scope.$broadcast('transfer', {
            message: id
        });
        $scope.nameFleet = name;
        v_id = $scope.id;
        v_nameFleet = $scope.nameFleet;
        $scope.isDisabled = "";
    }
    $scope.updateFleet = function () {
        var data = {
            id: $scope.id,
            id_company: $routeParams.id,
            name: $scope.nameFleet
        };
        $http.put(myUrl + "Fleets/Update", JSON.stringify(data)).then(function () {
            Materialize.toast('Elemento actualizado correctamente', 3000);
            $scope.refreshData();
        });
    }
    $scope.insertFleet = function () {
        var data = {
            id: 0,
            id_company: $routeParams.id,
            name: $scope.nameFleet
        };
        $http.post(myUrl + "Fleets/Insert", JSON.stringify(data)).then(function () {
            Materialize.toast('Elemento insertado correctamente', 3000);
            $scope.refreshData();
        });
    }
    $scope.deleteFleet = function () {
        $http.delete(myUrl + "Fleets/" + $scope.id).then(function () {
            Materialize.toast('Elemento borrado correctamente', 3000);
            $scope.refreshData();
        }).error(function () {
            Materialize.toast('No se ha podido borrar el elemento', 4000);
        });
    }
    $scope.cancelFleet = function () {
        $scope.init();
        $scope.clickevent(v_id, v_nameFleet);
    }
    $scope.limpiarFleet = function () {
        //$routeParams.id = ""
        $scope.nameFleet = ""
        $("#fleet").val('');
        $("#updateF").hide();
        $("#insertF").show();
        $scope.$broadcast('clear', {
            message: 1
        });
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'fleet');
            }, 1000);
        }, 1000);
    }
});
myApp.controller('fleetVehiculeCtrl', function ($scope, vehicles, parameters) {
    $scope.$on('transfer', function (event, data) {
        $scope.vehicles = vehicles.getVehicleFleet(data.message);
        //$scope.broadcastmessage = data.message;
    });
    $scope.$on('clear', function (event, data) {
        $scope.vehicles = {};
    });
});