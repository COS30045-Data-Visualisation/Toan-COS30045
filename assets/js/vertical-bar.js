/* vertical bar chart with axes - mean energy by screen tech (55 inch TVs) */
const drawVerticalBar = data => {
    const { inner, margin, innerWidth, innerHeight } = makeChart("#vbar-chart", 1000, 500,
        { top: 40, right: 25, bottom: 50, left: 70 }, "Mean energy use of 55 inch TVs by screen technology");
    const xScale = d3.scaleBand().domain(data.map(d => d.Screen_Tech)).range([0, innerWidth]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Energy_Consumption)]).nice().range([innerHeight, 0]);

    inner.append("g").attr("transform", `translate(0, ${innerHeight})`).call(d3.axisBottom(xScale));
    inner.append("g").call(d3.axisLeft(yScale));
    addAxisLabel(inner, "Energy Consumption (kWh/year)", -margin.left + 8, -16);

    inner.selectAll(".bar").data(data).join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption));
    inner.selectAll(".value-label").data(data).join("text")
        .attr("class", "value-label")
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 6)
        .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};
loadTVData().then(tv => {
    const data = Array.from(
        d3.rollup(tv.filter(d => d.screenSize === 55),
            v => d3.mean(v, d => d.energyConsumption), d => d.screenTech),
        ([Screen_Tech, Energy_Consumption]) => ({ Screen_Tech, Energy_Consumption }))
        .sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    drawVerticalBar(data);
});
