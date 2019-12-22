/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// time values

const updateFreq = 100, transitionTime = 100;

// graph area
const canvas = { width: 800, height: 400 };
const margin = { left: 80, right: 10, top: 10, bottom: 80 };
const graph = { width: canvas.width - margin.left - margin.right, height: canvas.height - margin.top - margin.bottom };

const svg = d3.select("#chart-area").append("svg").attr("width", canvas.width).attr("height", canvas.height)
const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//scales
const x = d3.scaleLog().domain([300, 150000]).range([0, graph.width]);
const y = d3.scaleLinear().domain([0, 90]).range([graph.height, 0]);
const area = d3.scaleLinear().domain([2000, 1400000000]).range([25* Math.PI, 1500 * Math.PI] );
const continentColor = d3.scaleOrdinal(d3.schemePastel1);

//labels
const xLabel = g.append("text").attr("x", graph.width / 2).attr("y", graph.height + 50).attr("font-size", 20).attr("text-anchor", "middle")
                .text("GDP per Capita in $");

const yLabel = g.append("text").attr("x", - graph.height/2).attr("y", -60 ).attr("font-size", 20).attr("text-anchor", "middle")
                .text("Life expetancy in years").attr("transform", "rotate(-90)");

const tLabel = g.append("text").attr("x", graph.width-80).attr("y", graph.height - 10).attr("font-size", 40).attr("text-anchor", "right")
    .attr("opacity", "40%");

//Axis drawing

const xAxisCall = d3.axisBottom(x).tickValues([400, 4000, 40000]).tickFormat(d3.format("$"));
const xAxis = g.append("g").attr("class", "x-axis").attr("transform", "translate(0," + graph.height + ")").call(xAxisCall);

const yAxisCall = d3.axisLeft(y) 
const yAxis = g.append("g").attr("class", "y-axis").call(yAxisCall);

                
d3.json("data/data.json").then(data => {
    const nullFreeData = data.map(d => d["countries"].filter(country => (country.income && country.life_exp)));

    // time variables

    const firstYear = +data[0]["year"];
    const lastIndex = data.length - 1;
    var yearIndex = 0;

    // Run the code every 0.1 second
    d3.interval(function () {        
        yearIndex = (yearIndex < lastIndex) ? yearIndex + 1 : 0
        update(nullFreeData[yearIndex], firstYear + yearIndex);
    }, updateFreq);

    update(nullFreeData[0], firstYear+yearIndex);
})


function update(data, year) {

    const circles = g.selectAll("circle").data(data, d => d.country);

    const t = d3.transition().duration(transitionTime);

    console.log(year)

    tLabel.text(year);

    circles.exit().remove();

    circles.enter().append("circle").attr("class", "country-circle")
        .attr("fill", d => d.country == "Hungary" ? "red" : continentColor(d.continent))
        .merge(circles)
        .transition(t)
            .attr("cy", d => y(d.life_exp))
            .attr("cx", d => x(d.income))
            .attr("r", d => Math.sqrt(area(d.population) / Math.PI));    
}