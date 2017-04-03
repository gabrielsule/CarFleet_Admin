myApp.factory('pois', ['$http', function ($http) {
    var pois = {};
    pois.list = [];
    pois.getPois = function getPois() {
        return $http.get(myUrl + 'poi').then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response) {
            if (_.isEmpty(response.data)) {
                throw new Error();
            } else {
                pois.list = response.data;
            }
        }

        function requestUnsuccessful() {
            throw new Error();
        }
    };
    pois.getPoi = function getPoi(id) {
        return _.filter(pois.list, {
            'id_company': id
        });
    };
    return pois;
  }]);
//
//
myApp.factory('poistype', ['$http', function ($http) {
    var poistype = {};
    poistype.list = [];
    poistype.getPoisType = function getPoisType() {
        return $http.get(myUrl + 'Poi/Types').then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response) {
            if (_.isEmpty(response.data)) {
                throw new Error();
            } else {
                poistype.list = response.data;
            }
        }

        function requestUnsuccessful() {
            throw new Error();
        }
    };
    poistype.getPoi = function getPoi(id) {
        return _.filter(poistype.list, {
            'id_company': id
        });
    };
    return poistype;
  }]);