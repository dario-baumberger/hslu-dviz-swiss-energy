<script setup lang="ts">
  import ChartProduction from './components/ChartProduction.vue';
  import ChartImportExport from './components/ChartImportExport.vue';
  import ChartProduction2 from './components/ChartProduction2.vue';
import Jumbotron from './components/Jumbotron.vue';
import TextSection from './components/icons/TextSection.vue';

</script>

<template>
  <main class="h-full max-h-full flex flex-col snap-y snap-mandatory relative font-serif">
    <Jumbotron />

    <TextSection title="Swiss 2050 Energy Strategy" >
      <p>
          In 2017, the Swiss public voted in favour of the revised Energy Act. This was the first
          step in implementing the 2050 Energy Strategy, which contains the following objectives:
        </p>
        <p>
          <ul class="list-disc pl-4">
            <li>
              promote renewable energy in Switzerland;
            </li>
            <li>
              reduce dependency on fossil energy from abroad;

            </li>
            <li>
              reduce energy consumption;
            </li>
            <li>
              increase energy efficiency.
            </li>
          </ul>
        </p>
        <p>
          Existing nuclear power plants can remain in operation as long as they are safe. There is a ban on the
          construction of new nuclear power plants.
        </p>
        <p class="mt-4">
          How is Switzerland doing in terms of energy production and consumption? The following charts provide an
          overview.
        </p>
    </TextSection>



    <section class=" bg-white  " id="section3">
      <div class="max-w-3xl m-auto  ">
        <ChartProduction />
      </div>
    </section>
    <section class="w-full px-4 relative bg-white " id="section2"
      style="filter: drop-shadow(2em 5em 1em rgb(255 255 255 / 1))">
      <div class="max-w-prose m-auto w-full">
        <h2 class="text-3xl mb-4">Import Export</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti at aliquam obcaecati
          eaque non quod minima voluptas vel repellendus repellat! Sequi dolores, aliquam corporis
          optio eveniet quod. Quos, necessitatibus asperiores! Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Quam eius laboriosam aliquam magnam ea voluptates quaerat
          quisquam, perspiciatis, obcaecati autem dolores libero tempore voluptatum facere enim
          repellendus nulla a quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iure
          recusandae culpa sapiente facilis enim at perspiciatis quasi inventore repellat corrupti
          sed cum iste, mollitia officia cupiditate nam quo. Veritatis! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Fuga adipisci commodi rem facere sed quod blanditiis
          consectetur iusto nemo ducimus, nostrum distinctio sapiente id, laboriosam ea. Accusamus
          laboriosam nisi ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          ducimus perferendis fugit quod facilis voluptate ratione vitae assumenda aut, quam harum,
          nulla ipsam provident architecto pariatur. Error ipsum nobis odio.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos iusto alias, atque sint,
          magnam quasi, dolorem veritatis reiciendis perspiciatis fugiat ratione quibusdam modi eius
          fuga! Sint amet dolor saepe sapiente?
        </p>
      </div>
    </section>

    <section class=" bg-white" id="section3">
      <div class="max-w-3xl m-auto top-0 bottom-0 left-0 right-0 ">
        <ChartImportExport />
      </div>
    </section>
    <TextSection title="Production" >
      <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos iusto alias, atque sint,
          magnam quasi, dolorem veritatis reiciendis perspiciatis fugiat ratione quibusdam modi eius
          fuga! Sint amet dolor saepe sapiente?
        </p>
    </TextSection>

    <section class="  bg-white" id="section5">
      <div class="max-w-3xl m-auto top-0 bottom-0 left-0 right-0 ">
        <ChartProduction2 />
      </div>
    </section>
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
