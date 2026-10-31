/* Exercise 6.1: histogram of labelled energy consumption */
const drawHistogram = data => {
    const svg = d3.select("#histogram").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-label", "Histogram of TV energy consumption in kWh per year");
    innerChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const bins = binGenerator(data);
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    xScale.domain([minEng, maxEng]).range([0, innerWidth]);
    yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice();

    innerChart.selectAll("rect").data(bins).join("rect")
        .attr("class", "hist-bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length));

    innerChart.append("g").attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`).call(d3.axisBottom(xScale));
    innerChart.append("g").call(d3.axisLeft(yScale));
    innerChart.append("text").attr("class", "axis-label")
        .attr("x", -margin.left + 8).attr("y", -16).text("Frequency (number of models)");
    innerChart.append("text").attr("class", "axis-label")
        .attr("x", innerWidth).attr("y", innerHeight + 42).attr("text-anchor", "end")
        .text("Labelled Energy Consumption (kWh/year)");
};
