myApp.controller('vehiclesCtrl', function ($scope, vehicles) {
    $scope.list = vehicles.list;
    //$scope.pois = pois.list;
});
myApp.controller('vehicleCtrl', function ($scope, $http, $routeParams, $rootScope, vehicles, vehiclesweekday, fleets, drivers, devices, pois, parameters, $route, $templateCache, $parse) {
    $scope.vehicle = vehicles.getVehicle(parseInt($routeParams.id));
    $scope.fleet = fleets.getFleet(parseInt($routeParams.id));
    $scope.driver = drivers.list;
    $scope.device = devices.list;
    //$scope.getDeviceSelect = devices.getDeviceSelect(parseInt($routeParams.id));
    $scope.poi = pois.getPoi(parseInt($routeParams.id));
    $scope.isDisabled = "disabled";
    //
    $http.get(myUrl + 'Vehicles/SecurityRoute?id=' + $routeParams.id).success(function (data) {
        $scope.SecRoute = data;
    });
    //
    $scope.arrPoi = [];
    $scope.arrSec = [];
    var idSEC = 0;
    //
    $scope.vehicleType = [
        {
            id: 1
            , type: "Small Car"
        }
        , {
            id: 2
            , type: "Car"
        }
        , {
            id: 3
            , type: "Van"
        }
        , {
            id: 4
            , type: "Truck"
        }
        , {
            id: 5
            , type: "Big Truck"
        }
        , {
            id: 6
            , type: "Refrigerated Truck"
        }
        , {
            id: 7
            , type: "Armored Truck"
        }
        , {
            id: 8
            , type: "Earthmoving Machinery"
        }
        , {
            id: 9
            , type: "Ambulance"
        }
        , {
            id: 10
            , type: "Police"
        }
        , {
            id: 11
            , type: "Fire Truck"
        }
        , {
            id: 12
            , type: "Trailer"
        }];
    //
    //CLICK GRAL
    $scope.clickevent = function (id, id_fleet, id_driver, id_vehicletype, name, make, model, year, plate, odometer, color, installation_date_time, chassis_number, factory_color) {
            var device = devices.getDeviceVehicle(id)
            $scope.id = id;
            $scope.selectedFleet = id_fleet;
            $scope.selectedDriver = id_driver;
            $scope.selectedVehicleType = id_vehicletype;
            $scope.name = name;
            $scope.make = make;
            $scope.model = model;
            $scope.year = year;
            $scope.plate = plate;
            $scope.odometer = parseFloat(odometer / 1000).toFixed(2);
            $scope.color = color;
            $scope.inst = installation_date_time;
            $scope.chassis_number = chassis_number;
            $scope.factory_color = factory_color;
            $scope.selectedDevice = device[0].system_id;
            $scope.selectedTel = device[0].phone_number;
            $scope.isDisabled = "";
            //
            $scope.vwd = vehiclesweekday.getVehicle(parseInt(id));
            if ($scope.vwd.length > 0) {
                for (i = 0; i < $scope.vwd.length; i++) {
                    var d = i + 1;
                    var model = $parse('day' + d);
                    if ($scope.vwd[i].allowed == 1) {
                        model.assign($scope, true);
                    }
                    else {
                        model.assign($scope, false);
                    }
                }
            }
            else {
                for (i = 0; i < 6; i++) {
                    var d = i + 1;
                    var model = $parse('day' + d);
                    model.assign($scope, false);
                }
            }
            //cargo POI al array
            $http.get(myUrl + 'Vehicles/Poi?id=' + $scope.id).success(function (data) {
                $scope.arrPoi = [];
                _.forEach(data, function (value) {
                    $scope.arrPoi.push(value);
                });
            });
            //cargo SEC al array
            $http.get(myUrl + 'Vehicles/SecurityRouteData?id=' + $scope.id).success(function (data) {
                $scope.arrSec = [];
                _.forEach(data, function (value) {
                    $scope.arrSec.push(value);
                });
            });
            v_id = $scope.id;
            v_selectedFleet = $scope.selectedFleet;
            v_selectedDriver = $scope.selectedDriver;
            v_selectedVehicleType = $scope.selectedVehicleType;
            v_name = $scope.name;
            v_make = $scope.make;
            v_model = $scope.model;
            v_year = $scope.year;
            v_plate = $scope.plate;
            v_odometer = $scope.odometer;
            v_color = $scope.color;
            v_selectedDevice = $scope.selectedDevice;
            v_selectedTel = $scope.selectedTel;
            v_inst = $scope.inst;
            v_chasis_number = $scope.chasis_number;
            v_factory_color = $scope.factory_color;
            v_vwd = $scope.vwd;
            v_arrPoi = $scope.arrPoi;
            v_arrSec = $scope.arrSec;
        }
        //
        //inserto POI al array
    $scope.clickInsPoi = function (id, name) {
            var dataPoi = {
                "id": 0
                , "id_vehicle": $scope.id
                , "id_poi": id
                , "name": name
            }
            if (_.find($scope.arrPoi, ['id_poi', id]) == undefined) {
                $scope.arrPoi.push(dataPoi);
            }
        }
        //elimino POI del array
    $scope.clickDelPoi = function (id) {
            $scope.arrPoi.splice(id, 1)
        }
        //
        //inserto SEC al array
    $scope.clickInsSec = function (id, id_securityroute, id_vehicle, time_control, start_time, end_time, stop_control, name) {
            if (id_vehicle != $scope.id) {
                id_vehicle = $scope.id;
            }
            var dataSec = {
                "id": 0
                , "id_securityroute": id_securityroute
                , "id_vehicle": id_vehicle
                , "time_control": time_control
                , "start_time": start_time
                , "end_time": end_time
                , "stop_control": stop_control
                , "name": name
            };
            if (_.find($scope.arrSec, ['id_securityroute', id_securityroute]) == undefined || _.find($scope.arrSec, ['id_securityroute', id_securityroute]) == null) {
                $scope.arrSec.push(dataSec);
            }
        }
        //elimino SEC del array
    $scope.clickDelSec = function (id) {
            $scope.arrSec.splice(id, 1)
        }
        //
        //
        //Cargo datos de seguridad
    $scope.clickCargaSeguridad = function (id) {
            $scope.timeControl = $scope.arrSec[id].time_control;
            $scope.startTime = $scope.arrSec[id].start_time;
            $scope.endTime = $scope.arrSec[id].end_time;
            $scope.stopControl = $scope.arrSec[id].stop_control;
            idSEC = id; //$scope.arrSec[id].id_securityroute;
        }
        //
        //
        //Guardo datos de seguridad
    $scope.clickGuardaSeguridad = function () {
            replaceByValue(idSEC, 'time_control', $scope.timeControl);
            replaceByValue(idSEC, 'start_time', $scope.startTime);
            replaceByValue(idSEC, 'end_time', $scope.endTime);
            replaceByValue(idSEC, 'stop_control', $scope.stopControl);
            console.log($scope.arrSec);
        }
        //
        //
        //
    function replaceByValue(id, field, newvalue) {
        $scope.arrSec[id][field] = newvalue;
        return $scope.arrSec;
    }
    ///////////////////////////////////////////////////////
    //
    //
    //UPDATE
    $scope.updateVehicle = function () {
            var dataVehicle = {
                "id": $scope.id
                , "id_company": parseInt($routeParams.id)
                , "id_fleet": $scope.selectedFleet
                , "id_vehicletype": $scope.selectedVehicleType
                , "id_driver": $scope.selectedDriver
                , "name": $scope.name
                , "make": $scope.make
                , "model": $scope.model
                , "year": $scope.year
                , "plate": $scope.plate
                , "odometer": $scope.odometer
                , "color": $scope.color
                , "chassis_number": $scope.chassis_number
                , "factory_color": $scope.factory_color
                , "registry_date_time": $scope.registry_date_time
                , "installation_date_time": $scope.inst
            };
            //
            $http.put(myUrl + "vehicles/Update", JSON.stringify(dataVehicle)).then(function () {
                Materialize.toast('Vehiculo actualizado correctamente', 3000);
                $scope.refreshData();
            });
            //
            for (i = 1; i <= 7; i++) {
                var weekDay = {
                    "id_vehicle": $scope.id
                    , "id_weekday": i
                    , "allowed": $scope['day' + i]
                };
                $http.put(myUrl + "Vehicles/WeekDay/Update", JSON.stringify(weekDay)).then(function () {});
            }
            //
            var dataDevice = {
                "id_vehicle": $scope.id
                , "id_company": parseInt($routeParams.id)
                , "system_id": $scope.selectedDevice
                , "phone_number": $scope.selectedTel
            };
            $http.put(myUrl + "Vehicles/Device/Update", JSON.stringify(dataDevice)).then(function () {
                Materialize.toast('Dispositivo actualizado correctamente', 3000);
            });
            //
            var dataVehiclePoi = $scope.arrPoi;
            $http.put(myUrl + "Vehicles/Poi/Update", JSON.stringify(dataVehiclePoi)).then(function () {
                Materialize.toast('POI actualizado correctamente', 3000);
            });
            //
            $http.put(myUrl + "Vehicles/Sec/Update", JSON.stringify($scope.arrSec)).then(function () {
                Materialize.toast('SEC actualizado correctamente', 3000);
            });
            //
            $scope.refreshData();
        }
        //
        //
        /////////////////////////////////////////////////////
        //
        //
        //INSERT
    $scope.insertVehicle = function () {
            var dataVehicle = {
                "id": $scope.id
                , "id_company": parseInt($routeParams.id)
                , "id_fleet": $scope.selectedFleet
                , "id_vehicletype": $scope.selectedVehicleType
                , "id_driver": $scope.selectedDriver
                , "name": $scope.name
                , "make": $scope.make
                , "model": $scope.model
                , "year": $scope.year
                , "plate": $scope.plate
                , "odometer": $scope.odometer
                , "color": $scope.color
                , "chassis_number": $scope.chassis_number
                , "factory_color": $scope.factory_color
                , "registry_date_time": $scope.registry_date_time
                , "installation_date_time": $scope.inst
            };
            //
            $http.post(myUrl + "vehicles/Insert", JSON.stringify(dataVehicle)).then(function () {
                Materialize.toast('Vehiculo insertado correctamente', 3000);
                var dataDevice = {
                    "id_vehicle": $scope.id
                    , "id_company": parseInt($routeParams.id)
                    , "system_id": $scope.selectedDevice //s[0].system_id
                        
                    , "phone_number": $scope.selectedTel //p[0].phone_number
                };
                $http.post(myUrl + "Vehicles/Device/Insert", JSON.stringify(dataDevice)).then(function () {
                    Materialize.toast('Dispositivo insertado correctamente', 3000);
                });
            });
            //
            //var s = devices.getDeviceVehicle($scope.selectedDevice);
            //var p = devices.getDeviceVehicle($scope.selectedTel);
            //
            var dataVehiclePoi = $scope.arrPoi;
            $http.post(myUrl + "Vehicles/Poi/Insert", JSON.stringify(dataVehiclePoi)).then(function () {
                Materialize.toast('POI insertado correctamente', 3000);
            });
            //
            $http.put(myUrl + "Vehicles/Sec/Update", JSON.stringify($scope.arrSec)).then(function () {
                Materialize.toast('SEC insertado correctamente', 3000);
                //
                //fix de dias
                //
                for (i = 1; i <= 7; i++) {
                    var weekDay = {
                        "id_vehicle": $scope.id
                        , "id_weekday": i
                        , "allowed": $scope['day' + i]
                    };
                    $http.post(myUrl + "Vehicles/WeekDay/Insert", JSON.stringify(weekDay)).then(function () {});
                }
                Materialize.toast('Dias insertados correctamente', 3000);
            });
            //
            $scope.refreshData();
        }
        /////////////////////////////////////////////////////
        //
        //
        //DELETE
    $scope.deleteVehicle = function () {
            $http.delete(myUrl + "Vehicles/" + $scope.id).then(function () {
                Materialize.toast('Vehiculo eliminado correctamente', 3000);
            });
            $scope.refreshData();
        }
        //
        //
    $scope.cancelVehicle = function () {
            $scope.clickevent(v_id, v_selectedFleet, v_selectedDriver, v_selectedVehicleType, v_name, v_make, v_model, v_year, v_plate, v_odometer, v_color, v_inst, v_chasis_number, v_factory_color)
        }
        //
    $scope.limpiarVehicle = function () {
        $scope.id = "";
        $scope.selectedFleet = "";
        $scope.selectedVehicleType = "";
        $scope.selectedDriver = "";
        $scope.name = "";
        $scope.make = "";
        $scope.model = "";
        $scope.year = "";
        $scope.plate = "";
        $scope.odometer = "";
        $scope.color = "";
        $scope.chasis_number = "";
        $scope.factory_color = "";
        $scope.registry_date_time = "";
        $scope.inst = "";
        $scope.selectedDevice = "";
        $scope.selectedTel = "";
        $("#name").val('');
        $("#make").val('');
        $("#model").val('');
        $("#year").val('');
        $("#plate").val('');
        $("#odometer").val('');
        $("#color").val('');
        $("#chassis_number").val('');
        $("#factory_color").val('');
        $("#registry_date_time").val('');
        $("#installation_date_time").val('');
        for (i = 1; i <= 7; i++) {
            $scope['day' + i] = "";
        }
        $scope.arrPoi = [];
        $scope.arrSec = [];
        $("#updateV").hide();
        $("#insertV").show();
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'vehicle');
                1000
            }, 1000);
        }, 1000);
    }
});