<template>
    <v-card-text>
        <v-row>
            <v-col>
                <v-btn>
                    Reset All User Workspaces
                </v-btn>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';

@Component({})
export default class WebServicesActions extends Vue {

    @Prop()
    sessionId!: String

}
</script>