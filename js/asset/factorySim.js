  myApp.factory('sims', ['$http', function ($http) {
      var sims = {};
      sims.list = [];
      sims.getSims = function getSims() {
          return $http.get(myUrl + 'sims/group').then(requestSuccessful, requestUnsuccessful);

          function requestSuccessful(response) {
              if (_.isEmpty(response.data)) {
                  throw new Error();
              }
              else {
                  sims.list = response.data;
              }
          }

          function requestUnsuccessful() {
              throw new Error();
          }
      };
      sims.getUser = function getUser(id) {
          return _.filter(sims.list, {
              'id_company': id
          });
      };
      return sims;
  }]);