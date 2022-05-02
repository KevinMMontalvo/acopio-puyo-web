<template>
	<v-data-table :headers="headers" :items="sacks" class="elevation-1 ma-3" :loading="sacks===undefined"
				  :search="search">
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Sacos</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>
				<v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details/>
				<v-spacer></v-spacer>
				<v-dialog v-model="showFormDialog" width="90%">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
							Nuevo Saco
						</v-btn>
					</template>
					<SackForm ref="form" :executing="executing" @onClose="closeFormDialog"
							  @onCreate="create($event)" @onUpdate="update($event)"/>
				</v-dialog>
				<v-dialog v-model="showDeleteDialog" max-width="500px">
					<v-card>
						<v-card-title class="headline">¿Estás seguro de borrar el saco?</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancelar</v-btn>
							<v-btn color="blue darken-1" text @click="remove">OK</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item.actions="{ item }">
			<v-icon @click="openUpdateDialog(item)"> mdi-pencil</v-icon>
			<v-icon @click="openDeleteDialog(item)"> mdi-delete</v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="getData">Recargar</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
import SackForm from "@/components/Sack/SackForm";

export default {
	name: "Sacks",
	components: {SackForm},
	data: () => ({
		showFormDialog: false,
		showDeleteDialog: false,
		executing: false,
		headers: [
			{text: 'Id', value: 'id'},
			{text: 'Código de productor', value: 'farmerId'},
			{text: 'Código de producto', value: 'productId'},
			{text: 'Productor', value: 'farmer'},
			{text: 'Producto', value: 'product'},
			{text: 'Peso', value: 'weight'},
			{text: 'Fecha y hora', value: 'date'},
			{text: 'Acciones', value: 'actions', sortable: false},
		],
		search: '',
		deleteItemId: 0,
	}),
	methods: {
		openUpdateDialog(item)
		{
			this.$store.commit('sacks/setCurrentSack', Object.assign({}, item));
			this.showFormDialog = true;
		},
		openDeleteDialog(item)
		{
			this.deleteItemId = item.id;
			this.showDeleteDialog = true;
		},
		closeFormDialog()
		{
			this.showFormDialog = false;
			this.$refs.form.clear();
		},
		closeDeleteDialog()
		{
			this.showDeleteDialog = false;
			this.deleteItemId = 0;
		},
		getData()
		{
			this.$store.dispatch('sacks/getSacks');
		},
		create()
		{
			let data = this.$data;
			let store = this.$store;
			let refs = this.$refs;
			let currentSack = Object.assign({}, this.currentSack);

			data.executing = true;
			axios.post('sacks', currentSack).then(function ()
			{
				data.showFormDialog = false;
				store.dispatch("sacks/getSacks");
				store.state.message = {
					visible: true,
					text: 'Saco creado',
					color: 'success'
				};
				refs.form.clear();
			}).catch(function (error)
			{
				console.error(error);
				console.error(error.response);
				store.state.message = {
					visible: true,
					text: 'Hubo un error al crear el saco',
					color: 'error'
				};
			}).then(function ()
			{
				data.executing = false;
			});
		},
		update()
		{
			let data = this.$data;
			let store = this.$store;
			let refs = this.$refs;
			let currentSack = Object.assign({}, this.currentSack);
			delete currentSack["product"];
			delete currentSack.farmer;

			data.executing = true;

			axios.put(`sacks/${currentSack.id}`, currentSack).then(function ()
			{
				data.showFormDialog = false;
				store.dispatch("sacks/getSacks");
				store.state.message = {
					visible: true,
					text: 'Saco modificado',
					color: 'success'
				};
				refs.form.clear();
			}).catch(function (error)
			{
				console.error(error.response);
				store.state.message = {
					visible: true,
					text: 'Hubo un error al modificar el saco',
					color: 'error'
				};
			}).then(function ()
			{
				data.executing = false;
			});
		},
		remove()
		{
			let data = this.$data;
			let store = this.$store;

			data.executing = true;
			axios.delete(`sacks/${data.deleteItemId}`).then(function (response)
			{
				data.showDeleteDialog = false;
				store.dispatch("sacks/getSacks");
				store.state.message = {
					visible: true,
					text: 'Saco eliminado',
					color: 'success'
				};
			}).catch(function (error)
			{
				console.error(error.response);
				store.state.message = {
					visible: true,
					text: 'Hubo un error al eliminar el saco',
					color: 'error'
				};
			}).then(function ()
			{
				data.executing = false;
			});
		},
	},
	computed: {
		...mapState('sacks', ['sacks', 'currentSack']),
	},
	beforeMount()
	{
		this.$store.dispatch('sacks/getSacks');
	}
};
</script>

<style scoped>

</style>