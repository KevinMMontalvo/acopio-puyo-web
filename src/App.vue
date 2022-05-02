<template>
	<v-app>
		<router-view/>
		<v-snackbar v-model="message.visible" :color="message.color">
			{{ message.text }}
		</v-snackbar>
	</v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: 'App',

	data: () => ({
		//
	}),
	computed: {
		...mapState(['message'])
	}
};
</script>
