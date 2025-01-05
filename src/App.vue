<script setup lang="ts">
import ChartImportExport from './components/ChartImportExport.vue'

import Jumbotron from './components/Jumbotron.vue'
import TextSection from './components/TextSection.vue'
import ChartSection from './components/ChartSection.vue'

import ChartImportExportMap from './components/ChartImportExportMap.vue'
import ChartProductionBar from './components/ChartProductionBar.vue'
import ChartProductionArea from './components/ChartProductionArea.vue'
import ChartCategorization from './components/ChartCategorization.vue'
import ChartEuMix from './components/ChartEuMix.vue'
import ChartConsumptionCh from './components/ChartConsumptionCh.vue'
import StyledLink from './components/Link.vue'

import {
	faBullseye,
	faRightLeft,
	faScaleUnbalanced,
	faChargingStation,
	faMagnifyingGlass,
	faPlugCircleBolt,
	faEarthEurope,
	faSolarPanel,
	faSitemap,
} from '@fortawesome/free-solid-svg-icons'
</script>

<template>
	<main class="h-full max-h-full flex flex-col snap-y snap-mandatory relative font-serif">
		<Jumbotron />
		<div class="bg-white md:pt-32 relative z-10"></div>

		<TextSection
			:has-shadow-top="false"
			:has-shadow-bottom="false"
			title="Swiss 2050 Energy Strategy"
			:icon="faBullseye"
		>
			<p>
				In 2017, the Swiss public voted in favor of the revised Energy Act. This was the first step
				in implementing the 2050 Energy Strategy, which contains the following objectives:
			</p>
			<ul class="list-disc pl-4">
				<li>Promote renewable energy in Switzerland;</li>
				<li>Reduce dependency on fossil energy from abroad;</li>
				<li>Reduce energy consumption;</li>
				<li>Increase energy efficiency.</li>
			</ul>
			<p>
				Existing nuclear power plants can remain in operation as long as they are safe. There is a
				ban on the construction of new nuclear power plants.
			</p>
			<p>
				<StyledLink
					href="https://www.uvek.admin.ch/uvek/en/home/energy/energy-policy.html"
					target="_blank"
				>
					Read more about Principles of energy policy in Switzerland
				</StyledLink>
			</p>
			<p class="mt-4">
				How is Switzerland doing in terms of energy production, promoting renewable energy, reducing
				dependency on fossil energy from abroad, and reducing consumption?
			</p>
		</TextSection>

		<div class="bg-white md:pt-32 relative"></div>

		<TextSection :has-shadow-top="false" title="Swiss Energy Production" :icon="faSolarPanel">
			<p>
				Switzerland produces energy from various sources. Hydropower is the most important source of
				renewable energy in Switzerland, followed by nuclear power. Hydropower is divided into
				run-of-river and storage power plants.
			</p>
			<p>
				In recent years, the share of renewable energy has increased, especially from photovoltaics.
				Switzerland has multiple renewable energy sources that deliver only a small amount of
				energy. The share of fossil energy has decreased. The output of photovoltaics, solar, and
				other renewable sources depends on circumstances like weather. The production per source
				varies over the years; therefore, the total production varies too.
			</p>
		</TextSection>

		<ChartSection
			source-url="https://opendata.swiss/de/dataset/schweizerische-elektrizitatsbilanz-jahreswerte"
		>
			<ChartProductionBar />
		</ChartSection>

		<TextSection title="Energy Categorization" :icon="faSitemap">
			<p>
				The generated energy is fed into the grid, where it is not possible to identify its specific
				source. This is referred to as the energy mix. Within this mix, it is only possible to
				determine the proportion of energy contributed by each source. Due to changes in production,
				the mix changes as well.
			</p>
			<p>
				Switzerland has many sources of energy, especially in the renewables sector. For further
				analysis, we will break down energy production into the categories of renewable energy,
				nuclear energy, and fossil energy.
			</p>
		</TextSection>

		<ChartSection
			source-url="https://opendata.swiss/de/dataset/schweizerische-elektrizitatsbilanz-jahreswerte"
		>
			<ChartCategorization />
		</ChartSection>

		<TextSection title="Swiss Energy Mix" :icon="faPlugCircleBolt">
			<p>
				Over the years, the energy mix has changed. The mix varies from year to year. Overall, a
				trend can be seen: the share of renewable energy has increased, while the share of fossil
				energy has decreased.
			</p>
			<p>
				The Swiss production mix does not correspond to the average composition of the delivered
				electricity (Swiss delivery mix).
			</p>
		</TextSection>

		<ChartSection
			source-url="https://opendata.swiss/de/dataset/schweizerische-elektrizitatsbilanz-jahreswerte"
		>
			<ChartProductionArea />
		</ChartSection>

		<TextSection title="European Energy Mix" :icon="faEarthEurope">
			<p>
				Electricity delivered to Swiss sockets is not only from Swiss production: there is active
				trade with foreign countries, with electricity being both exported and imported. Swiss
				guarantees of origin are traded domestically, and foreign ones can be imported.
			</p>

			<p>
				In Europe, the energy mix is different, based on the energy sources available in each
				country. The mixes vary significantly from country to country. In Europe many countries rely
				on fossil fuels and nuclear energy. Just one third of the countries rely on renewable energy
				for more than 50% of their energy mix. These are mainly the countries in the north of
				Europe.
			</p>
			<p>
				To identify the shares of fossil energy, renewable energy, or nuclear energy from abroad, we
				need to know the energy mixes of the other countries. The following chart shows the energy
				mix of the European Countries in the year 2022.
			</p>
		</TextSection>

		<ChartSection
			source-url="https://www.consilium.europa.eu/de/infographics/how-is-eu-electricity-produced-and-sold/"
		>
			<ChartEuMix />
		</ChartSection>

		<TextSection title="Import and Export from EU" :icon="faRightLeft">
			<p>
				Electricity consumption is not constant. Sometimes too much electricity is produced, and
				other times too little. The surplus is exported, and when there is a shortage, electricity
				is imported.
			</p>
			<p>
				Switzerland imports energy from its neighboring countries and also exports energy to these
				same countries. The largest energy imports come from Germany and France, while the largest
				exports go to Italy. Switzerland also supplies energy to countries from which it imports
				energy. The imported energy from italy is mostyle fossil based energy, while imported energy
				from France is mostly nuclear energy.
			</p>
			<p>
				Regarding energy independence, we treat imports as negative values (regardless of the energy
				mix of the respective country.) and exports as positive values. If imports exceed exports,
				Switzerland is dependent on foreign energy. If exports exceed imports, Switzerland is energy
				independent.
			</p>
		</TextSection>
		<ChartSection
			source-url="https://opendata.swiss/de/dataset/energiedashboard-ch-tagliche-flusse-in-die-und-aus-der-schweiz-strom"
		>
			<ChartImportExportMap />
		</ChartSection>
		<TextSection title="Import and Export Ratio" :icon="faScaleUnbalanced">
			<p>
				In recent years, it has not been evident that Switzerland exports significantly more energy
				than it imports.
			</p>
			<p>
				Before 2003, Switzerland supplied more energy than it consumed. Since 2003, this has no
				longer been the case.
			</p>
			<p>
				The balance between imports and exports is influenced by seasonal demand, weather
				conditions, and market dynamics. Achieving a stable import-export balance is crucial for
				energy security.
			</p>
		</TextSection>

		<ChartSection
			source-url="https://opendata.swiss/de/dataset/schweizerische-elektrizitatsbilanz-jahreswerte"
		>
			<ChartImportExport />
		</ChartSection>
		<TextSection title="Consumption" :icon="faChargingStation">
			<p>
				Overall, Switzerland produces more energy than it consumes. Due to supply and demand
				dynamics, Switzerland engages in energy trade with other countries. Without exporting, there
				would be overall a surplus of energy — assuming supply and demand could be ignored. However,
				this aspect cannot be ignored.
			</p>
			<p>
				For analysis purposes, we categorize imports and production as production, and exports and
				consumption as usage.
			</p>
		</TextSection>
		<ChartSection
			source-url="https://www.bfs.admin.ch/bfs/de/home/statistiken/raum-umwelt/umweltindikatoren/alle-indikatoren/nutzung-natuerliche-ressourcen/elektrizitaetsverbrauch.assetdetail.32229444.html"
		>
			<ChartConsumptionCh />
		</ChartSection>

		<TextSection
			title="Conclusion"
			:has-shadow-top="false"
			:has-shadow-bottom="false"
			:icon="faMagnifyingGlass"
		>
			<p>
				Over the last few years, there has been a trend toward consuming less energy. This could be
				due to better energy efficiency, such as the use of LED lights, improved insulation of
				buildings, and more efficient machines.
			</p>
			<p>
				Switzerland's energy strategy aims to promote sustainability, increase energy efficiency,
				and reduce dependence on fossil fuels. The country has made significant progress in boosting
				renewable energy production, particularly through hydropower and photovoltaics.
			</p>
			<p>
				However, challenges remain in balancing imports and exports, ensuring energy security, and
				maintaining a stable energy mix. The shift away from nuclear energy requires careful
				planning and continued investment in innovative technologies.
			</p>
			<p>
				By adhering to the 2050 Energy Strategy, Switzerland is paving the way toward a more
				sustainable and resilient energy future.
			</p>
		</TextSection>
	</main>

	<footer class="text-center text-sm p-4 pt-20 bg-white relative">
		<p class="mb-4">HSLU FS24 DVIZ Project: Swiss Energy</p>
		<div class="flex flex-col md:flex-row justify-center gap-0 md:gap-1">
			<p class="mb-4 text-sm">
				All charts are made with
				<a href="https://www.highcharts.com/" target="_blank" class="underline hover:text-bold"
					>Highcharts.com</a
				>
			</p>
			<span class="hidden md:block"> | </span>
			<p class="mb-4 text-sm">
				All Icons are from
				<a href="https://fontawesome.com/" target="_blank" class="underline hover:text-bold"
					>Font Awesome</a
				>
			</p>
		</div>
		<p>
			Made by
			<a href="https://github.com/tagjonaj" target="_blank" class="underline hover:text-bold"
				>Gabriel Gjonaj</a
			>,
			<a href="https://github.com/Xheki-l" target="_blank" class="underline hover:text-bold"
				>Xheladin Lekaj</a
			>
			, and
			<a
				href="https://github.com/dario-baumberger"
				target="_blank"
				class="underline hover:text-bold"
				>Dario Baumberger</a
			>
		</p>
	</footer>
</template>
