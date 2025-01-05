<template>
	<component
		class="underline hover:decoration-2 hover:text-black transition-all duration-300"
		:is="tag"
	>
		<slot />
	</component>
</template>

<script lang="ts">
/**
 * A styled link component that can be used as a wrapper around an anchor tag or a router-link.
 */
export default {
	name: 'StyledLink',
	props: {
		tag: {
			type: String,
			default: 'a',
		},
	},
}
</script>
