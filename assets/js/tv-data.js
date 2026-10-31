const TV_CSV = "data/tv_2026_02_15.csv";

const techOf = t => /OLED/i.test(t) ? "OLED" : /LED/i.test(t) ? "LED" : "LCD";

const loadTVData = () => d3.csv(TV_CSV).then(rows => rows
    .filter(r => r["Availability Status"] === "Available" && r.SoldIn.includes("Australia"))
    .map(r => {
        const size = Math.round(+r.screensize / 2.54);
        return {
            brand: r.Brand_Reg.trim().toUpperCase(),
            model: r.Model_No,
            screenSize: size,
            screenTech: techOf(r.Screen_Tech),
            star: +r.Star2,
            energyConsumption: +r["Labelled energy consumption (kWh/year)"],
            sizeCategory: size <= 43 ? "small" : size <= 65 ? "medium" : "large"
        };
    })
    .filter(d => Number.isFinite(d.star) && Number.isFinite(d.energyConsumption) && Number.isFinite(d.screenSize)));