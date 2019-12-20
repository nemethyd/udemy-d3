/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/
var cha = d3.select("#chart-area");
var cvs = cha.append("svg").attr("width", 500).attr("height", 400);
var lin = cvs.append("line").attr("x1", 10).attr("y1", 400).attr("x2", 490).attr("y2", 350).attr("stroke", "darkgray").attr("stroke-width", 5);
var rct = cvs.append("rect").attr("x", 10).attr("y", 50).attr("width", 240).attr("height", 120).attr("fill", "blue");
var ell = cvs.append("ellipse").attr("cx", 320).attr("cy", 230).attr("rx", 80).attr("ry", 70).attr("fill", "red");