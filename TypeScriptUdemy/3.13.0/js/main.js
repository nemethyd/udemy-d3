/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const margin = { left: 100, right: 10, top: 10, bottom: 80 };

const full_width = 600, full_height = 400;

const width = full_width - margin.left - margin.right, height = full_height - margin.top - margin.bottom;

const svg = d3.select("#chart-area").append("svg").attr("width", full_width).attr("height", full_height);

const g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 80)
    .attr("font-size", "20px")
    .attr("font-weight","bold")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -80)
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");


const data = d3.json("data/revenues.json").then(data => {
    data.forEach(d => {return [d.revenue = +d.revenue, d.profit = +d.profit]})
    //console.log(data);
           
    const x = d3.scaleBand()
                .domain(data.map(d => { return d.month; }))
                .range([0, width])
                .paddingInner(0.3)
                .paddingOuter(0.3);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => { return d.revenue; })])
                .range([height,0]);

    const xAxisCall = d3.axisBottom(x).ticks(8).tickFormat(d => { return d; });
       
    const yAxisCall = d3.axisLeft(y).ticks(10).tickFormat(d => { return "$" + d; });

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall);

    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    const rects = g.selectAll("rect").data(data)

    rects.enter()
        .append("rect")
        .attr("y", d => { return y(d.revenue);})
        .attr("x", d => { return x(d.month); })
        .attr("width", x.bandwidth)
        .attr("height", d => { return height - y(d.revenue);})
        .attr("fill", "grey");



})
.catch (error => { console.log(error); }
)