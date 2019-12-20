/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.9 - Margins and groups
*/

var margin = { left:100, right:10, top:10, bottom:100 };

var full_width = 600, full_height = 400;

var width   = full_width  - margin.left - margin.right,
    height  = full_height - margin.top  - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", full_width )
        .attr("height", full_height)
    .append("g")
        .attr("transform", "translate(" + margin.left 
            + ", " + margin.top + ")")

d3.json("data/buildings.json").then(data => {

    data.forEach(d=> { d.height = +d.height; });

    var x = d3.scaleBand()
        .domain(data.map( d => {return d.name;}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => {return d.height; })])
        .range([0, height]);

    var rects = g.selectAll("rect")
        .data(data)
        
    rects.enter()
        .append("rect")
            .attr("y", 0)
            .attr("x", d => { return x(d.name); })
            .attr("width", x.bandwidth)
            .attr("height", d=> { return y(d.height); })
            .attr("fill", "grey");

})