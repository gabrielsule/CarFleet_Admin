  myApp.factory('companies', ['$http', function ($http) {
      var companies = {};
      companies.list = [];

      companies.getDataFromServer = function getDataFromServer() {
          if (!_.isEmpty(companies.list)) {
              return;
          } else {
              return $http.get(myUrl + 'Companies').then(requestSuccessful, requestUnsuccessful);
          }

          function requestSuccessful(response) {
              if (_.isEmpty(response.data)) {
                  throw new Error();
              } else {
                  companies.list = response.data;
              }

          }

          function requestUnsuccessful() {
              throw new Error();
          }
      };
      companies.getSingleCompany = function getSingleCompany(id) {
          return _.find(companies.list, {
              'id': id
          });
      };
      return companies;
  }]);