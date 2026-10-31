/* screen-tech filters and scatterplot tooltips */
const populateFilters = data => {
    d3.select("#filters_screen")
        .selectAll("button")
        .data(filters_screen)
        .join("button")
        .attr("type", "button")
        .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn")
        .attr("aria-pressed", d => d.isActive)
        .text(d => d.label)
        .on("click", function (event, d) {
            // Only one filter can be active at a time
            filters_screen.forEach(f => f.isActive = (f.id === d.id));
            d3.selectAll("#filters_screen button")
                .classed("active", f => f.isActive)
                .attr("aria-pressed", f => f.isActive);
            updateHistogram(d.id);
            updateScatterplot(d.id);
        });

    const updateHistogram = id => {
        const updatedData = id === "all" ? data : data.filter(d => d.screenTech === id);
        const updatedBins = binGenerator(updatedData);
        innerChart.selectAll("rect").data(updatedBins)
            .transition().duration(750).ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };

    const updateScatterplot = id => {
        innerChartS.selectAll(".dot")
            .transition().duration(500)
            .attr("opacity", d => (id === "all" || d.screenTech === id) ? 0.5 : 0.03);
    };
};

let tooltip;
const createTooltip = () => {
    tooltip = d3.select("body").append("div").attr("class", "tooltip");
};

const handleMouseEvents = () => {
    innerChartS.selectAll(".dot")
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1)
                .html(`<strong>${d.brand} ${d.model}</strong><br>${d.screenSize}" ${d.screenTech}<br>${d.star} stars, ${d.energyConsumption} kWh/year`);
        })
        .on("mousemove", event => {
            tooltip.style("left", `${event.pageX + 12}px`).style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
};
