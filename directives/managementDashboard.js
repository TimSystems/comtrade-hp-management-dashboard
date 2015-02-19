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
            link: link,
            restrict: 'E',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {



        }

    }
})();
