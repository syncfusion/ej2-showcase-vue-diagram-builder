<template>
  <div>
    <ejs-dropdownList
      :dataSource="dropDownDataSources.borderStyles"
      :itemTemplate="itemTemplate"
    ></ejs-dropdownList>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, reactive } from 'vue';
import { DropDownDataSources } from '../app/scripts/dropdowndatasource';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';

export default defineComponent({
  components: {
    'ejs-dropdownList': DropDownListComponent
  },
  setup() {
    const dropDownDataSources = reactive(new DropDownDataSources());

    const itemTemplate = (props: any) => h('span', [
      h('span', { class: 'db-ddl-template-style' }, props.data.className)
    ]);

    return {
      dropDownDataSources,
      itemTemplate,
    };
  }
});
</script>