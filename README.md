# Data Story
- Audience. Australian households choosing a new television.
- Their interest They want to know what a TV will cost to run, whether screen size or star rating changes the bill more, and whether a higher star rating is worth a higher purchase price.
- A bar chart of annual energy use (kWh per year) against categorized screen size for each registered TV model. The main finding is that size drives total energy use most, while star rating separates cheap-to-run from expensive-to-run models of the same size. For 51-55 inch TVs, models with 3.5 stars or fewer use a median of 513 kWh a year against 255 kWh for 6 stars or more, about $74 a year at 28.55 cents per kWh.
- How the website tells the story. The Televisions page opens with the headline finding, explains why TV energy use matters, shows how to read the chart, presents the chart, then lists the main findings and practical advice. The Home page gives wider context on appliance energy use in Australia.
# About the data
## Data source
- Dataset: Energy Rating Data for household appliances – Labelled Products, Televisions file.
- Publisher: Australian Government Department of Climate Change, Energy, the Environment and Water, via data.gov.au.
- License: Creative Commons Attribution 3.0 Australia.
- How it was collected: suppliers provide it when they register appliances that will be sold in Australia and New Zealand.
- File used: tv_2026_02_15.csv (4,724 approved registrations, 79 brands after tidying spelling).
## Data processing
- Tools used: KNIME.
- Tidied brand names by capitalizing all letters (for example Kogan to KOGAN) and some mismatch brand names, which reduces the original unique 96 brands to 79.
- Used Labelled energy consumption (kWh/year) as the energy measure and converted screensize from centimetres to inches.
- We kept the original amount of models which amount to 4724, and by eliminating 14 Unavailable, gives us 4710 Available models.
- Further reducing the amount of models to 4508 by filtering out models which are not sold in Australia.
- Grouped models into size category *small* is less than 43", *medium* is from 44" to 65" and *large* is greater than 66".
## Privacy
The dataset describes products (brand, model, star rating, energy use), but not people, so it holds no personal information. The website does not and is not configured to collect user data, use cookies or run analytics.
## Accuracy and limitations
- Figures are registered by suppliers and based on standardized tests, not independent measurements of each model.
- The dataset lists registered models but does not show it's sales.
- Running cost depends on your own tariff. Any cost figure on the site is an estimate using an average tariff.
- Brand names are inconsistent (the same brand can appear with different capital letters or even different names for a same brand), so brand counts need tidying before use.
# Ethics
- Attribution: the data is credited to the Australian Government under CC BY 3.0 AU.
- Fair representation: brands appear only as they are listed in the official data, and the story does not claim any brand is better or worse beyond what the numbers show.
- Impact: energy costs affect lower-income households more, so the story aims to help readers compare running costs, not only purchase prices.
- Generative AI use is disclosed below.
# Appliance Energy Consumption Website
## Repository Architecture
- **[`/assets`](./assets)**: raw resources used by the pages
  - **[`/assets/css`](./assets/css)**: the website's Cascading Style Sheets
  - **[`/assets/js`](./assets/js)**: the website's JavaScript
  - **[`/assets/images`](./assets/images)**: images shown on the website
## Generative AI Reflection
### Tools
- Claude Sonnet 5.5 (claude.ai)
### What we used it for
- Generating the initial three-page structure, the FAQ accordion JavaScript and base CSS
- Generating placeholder text for the pages
- Reviewing my styles.css for bugs and contrast problems
- Drafting the structure of the Television page text
### What we changed or rejected
- Change the coloring
- Change wording of the Television page text
- Changed the position, size and accessibility features