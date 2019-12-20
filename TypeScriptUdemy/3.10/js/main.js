/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.10 - Axes and labels
*/

const margin = { left:100, right:10, top:10, bottom:150 };

const full_width = 600, full_height = 400; 

const width = full_width - margin.left - margin.right,
    height = full_height - margin.top - margin.bottom;

const g = d3.select("#chart-area")
            .append("svg")
            .attr("width", full_width )
            .attr("height", full_height)
            .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height +140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("The word's tallest buildings");

// Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)");

d3.json("data/buildings.json").then(data=> {
    console.log(data);

    data.forEach(d=>{d.height = +d.height; });

    var x = d3.scaleBand()
        .domain(data.map(d=>{ return d.name; }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>{return d.height; })])
        .range([0, height]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    var yAxisCall = d3.axisLeft(y)
        .ticks(4)
        .tickFormat(d=>{ return d + "m";});
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)
    
    rects.enter()
        .append("rect")
            .attr("y", 0)
            .attr("x", d=> { return x(d.name); })
            .attr("width", x.bandwidth)
            .attr("height", d=>{ return y(d.height); })
            .attr("fill", "grey");

})