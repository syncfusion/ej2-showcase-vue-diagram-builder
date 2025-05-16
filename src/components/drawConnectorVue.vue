<template>
  <div>
    <ejs-dropdownbutton
      id="btnDrawConnector" 
      :items="menuItems" 
      iconCss="sf-icon-ConnectorMode" 
      @select="drawConnectorChange">
    </ejs-dropdownbutton>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { DiagramComponent, DiagramTools, Diagram } from '@syncfusion/ej2-vue-diagrams';
import { DropDownButtonComponent, ItemModel, MenuEventArgs } from '@syncfusion/ej2-vue-splitbuttons';
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
    const drawConnector = ref<DropDownButtonComponent | null>(null);

    onMounted(() => {
      window.addEventListener('load', onWindowLoad);
    });

    const menuItems: ItemModel[] = [
      { iconCss: "sf-icon-StraightLine", text: "Straight Line" },
      { iconCss: "sf-icon-ConnectorMode", text: "Orthogonal Line" },
      { iconCss: "sf-icon-BeizerLine", text: "Bezier" },
      { iconCss: 'sf-icon-free_hand', text: 'Free Hand' }
    ];

    const onWindowLoad = () => {
      const diagramElement = document.getElementById('diagram') as any;
      const toolbarElement = document.getElementById('toolbarEditor') as any;
      const connectorElement = document.getElementById('btnDrawConnector') as any;

      if (diagramElement) diagram.value = diagramElement.ej2_instances[0];
      if (selectedItem.value) (selectedItem.value as any).selectedDiagram = diagram.value;
      if (toolbarElement) toolbarEditor.value = toolbarElement.ej2_instances[0];
      if (connectorElement) drawConnector.value = connectorElement.ej2_instances[0];
    };

    const drawConnectorChange = (args: MenuEventArgs) => {
      const diagramInstance = selectedItem.value.selectedDiagram as Diagram;
      if (!diagramInstance) return;

      switch (args.item.text) {
        case "Straight Line":
          diagramInstance.drawingObject = { type: "Straight", style: { strokeWidth: 1 } };
          break;
        case "Orthogonal Line":
          diagramInstance.drawingObject = { type: "Orthogonal", style: { strokeWidth: 1 } };
          break;
        case "Bezier":
          diagramInstance.drawingObject = { type: "Bezier", style: { strokeWidth: 1 } };
          break;
        case "Free Hand":
          diagramInstance.drawingObject = { type: "Freehand", style: { strokeWidth: 1 } };
          break;
      }

      diagramInstance.tool = DiagramTools.ContinuousDraw;
      diagramInstance.clearSelection();
      removeSelectedToolbarItem();
      document.getElementById("btnDrawConnector")?.classList.add("tb-item-selected");
    };

    const removeSelectedToolbarItem = () => {
      const toolbar = toolbarEditor.value;
      if (toolbar) {
        for (const item of (toolbar as any).items) {
          if (item.cssClass.includes("tb-item-selected")) {
            item.cssClass = item.cssClass.replace(" tb-item-selected", "");
          }
        }
        toolbar.dataBind();
      }
      document.getElementById("btnDrawShape")?.classList.remove("tb-item-selected");
      document.getElementById("btnDrawConnector")?.classList.remove("tb-item-selected");
    };

    return {
      menuItems,
      drawConnectorChange,
    };
  },
});
</script>