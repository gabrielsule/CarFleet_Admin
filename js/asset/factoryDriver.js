  myApp.factory('drivers', ['$http', function ($http) {
      var drivers = {};
      drivers.list = [];
      drivers.getDrivers = function getDrivers() {
          return $http.get(myUrl + 'drivers').then(requestSuccessful, requestUnsuccessful);

          function requestSuccessful(response) {
              if (_.isEmpty(response.data)) {
                  throw new Error();
              }
              else {
                  drivers.list = response.data;
              }
          }

          function requestUnsuccessful() {
              throw new Error();
          }
      };
      drivers.getDriver = function getDriver(id) {
          return _.filter(drivers.list, {
              'id_company': id
          });
      };
      return drivers;
  }]);