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
            controller: controller,
            link: link,
            restrict: 'E',
            scope: {
                initUrl: '=',
                refreshUrl: '@'
            }
        };
        return directive;

        function controller($scope, $element, $http) {

            // TODO: create $http get request for 'initurl' to get widgets and initialStatus


        }

        function link(scope, element, attrs) {

            debugger;

            var initUrl = scope.initurl;
            var refreshUrl = scope.refreshurl;

        }

    }
})();
