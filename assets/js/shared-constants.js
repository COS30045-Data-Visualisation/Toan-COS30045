/* Constants shared by the histogram, scatterplot and interactions */
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

let innerChart;   // histogram inner chart
let innerChartS;  // scatterplot inner chart

const barColor = "#636466";
const bodyBackgroundColor = "#e2dad4";

// Histogram scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
// Scatterplot scales
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal()
    .domain(["LED", "LCD", "OLED"])
    .range(["#1f77b4", "#d95f02", "#2ca02c"]);

// Fixed 200 kWh bins (14 bins) so filtered data keeps the same bin edges
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .domain([0, 2800])
    .thresholds(d3.range(200, 2800, 200));

// Filter options for screen technology
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];
