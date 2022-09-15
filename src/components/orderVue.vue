<template>
    <div>
    <ejs-dropdownbutton   iconCss='sf-icon-Order' :items="menuItems"  v-on:select="orderCommandsChange($event)"></ejs-dropdownbutton>
    </div>
</template>
<script lang="ts" > 
import {
  DiagramComponent,
  MindMap as MindMapTree,
  ZoomOptions,
} from "@syncfusion/ej2-vue-diagrams";
import {
  Diagram,
DiagramPlugin,
} from "@syncfusion/ej2-vue-diagrams";
import {
  DropDownButtonComponent,
  DropDownButtonPlugin,
  ItemModel,
} from "@syncfusion/ej2-vue-splitbuttons";
import {
  MenuEventArgs,
} from "@syncfusion/ej2-vue-splitbuttons";
import { ToolbarComponent, ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { SelectorViewModel } from "../app/scripts/selector";
Vue.use(DropDownButtonPlugin);
Vue.use(ToolbarPlugin);
Vue.component(ToolbarPlugin.name, ToolbarComponent);
Vue.use(DropDownListPlugin,DropDownButtonComponent);
Vue.use(DiagramPlugin);
import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';

import { Component, Vue } from "vue-property-decorator";

@Component({
  provide: {
    diagram: [Diagram]
  },
})
export default class User extends Vue {
public diagram: DiagramComponent;
public selectedItem: SelectorViewModel = new SelectorViewModel();
mounted() {
        window.addEventListener("load", this.onWindowLoad);
    }
 public onWindowLoad() {
    let diagramObj: any = document.getElementById("diagram");
    this.diagram = diagramObj.ej2_instances[0];
    let selectedItems: any = document.getElementById("diagram");
    this.selectedItem.selectedDiagram = selectedItems.ej2_instances[0];
 }
public  menuItems: ItemModel[]=[
    { iconCss: "sf-icon-Sendback", text: "Send To Back" },
    { iconCss: "sf-icon-BringFront", text: "Bring To Front" },
    { iconCss: "sf-icon-SendBackward", text: "Send Backward" },
    { iconCss: "sf-icon-BringForward", text: "Bring Forward" },
      ]
      public orderCommandsChange(args: MenuEventArgs): void {
         let diagram :Diagram= this.selectedItem.selectedDiagram;
        if (args.item.text === "Send To Back") {
            this.sendToBack();
        } else if (args.item.text === "Bring To Front") {
            this.bringToFront();
        } else if (args.item.text === "Bring Forward") {
            this.selectedItem.isModified = true;
            diagram.moveForward();
        } else if (args.item.text === "Send Backward") {
            this.selectedItem.isModified = true;
            diagram.sendBackward();
        }
    }
    private sendToBack(): void {
        this.selectedItem.isModified = true;
        (this.selectedItem .selectedDiagram).sendToBack();
    }

    private bringToFront(): void {
        this.selectedItem.isModified = true;
        (this.selectedItem.selectedDiagram).bringToFront();
    }

}
      
</script>
