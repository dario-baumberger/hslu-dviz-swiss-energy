<script setup lang="ts">
import ChartProduction from './components/ChartProduction.vue'
import ChartImportExport from './components/ChartImportExport.vue'
import ChartProduction2 from './components/ChartProduction2.vue'
import Jumbotron from './components/Jumbotron.vue'
import TextSection from './components/TextSection.vue'
import ChartSection from './components/ChartSection.vue'
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
    <ChartSection>
      <ChartProduction />
    </ChartSection>

    <TextSection title="Import Export">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti at aliquam obcaecati eaque
        non quod minima voluptas vel repellendus repellat! Sequi dolores, aliquam corporis optio
        eveniet quod. Quos, necessitatibus asperiores! Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quam eius laboriosam aliquam magnam ea voluptates quaerat quisquam,
        perspiciatis, obcaecati autem dolores libero tempore voluptatum facere enim repellendus
        nulla a quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iure recusandae
        culpa sapiente facilis enim at perspiciatis quasi inventore repellat corrupti sed cum iste,
        mollitia officia cupiditate nam quo. Veritatis! Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Fuga adipisci commodi rem facere sed quod blanditiis consectetur iusto
        nemo ducimus, nostrum distinctio sapiente id, laboriosam ea. Accusamus laboriosam nisi
        ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ducimus perferendis
        fugit quod facilis voluptate ratione vitae assumenda aut, quam harum, nulla ipsam provident
        architecto pariatur. Error ipsum nobis odio.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos iusto alias, atque sint,
        magnam quasi, dolorem veritatis reiciendis perspiciatis fugiat ratione quibusdam modi eius
        fuga! Sint amet dolor saepe sapiente?
      </p>
    </TextSection>

    <ChartSection>
      <ChartImportExport />
    </ChartSection>
    <TextSection title="Production">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos iusto alias, atque sint,
        magnam quasi, dolorem veritatis reiciendis perspiciatis fugiat ratione quibusdam modi eius
        fuga! Sint amet dolor saepe sapiente?
      </p>
    </TextSection>

    <ChartSection>
      <ChartProduction2 />
    </ChartSection>
    <section class="" id="section6"></section>
  </main>
  <footer class="text-center text-sm p-4">
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
