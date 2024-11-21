# Landscoper

![Landscoper Logo](/assets/landscoper.svg)

> **Note:** I developed and published a TypeScript API wrapper package to simplify interactions with the GebetaMaps API. You can integrate it into your project by running `npm i gebeta-maps`. The package is available on [NPM](https://www.npmjs.com/package/gebetamap). Since the scope of this wrapper extended beyond the Landscoper project, I’ve hosted it in a separate repository, which you can find [here](https://github.com/johntad110/gebeta-maps).

> .

Also this README turned out longer than I wish it to be... so here's a [Contents](#contents) section for yor convieniece😊. (_Pro tip: You can click on the titles to get back to the contents section_)

## Contents

1. [Introduction](#introduction)
2. [Inspiration](#inspiration)
3. [A Case](#a-case)
4. [What It Does](#what-does-it-do)
5. [Features](#features)
6. [How It Was Built](#how-it-was-built)
7. [Challenges](#challenges-faced)
8. [Accomplishments](#accomplishments)
9. [What I Learned](#what-i-learned)
10. [What's Next?](#whats-next)
11. [Links](#links)
12. [Setup Locally](#local-setup)
13. [Contribution](#contribution)
14. [LICENSE](#LICENSE)

---

## 💡[Introduction](#contents)

### About Landscoper

Landscoper is a **property assessment platform** powered by a _powerful suite of APIs provided by GebetaMaps_. It provides buyers, investors, and realtors with actionable insights about properties, to help them make informed decisions.

### Quick Links

- [Demo Website](https://gebeta-maps-hackathon.vercel.app/)
- [API Wrapper on NPM](https://www.npmjs.com/package/gebetamap)

---

## 🌟[Inspiration](#contents)

The idea for Landscoper came from observing the **pain points of property buyers** and realtors. While logistics and delivery services effectively leverage geospatial APIs, the real estate market remains underserved in this domain. We wanted to change that by tapping into **untouched markets** and offering innovative solutions.

---

## 📃[A Case](#contents)

### The Problem

A few years ago, my cousin Daniel made what he thought was the best decision of his life—he bought a house in what seemed like a "prime location." The real estate agent assured him it was close to schools, had great transport access, and was a sound investment. Daniel was excited and poured his savings into the purchase.

Fast forward a year, and the reality hit hard.

- The nearest school was over 10 kilometers away.
- Daily commutes to work stretched to over an hour in traffic.
- The "prime location" turned out to be far less attractive to future buyers, leaving him stuck with a property that was hard to sell.

Daniel wasn’t just frustrated—he was heartbroken. The lack of reliable, upfront information had cost him time, money, and peace of mind.

---

### The Solution

![Landscoper Screenshot](/assets/image.png)
<ins>_Landscoper Screenshot_</ins>

Daniel’s experience stuck with me and became the inspiration for **Landscoper**. I wanted to create something that could ensure no one else has to go through what he did.

Landscoper leverages the powerful suite of GebetaMaps APIs to turn raw property data into actionable insights:

- **Proximity to amenities** like schools, hospitals, and parks.
- **Commute analysis** that helps buyers understand daily travel times.
- **Investment potential ratings** based on real, data-backed assessments.

It’s not just about making smarter property decisions—it’s about preventing the kind of regret and financial loss Daniel experienced.

With Landscoper, buyers, realtors, and investors can make informed decisions, ensuring every property feels like the right choice, not a gamble.

---

## 💼[What does it do](#contents)

![](/assets/prop_details.png)
<ins>_Property Details Screenshot_</ins>

- Assess properties with detailed reports on **proximity to amenities**, traffic conditions, and investment potential.

---

## ✨[Features](#contents)

- **Proximity Analysis**: Evaluate distances to schools, hospitals, parks, and transport hubs.
- **Accessibility Scoring**: Calculate commute times and accessibility using the Matrix API.
- **Custom Reports**: Generate tailored reports for buyers, investors, and realtors.

![](/assets/assess.png)
<ins>_Assessment Screenshot_</ins>

---

## 🔨[How It Was Built](#contents)

### Technology Stack

- **Frontend**: Next.js 14, TailwindCSS, TypeScript.
- **Backend**: Python scripts for scraping, GebetaMaps API wrapper, Dockerized MySQL database.
- **Deployment**: Docker Compose for container orchestration.

### Architecture

1. **Database**: MySQL schema stores property, user, and assessment data.
2. **Scraper**: Python script populates the database with real estate data.
3. **Frontend**: Next.js app fetches data from the backend and integrates GebetaMaps APIs.
4. **API Wrapper**: Simplifies interaction with GebetaMaps APIs.

### Dataflow

- We start by fetching property details from the database and geocoding them to obtain latitude and longitude using the `reverseGeocode` function from my API wrapper.
- Next, we analyze proximity to amenities like schools, hospitals, and parks using forward geocoding and calculate travel distances via the Matrix API.
- Finally, this data is compiled in a comprehensive way and presented to the user.

### Key Components

- **Database Initialization**: See `db/init.db` for schema details.
- **Scraper**: Python script runs after database initialization using `wait-for-it.sh` to handle container dependencies.
- **Frontend**: React components interact with GebetaMaps API for geocoding and analysis.

---

## 🚀[Challenges Faced](#contents)

- **Database Initialization Delay**: Docker Compose dependency issues were resolved using a custom bash script (`wait-for-it.sh`).
- **API Integration**: Building an NPM package for GebetaMaps APIs to streamline functionality.

---

## 🏆[Accomplishments](#contents)

- Published a reusable **GebetaMaps API wrapper** on NPM.
- Successfully demonstrated the scalability of the project for future use cases.

---

## 👨‍🎓[What I Learned](#contents)

- Advanced container orchestration techniques with Docker.
- The value of modular, reusable components like the GebetaMaps API wrapper.
- Real-world application of geospatial APIs for property assessment.

---

## 🚀[What's Next?](#contents)

### Community Features

- We plant to add user-generated reviews and feedback for properties and locations.

### Realtor-Focused Customization

- Tailored dashboards for property managers and realtors.

---

## 💻 [Local Setup](#contents)

To run Landscoper locally, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js (v18+) installed.
- **Docker**: Install Docker and Docker Compose.
- **Python**: Required for the scraper script.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/johntad110/GebetaMaps_Hackathon.git
   cd GebetaMaps_Hackatohn
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the project root and provide the required configurations:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   GMAPS_API_KEY=your_gmaps_api_key
   ```

3. **Initialize the Database**
   Navigate to the `db/` folder and set up the MySQL database schema:

   ```bash
   docker-compose up db
   ```

4. **Run the Scraper**
   Populate the database with property data using the scraper:

   ```bash
   cd scripts
   ./wait-for-it.sh db:3306 -- python async_scraper.py
   ```

5. **Start the Application**
   Use Docker Compose to start the backend, database, and frontend services:

   ```bash
   docker-compose up --build
   ```

6. **Access the Application**
   Visit `http://localhost:3000` to view the Landscoper web app.

---

## 🤝 [Contribution](#contents)

We welcome contributions to Landscoper!

### How to Contribute

1. **Fork the Repository**
   Click the **Fork** button at the top-right corner of this page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/johntad110/GebetaMaps_Hackathon.git
   cd landscoper
   ```

3. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**

   - Add or update features.
   - Ensure code quality using the existing standards.
   - Write or update tests if necessary.

5. **Commit and Push**

   ```bash
   git add .
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Navigate to the original repository.
   - Click **Pull Requests** > **New Pull Request**.
   - Provide a detailed description of your changes.

### Contribution Guidelines

- Ensure compatibility with existing components.
- Follow the project's coding style.
- Respect the PR review process and be open to feedback.

❣️Thank you for helping make Landscoper even better!

## 🛡️[LISCENSE](#contents)

This project is licensed under the MIT liscense. See [LICENSE](/LICENSE) for more details.

## 🔗Links

- [Demo Website](https://gebeta-maps-hackathon.vercel.app/)
- [API Wrapper on NPM](https://www.npmjs.com/package/gebetamap)
- [GitHub Repository](https://github.com/johntad110/gebeta-maps)
