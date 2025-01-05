<template>
	<section
		ref="sectionRef"
		:class="{
			'opacity-1 pointer-events-auto': isVisible,
			'opacity-0 pointer-events-none	': !isVisible,
		}"
		class="bg-white relative overflow-hidden h-screen w-full"
	>
		<div
			class="fixed top-0 bottom-0 left-0 right-0 h-screen px-8 flex items-center justify-center w-full"
		>
			<div
				class="w-full max-w-5xl m-auto"
				:class="{
					block: isVisible,
					'hidden	': !isVisible,
				}"
			>
				<h2 class="text-3xl mb-4 font-sans">{{ title }}</h2>
				<slot />
				<StyledLink
					v-if="sourceUrl"
					:href="sourceUrl"
					target="_blank"
					class="absolute right-0 bottom-0 mr-10 mb-10 flex gap-2 items-center group"
					>Source
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 512"
						class="w-4 h-4 current-color"
					>
						<path
							d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
						/>
					</svg>
				</StyledLink>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import StyledLink from './Link.vue'

/**
 * A section component that contains a chart, a title, and a source link.
 */
export default defineComponent({
	components: {
		StyledLink,
	},
	props: {
		title: String,
		sourceUrl: String,
	},
	setup() {
		const sectionRef = ref<HTMLElement | null>(null)
		const isVisible = ref(false)

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isVisible.value = true
				} else {
					isVisible.value = false
				}
			})
		}

		let observer: IntersectionObserver

		onMounted(() => {
			observer = new IntersectionObserver(handleIntersection, {
				root: null,
				threshold: 0.3,
			})

			if (sectionRef.value) {
				observer.observe(sectionRef.value)
			}
		})

		onBeforeUnmount(() => {
			if (sectionRef.value) {
				observer.unobserve(sectionRef.value)
			}
		})

		return {
			sectionRef,
			isVisible,
		}
	},
})
</script>
