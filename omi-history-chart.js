/**
 * Created by dmilutinovic on 24-Feb-2015.
 */

var values, xAxisElement, yAxisElement, timeSpan = 60, historyChart, index = 0;

var margin = { top: 20, right: 20, bottom: 30, left: 50 };

var color = d3.scale.ordinal().range(['#0096D6', '#a449a1', '#49b250', '#ffd800', '#f85f29', '#ff0000']);

var width = 1000 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.time.format('%H:%M:%S'))
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var stack = d3.layout.stack()
    .values(function (d) {
        return d.values;
    });

var area = d3.svg.area()
    .x(function (d) { return x(d.date); })
    .y0(function (d) { return y(d.y0); })
    .y1(function (d) { return y(d.y0 + d.y); });

function defineColorDomain() {
    var keys = ["numberOfUnknown","numberOfNormal","numberOfWarning", "numberOfMinor", "numberOfMajor", "numberOfCritical"];
    color.domain(keys);
}

function prepareChartValues(data) {
    defineColorDomain();

    return color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return { date: d.timestamp, y: d.statusData[name] };
            })
        }

    });
}

// draw chart
function draw(data) {

    values = prepareChartValues(data);

    var svg = d3.select('body').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var events = stack(values);

    x.domain(d3.extent(data, function (d) { return d.timestamp; }));
    y.domain([0, d3.max(values[5].values, function (d) { return d.y0 + d.y; })]);

    historyChart = svg.selectAll("body")
        .data(values)
        .enter().append("g")
        .attr("class", "history");

    historyChart.append("path")
        .attr("class", "area")
        .attr("d", function (d) { return area(d.values); })
        .style("fill", function (d) { return color(d.name); });

    xAxisElement = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("style", "fill: none; stroke: #000; shape-rendering: crispEdges;font: 10px sans-serif;");
    xAxisElement.call(xAxis);

    yAxisElement= svg.append("g")
        .attr("class", "y axis")
        .attr("style", "fill: none; stroke: #000; shape-rendering: crispEdges;font: 10px sans-serif;");
    yAxisElement.call(yAxis);

}

// update chart
function update(data) {

    values.forEach(function (d) {
        d.values = d.values.filter(function (e) {
            return !(e.date < (data.timestamp - timeSpan * 60000));
        });

        d.values.push({
            date: data.timestamp,
            y: data.statusData[d.name]
        });
    });

    x.domain(d3.extent(values[0].values, function (d) { return d.date; }));

    stack(values);

    y.domain([0, d3.max(values[5].values, function (d) { return d.y0 + d.y; })]);

    var area = d3.svg.area()
        .x(function (d) { return x(d.date); })
        .y0(function (d) { return y(d.y0); })
        .y1(function (d) { return y(d.y0 + d.y); });

    xAxisElement.call(xAxis);
    yAxisElement.call(yAxis);

    historyChart.data(values)
        .selectAll("path")
        //.transition()
        //.ease("linear")
        //.duration(2000)
        .attr("d", function (d) {
            return area(d.values);
        });

}

var statusData0 = {
    'numberOfUnknown': +'0',
    'numberOfNormal': +'0',
    'numberOfWarning': +'0',
    'numberOfMinor': +'0',
    'numberOfMajor': +'0',
    'numberOfCritical': +'0'
};

var statusData1 = {
    'numberOfUnknown': +'5',
    'numberOfNormal': +'4',
    'numberOfWarning': +'3',
    'numberOfMinor': +'5',
    'numberOfMajor': +'3',
    'numberOfCritical': +'2'
};

var statusData2 = {
    'numberOfUnknown': +'7',
    'numberOfNormal': +'6',
    'numberOfWarning': +'5',
    'numberOfMinor': +'7',
    'numberOfMajor': +'6',
    'numberOfCritical': +'4'
};

var statusData01 = {
    'numberOfUnknown': +'10',
    'numberOfNormal': +'10',
    'numberOfWarning': +'10',
    'numberOfMinor': +'10',
    'numberOfMajor': +'10',
    'numberOfCritical': +'10'
};

var statusData11 = {
    'numberOfUnknown': +'15',
    'numberOfNormal': +'14',
    'numberOfWarning': +'13',
    'numberOfMinor': +'15',
    'numberOfMajor': +'13',
    'numberOfCritical': +'12'
};

var statusData21 = {
    'numberOfUnknown': +'17',
    'numberOfNormal': +'16',
    'numberOfWarning': +'15',
    'numberOfMinor': +'17',
    'numberOfMajor': +'16',
    'numberOfCritical': +'14'
};

var statusData31 = {
    'numberOfUnknown': +'10',
    'numberOfNormal': +'10',
    'numberOfWarning': +'10',
    'numberOfMinor': +'10',
    'numberOfMajor': +'10',
    'numberOfCritical': +'10'
};

var statusData41 = {
    'numberOfUnknown': +'5',
    'numberOfNormal': +'4',
    'numberOfWarning': +'3',
    'numberOfMinor': +'5',
    'numberOfMajor': +'3',
    'numberOfCritical': +'2'
};

var chartData = [
    { timestamp: new Date(2015, 1, 24, 15, 3, 0), statusData: statusData0 }
];

draw(chartData);

setInterval(function() {

    if (index > 6) return;

    var refreshChartData = [
        { timestamp: new Date(2015, 1, 24, 15, 3, 10), statusData: statusData1 },
        { timestamp: new Date(2015, 1, 24, 15, 3, 20), statusData: statusData2 },
        { timestamp: new Date(2015, 1, 24, 15, 3, 30), statusData: statusData01 },
        { timestamp: new Date(2015, 1, 24, 15, 3, 40), statusData: statusData11 },
        { timestamp: new Date(2015, 1, 24, 15, 3, 50), statusData: statusData21 },
        { timestamp: new Date(2015, 1, 24, 15, 4, 0), statusData: statusData31 },
        { timestamp: new Date(2015, 1, 24, 15, 4, 10), statusData: statusData41 }
    ];

    update(refreshChartData[index++]);

}, 2000);
