/**
 * Created by dmilutinovic on 19-Feb-2015.
 */
(function () {
    'use strict';

    angular
        .module('managementDashboardApp')
        .directive('managementDashboard', managementDashboard);

    //managementDashboard.$inject = [];

    function managementDashboard() {

        var directive = {
            controller: controllerFn,
            link: linkFn,
            restrict: 'E',
            scope: {} // isolate directive scope
        };
        return directive;

        function controllerFn($scope, $element, $attrs, $http) {

            // TODO: create $http get request for 'initUrl' to get widgets and initialStatus
			$scope.initUrl = $attrs.initurl;
			$scope.refreshUrl = $attrs.refreshurl;

        }

        function linkFn(scope, element, attrs) { }

    }
})();
