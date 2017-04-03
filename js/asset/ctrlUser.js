myApp.controller('usersCtrl', function ($scope, users) {
    $scope.list = users.list;
});
myApp.controller('userCtrl', function ($scope, $http, $routeParams, $rootScope, users, fleets, parameters, $route, $templateCache) {
    var v_index;
    var v_idUser;
    var v_nameFleet;
    var v_nameUser;
    var v_password;
    $scope.isDisabled = "disabled";
    //
    //
    $scope.user = users.getUser(parseInt($routeParams.id));
    $scope.fleet = fleets.getFleet(parseInt($routeParams.idcompany));
    //
    $scope.idUser = null;
    $scope.idFleet = null;
    $scope.arr = [];
    $scope.userType = [
        {
            id: "2",
            type: "Owner"
        }, {
            id: "3",
            type: "Distributor"
        }, {
            id: "4",
            type: "Administrator"
        }, {
            id: "5",
            type: "Operator"
        }, {
            id: "6",
            type: "Viewer"
        }];
    $scope.languageType = [
        {
            id: "2",
            type: "English"
        }, {
            id: "2",
            type: "Français"
        }, {
            id: "3",
            type: "Español"
        }];
    //
    $scope.clickevent = function (index, idUser, login, name, password) {
            $scope.idUser = idUser;
            $scope.$broadcast('transfer', {
                message: idUser
            });
            $scope.nameFleet = login;
            $scope.nameUser = name;
            $scope.password = password;
            $scope.selectedUserType = $scope.user[index].id_usertype.toString();
            $scope.selectedLangType = $scope.user[index].id_language.toString();
            //cargo flotas al array
            $http.get(myUrl + 'UsersFleet?id_user=' + $scope.idUser).success(function (data) {
                $scope.userFleet = data;
                $scope.arr = [];
                _.forEach(data, function (value) {
                    $scope.arr.push(value);
                });
            });
            v_index = index;
            v_idUser = $scope.idUser;
            v_nameFleet = $scope.nameFleet;
            v_nameUser = $scope.nameUser;
            v_password = $scope.password;
            $scope.isDisabled = "";
        }
        //inserto flotas al array
    $scope.clickInsFleet = function (id, name) {
            var data = {
                "id": 0,
                "id_user": $scope.idUser,
                "id_fleet": id,
                "name": name
            }
            if (_.find($scope.arr, ['id_fleet', id]) == undefined) {
                $scope.arr.push(data);
                $scope.userFleet = $scope.arr;
            }
            $scope.idFleet = id;
        }
        //elimino flotas del array
    $scope.clickDelFleet = function (id) {
            $scope.arr.splice(id, 1)
        }
        //
    $scope.updateUser = function () {
            var dataUser = {
                id: $scope.idUser,
                id_usertype: $scope.selectedUserType,
                id_company: $routeParams.id,
                id_language: $scope.selectedLangType,
                name: $scope.nameUser,
                login: $scope.nameFleet,
                password: $scope.password
            };
            var dataFleet = $scope.arr;
            //
            $http.put(myUrl + "users/Update", JSON.stringify(dataUser)).then(function () {
                Materialize.toast('Usuario actualizado correctamente', 3000);
            });
            $http.put(myUrl + "usersFleet/Update", JSON.stringify(dataFleet)).then(function () {
                Materialize.toast('Flotas actualizadas correctamente', 3000);
                $scope.refreshData();
            });
        }
        //
    $scope.insertUser = function () {
            var dataUser = {
                id: 0,
                id_usertype: $scope.selectedUserType,
                id_company: $routeParams.id,
                id_language: $scope.selectedLangType,
                name: $scope.nameUser,
                login: $scope.nameFleet,
                password: $scope.password
            };
            var dataFleet = $scope.arr;
            //
            $http.post(myUrl + "Users/Insert", JSON.stringify(dataUser)).then(function () {
                Materialize.toast('Usuario insertado correctamente', 3000);
                $http.post(myUrl + "UsersFleet/Insert", JSON.stringify(dataFleet)).then(function () {
                    Materialize.toast('Flotas insertadas correctamente', 3000);
                    $scope.refreshData();
                });
            });

        }
        //
    $scope.deleteUser = function () {
            $http.delete(myUrl + "users/" + $scope.idUser).then(function () {
                Materialize.toast('Elemento borrado correctamente', 3000);
                $scope.refreshData();
            }).error(function () {
                Materialize.toast('No se ha podido borrar el elemento', 3000);
            });
        }
        //
        //
    $scope.cancelUser = function () {
            $scope.clickevent(v_index, v_idUser, v_nameFleet, v_nameUser, v_password);
        }
        //
        //
    $scope.limpiarUser = function () {
        $scope.selectedUserType = "";
        $scope.selectedLangType = "";
        $scope.nameUser = "";
        $scope.nameFleet = "";
        $scope.password = "";
        $scope.arr = [];
        $("#fleet").val('');
        $("#user").val('');
        $("#pass").val('');
        $("#tipo").val('');
        $("#updateU").hide();
        $("#insertU").show();
        $scope.isDisabled = "disabled";
    }
    $scope.refreshData = function () {
        setTimeout(function () {
            $templateCache.remove($route.current.templateUrl);
            $route.reload();
            setTimeout(function () {
                $('ul.tabs').tabs('select_tab', 'user');
            }, 1000);
        }, 1000);
    }
});
myApp.controller('userVehiculeCtrl', function ($scope, vehicles, parameters) {
    $scope.$on('transfer', function (event, data) {
        $scope.vehicles = vehicles.getVehicleuser(data.message);
    });
});