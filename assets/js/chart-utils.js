/* responsive svg + inner chart group */
const defaultMargin = { top: 40, right: 30, bottom: 50, left: 60 };

function makeChart(selector, width, height, margin = defaultMargin, label = "") {
    const svg = d3.select(selector)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-label", label);
    const inner = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    return {
        svg, inner, margin,
        innerWidth: width - margin.left - margin.right,
        innerHeight: height - margin.top - margin.bottom
    };
}

function addAxisLabel(group, text, x, y, anchor = "start") {
    group.append("text").attr("class", "axis-label")
        .attr("x", x).attr("y", y).attr("text-anchor", anchor).text(text);
}
