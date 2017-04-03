myApp.factory('devices', ['$http', function ($http) {
    var devices = {};
    devices.list = [];
    devices.getDevices = function getDevices() {
        return $http.get(myUrl + 'devices').then(requestSuccessful, requestUnsuccessful);

        function requestSuccessful(response) {
            if (_.isEmpty(response.data)) {
                throw new Error();
            }
            else {
                devices.list = response.data;
            }
        }

        function requestUnsuccessful() {
            throw new Error();
        }
    };
    devices.getUser = function getUser(id) {
        return _.filter(devices.list, {
            'id_company': id
        });
    };
    devices.getDeviceSelect = function getDevice(id) {
        return _.filter(devices.list, {
            'id_company': id
        });
    };
    devices.getDeviceVehicle = function getDevice(id) {
        return _.filter(devices.list, {
            'id_vehicle': id
        });
    };
    return devices;
  }]);