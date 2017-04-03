  myApp.factory('users', ['$http', function ($http) {
      var users = {};
      users.list = [];
      users.getUsers = function getUsers() {
          return $http.get(myUrl + 'users').then(requestSuccessful, requestUnsuccessful);

          function requestSuccessful(response) {
              if (_.isEmpty(response.data)) {
                  throw new Error();
              }
              else {
                  users.list = response.data;
              }
          }

          function requestUnsuccessful() {
              throw new Error();
          }
      };
      users.getUser = function getUser(id) {
          return _.filter(users.list, {
              'id_company': id
          });
      };
      return users;
  }]);