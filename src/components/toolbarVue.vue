<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { DropDownButtonComponent } from "@syncfusion/ej2-vue-splitbuttons";
import { ItemModel, MenuEventArgs } from "@syncfusion/ej2-splitbuttons";
import { DiagramComponent, ZoomOptions } from "@syncfusion/ej2-vue-diagrams";
import { SelectorViewModel } from "../app/scripts/selector";

// Import necessary styles
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';

export default defineComponent({
  components: {
    DropDownButtonComponent,
  },
  setup() {
    const diagram = ref<DiagramComponent | null>(null);
    const selectedItem = ref(new SelectorViewModel());

    const menuItems: ItemModel[] = [
      { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
      { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
      { text: 'Fit To Screen' }
    ];

    const zoomChange = (args: MenuEventArgs): void => {
      const diagram = selectedItem.value.selectedDiagram;
      if (!diagram) return;

      const currentZoom: number = typeof diagram.scrollSettings.currentZoom === 'number' ? diagram.scrollSettings.currentZoom : 1;
      const zoom: ZoomOptions = {};

      switch (args.item.text) {
        case "400%":
          zoom.zoomFactor = (4 / currentZoom) - 1;
          break;
        case "300%":
          zoom.zoomFactor = (3 / currentZoom) - 1;
          break;
        case "200%":
          zoom.zoomFactor = (2 / currentZoom) - 1;
          break;
        case "150%":
          zoom.zoomFactor = (1.5 / currentZoom) - 1;
          break;
        case "100%":
          zoom.zoomFactor = (1 / currentZoom) - 1;
          break;
        case "75%":
          zoom.zoomFactor = (0.75 / currentZoom) - 1;
          break;
        case "50%":
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          break;
        case "25%":
          zoom.zoomFactor = (0.25 / currentZoom) - 1;
          break;
        case "Fit To Screen":
          selectedItem.value.scrollSettings.currentZoom = "Fit ...";
          diagram.fitToPage({ mode: "Page", region: "Content", margin: { left: 0, top: 0, right: 0, bottom: 0 } });
          return;
      }

      const zoomLevel = parseInt((args.item.text as string).replace('%', ''), 10);
      if (!isNaN(zoomLevel)) {
        (selectedItem.value.scrollSettings.currentZoom as unknown as number) = zoomLevel / 100;
        diagram.zoomTo(zoom);
      }
    };

    onMounted(() => {
      const diagramObj = (document.getElementById("diagram") as any).ej2_instances[0] as DiagramComponent | undefined;
      if (diagramObj) {
        diagram.value = diagramObj;
        (selectedItem.value.selectedDiagram as any )= diagramObj;
      }
    });

    return {
      diagram,
      selectedItem,
      menuItems,
      zoomChange,
    };
  },
});
</script>