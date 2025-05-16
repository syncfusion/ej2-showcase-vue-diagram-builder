<template>
  <div>
    <ejs-dropdownbutton id="btnDrawShape" iconCss="sf-icon-DrawingMode" :items="menuItems" @select="drawShapeChange"></ejs-dropdownbutton>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { DiagramComponent, DiagramTools, Diagram } from '@syncfusion/ej2-vue-diagrams';
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-vue-splitbuttons';
import { ToolbarComponent } from '@syncfusion/ej2-vue-navigations';
import { SelectorViewModel } from '../app/scripts/selector';

// Importing styles
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';

export default defineComponent({
  setup() {
    const toolbarEditor = ref<ToolbarComponent | null>(null);
    const diagram = ref<DiagramComponent | null>(null);
    const selectedItem = ref(new SelectorViewModel());
    const drawShape = ref<DropDownButtonComponent | null>(null);

    onMounted(() => {
      window.addEventListener('load', onWindowLoad);
    });

    const menuItems: ItemModel[] = [
      { iconCss: 'sf-icon-Square', text: 'Rectangle' },
      { iconCss: 'sf-icon-Ellipse', text: 'Ellipse' },
      { iconCss: 'sf-icon-Triangle', text: 'Polygon' },
    ];

    const onWindowLoad = () => {
      diagram.value = (document.getElementById('diagram') as any).ej2_instances[0];
      selectedItem.value.selectedDiagram = (document.getElementById('diagram') as any).ej2_instances[0];
      toolbarEditor.value = (document.getElementById('toolbarEditor') as any).ej2_instances[0];
      drawShape.value = (document.getElementById('btnDrawShape') as any).ej2_instances[0];
    };

    const drawShapeChange = (args: MenuEventArgs) => {
      const diagramInstance = selectedItem.value.selectedDiagram as Diagram;
      if (args.item.text === 'Rectangle') {
        diagramInstance.drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 1 } };
      } else if (args.item.text === 'Ellipse') {
        diagramInstance.drawingObject = { shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 1 } };
      } else if (args.item.text === 'Polygon') {
        diagramInstance.drawingObject = { shape: { type: 'Basic', shape: 'Polygon' }, style: { strokeWidth: 1 } };
      }
      diagramInstance.tool = DiagramTools.ContinuousDraw;
      removeSelectedToolbarItem();
      (document.getElementById('btnDrawShape') as any).classList.add('tb-item-selected');
    };

    const removeSelectedToolbarItem = () => {
      if (toolbarEditor.value) {
        for (const item of (toolbarEditor.value as any).items) {
          if (item.cssClass.includes('tb-item-selected')) {
            item.cssClass = item.cssClass.replace(' tb-item-selected', '');
          }
        }
        toolbarEditor.value.dataBind();
      }
      (document.getElementById('btnDrawShape') as any).classList.remove('tb-item-selected');
      (document.getElementById('btnDrawConnector') as any).classList.remove('tb-item-selected');
    };

    return {
      menuItems,
      drawShapeChange,
    };
  },
});
</script>