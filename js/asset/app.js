var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.materialize']);
var myUrl = 'http://localhost:54786/api/';
myApp.config(function ($routeProvider) {
    var promiseCompanies = ['companies', function (companies) {
        return companies.getDataFromServer();
        }];
    var promiseFleet = ['fleets', function (fleets) {
        return fleets.getFleets();
        }];
    var promiseVehicle = ['vehicles', function (vehicles) {
        return vehicles.getVehicles();
        }];
    var promiseUser = ['users', function (users) {
        return users.getUsers();
        }];
    var promiseDriver = ['drivers', function (drivers) {
        return drivers.getDrivers();
        }];
    var promiseDevice = ['devices', function (devices) {
        return devices.getDevices();
        }];
    var promiseVehiclesWeekDay = ['vehiclesweekday', function (vehiclesweekday) {
        return vehiclesweekday.getVehiclesWeekDay();
        }];
    var promisePoi = ['pois', function (pois) {
        return pois.getPois();
        }];
    var promisePoiType = ['poistype', function (poistype) {
        return poistype.getPoisType();
        }];
    var promiseSim = ['sims', function (sims) {
        return sims.getSims();
        }];
    //
    //
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html',
        controller: 'translationCtrl'
    }).when('/companies/:idcompany/company/:id/:company', {
        templateUrl: 'pages/home.html',
        controller: 'translationCtrl',
        resolve: [promiseCompanies, promiseFleet, promiseVehicle, promiseUser, promiseDriver, promiseDevice, promiseVehiclesWeekDay, promisePoi, promisePoiType, promiseSim]
    });
});