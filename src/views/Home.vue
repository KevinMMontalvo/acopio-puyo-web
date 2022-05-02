<template>
	<div>
		<v-navigation-drawer v-model="menuVisible" app temporary width="300px">
			<div id="organization-name">Acopio Puyo</div>
<!--			<v-img class="d-block ml-auto mr-auto" :src="url" height="150px" width="150px" contain/>-->
			<v-list dense>
				<v-list-item @click="swapModule('Users')">
					<v-list-item-action>
						<v-icon>mdi-account-circle</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Productores</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="swapModule('Sportmen')">
					<v-list-item-action>
						<v-icon>mdi-sprout</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Productos</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="swapModule('Sacks')">
					<v-list-item-action>
						<v-icon>mdi-sack</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Sacos</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar app color="primary" dark>
			<v-app-bar-nav-icon @click.stop="menuVisible = !menuVisible"></v-app-bar-nav-icon>
			<v-toolbar-title>Acopio Puyo</v-toolbar-title>
			<v-spacer/>
		</v-app-bar>
		<v-main>
			<component v-bind:is="currentContent" />
		</v-main>
	</div>
</template>

<script>
import Sacks from "@/components/Sack/Sacks";

export default {
	name: 'Home',
	components: {
		Sacks
	},
	data: () => ({
		menuVisible: false,
		currentContent: '',
	}),
	methods: {
		swapModule(module)
		{
			this.currentContent = module;
			this.menuVisible = false;
		}
	}
};
</script>
<style scoped>
#organization-name
{
	width: 100%;
	font-size: 1.2em;
	text-align: center;
	font-weight: 650;
	margin-top: 10px;
}
</style>
