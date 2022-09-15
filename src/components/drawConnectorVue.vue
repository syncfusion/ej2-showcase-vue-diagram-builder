<template>
    <div>
         <ejs-dropdownbutton  id='btnDrawConnector' :items="menuItems"    iconCss='sf-icon-ConnectorMode' v-on:select="drawConnectorChange($event)"></ejs-dropdownbutton>
    </div>
</template>
<script lang="ts" > 

import {
  DiagramComponent,
  DiagramTools,
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
public toolbarEditor: ToolbarComponent;
public diagram: DiagramComponent;
public selectedItem: SelectorViewModel = new SelectorViewModel();
public drawConnector:DropDownButtonComponent;
mounted() {
        window.addEventListener("load", this.onWindowLoad);
    }
 public onWindowLoad() {
    let diagramObj: any = document.getElementById("diagram");
    this.diagram = diagramObj.ej2_instances[0];
    let selectedItems: any = document.getElementById("diagram");
    this.selectedItem.selectedDiagram = selectedItems.ej2_instances[0];
    let  toolbarEditor : any = document.getElementById("toolbarEditor");
    this.toolbarEditor = toolbarEditor.ej2_instances[0];
    let drawConnector : any = document.getElementById("btnDrawConnector");
    this.drawConnector= drawConnector.ej2_instances[0];
 }
public menuItems: ItemModel[] = [
    { iconCss: "sf-icon-StraightLine", text: "Straight Line" },
    { iconCss: "sf-icon-ConnectorMode", text: "Orthogonal Line" },
    { iconCss: "sf-icon-BeizerLine", text: "Bezier" },
    { iconCss: "sf-icon-BeizerLine", text: "Free Hand" }
  ];
   public drawConnectorChange(args: MenuEventArgs): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        if (args.item.text === "Straight Line") {
            diagram.drawingObject = { type: "Straight", style: { strokeWidth: 1 } };
        } else if (args.item.text === "Orthogonal Line") {
            diagram.drawingObject = { type: "Orthogonal", style: { strokeWidth: 1 } };
        } else if (args.item.text === "Bezier") {
            diagram.drawingObject = { type: "Bezier", style: { strokeWidth: 1 } };
        }
        // else if (args.item.text === "Free Hand") {
        //     diagram.drawingObject = { type: "Freehand", style: { strokeWidth: 1 } };
        // }
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.clearSelection();
        this.removeSelectedToolbarItem();
        (document.getElementById("btnDrawConnector") as any).classList.add("tb-item-selected");
    }
     public removeSelectedToolbarItem(): void {
        for (let i: number = 0; i < (this.toolbarEditor as any).items.length; i++) {
            let item: any = (this.toolbarEditor as any).items[i];
            if (item.cssClass.indexOf("tb-item-selected") !== -1) {
                item.cssClass = item.cssClass.replace(" tb-item-selected", "");
            }
        }
        this.toolbarEditor.dataBind();
        (document.getElementById("btnDrawShape") as any).classList.remove("tb-item-selected");
        (document.getElementById("btnDrawConnector") as any).classList.remove("tb-item-selected");
    }
}
      
</script>
