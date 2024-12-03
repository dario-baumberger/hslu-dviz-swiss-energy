# hslu-dviz-swiss-energy

## Recommended IDE Setup

Developing this project is seamless with **Visual Studio Code** and a **DevContainer** setup.

### Steps to Get Started:

1. Open the project in VS Code.
2. Open the project in the **DevContainer** (use the VS Code DevContainer extension).
3. Run the following commands:
   ```bash
   npm install
   ```
4. Use the NPM scripts for development and testing.

### Without a DevContainer:

If you prefer not to use the DevContainer, you will need to manually install the following prerequisites:

- [Node.js (NPM)](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Jupyter Notebook](https://jupyter.org/install)

---

## Data

### Data Sources

The project uses the following data sources:

| Name                                                                    | Link                                                                                                           | Description                        |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Energiedashboard.ch: Stromproduktion Swissgrid                          | [Link](https://opendata.swiss/de/dataset/energiedashboard-ch-stromproduktion-swissgrid)                        | Electricity production data        |
| Energiedashboard.ch: Tägliche Flüsse in die und aus der Schweiz (Strom) | [Link](https://opendata.swiss/de/dataset/energiedashboard-ch-tagliche-flusse-in-die-und-aus-der-schweiz-strom) | Daily electricity flows data       |
| Energiedashboard.ch: Stromverbrauch Swissgrid                           | [Link](https://opendata.swiss/de/dataset/energiedashboard-ch-stromverbrauch-swissgrid)                         | Electricity consumption data       |
| Schweizerische Elektrizitätsbilanz - Jahreswerte                        | [Link](https://opendata.swiss/de/dataset/schweizerische-elektrizitatsbilanz-jahreswerte)                       | Swiss electricity balance (annual) |

---

## Run Jupyter Notebooks

To run Jupyter Notebooks in this project, execute the following command:

```bash
jupyter notebook
```

Ensure Jupyter Notebook is installed, either manually or through the DevContainer setup.

---

## Frontend

This template uses **Vue 3** with **Vite** for frontend development.

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
