myApp.factory('companiesFactory', function ($http) {
    return {
        getAll: getAll,
        getItem: getItem
    };

    function getAll() {
        return $http.get(myUrl + 'Companies')
    }

    function getItem(id) {
        return $http.get(myUrl + 'Companies/' + id)
    }
});
myApp.controller('companiesCtrl', function ($scope, companiesFactory) {
    activateList();

    function activateList() {
        companiesFactory.getAll().then(function (companies) {
            Materialize.toast('Conexion correcta', 3000);
            $scope.list = companies.data;
        }).catch(function () {
            Materialize.toast('Error en la conexion', 3000);
        });
    }
});
myApp.controller('companyCtrl', function ($scope, $http, $routeParams, companiesFactory) {
    activateItem();

    function activateItem() {
        companiesFactory.getItem($routeParams.id).then(function (company) {
            //$scope.isDisabled = "disabled";
            $scope.company = company.data;

            //combo de tipo de companias
            $scope.options = [
                {
                    id: "1",
                    type: "Partner"
                }
                , {
                    id: "2",
                    type: "Client"
                }
                , {
                    id: "3",
                    type: "Owner"
                }
                ];
            //seleccionar item por default
            $scope.selected = company.data.id_companytype.toString();
        });
    }

    function activateList() {
        companiesFactory.getAll().then(function (companies) {
            $scope.list = companies.data;
        })
    }
    $scope.updateCompany = function () {
        var data = {
            id: $routeParams.id,
            companyType: $scope.selected,
            name: $scope.company.name,
            cif: $scope.company.cif,
            address: $scope.company.address,
            phone: $scope.company.phone_number,
            fax: $scope.company.fax_number,
            email: $scope.company.email_address,
            registry: $scope.company.registry_date_time
        };
        $http.post(myUrl + "Companies/Update", JSON.stringify(data)).then(function () {
            Materialize.toast('Elemento actualizado correctamente', 3000);
            companiesFactory.getAll().then(function (companies) {
                $scope.list = companies.data;
            });
        });
    }
    $scope.insertCompany = function () {
        var data = {
            id: $routeParams.id,
            companyType: $scope.selected,
            company: $routeParams.idcompany,
            name: $scope.company.name,
            cif: $scope.company.cif,
            address: $scope.company.address,
            phone: $scope.company.phone_number,
            fax: $scope.company.fax_number,
            email: $scope.company.email_address,
            registry: $scope.company.registry_date_time
        };
        $http.post(myUrl + "Companies/Insert", JSON.stringify(data)).then(function () {
            toastr.info('Elemento insertado correctamente');
            companiesFactory.getAll().then(function (companies) {
                $scope.list = companies.data;
            });
        });
    }
    $scope.deleteCompany = function () {
        $http.delete(myUrl + "Companies/" + $routeParams.id).then(function () {
            toastr.info('Elemento borrado correctamente');
            activateList();
        }).error(function () {
            toastr.error('El elemento no se ha podido borrar');
        });
    }
    $scope.cancelCompany = function () {
        activateList();
        activateItem();
        $scope.isDisabled = "";
    }
    $scope.limpiarCompany = function () {
        $scope.selected = ""
        $routeParams.idcompany = ""
        $scope.company.name = ""
        $scope.company.cif = ""
        $scope.company.address = ""
        $scope.company.phone_number = ""
        $scope.company.fax_number = ""
        $scope.company.email_address = ""
        $scope.company.registry_date_time = ""
        $("#name").val('');
        $("#cif").val('');
        $("#address").val('');
        $("#tel").val('');
        $("#fax").val('');
        $("#email").val('');
        $("#alta").val('');
        $("#update").hide();
        $("#insert").show();
        $scope.isDisabled = "disabled";
    }
});