  myApp.factory('fleets', ['$http', function ($http) {
      var fleets = {};
      fleets.list = [];

      fleets.getFleets = function getFleets() {
          //if (!_.isEmpty(fleets.list)) {
          //    return;
          //} else {
              return $http.get(myUrl + 'fleets').then(requestSuccessful, requestUnsuccessful);
          //}

          function requestSuccessful(response) {
              if (_.isEmpty(response.data)) {
                  throw new Error();
              } else {
                  fleets.list = response.data;
              }

          }

          function requestUnsuccessful() {
              throw new Error();
          }
      };
      fleets.getFleet = function getFleet(id) {
          return _.filter(fleets.list, {
              'id_company': id
          });
      };
      return fleets;
  }]);