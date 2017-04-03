myApp.factory('vehicles', ['$http', function ($http) {
    var vehicles = {};
    vehicles.list = [];
    vehicles.getVehicles = function getVehicles() {
        
            return $http.get(myUrl + 'vehicles').then(requestSuccessful, requestUnsuccessful);
        

        function requestSuccessful(response) {
            if (_.isEmpty(response.data)) {
                throw new Error();
            }
            else {
                vehicles.list = response.data;
            }
        }

        function requestUnsuccessful() {
            throw new Error();
        }
    };
    
    vehicles.getVehicleFleet = function getVehicleFleet(id){
        return _.filter(vehicles.list,{
            'id_fleet': id
        });
    }
    
    
    vehicles.getVehicle = function getVehicle(id) {
        return _.filter(vehicles.list, {
            'id_company': id
        });
    };
    
    return vehicles;
  }]);
//
//
myApp.factory('vehiclesweekday', ['$http', function ($http) {
    var vehiclesweekday = {};
    vehiclesweekday.list = [];
    vehiclesweekday.getVehiclesWeekDay = function getVehiclesWeekDay() {
        return $http.get(myUrl + 'vehicles_weekday').then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response) {
            if (_.isEmpty(response.data)) {
                throw new Error();
            }
            else {
                vehiclesweekday.list = response.data;
            }
        }

        function requestUnsuccessful() {
            throw new Error();
        }
    };
    vehiclesweekday.getVehicle = function getVehicle(id) {
        return _.filter(vehiclesweekday.list, {
            'id_vehicle': id
        });
    };
    return vehiclesweekday;
  }]);