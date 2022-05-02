<template>
	<v-form v-model="valid" ref="form">
		<v-card>
			<v-card-title>{{ formTitle }}</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-select :items="farmers" label="Productor*" :rules="[rules.required]"
									  v-model="currentSack.farmerId" prepend-icon="mdi-account-circle" item-text="name"
									  item-value="id" :loading="farmers===undefined"/>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select :items="products" label="Producto*" :rules="[rules.required]"
									  v-model="currentSack.productId" prepend-icon="mdi-sprout" item-text="name"
									  item-value="id" :loading="products===undefined"/>
						</v-col>
						<v-col cols="12" sm="5" md="4">
							<v-text-field v-model.trim="currentSack.weight" label="Peso*" type="number"
										  prepend-icon="mdi-weight-kilogram"
										  :rules="[rules.required,rules.positiveNumber]"/>
						</v-col>
						<v-col cols="12" sm="7" md="8">
							<v-textarea v-model.trim="currentSack.observation" label="Observación"
										prepend-icon="mdi-file-eye-outline" rows=3 auto-grow/>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="close">Cancelar</v-btn>
				<v-btn color="primary" :loading="executing" @click="save" :disabled="!valid">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: "SackForm",
	props: ['executing'],
	data: () => ({
		valid: false,
		rules: {
			required(value)
			{
				return !!value || 'Este campo es obligatorio';
			},
			positiveNumber(value)
			{
				return value > 0 || 'El numero debe ser positivo';
			}
		}
	}),
	methods: {
		close()
		{
			this.clear();
			this.$emit("onClose");
		},
		save()
		{
			if (!!!this.currentSack.id)
			{
				this.$emit('onCreate');
			}
			else
			{
				this.$emit('onUpdate');
			}
		},
		clear()
		{
			this.currentSack.id = null;
			this.currentSack.farmerId = 0;
			this.currentSack.productId = 0;
			this.currentSack.weight = 0;
			this.currentSack.observation = '';
			this.$refs.form.resetValidation();
		}
	},
	computed: {
		...mapState('sacks', ['currentSack']),
		...mapState('farmers', ['farmers']),
		...mapState('products', ['products']),

		formTitle()
		{
			return !!this.currentSack.id ? 'Editar saco' : 'Nuevo saco';
		},
	},
	beforeCreate()
	{
		this.$store.dispatch('farmers/getFarmers');
		this.$store.dispatch('products/getProducts');
	}
};
</script>

<style scoped>

</style>