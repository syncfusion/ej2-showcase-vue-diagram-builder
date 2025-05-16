import { SelectorViewModel } from "./selector";
import {
    IDraggingEventArgs, ISizeChangeEventArgs, IRotationEventArgs,
    ISelectionChangeEventArgs, IDragEnterEventArgs, Diagram, Node, Connector, NodeModel,
    ShapeAnnotationModel, TextAlign, HorizontalAlignment, VerticalAlignment, IHistoryChangeArgs, TextStyleModel,
    PathAnnotationModel, ShapeAnnotation, PathAnnotation, AnnotationAlignment, SelectorModel,
    DiagramBeforeMenuOpenEventArgs, IScrollChangeEventArgs, DiagramMenuEventArgs, ITextEditEventArgs,IKeyEventArgs,
    DiagramAction
} from "@syncfusion/ej2-diagrams";
import { ChangeEventArgs as DropDownChangeEventArgs, MultiSelectChangeEventArgs } from "@syncfusion/ej2-dropdowns";
import { ChangeEventArgs as NumericChangeEventArgs, ColorPickerEventArgs } from "@syncfusion/ej2-inputs";
import { ChangeEventArgs as CheckBoxChangeEventArgs, ChangeArgs as ButtonChangeArgs } from "@syncfusion/ej2-buttons";
import { ClickEventArgs as ToolbarClickEventArgs, MenuEventArgs } from "@syncfusion/ej2-navigations";
import { MindMapUtilityMethods } from "./mindmap";
import { OrgChartUtilityMethods } from "./orgchart";
import { TooltipEventArgs } from "@syncfusion/ej2-popups";
import { PageCreation } from "../scripts/pages";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { PaperSize } from "./utilitymethods";

export class DiagramClientSideEvents {
    private selectedItem: SelectorViewModel;
    public page: PageCreation;
    public ddlTextPosition: DropDownListComponent | undefined;
    constructor(selectedItem: SelectorViewModel, page: PageCreation) {
        this.selectedItem = selectedItem;
        this.page = page;
    }

    public selectionChange(args: ISelectionChangeEventArgs): void {
        let diagram: Diagram = (this.selectedItem as any).selectedDiagram;
        if (this.selectedItem.preventSelectionChange || this.selectedItem.isLoading) {
            return;
        }
        if (args.state === "Changed") {
            if (this.selectedItem.diagramType === "MindMap") {
                if (args.newValue.length === 1 && (diagram as any).selectedItems.nodes.length === 1) {
                    let node: Node = args.newValue[0] as Node;
                    (diagram as any).selectedItems.userHandles[0].visible = false;
                    (diagram as any).selectedItems.userHandles[1].visible = false;
                    (diagram as any).selectedItems.userHandles[2].visible = false;
                    if (node.id !== "textNode" && !(node instanceof Connector)) {
                        let addInfo: { [key: string]: Object } = node.addInfo as { [key: string]: Object };
                        if (node.id === "rootNode") {
                            (diagram as any).selectedItems.userHandles[0].visible = true;
                            (diagram as any).selectedItems.userHandles[1].visible = true;
                        } else if (addInfo.orientation.toString() === "Left") {
                            (diagram as any).selectedItems.userHandles[0].visible = true;
                            (diagram as any).selectedItems.userHandles[2].visible = true;
                            (diagram as any).selectedItems.userHandles[2].side = "Left";
                        } else {
                            (diagram as any).selectedItems.userHandles[1].visible = true;
                            (diagram as any).selectedItems.userHandles[2].visible = true;
                            (diagram as any).selectedItems.userHandles[2].side = "Right";
                        }
                        this.selectedItem.utilityMethods.bindMindMapProperties(node, this.selectedItem);
                    }
                    if (node.addInfo && (node.addInfo as { [key: string]: Object }).level !== undefined) {
                        this.selectedItem.mindmapSettings.levelType = "Level" + (node.addInfo as { [key: string]: Object }).level;
                    }
                }
            } else if (this.selectedItem.diagramType === "OrgChart") {
                if (args.newValue.length === 1) {
                    let node: any = args.newValue[0];
                    (diagram as any).selectedItems.userHandles[0].visible = false;
                    (diagram as any).selectedItems.userHandles[1].visible = false;
                    (diagram as any).selectedItems.userHandles[2].visible = false;
                    if (node.id !== "textNode" && node instanceof Node) {
                        (diagram as any).selectedItems.userHandles[0].visible = true;
                        (diagram as any).selectedItems.userHandles[1].visible = true;
                        (diagram as any).selectedItems.userHandles[2].visible = true;
                    }
                }
            } else {
                let selectedItems: Object[] = (this.selectedItem as any).selectedDiagram.selectedItems.nodes;
                selectedItems = selectedItems.concat((this.selectedItem as any).selectedDiagram.selectedItems.connectors);
                this.selectedItem.utilityMethods.enableToolbarItems(selectedItems);
                let nodeContainer: HTMLElement | null = document.getElementById("nodePropertyContainer");
                (nodeContainer as HTMLElement).classList.remove("multiple");
                (nodeContainer as HTMLElement).classList.remove("connector");
                if (selectedItems.length > 1) {
                    this.multipleSelectionSettings(selectedItems);
                } else if (selectedItems.length === 1) {
                    this.singleSelectionSettings(selectedItems[0]);
                } else {
                    this.selectedItem.utilityMethods.objectTypeChange("diagram");
                }
            }
        }
    }

    private multipleSelectionSettings(selectedItems: Object[]): void {
        this.selectedItem.utilityMethods.objectTypeChange("None");
        let showConnectorPanel: boolean = false, showNodePanel: boolean = false;
        let showTextPanel: boolean = false, showConTextPanel: boolean = false;
        let nodeContainer: HTMLElement | null = document.getElementById("nodePropertyContainer");
        for (let i: number = 0; i < selectedItems.length; i++) {
            let object: Object = selectedItems[i];
            if (object instanceof Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            } else if (object instanceof Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        let selectItem1: SelectorModel = (this.selectedItem as any).selectedDiagram.selectedItems;
        if (showNodePanel) {
            (nodeContainer as any).style.display = "";
            (nodeContainer as any).classList.add("multiple");
            if (showConnectorPanel) {
                (nodeContainer as any).classList.add("connector");
            }
            this.selectedItem.utilityMethods.bindNodeProperties((selectItem1 as any).nodes[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            (document.getElementById("connectorPropertyContainer") as any).style.display = "";
            this.selectedItem.utilityMethods.bindConnectorProperties((selectItem1 as any).connectors[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            (document.getElementById("textPropertyContainer") as any).style.display = "";
            if (showTextPanel && showConTextPanel) {
                (document.getElementById("textPositionDiv") as any).style.display = "none";
                (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-left";
            } else {
                (document.getElementById("textPositionDiv") as any).style.display = "";
                (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-right";
                if (showConTextPanel) {
                    (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                    //this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                } else {
                    (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                    //this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                (this.ddlTextPosition as any).dataBind();
            }
        }
    }

    private singleSelectionSettings(selectedObject: Object): void {
        let object: Node | Connector  = undefined as unknown as Node;
        if (selectedObject instanceof Node) {
            this.selectedItem.utilityMethods.objectTypeChange("node");
            object = selectedObject as Node;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        } else if (selectedObject instanceof Connector) {
            this.selectedItem.utilityMethods.objectTypeChange("connector");
            object = selectedObject as Connector;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === "Text") {
            (document.getElementById("textPropertyContainer") as any).style.display = "";
            (document.getElementById("toolbarTextAlignmentDiv") as any).style.display = "none";
            (document.getElementById("textPositionDiv") as any).style.display = "none";
            (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-left";
            this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        } else if (object.annotations.length > 0 && object.annotations[0].content) {
            (document.getElementById("textPropertyContainer") as any).style.display = "";
            let annotation: ShapeAnnotation | PathAnnotation;
            (document.getElementById("toolbarTextAlignmentDiv") as any).style.display = "";
            (document.getElementById("textPositionDiv") as any).style.display = "";
            (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-right";
            this.selectedItem.utilityMethods.bindTextProperties((object as any).annotations[0].style, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign((object as any).annotations[0].horizontalAlignment, (object as any).annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0] as ShapeAnnotation;
                (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                (this.ddlTextPosition as any).value = (this.selectedItem as any).textProperties.textPosition = null;
                (this.ddlTextPosition as any).dataBind();
                (this.ddlTextPosition as any).value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                (this.ddlTextPosition as any).dataBind();
            } else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0] as PathAnnotation;
                (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                (this.ddlTextPosition as any).value = (this.selectedItem as any).textProperties.textPosition = null;
                (this.ddlTextPosition as any).dataBind();
                (this.ddlTextPosition as any).value = this.selectedItem.textProperties.textPosition = annotation.alignment;
                (this.ddlTextPosition as any).dataBind();
            }
        }
    }

    public nodePositionChange(args: IDraggingEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.offsetX = (Math.round((args as any).newValue.offsetX * 100) / 100);
        this.selectedItem.nodeProperties.offsetY = (Math.round((args as any).newValue.offsetY * 100) / 100);
        if (args.state === "Completed") {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }

    public nodeSizeChange(args: ISizeChangeEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.width = (Math.round((args as any).newValue.width * 100) / 100);
        this.selectedItem.nodeProperties.height = (Math.round((args as any).newValue.height * 100) / 100);
        if (args.state === "Completed") {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }

    public textEdit(args: ITextEditEventArgs): void {
        if (this.selectedItem.diagramType === "MindMap") {
            let context: any = this;
            setTimeout(() => { context.selectedItem.selectedDiagram.doLayout(); }, 10);
        }
        this.selectedItem.isModified = true;
    };

    public scrollChange(args: IScrollChangeEventArgs): void {
        // this.selectedItem.scrollSettings.currentZoom = (args.newValue.CurrentZoom * 100).toFixed() + "%";
    }

    public nodeRotationChange(args: IRotationEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.rotateAngle = (Math.round((args as any).newValue.rotateAngle * 100) / 100);
        this.selectedItem.preventPropertyChange = false;
        if (args.state === "Completed") {
            this.selectedItem.isModified = true;
        }
    }

    public diagramContextMenuClick(args: DiagramMenuEventArgs): void {
        let diagram: Diagram = (this.selectedItem as any).selectedDiagram ;
        this.selectedItem.customContextMenu.updateBpmnShape(diagram, args.item);
        let text: string = args.item.text as string;
        if (text === "Group" || text === "Un Group" || text === "Undo" || text === "Redo" || text === "Select All") {
            this.selectedItem.isModified = true;
            if (this.selectedItem.diagramType === "MindMap" || this.selectedItem.diagramType === "OrgChart") {
                if (text === "Undo" || text === "Redo") {
                    args.cancel = true;
                    if (text === "Undo") {
                        this.selectedItem.utilityMethods.undoRedoLayout(true, this.selectedItem);
                    } else if (text === "Redo") {
                        this.selectedItem.utilityMethods.undoRedoLayout(false, this.selectedItem);
                    }
                }
            }
        }
        if (this.selectedItem.diagramType === "MindMap" || this.selectedItem.diagramType === "OrgChart") {
            if (text === "Copy") {
                this.selectedItem.utilityMethods.copyLayout(this.selectedItem);
            } else if (text === "Cut") {
                args.cancel = true;
                this.selectedItem.utilityMethods.cutLayout(this.selectedItem);
            } else if (text === "Paste") {
                args.cancel = true;
                this.selectedItem.utilityMethods.pasteLayout(this.selectedItem);
            }
        }
    }

    public diagramContextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
        let diagram: Diagram = (this.selectedItem as any).selectedDiagram;
        args.hiddenItems = args.hiddenItems.concat(this.selectedItem.customContextMenu.getHiddenMenuItems(diagram));
    }

    public dragEnter(args: IDragEnterEventArgs): void {
        let obj: NodeModel = args.element as NodeModel;
        
        obj.width = 75;
        // obj.height= 80;
        let ratio: number = 100 / (obj as any).width;
        (obj as any).height *= ratio;
        
    }

    public historyChange(args: IHistoryChangeArgs): void {
        let diagram: Diagram = (this.selectedItem as any).selectedDiagram;
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName("db-toolbar-container")[0] as HTMLDivElement;
        toolbarContainer.classList.remove("db-undo");
        toolbarContainer.classList.remove("db-redo");
        if ((diagram as any).historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add("db-undo");
        }
        if ((diagram as any).historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add("db-redo");
        }
    }
    public keyDown(args: IKeyEventArgs) {
        if(this.selectedItem.diagramType === 'MindMap') {
            let diagram: Diagram = this.selectedItem.selectedDiagram;
            if (args.key === "Enter" && args.keyModifiers === 0 && (diagram.diagramActions & DiagramAction.TextEdit)) {
                diagram.endEdit();
            }
        }
    }
}

export class DiagramPropertyBinding {

    private selectedItem: SelectorViewModel;
    public page: PageCreation;
    constructor(selectedItem: SelectorViewModel, page: PageCreation) {
        this.selectedItem = selectedItem;
        this.page = page;

    }

    public pageBreaksChange(args: CheckBoxChangeEventArgs): void {
        if (args.event) {
            (this.selectedItem as any).pageSettings.pageBreaks = args.checked;
            (this.selectedItem as any).selectedDiagram.pageSettings.showPageBreaks = args.checked;
        }
    }

    public paperListChange(args: DropDownChangeEventArgs): void {
        if (args.element) {
            let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
            (document.getElementById("pageDimension") as any).style.display = "none";
            (document.getElementById("pageOrientation") as any).style.display = "";
            this.selectedItem.pageSettings.paperSize = args.itemData.value as string;
            let paperSize: PaperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.pageSettings.paperSize);
            let pageWidth: number = paperSize.pageWidth;
            let pageHeight: number = paperSize.pageHeight;
            if (pageWidth && pageHeight) {
                if (this.selectedItem.pageSettings.isPortrait) {
                    if (pageWidth > pageHeight) {
                        let temp: number = pageWidth;
                        pageWidth = pageHeight;
                        pageHeight = temp;
                    }
                } else {
                    if (pageHeight > pageWidth) {
                        let temp: number = pageHeight;
                        pageHeight = pageWidth;
                        pageWidth = temp;
                    }
                }
                diagram.pageSettings.width = pageWidth;
                diagram.pageSettings.height = pageHeight;
                this.selectedItem.pageSettings.pageWidth = pageWidth;
                this.selectedItem.pageSettings.pageHeight = pageHeight;
                diagram.dataBind();
            } else {
                (document.getElementById("pageOrientation") as any).style.display = "none";
                (document.getElementById("pageDimension") as any).style.display = "";
            }
        }
    }

    public pageDimensionChange(args: NumericChangeEventArgs): void {
        if (args.event) {
            let pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            let target: HTMLInputElement = args.event.target as HTMLInputElement;
            if (target.tagName.toLowerCase() === "span") {
                target = (target as any).parentElement.children[0] as HTMLInputElement;
            }
            let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
            if (target.id === "pageWidth") {
                pageWidth = Number(target.value);
            } else {
                pageHeight = Number(target.value);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = "Landscape";
                } else {
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = "Portrait";
                }
                this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    }

    public pageOrientationChange(args: ButtonChangeArgs): void {
        if (args.event) {
            let pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            let target: HTMLElement = args.event.target as HTMLElement;
            let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
            switch (target.id) {
                case "pagePortrait":
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = "Portrait";
                    break;
                case "pageLandscape":
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = "Landscape";
                    break;
            }
            diagram.dataBind();
            (this.selectedItem as any).pageSettings.pageWidth = diagram.pageSettings.width;
            (this.selectedItem as any).pageSettings.pageHeight = diagram.pageSettings.height;
        }
    }

    public pageBackgroundChange1(args: ColorPickerEventArgs): void {
        if (args.currentValue) {
            // let target: HTMLInputElement = args.target as HTMLInputElement; 
            let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    }

    public textPositionChange(args: DropDownChangeEventArgs): void {
        if (args.value !== null) {
            this.textPropertyChange("textPosition", args.value);
        }
    }

    public toolbarTextStyleChange(args: ToolbarClickEventArgs): void {
        this.textPropertyChange((args as any).item.tooltipText, false);
    }

    public toolbarTextSubAlignChange(args: ToolbarClickEventArgs): void {
        let propertyName: string = (args as any).item.tooltipText.replace(/[" "]/g, "");
        this.textPropertyChange(propertyName, propertyName);
    }

    public toolbarTextAlignChange(args: ToolbarClickEventArgs): void {
        let propertyName: string = (args as any).item.tooltipText.replace("Align ", "");
        this.textPropertyChange(propertyName, propertyName);
    }

    public textPropertyChange(propertyName: string, propertyValue: Object): void {
        if (!this.selectedItem.preventPropertyChange) {
            let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
            let selectedObjects: Object[] = diagram.selectedItems.nodes as Object[];
            selectedObjects = selectedObjects.concat((diagram as any).selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (let i: number = 0; i < selectedObjects.length; i++) {
                    let node: Object = selectedObjects[i];
                    if (node instanceof Node || node instanceof Connector) {
                        if (node.annotations.length > 0) {
                            for (let j: number = 0; j < node.annotations.length; j++) {
                                let annotation: ShapeAnnotationModel | PathAnnotationModel = null as unknown as ShapeAnnotationModel;
                                if (node.annotations[j] instanceof ShapeAnnotation) {
                                    annotation = node.annotations[j] as ShapeAnnotationModel;
                                    if (propertyName === "textposition") {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue as string);
                                    }
                                } else if (node.annotations[j] instanceof PathAnnotation) {
                                    annotation = node.annotations[j] as PathAnnotationModel;
                                    if (propertyName === "textposition") {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition as AnnotationAlignment;
                                    }
                                }
                                if (propertyName === "left" || propertyName === "right" || propertyName === "center") {
                                    annotation.horizontalAlignment = propertyValue as HorizontalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, (annotation as any).verticalAlignment);
                                } else if (propertyName === "top" || propertyName === "bottom") {
                                    annotation.verticalAlignment = propertyValue as VerticalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign((annotation as any).horizontalAlignment, annotation.verticalAlignment);
                                } else if (propertyName === "middle") {
                                    annotation.verticalAlignment = "Center";
                                    this.selectedItem.utilityMethods.updateHorVertAlign((annotation as any).horizontalAlignment, annotation.verticalAlignment);
                                } else {
                                    this.updateTextProperties(propertyName, propertyValue, (annotation as any).style);
                                }
                            }
                        } else if (node.shape && node.shape.type === "Text") {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    }

    public updateTextProperties(propertyName: string, propertyValue: Object, annotation: TextStyleModel): void {
        switch (propertyName) {
            case "bold":
                annotation.bold = !annotation.bold;
                this.updateToolbarState("toolbarTextStyle", annotation.bold, 0);
                break;
            case "italic":
                annotation.italic = !annotation.italic;
                this.updateToolbarState("toolbarTextStyle", annotation.italic, 1);
                break;
            case "underline":
                this.selectedItem.textProperties.textDecoration = !this.selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === "None" || !annotation.textDecoration ? "Underline" : "None";
                this.updateToolbarState("toolbarTextStyle", this.selectedItem.textProperties.textDecoration, 2);
                break;
            case "aligntextleft":
            case "aligntextright":
            case "aligntextcenter":
                annotation.textAlign = propertyValue.toString().replace("AlignText", "") as TextAlign;
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    }

    private updateToolbarState(toolbarName: string, isSelected: boolean, index: number) {
        let toolbarTextStyle: any = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            let cssClass: string = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + " tb-item-selected" : cssClass.replace(" tb-item-selected", "");
            toolbarTextStyle.dataBind();
        }
    }
}

export class MindMapPropertyBinding {

    private selectedItem: SelectorViewModel;

    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

    public mindmapTextStyleChange(args: ToolbarClickEventArgs): void {
        this.updateMindMapTextStyle((args as any).item.tooltipText.toLowerCase(), false);
    }

    public updateMindMapTextStyle(propertyName: string, propertyValue: Object): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        if (diagram.nodes.length > 0) {
            for (let i: number = 0; i < diagram.nodes.length; i++) {
                let node: Node = diagram.nodes[i] as Node;
                if (node.addInfo && node.annotations.length > 0) {
                    let annotation: TextStyleModel = node.annotations[0].style as TextStyleModel;
                    let addInfo: { [key: string]: Object } = node.addInfo as { [key: string]: Object };
                    let levelType: string = this.selectedItem.mindmapSettings.levelType;
                    if ("Level" + addInfo.level === levelType || addInfo.level === levelType) {
                        switch (propertyName) {
                            case "bold":
                                annotation.bold = !annotation.bold;
                                break;
                            case "italic":
                                annotation.italic = !annotation.italic;
                                break;
                            case "underline":
                                annotation.textDecoration = annotation.textDecoration === "None" || !annotation.textDecoration ? "Underline" : "None";
                                break;
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    }

    public mindmapPatternChange(args: MouseEvent): void {
        let target: HTMLDivElement = args.target as HTMLDivElement;
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        (diagram as any).historyManager.startGroupAction();
        for (let i: number = 0; i < (this.selectedItem as any).selectedDiagram.nodes.length; i++) {
            let node: Node = (this.selectedItem as any).selectedDiagram.nodes[i] as Node;
            if (node.id !== "textNode") {
                if (target.className === "mindmap-pattern-style mindmap-pattern1") {
                    if (node.id === "rootNode") {
                        node.height = 50;
                    } else {
                        node.height = 20;
                    }
                } else {
                    node.height = 50;
                }
            }
            (this.selectedItem as any).selectedDiagram.dataBind();
        }
        for (let i: number = 0; i < (this.selectedItem as any).selectedDiagram.connectors.length; i++) {
            let connector: Connector = (this.selectedItem as any).selectedDiagram.connectors[i] as Connector;
            switch (target.className) {
                case "mindmap-pattern-style mindmap-pattern1":
                    connector.type = "Bezier";
                    MindMapUtilityMethods.templateType = "template1";
                    break;
                case "mindmap-pattern-style mindmap-pattern2":
                    connector.type = "Bezier";
                    MindMapUtilityMethods.templateType = "template4";
                    break;
                case "mindmap-pattern-style mindmap-pattern3":
                    connector.type = "Orthogonal";
                    MindMapUtilityMethods.templateType = "template2";
                    break;
                case "mindmap-pattern-style mindmap-pattern4":
                    connector.type = "Straight";
                    MindMapUtilityMethods.templateType = "template3";
                    break;
            }
            (this.selectedItem as any).selectedDiagram.dataBind();
        }
        (diagram as any).historyManager.endGroupAction();
        (this.selectedItem as any).selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    }
}

export class OrgChartPropertyBinding {

    private selectedItem: SelectorViewModel;

    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

    public orgDropDownChange(args: DropDownChangeEventArgs): void {
        if (args.element) {
            let value: string = args.value ? args.value.toString() : "";
            if (args.element.id === "employeeId") {
                this.selectedItem.orgDataSettings.id = value;
            } else if (args.element.id === "superVisorId") {
                this.selectedItem.orgDataSettings.parent = value;
            } else if (args.element.id === "orgNameField") {
                this.selectedItem.orgDataSettings.nameField = value;
            } else if (args.element.id === "orgImageField") {
                this.selectedItem.orgDataSettings.imageField = value;
            }
        }
    }

    public orgMultiSelectChange(args: MultiSelectChangeEventArgs): void {
        if (args.element) {
            if (args.element.id === "orgAdditionalField") {
                this.selectedItem.orgDataSettings.additionalFields = args.value as string[];
            } else if (args.element.id === "orgBindingFields") {
                this.selectedItem.orgDataSettings.bindingFields = args.value as string[];
            }
        }
    }

    public orgChartSpacingChange(args: NumericChangeEventArgs): void {
        if (args.event) {
            let target: HTMLInputElement = args.event.target as HTMLInputElement;
            if (target.tagName.toLowerCase() === "span") {
                target = (target as any).parentElement.children[0] as HTMLInputElement;
            }
            if (target.id === "orgHorizontalSpacing") {
                (this.selectedItem as any).selectedDiagram.layout.horizontalSpacing = args.value;
            } else {
                (this.selectedItem as any).selectedDiagram.layout.verticalSpacing = args.value;
            }
        }
    }

    public orgChartAligmentChange(args: ToolbarClickEventArgs): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        let commandType: string = (args as any).item.tooltipText.replace(/[" "]/g, "").toLowerCase();
        switch (commandType) {
            case "alignleft":
                diagram.layout.horizontalAlignment = "Left";
                break;
            case "alignright":
                diagram.layout.horizontalAlignment = "Right";
                break;
            case "aligncenter":
                diagram.layout.horizontalAlignment = "Center";
                break;
            case "aligntop":
                diagram.layout.verticalAlignment = "Top";
                break;
            case "alignmiddle":
                diagram.layout.verticalAlignment = "Center";
                break;
            case "alignbottom":
                diagram.layout.verticalAlignment = "Bottom";
                break;
        }
        this.selectedItem.isModified = true;
    }

    public layoutOrientationChange(args: MouseEvent): void {
        let target: HTMLDivElement = args.target as HTMLDivElement;
        switch (target.className) {
            case "org-pattern-style org-pattern-1 vertical-alternate":
                OrgChartUtilityMethods.subTreeAlignments = "Alternate";
                OrgChartUtilityMethods.subTreeOrientation = "Vertical";
                break;
            case "org-pattern-style org-pattern-2 vertical-left":
                OrgChartUtilityMethods.subTreeAlignments = "Left";
                OrgChartUtilityMethods.subTreeOrientation = "Vertical";
                break;
            case "org-pattern-style org-pattern-3 vertical-right":
                OrgChartUtilityMethods.subTreeAlignments = "Right";
                OrgChartUtilityMethods.subTreeOrientation = "Vertical";
                break;
            case "org-pattern-style org-pattern-4 horizontal-center":
                OrgChartUtilityMethods.subTreeAlignments = "Center";
                OrgChartUtilityMethods.subTreeOrientation = "Horizontal";
                break;
            case "org-pattern-style org-pattern-5 horizontal-right":
                OrgChartUtilityMethods.subTreeAlignments = "Right";
                OrgChartUtilityMethods.subTreeOrientation = "Horizontal";
                break;
            case "org-pattern-style org-pattern-6 horizontal-left":
                OrgChartUtilityMethods.subTreeAlignments = "Left";
                OrgChartUtilityMethods.subTreeOrientation = "Horizontal";
                break;
        }
        (this.selectedItem as any).selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    }

    public layoutPatternChange(args: MouseEvent): void {
        let target: HTMLDivElement = args.target as HTMLDivElement;
        let bindingFields: boolean = target.id === "orgPattern2" || target.id === "orgPattern4" ? true : false;
        let imageField: boolean = target.id === "orgPattern3" || target.id === "orgPattern4" ? true : false;
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, bindingFields, imageField);
    }

    public getTooltipContent(args: TooltipEventArgs): string {
        if (args.target) {
            if (args.target.classList.contains("db-employee-id")) {
                return "Defines a unique column from the data source.";
            } else if (args.target.classList.contains("db-supervisor-id")) {
                return "Defines a column that is used to identify the person to whom the employee reports to.";
            } else if (args.target.classList.contains("db-nameField-id")) {
                return "Defines a column that has an employee name, and it appears at the top of the shapes.";
            } else if (args.target.classList.contains("db-bindingField-id")) {
                return "Defines columns that have employees’ contact information, and appear after the employees’ names in the shape.";
            } else if (args.target.classList.contains("db-imageField-id")) {
                return "Defines a column that has the picture of an employee.";
            } else if (args.target.classList.contains("db-additionalField-id")) {
                return "Defines columns that should be displayed through a tooltip.";
            }
        }
        return "";
    }
}