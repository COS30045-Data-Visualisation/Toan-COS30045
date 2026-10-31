/* Exercise 6.1: load the TV data once and hand it to each chart */
loadTVData().then(data => {
    console.log(data.length, data[0]);
    drawHistogram(data);
    populateFilters(data);
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();
}).catch(error => console.error("Error loading the CSV file:", error));
