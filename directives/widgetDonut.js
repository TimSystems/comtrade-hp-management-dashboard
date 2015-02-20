/**
 * Created by dmilutinovic on 19-Feb-2015.
 */
(function () {
    'use strict';

    angular
        .module('managementDashboardApp')
        .directive('widgetDonut', widgetDonut);

    widgetDonut.$inject = ['$window'];

    function widgetDonut($window) {

        var directive = {
            link: link,
            restrict: 'E',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

            $window.onresize = function() {
                //console.log('donut resize');
                scope.$apply();
            };

            scope.$watch(
                // returns the watch value
                function() { return angular.element($window)[0].innerWidth; },

                function() {
                    var aspectRatio = 1 / 3;
                    var chartWidth = element[0].parentElement.offsetWidth;
                    var chartHeight = chartWidth * aspectRatio;

                    scope.render(chartWidth, chartHeight);
                }
            );

            scope.render = function(chartWidth, chartHeight) {

                // clear chart (svg element contents)
                d3.select(element[0]).selectAll('*').remove();

                // render donut chart
                var width = chartWidth;
                var height = chartHeight;
                var radius = Math.min(width, height) / 2;

                var color = d3.scale.ordinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(radius - 70);

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.population; });

                var svg = d3.select(element[0]).append('svg')
                    .attr("width", width)
                    .attr("height", height)
                    .attr('viewBox', '0 0 '+ Math.min(width, height) + ' ' + Math.min(width, height))
                    .attr('preserveAspectRatio', 'xMinYMin')
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                d3.csv("mock-endpoints/donut-data.csv", function(error, data) {

                    var g = svg.selectAll(".arc")
                        .data(pie(data))
                        .enter().append("g")
                        .attr("class", "arc");

                    g.append("path")
                        .attr("d", arc)
                        .style("fill", function(d) { return color(d.data.age); });

                    g.append("text")
                        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                        .attr("dy", ".35em")
                        .style("text-anchor", "middle")
                        .text(function(d) { return d.data.age; });

                });

            };

        }

    }
})();
