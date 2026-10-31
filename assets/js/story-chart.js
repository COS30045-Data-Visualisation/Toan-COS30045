/* median annual energy */
loadTVData().then(tv => {
    const data = Array.from(
        d3.rollup(tv, v => d3.median(v, d => d.energyConsumption),
            d => Math.min(6, Math.floor(d.star)), d => d.sizeCategory),
        ([star, m]) => Array.from(m, ([size, median]) => ({ star, size, median: Math.round(median) }))
    ).flat();
    const sizes = ["small", "medium", "large"];
    const colours = d3.scaleOrdinal().domain(sizes).range(["#2a9d8f", "#F0A020", "#7a2e0e"]);
    const stars = [...new Set(data.map(d => d.star))].sort((a, b) => a - b);
    const { svg, inner, margin, innerWidth, innerHeight } =
        makeChart("#chart", 1000, 520, { top: 50, right: 30, bottom: 60, left: 70 },
            "Grouped bar chart of median annual energy use by star rating and screen size category");

    const x0 = d3.scaleBand().domain(stars).range([0, innerWidth]).padding(0.2);
    const x1 = d3.scaleBand().domain(sizes).range([0, x0.bandwidth()]).padding(0.08);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.median)]).nice().range([innerHeight, 0]);

    inner.append("g").attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x0).tickFormat(d => d === 6 ? "6+" : d));
    inner.append("g").call(d3.axisLeft(y));
    addAxisLabel(inner, "Median energy use (kWh per year)", -margin.left + 8, -24);
    addAxisLabel(inner, "Star rating (6+ includes 6 to 8 stars)", innerWidth / 2, innerHeight + 46, "middle");

    inner.selectAll(".bar").data(data).join("rect")
        .attr("class", "bar")
        .attr("x", d => x0(d.star) + x1(d.size))
        .attr("y", d => y(d.median))
        .attr("width", x1.bandwidth())
        .attr("height", d => innerHeight - y(d.median))
        .style("fill", d => colours(d.size))
        .append("title").text(d => `${d.size}, ${d.star} star: ${d.median} kWh/year`);

    inner.selectAll(".value-label").data(data).join("text")
        .attr("class", "value-label")
        .attr("x", d => x0(d.star) + x1(d.size) + x1.bandwidth() / 2)
        .attr("y", d => y(d.median) - 4)
        .style("font-size", "10px")
        .text(d => d.median);

    const legend = svg.append("g").attr("transform", `translate(${margin.left + 12}, 20)`);
    sizes.forEach((s, i) => {
        const g = legend.append("g").attr("class", "legend-item").attr("transform", `translate(${i * 80}, 25)`);
        g.append("rect").attr("width", 14).attr("height", 14).attr("fill", colours(s));
        g.append("text").attr("x", 20).attr("y", 12).text(s);
    });
});
