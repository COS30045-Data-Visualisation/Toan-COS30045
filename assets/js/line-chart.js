/* mean energy use by screen size */
const drawLineChart = data => {
    const { inner, margin, innerWidth, innerHeight } = makeChart("#line-chart", 1000, 500,
        { top: 40, right: 25, bottom: 50, left: 70 }, "Line chart of mean annual energy use by screen size in inches");
    const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.size)).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.avgEnergy)]).nice().range([innerHeight, 0]);

    inner.append("g").attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
    inner.append("g").call(d3.axisLeft(yScale));
    addAxisLabel(inner, "Mean energy use (kWh/year)", -margin.left + 8, -16);
    addAxisLabel(inner, "Screen size (inches)", innerWidth / 2, innerHeight + 42, "middle");

    const lineGenerator = d3.line().x(d => xScale(d.size)).y(d => yScale(d.avgEnergy)).curve(d3.curveMonotoneX);
    inner.append("path").datum(data).attr("class", "line-path").attr("d", lineGenerator);
    inner.selectAll("circle").data(data).join("circle")
        .attr("class", "line-dot").attr("r", 3.5)
        .attr("cx", d => xScale(d.size)).attr("cy", d => yScale(d.avgEnergy))
        .append("title").text(d => `${d.size}": ${d.avgEnergy} kWh/year`);
};
loadTVData().then(tv => {
    const data = Array.from(
        d3.rollup(tv.filter(d => d.screenSize >= 24 && d.screenSize <= 98),
            v => d3.mean(v, d => d.energyConsumption), d => d.screenSize),
        ([size, avgEnergy]) => ({ size, avgEnergy }))
        .sort((a, b) => a.size - b.size);
    drawLineChart(data);
});
