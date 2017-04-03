myApp.controller('devicesCtrl', function ($scope, devices) {
    $scope.list = devices.list;
});
myApp.controller('deviceCtrl', function ($scope, $http, $routeParams, $rootScope, devices, sims, parameters, $route, $templateCache) {
    var v_id;
    var v_id_sim;
    var v_system_id;
    var v_imei;
    var v_phone_number;
    var v_selectedSim;
    var v_selectedModel;
    $scope.isDisabled = "disabled";
    //
    //

    $scope.init = function () {
        $scope.device = devices.list;
        //
        //
        $http.get(myUrl + "Devices/Models").success(function (data) {
            $scope.models = data;
        });
        //
        //
        $http.get(myUrl + "Sims/Group").success(function (data) {
            $scope.sims = data;
        });
    }
    $scope.init();
    //
    //
    $scope.clickevent = function ($index, id, id_devicemodel, id_sim, system_id, IMEI, phone_number) {
            v_id = id;
            v_id_sim = id_sim;
            v_system_id = system_id;
            v_imei = IMEI;
            v_phone_number = phone_number;
            v_selectedSim = id_sim;
            v_selectedModel = id_devicemodel;
            //
            $scope.id = id;
            $scope.id_sim = id_sim;
            $scope.system_id = system_id;
            $scope.imei = IMEI;
            $scope.phone_number = phone_number;
            $scope.selectedSim = id_sim;
            $scope.selectedModel = id_devicemodel;

            $scope.isDisabled = "";

        }
        //
        //
    $scope.updateDevice = function () {
            var dataDevice = {
                "id": $scope.id,
                "id_devicemodel": $scope.selectedModel,
                "id_sim": $scope.selectedSim,
                "system_id": $scope.system_id,
                "imei": $scope.imei,
                "phone_number": $scope.phone_number
            };
            $http.put(myUrl + "Devices/Update", JSON.stringify(dataDevice)).then(function () {
                Materialize.toast('Device actualizado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.insertDevice = function () {
            var dataDevice = {
                "id": 0,
                "id_devicemodel": $scope.selectedModel,
                "id_sim": $scope.selectedSim,
                "system_id": $scope.system_id,
                "imei": $scope.imei,
                "phone_number": $scope.phone_number
            };
            $http.post(myUrl + "Devices/Insert", JSON.stringify(dataDevice)).then(function () {
                Materialize.toast('Device insertado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.deleteDevice = function () {
            $http.delete(myUrl + "Devices/delete/" + $scope.id).then(function () {
                Materialize.toast('Elemento borrado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.cancelDevice = function () {
        $scope.init();
        $scope.clickevent(0, v_id, v_selectedModel, v_selectedSim, v_system_id, v_imei, v_phone_number);
    };
    //
    //
    $scope.limpiarDevice = function () {
        $scope.id = "";
        $scope.id_sim = "";
        $scope.system_id = "";
        $scope.imei = "";
        $scope.phone_number = "";
        $scope.selectedSim = "";
        $scope.selectedModel = "";
        $("#system_id").val('');
        $("#imei").val('');
        $("#updateDev").hide();
        $("#insertDev").show();
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'device');
            }, 1000);
        }, 1000);
    }
});