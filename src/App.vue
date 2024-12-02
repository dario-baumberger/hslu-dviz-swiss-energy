<script setup lang="ts">
import ChartImportExport from './components/ChartImportExport.vue'

import Jumbotron from './components/Jumbotron.vue'
import TextSection from './components/TextSection.vue'
import ChartSection from './components/ChartSection.vue'

import ChartImportExport3 from './components/ChartImportExport3.vue'
import ChartProductionBar from './components/ChartProductionBar.vue'
import ChartSwissMap from './components/ChartSwissMap.vue'
import ChartProductionArea from './components/ChartProductionArea.vue'
import ChartConsumption from './components/ChartConsumption.vue'
</script>

<template>
  <main class="h-full max-h-full flex flex-col snap-y snap-mandatory relative font-serif">
    <Jumbotron />

    <TextSection title="Swiss 2050 Energy Strategy">
      <p>
        In 2017, the Swiss public voted in favour of the revised Energy Act. This was the first step
        in implementing the 2050 Energy Strategy, which contains the following objectives:
      </p>
      <ul class="list-disc pl-4">
        <li>promote renewable energy in Switzerland;</li>
        <li>reduce dependency on fossil energy from abroad;</li>
        <li>reduce energy consumption;</li>
        <li>increase energy efficiency.</li>
      </ul>
      <p>
        Existing nuclear power plants can remain in operation as long as they are safe. There is a
        ban on the construction of new nuclear power plants.
      </p>
      <p class="mt-4">
        How is Switzerland doing in terms of energy production and consumption? The following charts
        provide an overview.
      </p>
    </TextSection>
    <TextSection title="Swiss Energy Production">
      <p>
        Switzerland produces energy from various sources. The generated energy is fed into the grid,
        where it is not possible to identify its specific source. This is referred to as the energy
        mix. Within this mix, it is only possible to determine the proportion of energy contributed
        by each source. Over the years, the energy mix has changed. The following chart shows the
        mix.
      </p>
    </TextSection>
    <ChartSection source-url="test">
      <ChartProductionBar />
    </ChartSection>

    <TextSection title="Production">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos iusto alias, atque sint,
        magnam quasi, dolorem veritatis reiciendis perspiciatis fugiat ratione quibusdam modi eius
        fuga! Sint amet dolor saepe sapiente? lorem ipsum dolor sit amet consectetur adipisicing
        elit. Deleniti at aliquam obcaecati eaque. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Libero nisi recusandae quae placeat cupiditate ipsum id exercitationem,
        officiis nemo impedit consectetur neque praesentium sapiente itaque tempora fuga tempore
        necessitatibus quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repudiandae
        facilis eveniet, veritatis, ea commodi atque nesciunt sint vel neque ratione eius
        accusantium nostrum perferendis explicabo porro provident molestiae ipsum?
      </p>
    </TextSection>
    <ChartSection>
      <ChartSwissMap />
    </ChartSection>

    <TextSection title="Swiss Energy Mix">
      <p>
        In Switzerland, electricity is produced from 52.8% hydropower, 36.4% nuclear power, 1.4%
        fossil fuels, and 9.4% new renewable energies (Swiss production mix 2022). Information on
        this can be found in the Swiss Electricity Statistics.
      </p>
      <p>
        However, electricity delivered to Swiss sockets is not only from Swiss production: there is
        active trade with foreign countries, with electricity being both exported and imported.
        Swiss guarantees of origin are traded domestically, and foreign ones can be imported.
        Therefore, the Swiss production mix does not correspond to the average composition of the
        delivered electricity (Swiss delivery mix).
      </p>
      <a href="https://www.strom.ch/de/service/stromkennzeichnung" target="_blank"
        >More Informationen</a
      >
    </TextSection>

    <ChartSection
      source-url="https://www.admin.ch/gov/de/start/dokumentation/medienmitteilungen.msg-id-97643.html"
    >
      <ChartProductionArea />
    </ChartSection>

    <TextSection title="Import and Export from EU">
      <p>
        Electricity consumption is not constant. Sometimes too much electricity is produced, and
        other times too little. The surplus is exported, and when there is a shortage, electricity
        is imported.
      </p>
      <p>
        Switzerland imports energy from its neighboring countries and also exports energy to the
        same countries. The following maps show energy imports and exports over the past few years.
      </p>
      <p>
        Switzerland imports the most energy from Germany and France. It exports the most energy to
        Italy. Switzerland also supplies energy to countries from which it imports energy.
      </p>
    </TextSection>
    <ChartSection>
      <ChartImportExport3 />
    </ChartSection>
    <TextSection title="Import and Export Ratio">
      <p>
        In recent years, it has not been evident that Switzerland exports significantly more energy
        than it imports.
      </p>
      <p>
        Before 2003, Switzerland supplied more energy than it consumed. Since 2003, this has no
        longer been the case.
      </p>
      <p>
        To identify the shares of fossil energy, renewable energy, or nuclear energy from abroad, we
        need to know the energy mixes of the other countries.
      </p>
    </TextSection>

    <ChartSection>
      <ChartImportExport />
    </ChartSection>
    <TextSection title="Consumption">
      <p>
        In den Vergangen Jahren ist nicht ersichtlich, dass die Schweiz deutlich mehr Energie
        exportiert als importiert.
      </p>
      <p>
        Vor 2003 lieferte die Schweiz mehr Energie als sie bezog. Ab 2003 ist dies nicht mehr der
        eindeutig der Fall.
      </p>
    </TextSection>
    <ChartSection>
      <ChartConsumption />
    </ChartSection>
    <TextSection title="Conclusion">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti, nostrum vel porro
        libero dolores! Repudiandae omnis aliquam porro aut deserunt odio, dolorem, rerum iste
        dolore sit quidem dolores at?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti, nostrum vel porro
        libero dolores! Repudiandae omnis aliquam porro aut deserunt odio, dolorem, rerum iste
        dolore sit quidem dolores at?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti, nostrum vel porro
        libero dolores! Repudiandae omnis aliquam porro aut deserunt odio, dolorem, rerum iste
        dolore sit quidem dolores at?
      </p>
    </TextSection>
  </main>
  <footer class="text-center text-sm p-4 pt-20 bg-white">
    <p class="mb-4">HSLU FS24 DVIZ Project: Swiss Energy</p>
    <p class="mb-4 text-sm">
      All charts are made with
      <a href="https://www.highcharts.com/" target="_blank">Highcharts.com</a>
    </p>
    <p>
      Gabriel Gjonaj, Xheladin Lekaj and
      <a href="https://github.com/dario-baumberger">Dario Baumberger</a>
    </p>
  </footer>
</template>
