# hslu-dviz-swiss-energy

## Recommended IDE Setup

Develop this project seamlessly with **Visual Studio Code** and a **DevContainer** setup.

### Steps to Get Started:

1. Open the project in VS Code.
2. Open the project in the **DevContainer** (use the VS Code DevContainer extension).
3. Run the following commands:
   ```bash
   npm install
   ```
4. Use the NPM scripts for development and testing.

### Without a DevContainer:

If you prefer not to use the DevContainer, manually install the following prerequisites:

- [Node.js (NPM)](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Jupyter Notebook](https://jupyter.org/install)

---

## Data

1. Data sources are located in `./data`.
2. Data is processed with Python files located in `./python`.
3. Processed data will be saved in `./public/data` as JSON files.

### Data Sources

The project uses the following data sources:

| Name                                                                    | Link                                                                                                           | Description                        |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Energiedashboard.ch: Tägliche Flüsse in die und aus der Schweiz (Strom) | [Link](https://opendata.swiss/de/dataset/energiedashboard-ch-tagliche-flusse-in-die-und-aus-der-schweiz-strom) | Daily electricity flows data       |
| Schweizerische Elektrizitätsbilanz - Jahreswerte                        | [Link](https://opendata.swiss/de/dataset/schweizerische-elektrizitatsbilanz-jahreswerte)                       | Swiss electricity balance (annual) |
| European Council                                                        | [Link](https://www.consilium.europa.eu/en/infographics/how-is-eu-electricity-produced-and-sold/)               | European Energy Mix                |

---

## Run Jupyter Notebooks

To run Jupyter Notebooks in this project, execute the following command:

```bash
jupyter notebook
```

Ensure Jupyter Notebook is installed, either manually or through the DevContainer setup.

---

## Frontend

This page is built with vue 3, vite and tailwind css.

### NPM Scripts

The project includes the following NPM scripts:

| Script              | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Compile and Hot-Reload for Development                         |
| `npm run build`     | Type-Check, Compile, and Minify for Production                 |
| `npm run test:unit` | Run Unit Tests with [Vitest](https://vitest.dev/)              |
| `npm run test:e2e`  | Run End-to-End Tests with [Playwright](https://playwright.dev) |
| `npm run lint`      | Lint code with [ESLint](https://eslint.org/)                   |

---

## Deployment

This project is deployed using **GitHub Pages**. To deploy:

1. Push changes to the `main` branch.
2. GitHub Pages will automatically deploy the changes after a short delay.

Deployed URL: [https://dario-baumberger.github.io/hslu-dviz-swiss-energy/](https://dario-baumberger.github.io/hslu-dviz-swiss-energy/)
