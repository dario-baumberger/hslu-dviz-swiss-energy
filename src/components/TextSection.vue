<template>
	<section
		class="w-full px-8 md:px-16 relative bg-white py-16 relative z-10"
		id="section2"
		:style="computedStyle"
	>
		<div class="max-w-prose m-auto w-full">
			<div class="relative">
				<font-awesome-icon
					v-if="icon"
					:icon="icon"
					class="text-[#a3a3a3] md:absolute -top-24 left-0 md:-translate-x-full pb-4 md:p-8 text-6xl md:text-8xl"
				/>
				<h2 class="text-3xl md:text-4xl mb-8 font-sans relative">{{ title }}</h2>
			</div>
			<slot />
		</div>
	</section>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { PropType } from 'vue'

/**
 * A section with a title and an optional icon.
 */
export default {
	components: {
		FontAwesomeIcon,
	},

	props: {
		title: String,
		icon: {
			type: Object as PropType<IconDefinition>,
			required: false,
		},
		hasShadowTop: {
			type: Boolean,
			default: true,
		},
		hasShadowBottom: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		computedStyle() {
			let boxShadow = ''
			if (this.hasShadowTop) {
				boxShadow += '0 -2em 5em rgba(255, 255, 255, 1)'
			}
			if (this.hasShadowBottom) {
				if (boxShadow) boxShadow += ', '
				boxShadow += '0 2em 5em rgba(255, 255, 255, 1)'
			}
			return { boxShadow }
		},
	},
}
</script>
