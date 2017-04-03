myApp.controller('driversCtrl', function ($scope, drivers) {
    $scope.list = drivers.list;
});
myApp.controller('driverCtrl', function ($scope, $http, $routeParams, $rootScope, drivers, parameters, $route, $templateCache) {
    var v_id;
    var v_name;
    var v_surname;
    var v_id_company;
    var v_personal_id;
    var v_phone_number;
    $scope.isDisabled = "disabled";
    //
    //
    $scope.driver = drivers.getDriver(parseInt($routeParams.id));
    //
    //
    $scope.clickevent = function ($index, id, name, surname, id_company, personal_id, phone_number) {
            v_id = id;
            v_name = name;
            v_surname = surname;
            v_id_company = id_company;
            v_personal_id = personal_id;
            v_phone_number = phone_number;
            $scope.id = id;
            $scope.name = name;
            $scope.surname = surname;
            $scope.id_company = id_company;
            $scope.personal_id = personal_id;
            $scope.phone_number = phone_number;
            $scope.isDisabled = "";
        }
        //
        //
    $scope.updateDriver = function () {
            var dataDriver = {
                "id": $scope.id,
                "name": $scope.name,
                "surname": $scope.surname,
                "id_company": $scope.id_company,
                "personal_id": $scope.personal_id,
                "phone_number": $scope.phone_number
            };
            $http.put(myUrl + "Driver/Update", JSON.stringify(dataDriver)).then(function () {
                Materialize.toast('Conductor actualizado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.insertDriver = function () {
            var dataDriver = {
                "id": $scope.id,
                "name": $scope.name,
                "surname": $scope.surname,
                "id_company": parseInt($routeParams.id),
                "personal_id": $scope.personal_id,
                "phone_number": $scope.phone_number
            };
            $http.post(myUrl + "driver/Insert", JSON.stringify(dataDriver)).then(function () {
                Materialize.toast('Conductor insertado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.deleteDriver = function () {
            $http.delete(myUrl + "driver/delete/" + $scope.id).then(function () {
                Materialize.toast('Elemento borrado correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
        //
    $scope.cancelDriver = function () {
            $scope.clickevent(1, v_id, v_name, v_surname, v_id_company, v_personal_id, v_phone_number);
        }
        //
        //
    $scope.limpiarDriver = function () {
        $scope.id = "";
        $scope.name = "";
        $scope.surname = "";
        $scope.id_company = "";
        $scope.personal_id = "";
        $scope.phone_number = "";
        $("#name").val('');
        $("#surename").val('');
        $("#id_company").val('');
        $("#personal_id").val('');
        $("#phone_number").val('');
        $("#updateD").hide();
        $("#insertD").show();
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'driver');
            }, 1000);
        }, 1000);
    }
});