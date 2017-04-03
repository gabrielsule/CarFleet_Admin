myApp.service('translationService', function ($resource) {
    this.getTranslation = function ($scope, language) {
        var languageFilePath = 'recursos/translation_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});

myApp.controller('translationCtrl', function ($scope, $routeParams, translationService) {
    $scope.translate = function (language) {
        if (language == null) {
            language = 'es';
        }
        translationService.getTranslation($scope, language);
    };
    $scope.companyName = $routeParams.company;
    $scope.translate();
});