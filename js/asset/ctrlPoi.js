myApp.controller('poisCtrl', function ($scope, pois, poistype) {
    $scope.list = pois.list;
    $scope.types = poistype.list;
});
myApp.controller('poiCtrl', function ($scope, $http, $routeParams, $rootScope, pois, poistype, parameters, $route, $templateCache) {
    var v_id;
    var v_name;
    var v_latitude;
    var v_longitude;
    var v_radius;
    var v_selectedPoiType;
    $scope.isDisabled = "disabled";
    //
    //
    $scope.poi = pois.getPoi(parseInt($routeParams.id));
    //
    //
    $scope.clickevent = function ($index, id, id_poitype, name, latitude, longitude, radius) {
            v_id = id;
            v_name = name;
            v_latitude = latitude;
            v_longitude = longitude;
            v_radius = radius;
            v_selectedPoiType = parseInt($scope.poi[$index].id_poitype.toString());
            $scope.id = id;
            $scope.name = name;
            $scope.latitude = latitude;
            $scope.longitude = longitude;
            $scope.radius = radius;
            $scope.selectedPoiType = parseInt($scope.poi[$index].id_poitype.toString());
            $scope.isDisabled = "";
        }
        //
        //
    $scope.updatePoi = function () {
            var dataPoi = {
                id: $scope.id,
                id_company: 0,
                name: $scope.name,
                lat: $scope.latitude,
                lng: $scope.longitude,
                rad: $scope.radius,
                type: $scope.selectedPoiType
            };
            $http.put(myUrl + "Poi/Update", JSON.stringify(dataPoi)).then(function () {
                Materialize.toast('POI actualizado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.insertPoi = function () {
            var dataPoi = {
                id: 0,
                id_company: parseInt($routeParams.id),
                name: $scope.name,
                lat: $scope.latitude,
                lng: $scope.longitude,
                rad: $scope.radius,
                type: $scope.selectedPoiType
            };
            $http.post(myUrl + "poi/Insert", JSON.stringify(dataPoi)).then(function () {
                Materialize.toast('POI insertado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.deletePoi = function () {
            $http.delete(myUrl + "poi/delete/" + $scope.id).then(function () {
                Materialize.toast('Elemento borrado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.cancelPoi = function () {
            $scope.clickevent(1, v_id, v_selectedPoiType, v_name, v_latitude, v_longitude, v_radius)
        }
        //
        //
    $scope.limpiarPoi = function () {
        $scope.id = "";
        $scope.name = "";
        $scope.latitude = "";
        $scope.longitude = "";
        $scope.radius = "";
        $scope.selectedPoiType = "";
        $("#poi").val('');
        $("#lat").val('');
        $("#lng").val('');
        $("#rad").val('');
        $("#tipo").val('');
        $("#updateP").hide();
        $("#insertP").show();
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'poi');
            }, 1000);
        }, 1000);
    }
});