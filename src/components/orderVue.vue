<template>
  <div>
    <ejs-dropdownbutton 
      :iconCss="'sf-icon-Order'" 
      :items="menuItems" 
      @select="orderCommandsChange">
    </ejs-dropdownbutton>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { DiagramComponent, Diagram } from "@syncfusion/ej2-vue-diagrams";
import { DropDownButtonComponent, ItemModel } from "@syncfusion/ej2-vue-splitbuttons";
import { MenuEventArgs } from "@syncfusion/ej2-vue-splitbuttons";
import { SelectorViewModel } from "../app/scripts/selector";
import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';

// Define the component using Vue 3 syntax
export default defineComponent({
  setup() {
    const diagram = ref<DiagramComponent | null>(null);
    const selectedItem = ref(new SelectorViewModel());
    const menuItems: ItemModel[] = [
      { iconCss: "sf-icon-Sendback", text: "Send To Back" },
      { iconCss: "sf-icon-BringFront", text: "Bring To Front" },
      { iconCss: "sf-icon-SendBackward", text: "Send Backward" },
      { iconCss: "sf-icon-BringForward", text: "Bring Forward" }
    ];

    onMounted(() => {
      // This might need adjustments to ensure the diagram element is available
      const diagramObj: any = document.getElementById("diagram");
      if (diagramObj && diagramObj.ej2_instances) {
        diagram.value = diagramObj.ej2_instances[0] as DiagramComponent;
        (selectedItem.value.selectedDiagram as any) = diagram.value;
      }
    });

    const orderCommandsChange = (args: MenuEventArgs) => {
      const diagramInstance = selectedItem.value.selectedDiagram;
      if (!diagramInstance) return;

      selectedItem.value.isModified = true;

      if (args.item.text === "Send To Back") {
        diagramInstance.sendToBack();
      } else if (args.item.text === "Bring To Front") {
        diagramInstance.bringToFront();
      } else if (args.item.text === "Bring Forward") {
        diagramInstance.moveForward();
      } else if (args.item.text === "Send Backward") {
        diagramInstance.sendBackward();
      }
    };

    return {
      menuItems,
      orderCommandsChange
    };
  }
});
</script>