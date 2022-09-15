<template>
    <div>
    <ejs-dropdownbutton :items="menuItems" v-on:select="zoomChange($event)"  :content="selectedItem.scrollSettings.currentZoom"></ejs-dropdownbutton>
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
import App from "../App.vue"


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
         { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
          { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
          { text: 'Fit To Screen' }
         
      ]
 public zoomChange(args: MenuEventArgs): void {
        let diagram :Diagram= this.selectedItem.selectedDiagram;
        if (args.item.text === "Custom") {
            let ss: string = "";
        } else if (args.item.text === "Fit To Screen") {
            this.selectedItem.scrollSettings.currentZoom = "Fit ...";
           diagram.fitToPage({ mode: "Page", region: "Content", margin: { left: 0, top: 0, right: 0, bottom: 0 } });
        } else {
            let currentZoom: any = diagram.scrollSettings.currentZoom;
            let zoom: ZoomOptions = {};
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
            }
            ((this.selectedItem as any).scrollSettings).currentZoom = args.item.text;
           diagram.zoomTo(zoom);
        }
    }   
}
      
</script>
