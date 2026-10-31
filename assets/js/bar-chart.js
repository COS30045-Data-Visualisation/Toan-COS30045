/* horizontal bar chart of TV models per brand */
const drawBarChart = data => {
    const { inner, margin, innerWidth, innerHeight } = makeChart("#bar-chart", 1000, 520,
        { top: 20, right: 50, bottom: 55, left: 120 }, "Bar chart of registered TV models for the 15 largest brands");

    const yScale = d3.scaleBand().domain(data.map(d => d.brand)).range([0, innerHeight]).padding(0.15);
    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).range([0, innerWidth]);

    inner.selectAll(".bar").data(data).join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth());

    inner.selectAll(".value-label").data(data).join("text")
        .attr("class", "value-label")
        .attr("x", d => xScale(d.count) + 4)
        .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2 + 4)
        .style("text-anchor", "start")
        .text(d => d.count);

    inner.append("g").call(d3.axisLeft(yScale));
    inner.append("g").attr("transform", `translate(0, ${innerHeight})`).call(d3.axisBottom(xScale));
    addAxisLabel(inner, "Number of registered models", innerWidth / 2, innerHeight + 44, "middle");
};

loadTVData().then(tv => {
    const data = Array.from(d3.rollup(tv, v => v.length, d => d.brand),
        ([brand, count]) => ({ brand, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);
    drawBarChart(data);
});
