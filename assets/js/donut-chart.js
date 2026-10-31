/* Exercise 5.3: donut chart of small / medium / large TV models */
const drawDonutChart = data => {
    const width = 1000, height = 500;
    const radius = Math.min(width, height) / 2 - 20;
    const colorScale = d3.scaleOrdinal().domain(["small", "medium", "large"]).range(["#2a9d8f", "#F0A020", "#7a2e0e"]);
    const pie = d3.pie().value(d => d.count).sort(null);
    const arcGenerator = d3.arc().innerRadius(radius * 0.6).outerRadius(radius).padAngle(0.02).cornerRadius(4);
    const total = d3.sum(data, d => d.count);

    const svg = d3.select("#donut-chart").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`).attr("role", "img")
        .attr("aria-label", "Donut chart of the share of small, medium and large TV models");
    const chart = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = chart.selectAll("g").data(pie(data)).join("g");
    arcs.append("path").attr("d", arcGenerator).attr("fill", d => colorScale(d.data.category))
        .append("title").text(d => `${d.data.category}: ${d.data.count} models`);
    arcs.append("text").attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("fill", d => d.data.category === "medium" ? "#29100b" : "#fff")
        .style("font-weight", "bold")
        .text(d => `${d.data.category} ${Math.round(d.data.count / total * 100)}%`);
    chart.append("text").attr("text-anchor", "middle").style("font-size", "16px")
        .text(`${total.toLocaleString()} models`);
};
loadTVData().then(tv => {
    const order = ["small", "medium", "large"];
    const data = order.map(category => ({
        category,
        count: tv.filter(d => d.sizeCategory === category).length
    }));
    drawDonutChart(data);
});