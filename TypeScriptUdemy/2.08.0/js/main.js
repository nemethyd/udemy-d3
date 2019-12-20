/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(buildings => {
    buildings.forEach(d => { d.height = +d.height})
    console.log(buildings);
    var svg = d3.select("#chart-area").append("svg").attr("width", 500).attr("height", 500);

    var rts = svg.selectAll("rect").data(buildings);

    rts.enter().append("rect")
        .attr("x", (d, i) => { return i * 50 + 40})
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", d => { return d.height; } )
        .attr("fill","grey")
}).catch(
    error => { console.log(error); }
)