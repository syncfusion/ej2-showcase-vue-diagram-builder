<template>
  <div>
    <ejs-dropdownList
      :dataSource="dropDownDataSources.borderStyles"
      :valueTemplate="valueTemplate"
    ></ejs-dropdownList>
  </div>
</template>

<script lang="ts">
 
 import { defineComponent } from 'vue';
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { DropDownDataSources } from "../app/scripts/dropdowndatasource";

export default defineComponent({
  components: {
    DropDownListComponent,
  },
  data() {
    return {
      dropDownDataSources: new DropDownDataSources(),
    };
  },
  methods: {
    valueTemplate(data: any) {
      return `<span><span class='db-ddl-template-style'>${data.className}</span></span>`;
    },
  },
});

</script>
