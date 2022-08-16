/**
 * Page Handler
 */
import { Button } from "@syncfusion/ej2-buttons";
import { SelectorViewModel } from "./selector";
import { Ajax } from "@syncfusion/ej2-base";
import { Diagram, SnapConstraints } from "@syncfusion/ej2-vue-diagrams";
import { MindMapUtilityMethods, MindMap } from "./mindmap";
import { OrgChartUtilityMethods, OrgChartData } from "./orgchart";
export class PageOptions {
  public name: string | undefined;
  public diagram?: any;
  public text: string | undefined;
  public templateDiagramType: string | undefined;
  public mindmapTemplateType: string | undefined;
  public orgChartTemplateType: string | undefined;
}
export class PageCreation {
  public pageOptionList: PageOptions[] = [];
  public activePage: PageOptions | undefined;
  public selectedItem: SelectorViewModel;
  public pageSwitch = false;
  constructor(selectedItem: SelectorViewModel) {
    this.selectedItem = selectedItem;
  }
  public generatePageButtons(pages: PageOptions[]): void {
    const pageOptionElement: HTMLDivElement = document.getElementById(
      "pageOptionList"
    ) as HTMLDivElement;
    const pageContainerWidth: number =
      (pageOptionElement as any).parentElement.getBoundingClientRect().width -
      1;
    let buttonWidth = 75;
    if (pages.length * buttonWidth > pageContainerWidth) {
      buttonWidth = (pageContainerWidth - 32) / pages.length;
    }
    while (pageOptionElement.hasChildNodes()) {
      pageOptionElement.removeChild((pageOptionElement as any).lastChild);
    }
    for (let i = 0; i < pages.length; i++) {
      const pageOption: PageOptions = pages[i];
      const buttonElement: HTMLButtonElement = document.createElement("button");
      buttonElement.setAttribute("id", (pageOption as any).name);
      buttonElement.setAttribute("style", "width:" + buttonWidth + "px");
      buttonElement.setAttribute("title", (pageOption as any).text);
      buttonElement.onclick = this.showPageData.bind(this);
      pageOptionElement.appendChild(buttonElement);
      const pageButton: Button = new Button({
        content: pageOption.text,
      });
      pageButton.appendTo(buttonElement);
      if ((this.activePage as any).name === pageOption.name) {
        buttonElement.classList.add("db-active-page");
      }
    }
    const buttonElement: HTMLButtonElement = document.createElement("button");
    buttonElement.setAttribute("id", "addNewPage");
    pageOptionElement.appendChild(buttonElement);
    buttonElement.setAttribute("style", "width:32px");
    buttonElement.onclick = this.addNewPage.bind(this);
    const pageButton: Button = new Button({
      iconCss: "sf-icon-Plus",
    });
    pageButton.appendTo(buttonElement);
  }
  public showPageData(evt: MouseEvent): void {
    const target: HTMLButtonElement = evt.target as HTMLButtonElement;
    const page1: PageOptions = this.findPage(target.id);
    if (page1 != null) {
      if (this.activePage) {
        const button: HTMLElement | null = document.getElementById(
          this.activePage.name as any
        );
        if ((button as any).classList.contains("db-active-page")) {
          (button as any).classList.remove("db-active-page");
        }
        this.saveDiagramSettings();
      }
      this.activePage = page1;
      this.pageSwitch = true;
      this.loadDiagramSettings();
      this.pageSwitch = false;
    }
    target.classList.add("db-active-page");
  }
  public findPage(id: string): PageOptions {
    for (let i = 0; i < this.pageOptionList.length; i++) {
      if (this.pageOptionList[i].name === id) {
        return this.pageOptionList[i];
      }
    }
    return this.pageOptionList[0];
  }
  public addNewPage(): void {
    if (this.activePage) {
      this.saveDiagramSettings();
      (this.selectedItem.selectedDiagram as any).clear();
    }
    if (this.selectedItem.diagramType === "MindMap") {
      MindMapUtilityMethods.createEmptyMindMap();
      (this.selectedItem.selectedDiagram as any).doLayout();
    } else if (this.selectedItem.diagramType === "OrgChart") {
      OrgChartUtilityMethods.createEmptyOrgChart();
      (this.selectedItem.selectedDiagram as any).doLayout();
    }
    this.activePage = new PageOptions();
    this.activePage.name = "page" + (this.pageOptionList.length + 1);
    this.activePage.text = "Page" + (this.pageOptionList.length + 1);
    this.pageOptionList.push(this.activePage);
    this.generatePageButtons(this.pageOptionList);
  }
  public savePage(): string {
    const pageData: { [key: string]: any } = {};
    this.saveDiagramSettings();
    pageData.pageOptionList = this.pageOptionList;
    pageData.activePage = (this.activePage as any).name;
    (pageData as any).diagramType = this.selectedItem.diagramType;
    return JSON.stringify(pageData);
  }
  public loadPage(savedData: string): void {
    const pageData: { [key: string]: any } = JSON.parse(savedData);
    this.pageOptionList = pageData.pageOptionList as PageOptions[];
    this.activePage = this.findPage(pageData.activePage.toString());
    this.selectedItem.diagramType = pageData.diagramType.toString();
    this.generatePageButtons(this.pageOptionList);
  }
  public saveDiagramSettings(): void {
    (this.activePage as any).diagram = JSON.parse(
      (this.selectedItem.selectedDiagram as any).saveDiagram()
    );
    if (this.selectedItem.diagramType === "MindMap") {
      (this.activePage as any).mindmapTemplateType =
        MindMapUtilityMethods.templateType;
    }
  }
  public loadDiagramSettings(): void {
    const diagram: Diagram | undefined = this.selectedItem.selectedDiagram;
    document.getElementsByClassName("sidebar")[0].className =
      "sidebar show-overview";
    this.selectedItem.isLoading = true;
    (diagram as any).loadDiagram(
      JSON.stringify((this.activePage as any).diagram)
    );
    (diagram as any).clearSelection();
    this.selectedItem.isLoading = false;
    document.getElementsByClassName("sidebar")[0].className = "sidebar";
    if (this.selectedItem.diagramType === "MindMap") {
      MindMapUtilityMethods.templateType = (
        this.activePage as any
      ).mindmapTemplateType;
      if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
        MindMapUtilityMethods.selectedItem = this.selectedItem;
        const map: MindMap = new MindMap(this.selectedItem);
        map.createMindMap(false);
      }
      const closeIconDiv: HTMLElement = (
        document.getElementById("diagram") as any
      ).querySelector("#closeIconDiv  ") as HTMLElement;
      if (closeIconDiv) {
        closeIconDiv.onclick = MindMapUtilityMethods.onHideNodeClick.bind(
          MindMapUtilityMethods
        );
      }
    }
    if (this.selectedItem.diagramType === "OrgChart") {
      if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
        OrgChartUtilityMethods.selectedItem = this.selectedItem;
        const org: OrgChartData = new OrgChartData(this.selectedItem);
        org.createOrgChart(false);
      }
      const closeIconDiv: HTMLElement = (
        document.getElementById("diagram") as any
      ).querySelector("#closeIconDiv") as HTMLElement;
      if (closeIconDiv) {
        closeIconDiv.onclick = OrgChartUtilityMethods.onHideNodeClick.bind(
          OrgChartUtilityMethods
        );
      }
    }
    let btnView: any = document.getElementById("btnViewMenu");
    btnView = btnView.ej2_instances[0];
    if ((diagram as any).rulerSettings) {
      btnView.items[5].iconCss = (diagram as any).rulerSettings.showRulers
        ? "sf-icon-Selection"
        : " ";
      const containerDiv: HTMLElement | null = document.getElementById(
        "diagramContainerDiv"
      );
      if (!(diagram as any).rulerSettings.showRulers) {
        (containerDiv as any).classList.remove("db-show-ruler");
      } else {
        if (!(containerDiv as any).classList.contains("db-show-ruler")) {
          (containerDiv as any).classList.add("db-show-ruler");
        }
      }
    }
    if ((diagram as any).snapSettings) {
      btnView.items[6].iconCss =
        (diagram as any).snapSettings.constraints & SnapConstraints.SnapToObject
          ? "sf-icon-Selection"
          : "  ";
      btnView.items[7].iconCss =
        (diagram as any).snapSettings.constraints & SnapConstraints.ShowLines
          ? "sf-icon-Selection"
          : "  ";
      btnView.items[9].iconCss =
        (diagram as any).snapSettings.constraints & SnapConstraints.SnapToLines
          ? "sf-icon-Selection"
          : "  ";
    }
  }
  public loadJson(): void {
    if (!this.selectedItem.uniqueId) {
      this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
    }
    if (this.selectedItem.isModified) {
      const spanElement: HTMLSpanElement = document.getElementById(
        "diagramreport"
      ) as HTMLSpanElement;
      spanElement.innerHTML = "Saving";
      this.selectedItem.isModified = false;
      const save: string = this.savePage();
      const ajax: Ajax = new Ajax(
        "https://ej2services.syncfusion.com/production/web-services/api/Diagram/SaveJson",
        "POST  ",
        true,
        "application/json"
      );
      const data: string = JSON.stringify({
        DiagramName: this.selectedItem.uniqueId,
        DiagramContent: save,
      });
      ajax.send(data).then();
      const context: any = this;
      ajax.onSuccess = (data: string): void => {
        //if (window.location.pathname.length === 1) {
        const uri: string =
          window.location.origin +
          this.selectedItem.getAbsolutePath() +
          "?id=  " +
          this.selectedItem.uniqueId;
        window.history.replaceState(null, "", uri);
        context.isModified = false;
        spanElement.innerHTML = "Saved";
        //}
      };
      ajax.onFailure = (args: string): void => {
        context.isModified = false;
        spanElement.innerHTML = "Offline";
      };
      ajax.onError = (args: Event): any => {
        context.isModified = false;
        spanElement.innerHTML = "Offline";
        return {};
      };
    }
  }
}
