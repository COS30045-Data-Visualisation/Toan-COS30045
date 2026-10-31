/* Exercise 6.3: scatterplot of energy consumption by star rating, coloured by screen tech */
const drawScatterplot = data => {
    const svg = d3.select("#scatterplot").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-label", "Scatterplot of energy consumption against star rating, coloured by screen technology");
    innerChartS = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    xScaleS.domain([0, Math.ceil(d3.max(data, d => d.star))]).range([0, innerWidth]);
    yScaleS.domain([0, d3.max(data, d => d.energyConsumption)]).nice().range([innerHeight, 0]);

    innerChartS.selectAll(".dot").data(data).join("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    innerChartS.append("g").attr("transform", `translate(0, ${innerHeight})`).call(d3.axisBottom(xScaleS));
    innerChartS.append("g").call(d3.axisLeft(yScaleS));
    innerChartS.append("text").attr("class", "axis-label")
        .attr("x", -margin.left + 8).attr("y", -16).text("Labelled Energy Consumption (kWh/year)");
    innerChartS.append("text").attr("class", "axis-label")
        .attr("x", innerWidth).attr("y", innerHeight + 42).attr("text-anchor", "end").text("Star Rating");

    // Legend in the top right corner, items spaced 20px apart
    const legend = innerChartS.append("g").attr("transform", `translate(${innerWidth - 60}, 0)`);
    colorScale.domain().forEach((tech, i) => {
        const item = legend.append("g").attr("class", "legend-item").attr("transform", `translate(0, ${i * 20})`);
        item.append("rect").attr("width", 12).attr("height", 12).attr("fill", colorScale(tech));
        item.append("text").attr("x", 18).attr("y", 11).text(tech);
    });
};
