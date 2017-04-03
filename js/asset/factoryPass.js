  myApp.factory('parameters', function ($rootScope) {
      var data = {};
      return {
          getParam: function () {
              return data.param;
          }
          , setParam: function (param) {
              data.param = param;
              $rootScope.$broadcast("updates");
          }
      };
  });