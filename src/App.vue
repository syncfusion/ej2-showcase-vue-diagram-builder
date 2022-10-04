<template>
<div>
<ejs-contextmenu id='arrangeContextMenu' :animationSettings='dialogAnimationSettings' :items='dropDownDataSources.arrangeMenuItems'
    :onOpen='arrangeContextMenuOpen' cssClass="arrangeMenu"  v-on:select="contextMenuClick($event)"
    :beforeClose="arrangeMenuBeforeClose">
</ejs-contextmenu>
  <div class="diagrambuilder-container" style="display: none;">
    <div class="header navbar">
      <div class="db-header-container">
        <div class="db-diagram-name-container">
          <span
            id="diagramName"
            style="
              width: 250px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
            class="db-diagram-name" 
            v-on:click="renameDiagram"
            >Untitled Diagram
          </span>
          <input
            id="diagramEditable"
            type="text"
            class="db-diagram-name"
            v-on:keydown="diagramNameKeyDown"
            v-on:focusout="diagramNameChange"
          />
          <span id="diagramreport" class="db-diagram-name db-save-text"></span>
        </div>
        <div class="db-menu-container">
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnFileMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.fileMenuItems"
              v-on:select="menuClick($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >File
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnEditMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.editMenuItems"
               v-on:select="menuClick($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >Edit
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnViewMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.viewMenuItems"
               v-on:select="menuClick($event)"
               :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >View
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnArrangeMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.arrangeMenuItems"
               v-on:select="menuClick($event)"
               :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              target='.e-contextmenu-wrapper.arrangeMenu'
              >Arrange
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnWindowMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.windowMenuItems"
               v-on:select="menuClick($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >Window
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style" style="display: none">
            <ejs-dropdownbutton
              id="btnHelpMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.helpMenuItems"
               v-on:select="menuClick($event)"
               :beforeItemRender="beforeItemRender"
              >Help
            </ejs-dropdownbutton>
          </div>
        </div>
      </div>
      <div class='db-toolbar-editor'>
          <div class='db-toolbar-container '>
            <ejs-toolbar id="toolbarEditor" overflowMode="Scrollable" v-on:clicked="toolbarEditorClick($event)">
              <e-items>
                <e-item
                  prefixIcon="sf-icon-Undo tb-icons"
                  tooltipText="Undo"
                  cssClass="tb-item-start tb-item-undo"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-Redo tb-icons"
                  tooltipText="Redo"
                  cssClass="tb-item-end tb-item-redo"
                ></e-item>
                <e-item type="Separator"> </e-item>
                <e-item
                  prefixIcon="sf-icon-ZoomOut tb-icons"
                  tooltipText="Zoom Out(Ctrl + -)"
                  cssClass="tb-item-start"
                ></e-item>
                <e-item cssClass="tb-item-end tb-zoom-dropdown-btn"   :template = "toolbarTemplate" >
                </e-item>
                <e-item
                  prefixIcon="sf-icon-ZoomIn tb-icons"
                  tooltipText="Zoom In(Ctrl + +)"
                  cssClass="tb-item-end"
                ></e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  prefixIcon="sf-icon-Pan tb-icons"
                  tooltipText="Pan Tool"
                  cssClass="tb-item-start"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-Selector tb-icons"
                  tooltipText="Pointer"
                  cssClass="tb-item-middle tb-item-selected"
                ></e-item>
                <e-item
                 
                  tooltipText="Draw Shapes"
                  cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable"
                 :template = "drawShapeTemplate" >
                 
                </e-item>
                <e-item
                  
                  tooltipText="Draw Connectors"
                  cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable"
                  :template = "drawConnectorTemplate"
                  >
                </e-item>
                <e-item
                  prefixIcon="sf-icon-TextInput tb-icons"
                  tooltipText="Text Tool"
                  cssClass="tb-item-end tb-custom-diagram-disable"
                ></e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  prefixIcon="sf-icon-ColorPickers tb-icons"
                  mode="Palette"
                  tooltipText="Fill Color"
                  cssClass="tb-item-start tb-item-fill"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-Pickers tb-icons"
                  mode="Palette"
                  tooltipText="Border Color"
                  cssClass="tb-item-end tb-item-stroke"
                ></e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  prefixIcon="sf-icon-Group tb-icons"
                  tooltipText="Group"
                  cssClass="tb-item-start tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-Ungroup tb-icons"
                  tooltipText="Ungroup"
                  cssClass="tb-item-end tb-item-ungroup"
                ></e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  prefixIcon="sf-icon-Lock tb-icons"
                  tooltipText="Lock"
                  cssClass="tb-item-start tb-item-lock-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-Delete tb-icons"
                  tooltipText="Delete"
                  cssClass="tb-item-end tb-item-lock-category"
                ></e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  prefixIcon="sf-icon-Layers tb-icons"
                  tooltipText="Show Layers"
                  cssClass="tb-item-start tb-custom-diagram-disable"
                ></e-item>
                <e-item
                  prefixIcon="db-theme-svg tb-icons"
                  tooltipText="Themes"
                  cssClass="tb-item-end tb-custom-diagram-disable"
                ></e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  tooltipText="Order"
                  cssClass="tb-item-end tb-item-order tb-dropdown-btn-icon"
                  :template = "orderTemplate"
                 >
                </e-item>
                <e-item type="Separator"></e-item>
                <e-item
                  prefixIcon="sf-icon-AlignLeft tb-icons"
                  tooltipText="Align Left"
                  cssClass="tb-item-start tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-AlignHorizontally tb-icons"
                  tooltipText="Align Center"
                  cssClass="tb-item-middle  tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-AlignRight tb-icons"
                  tooltipText="Align Right"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-AilgnTop tb-icons"
                  tooltipText="Align Top"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-AlignVertically tb-icons"
                  tooltipText="Align Middle"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-AlignBottom tb-icons"
                  tooltipText="Align Bottom"
                  cssClass="tb-item-middle tb-item-align-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-DistributeHorizontal tb-icons"
                  tooltipText="Distribute Objects Vertically"
                  cssClass="tb-item-middle tb-item-space-category"
                ></e-item>
                <e-item
                  prefixIcon="sf-icon-DistributeVertical tb-icons"
                  tooltipText="Distribute Objects Horizontally"
                  cssClass="tb-item-end tb-item-space-category"
                ></e-item>
              </e-items>
            </ejs-toolbar>
          </div>
          <div class="db-toolbar-hide-btn">
            <ejs-button
              id="btnHideToolbar"
              iconCss="sf-icon-Collapse tb-icons"
            ></ejs-button>
          </div>
      </div>
    </div>
    <div class="row content">
      <div class="sidebar show-overview">
        <div class="db-palette-parent">
          <ejs-symbolpalette id="symbolpalette" ref="paletteObj" width="100%" height="100%" 
           :palettes='palettes.palettes' 
           :symbolWidth = "50"
           :symbolHeight = "50"
           :getSymbolInfo='palettes.getSymbolInfo' :symbolMargin='palettes.symbolMargin'
           :symbolPreview ='palettes.symbolPreview'
           :getNodeDefaults='palettes.setPaletteNodeDefaults'
           :enableSearch='palettes.enableSearch'>
          </ejs-symbolpalette>
        </div>
        <div class="db-overview-parent">
          <div id="overview"></div>
        </div> 
        <div id="moreShapesDiv" class="db-palette-more-shapes">
          <div id="overviewspan" class="db-overview">
            <span></span>
          </div>
          <div
            class="db-palette-more-shapes-text"
            v-on:click="moreShapesClick($event)"
          >
            More Shapes
          </div>
        </div>
      </div>
      <div class="main-content" role="main">
        <div class="db-diagram-container">
          <div id="diagramContainerDiv" class="db-current-diagram-container">
            <ejs-diagram
              id="diagram"
              ref="diagram"
              :width="width"
              :height="height"
              :snapSettings="snapSettings"
              :pageSettings="pageSettings"
              :scrollSettings="scrollSettings"
              :selectedItems="selectedItems"
              :getNodeDefaults="setNodeDefaults"
              :getConnectorDefaults="setConnectorDefaults"
              :selectionChange="this.diagramEvents.selectionChange.bind(this.diagramEvents)"
              :positionChange="this.diagramEvents.nodePositionChange.bind(this.diagramEvents)"
              :sizeChange="this.diagramEvents.nodeSizeChange.bind(this.diagramEvents)"   
              :rotateChange="this.diagramEvents.nodeRotationChange.bind(this.diagramEvents)"
              :contextMenuOpen="this.diagramEvents.diagramContextMenuOpen.bind(this.diagramEvents)"
              :contextMenuClick="this.diagramEvents.diagramContextMenuClick.bind(this.diagramEvents)"
              :dragEnter="this.diagramEvents.dragEnter.bind(this.diagramEvents)"
              :historyChange="this.diagramEvents.historyChange.bind(this.diagramEvents)"
              :scrollChange="this.diagramEvents.scrollChange.bind(this.diagramEvents)"
              :collectionChange="this.collectionChange"
              :drop="this.drop"
              :getCustomTool="getCustomTool"
              :textEdit="this.diagramEvents.textEdit.bind(this.diagramEvents)"
              :keyDown="this.diagramEvents.keyDown.bind(this.diagramEvents)"
              backgroundColor="transparent"
              :contextMenuSettings="contextMenuSettings"
              :commandManager="commandManager" 
            ></ejs-diagram>
          </div>
          <div class="db-more-diagram-options-container">
            <div id="pageOptionList"></div>
          </div>
        </div>
        <div class="db-property-editor-container" style="overflow: auto">
          <div
            id="generalDiagramContainer"
            class="db-general-diagram-prop-container"
          >
            <div
              id="diagramPropertyContainer"
              class="db-diagram-prop-container"
            >
              <div class="row db-prop-header-text">Page Settings</div>
              <div class="row db-prop-row" style="background:white">
                <ejs-dropdownlist id="pageSettingsList" :dataSource="dropDownDataSources.paperList" v-on:change="diagramPropertyBinding.paperListChange($event)"
                  :fields="dropdownListFields" :value="selectedItem.pageSettings.paperSize" ></ejs-dropdownlist>
              </div>
              <div class="row db-prop-row" id="pageOrientation">
                <div
                  class="col-xs-3 db-prop-col-style"
                  style="margin-right: 8px; width: 30%"
                >
                  <ejs-radiobutton
                    id="pagePortrait"
                    label="Portrait"
                    name="pageSettings"
                    :checked="selectedItem.pageSettings.isPortrait"
                    v-on:change="diagramPropertyBinding.pageOrientationChange($event)"
                  ></ejs-radiobutton>
                </div>
                <div class="col-xs-3 db-prop-col-style">
                  <ejs-radiobutton
                    id="pageLandscape"
                    label="Landscape"
                    name="pageSettings"
                    :checked="selectedItem.pageSettings.isLandscape"
                    v-on:change="diagramPropertyBinding.pageOrientationChange($event)" 
                  >
                  </ejs-radiobutton>
                </div>
              </div>
              <div
                class="row db-prop-row"
                id="pageDimension"
                style="display: none"
              >
                <div class="col-xs-6 db-col-left">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>W</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        id="pageWidth"
                        min="100"
                        format="n0"
                        :value="selectedItem.pageSettings.pageWidth"
                        v-on:change="diagramPropertyBinding.pageDimensionChange($event)"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 db-col-right">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>H</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        id="pageHeight"
                        min="100"
                        format="n0"
                        :value="selectedItem.pageSettings.pageHeight"
                        v-on:change="diagramPropertyBinding.pageDimensionChange($event)"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        type="color"
                        mode="Palette"
                        :showButtons="false"
                        width="100%"
                        :value="selectedItem.pageSettings.backgroundColor"
                        v-on:change="diagramPropertyBinding.pageBackgroundChange1($event)"
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button
                        iconCss="sf-icon-ColorPickers tb-icons"
                      ></ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <ejs-checkbox id="showPageBreaks" label="Page Breaks" :checked="selectedItem.pageSettings.pageBreaks" v-on:change="diagramPropertyBinding.pageBreaksChange($event)">
                </ejs-checkbox>
              </div>
            </div>
            <div
              id="nodePropertyContainer"
              class="db-node-prop-container"
              style="display: none"
            >
              <div class="db-node-behaviour-prop">
                <div class="row db-prop-header-text">Dimensions</div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>X</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="nodeOffsetX"
                          format="n0"
                         v-model="selectedItem.nodeProperties.offsetX"
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>Y</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="nodeOffsetY"
                          format="n0"
                           v-model="selectedItem.nodeProperties.offsetY"
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>W</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="nodeWidth"
                          format="n0"
                           v-model="selectedItem.nodeProperties.width"
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>H</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="nodeHeight"
                          min="1"
                          format="n0"
                           v-model="selectedItem.nodeProperties.height"
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-checkbox
                      id="aspectRatio"
                      label="Aspect Ratio"
                     v-model="selectedItem.nodeProperties.aspectRatio"
                    ></ejs-checkbox>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <span class="db-prop-text-style">Rotate</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <div class="db-text-container">
                      <div class="db-text">
                        <ejs-button iconCss="sf-icon-Rotate1 tb-icons">
                        </ejs-button>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox
                          id="nodeRotateAngle"
                          format="n0"
                          v-model="selectedItem.nodeProperties.rotateAngle"
                        ></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="db-prop-separator"></div>
                <div class="row db-prop-header-text">Insert</div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-toolbar
                      id="toolbarNodeInsert"
                      overflowMode="Scrollable"
                      v-on:clicked="toolbarInsertClick($event)" 
                    >
                      <e-items>
                        <e-item
                          prefixIcon="sf-icon-InsertLink tb-icons"
                          tooltipText="Insert Link"
                          cssClass="tb-item-start"
                        ></e-item>
                        <e-item
                          prefixIcon="sf-icon-InsertImage tb-icons"
                          tooltipText="Insert Image"
                          cssClass="tb-item-end"
                        ></e-item>
                      </e-items>
                    </ejs-toolbar>
                  </div>
                </div>
                <div class="db-prop-separator"></div>
              </div>
              <div id="nodeStyleProperties" class="db-node-style-prop">
                <div class="row db-background-style">
                  <div class="row db-prop-header-text">
                    Background and Border Styles
                  </div>
                  <div class="row db-prop-row">
                    <div class="col-xs-6 db-col-left">
                      <div class="db-color-container">
                        <div class="db-color-input">
                          <ejs-colorpicker
                            id="nodeFillColor"
                            type="color"
                            mode="Palette"
                            :showButtons="false"
                            v-model="selectedItem.nodeProperties.fillColor"
                          ></ejs-colorpicker>
                        </div>
                        <div class="db-color-btn">
                          <ejs-button
                            iconCss="sf-icon-ColorPickers tb-icons"
                          ></ejs-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="gradientStyle"
                    class="row db-prop-row db-gradient-style-hide"
                  >
                    <div class="col-xs-4 db-col-left">
                      <ejs-checkbox
                        id="gradient"
                        label="Gradient"
                        v-model="selectedItem.nodeProperties.gradient"
                      ></ejs-checkbox>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <ejs-dropdownlist
                        v-model="selectedItem.nodeProperties.gradientDirection"
                        :dataSource="dropDownDataSources.gradientDirections"
                        :fields="dropdownListFields"
                        popupWidth="200px"
                      ></ejs-dropdownlist>
                    </div>
                    <div class="col-xs-4 db-col-right">
                      <div class="db-color-container">
                        <div class="db-color-input">
                          <ejs-colorpicker
                            id="nodeGradientColor"
                            type="color"
                            mode="Palette"
                            :showButtons="false"
                            v-model="selectedItem.nodeProperties.gradientColor"
                          ></ejs-colorpicker>
                        </div>
                        <div class="db-color-btn">
                          <ejs-button iconCss="sf-icon-ColorPickers tb-icons">
                          </ejs-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-border-style">
                  <div class="row db-prop-header-text db-border-style-header">
                    Border/Line Styles
                  </div>
                  <div class="row db-prop-row">
                    <div class="col-xs-4 db-col-right">
                      <span class="db-prop-text-style">Stroke Color</span>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <span class="db-prop-text-style">Stroke Style</span>
                    </div>
                    <div class="col-xs-4 db-col-left">
                      <span class="db-prop-text-style">Stroke Width</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4 db-col-left">
                      <div class="db-color-container">
                        <div class="db-color-input">
                          <ejs-colorpicker
                            id="nodeStrokeColor"
                            type="color"
                            mode="Palette"
                            :showButtons="false"
                            v-model="selectedItem.nodeProperties.strokeColor"
                          ></ejs-colorpicker>
                        </div>
                        <div class="db-color-btn">
                          <ejs-button iconCss="sf-icon-Pickers tb-icons">
                          </ejs-button>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <ejs-dropdownlist id="nodeBorderStyle" v-model="selectedItem.nodeProperties.strokeStyle" :dataSource="dropDownDataSources.borderStyles"
                                    popupWidth="160px" :fields="dropdownListFields" :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                      </ejs-dropdownlist>
                    </div>
                    <div class="col-xs-4 db-col-right">
                      <ejs-numerictextbox
                        id="nodeStrokeWidth"
                        :step="0.5"
                        v-model="selectedItem.nodeProperties.strokeWidth"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                  <div class="row db-prop-row">
                    <div
                      class="col-xs-2 db-col-right db-prop-text-style"
                      style="padding-top: 6px"
                    >
                      <span class="db-prop-text-style">Opacity</span>
                    </div>
                    <div
                      class="col-xs-8 db-col-left"
                      style="padding-right: 10px"
                    >
                      <ejs-slider
                        min="0"
                        max="100"
                        step="10"
                        type="MinRange"
                        v-model="selectedItem.nodeProperties.opacity"
                      ></ejs-slider>
                    </div>
                    <div class="col-xs-2 db-col-right">
                      <input
                        type="text"
                        readOnly="true"
                        class="db-readonly-input"
                       v-model="selectedItem.nodeProperties.opacityText"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="connectorPropertyContainer"
              class="db-connector-prop-container"
              style="display: none"
            >
              <div class="row db-prop-header-text">Connector Properties</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">Connector Type</span>
                </div>
              </div>
              <div class="row">
                            <div class="col-xs-6 db-col-left">
                                <ejs-dropdownlist v-model="selectedItem.connectorProperties.lineType" :dataSource="dropDownDataSources.lineTypes" :fields="dropdownListFields">
                                </ejs-dropdownlist>
                            </div>
                        </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        id="lineColor"
                        mode="Palette"
                        type="color"
                        :showButtons="false"
                        v-model="selectedItem.connectorProperties.lineColor"
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-Pickers tb-icons">
                      </ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">Stroke Style</span>
                </div>
                <div class="col-xs-4 db-col-right db-prop -text-style">
                  <span class="db-prop-text-style">Thickness</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist id="lineStyle" v-model="selectedItem.nodeProperties.strokeStyle" :dataSource="dropDownDataSources.borderStyles"
                                    popupWidth="160px" :fields="dropdownListFields" :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                      </ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :min="0.5" :step="0.5" id="lineWidth" v-model="selectedItem.connectorProperties.lineWidth"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">Start Arrow</span>
                </div>
                <div class="col-xs-4 db-col-right db-prop-text-style">
                  <span class="db-prop-text-style">Size</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist v-model="selectedItem.connectorProperties.sourceType" :dataSource="dropDownDataSources.decoratorList"
                                    :fields="dropdownListFields"></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox  :step="1" id="sourceSize" v-model="selectedItem.connectorProperties.sourceSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">End Arrow</span>
                </div>
                <div class="col-xs-4 db-col-right db-prop-text-style">
                  <span class="db-prop-text-style">Size</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist v-model="selectedItem.connectorProperties.targetType" :dataSource="dropDownDataSources.decoratorList"
                                    fields="dropdownListFields"></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox  :step="1" id="targetSize" v-model="selectedItem.connectorProperties.targetSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left" style="margin-top: 5px">
                  <ejs-checkbox id="lineJump" label="Bridging" v-model="selectedItem.connectorProperties.lineJump"></ejs-checkbox>
                </div>
                <div
                  class="col-xs-4 db-col-right"
                  id="lineJumpSizeDiv"
                  style="display: none"
                >
                  <ejs-numerictextbox :min="1" :step="1" v-model="selectedItem.connectorProperties.lineJumpSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                  <ejs-checkbox id="SegmentEditing" :checked="false" label="Segment Editing" v-on:change ="SegmentEditing($event)" ></ejs-checkbox>
                </div>
              <div class="row db-prop-row">
                <div
                  class="col-xs-2 db-col-right db-prop-text-style"
                  style="padding-top: 6px"
                >
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                  <ejs-slider
                    id="default"
                    min="0"
                    max="100"
                    step="10"
                    type="MinRange"
                    v-model="selectedItem.connectorProperties.opacity"
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    type="text"
                    readonly="true"
                    class="db-readonly-input"
                   v-model="selectedItem.connectorProperties.opacityText"
                  />
                </div>
              </div>
            </div>
            <div
              id="textPropertyContainer"
              class="db-text-prop-container"
              style="display: none"
            >
              <div class="db-prop-separator"></div>
              <div class="row db-prop-header-text">Text</div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist height="34px" :dataSource="dropDownDataSources.fontFamilyList" v-model="selectedItem.textProperties.fontFamily"
                                    :fields="dropdownListFields" index=0></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :min="1" :step="1"  v-model="selectedItem.textProperties.fontSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left" id="textPositionDiv">
                  <ejs-dropdownlist id="ddlTextPosition" index=0 :dataSource="selectedItem.textProperties.textPositionDataSource" :value="selectedItem.textProperties.textPosition"
                                    :fields="dropdownListFields" v-on:change="diagramPropertyBinding.textPositionChange($event)" ></ejs-dropdownlist>
                </div>
                <div class="col-xs-6 db-col-right" id="textColorDiv">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        id="textColor"
                        mode="Palette"
                        type="color"
                        :showButtons="false"
                        v-model="selectedItem.textProperties.fontColor"
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button
                        iconCss="sf-icon-ColorPickers tb-icons"
                      ></ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div>
                  <ejs-toolbar id="toolbarTextStyle" overflowMode="Scrollable"  v-on:clicked="diagramPropertyBinding.toolbarTextStyleChange($event)">
                    <e-items>
                      <e-item
                        prefixIcon="sf-icon-Bold tb-icons"
                        tooltipText="Bold"
                        cssClass="tb-item-start"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-Italic tb-icons"
                        tooltipText="Italic"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-Underline tb-icons"
                        tooltipText="Underline"
                        cssClass="tb-item-end"
                      ></e-item>
                    </e-items>
                  </ejs-toolbar>
                </div>
                <div>
                  <ejs-toolbar
                    id="toolbarTextSubAlignment"
                    overflowMode="Scrollable"
                    v-on:clicked="diagramPropertyBinding.toolbarTextSubAlignChange($event)"
                  >
                    <e-items>
                      <e-item
                        prefixIcon="sf-icon-ParaAlignLeft tb-icons"
                        tooltipText="Align Text Left"
                        cssClass="tb-item-start"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-ParaAlignCenter tb-icons"
                        tooltipText="Align Text Center"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-ParaAlignRight tb-icons"
                        tooltipText="Align Text Right"
                        cssClass="tb-item-end"
                      ></e-item>
                    </e-items>
                  </ejs-toolbar>
                </div>
              </div>
              <div class="row db-prop-row" id="toolbarTextAlignmentDiv" >
                <ejs-toolbar 
                  id="toolbarTextAlignment"
                  overflowMode="Scrollable"
                  v-on:clicked="diagramPropertyBinding.toolbarTextAlignChange($event)"
                >
                  <e-items>
                    <e-item
                      prefixIcon="sf-icon-TextLeft tb-icons"
                      tooltipText="Align Right"
                      cssClass="tb-item-start"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextVerticalCenter tb-icons"
                      tooltipText="Align Center"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextRight tb-icons"
                      tooltipText="Align Left"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextTop tb-icons"
                      tooltipText="Align Bottom"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextHorizontalCenter tb-icons"
                      tooltipText="Align Middle"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextBottom tb-icons"
                      tooltipText="Align Top"
                      cssClass="tb-item-end"
                    ></e-item>
                  </e-items>
                </ejs-toolbar>
              </div>
              <div class="row db-prop-row">
                <div
                  class="col-xs-2 db-col-right db-prop-text-style"
                  style="padding-top: 6px"
                >
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                  <ejs-slider
                    min="0"
                    max="100"
                    step="10"
                    type="MinRange"
                    v-model="selectedItem.textProperties.opacity" 
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    id="textOpacityText"
                    type="text"
                    class="db-readonly-input"
                    readOnly="true"
                    v-model="selectedItem.textProperties.opacityText"
                  />
                </div>
              </div>
            </div>
          </div>
            <div id="mindMapContainer" class="db-mindmap-prop-container">
              <div class="row db-prop-header-text">MindMap Pattern</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern1" v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern2" v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
                </div>
              </div>
              <div class="row db-prop-row" style="margin-top: 5px">
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern3" v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern4" v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
                </div>
              </div>
              <div class="db-prop-separator"></div>
              <div class="row db-prop-header-text">MindMap Levels Styles</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <ejs-dropdownlist id="mindMapLevels"  v-model="selectedItem.mindmapSettings.levelType" :dataSource="dropDownDataSources.mindmapLevels"
                                :fields="dropdownListFields"></ejs-dropdownlist>
                </div>
              </div>
              <div id="mindMapFill" class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        id="mindmapFill"
                        mode="Palette"
                        type="color"
                        :showButtons="false"
                        v-model="selectedItem.mindmapSettings.fill"
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-ColorPickers tb-icons">
                      </ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-4 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        id="mindmapStroke"
                        mode="Palette"
                        type="color"
                        :showButtons="false"
                        v-model="selectedItem.mindmapSettings.stroke"
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-Pickers tb-icons">
                      </ejs-button>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 db-col-center">
                  <ejs-dropdownlist v-model="selectedItem.mindmapSettings.strokeStyle" :dataSource="dropDownDataSources.borderStyles"
                                    popupWidth="160px" :fields="dropdownListFields" :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                      </ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :min="0.5" :step="0.5" v-model="selectedItem.mindmapSettings.strokeWidth"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div
                  class="col-xs-2 db-col-right db-prop-text-style"
                  style="padding-top: 6px"
                >
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                  <ejs-slider
                    min="0"
                    max="100"
                    step="10"
                    type="MinRange"
                   v-model="selectedItem.mindmapSettings.opacity"
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    type="text"
                    readOnly="true"
                    class="db-readonly-input"
                   v-model="selectedItem.mindmapSettings.opacityText"
                  />
                </div>
              </div>
              <div style="margin-top: 10px; margin-bottom: 15px"></div>
              <div class="row db-prop-header-text">Text Style</div>
               <div class="row db-prop-row">
                        <div class="col-xs-8 db-col-left">
                            <ejs-dropdownlist height='34px' :dataSource='dropDownDataSources.fontFamilyList' v-model='selectedItem.mindmapSettings.fontFamily'
                                :fields='dropdownListFields'>
                            </ejs-dropdownlist>
                        </div>
                        <div class="col-xs-4 db-col-right">
                            <ejs-numerictextbox :min="1" :step="1"  v-model="selectedItem.mindmapSettings.fontSize"></ejs-numerictextbox>
                             <!-- <ejs-numerictextbox :min="0.5" :step="0.5" v-model="selectedItem.mindmapSettings.strokeWidth"></ejs-numerictextbox> -->
                        </div>
                    </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <ejs-toolbar overflowMode="Scrollable" v-on:clicked="mindmapPropertyBinding.mindmapTextStyleChange($event)">
                    <e-items>
                      <e-item
                        prefixIcon="sf-icon-Bold tb-icons"
                        tooltipText="Bold"
                        cssClass="tb-item-start"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-Italic tb-icons"
                        tooltipText="Italic"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-Underline tb-icons"
                        tooltipText="Underline"
                        cssClass="tb-item-end"
                      ></e-item>
                    </e-items>
                  </ejs-toolbar>
                </div>
                <div class="col-xs-6 db-col-right" id="textColorDiv">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        id="mindmapTextColor"
                        mode="Palette"
                        type="color"
                        :showButtons="false"
                        v-model="selectedItem.mindmapSettings.fontColor"
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-ColorPickers tb-icons">
                      </ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div
                  class="col-xs-2 db-col-right db-prop-text-style"
                  style="padding-top: 6px"
                >
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                  <ejs-slider min="0" max="100" step="10" type="MinRange"  v-model="selectedItem.mindmapSettings.textOpacity">
                  </ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    type="text"
                    class="db-readonly-input"
                    readOnly="true"
                    v-model="selectedItem.mindmapSettings.textOpacityText"
                  />
                </div>
              </div>
            </div>
            <div id="orgChartContainer" class="db-orgchart-prop-container">
              <div class="row db-prop-row db-prop-header-text">Import</div>
              <div class="row db-prop-row" style="height: 28px">
                <ejs-button
                  id="btnImportData"
                  content="Import Data"
                  cssClass="db-btn-primary"
                 v-on:click.native="btnImportClick($event)"
                ></ejs-button>
              </div>
              <div class="db-prop-separator"></div>
              <div class="row db-prop-header-text">OrgChart Settings</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <span class="db-prop-text-style">Horizontal Spacing</span>
                </div>
                <div class="col-xs-6 db-col-right">
                  <span class="db-prop-text-style">Vertical Spacing</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6 db-col-left">
                  <ejs-numerictextbox
                    id="orgHorizontalSpacing"
                    :min="25"
                    :step="1"
                    format="n0"
                    :value="50"
                    v-on:change="orgChartPropertyBinding.orgChartSpacingChange($event)"
                  ></ejs-numerictextbox>
                </div>
                <div class="col-xs-6 db-col-right">
                  <ejs-numerictextbox
                    id="orgVerticalSpacing"
                    :min="25"
                    :step="1"
                    format="n0"
                    :value="50"
                    v-on:change="orgChartPropertyBinding.orgChartSpacingChange($event)"
                  ></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <ejs-toolbar id="orgChartAlignment" overflowMode="Scrollable" v-on:clicked="orgChartPropertyBinding.orgChartAligmentChange($event)">
                  <e-items>
                    <e-item
                      prefixIcon="sf-icon-TextLeft tb-icons"
                      tooltipText="Align Left"
                      cssClass="tb-item-start"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextHorizontalCenter tb-icons"
                      tooltipText="Align Center"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextRight tb-icons"
                      tooltipText="Align Right"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextTop tb-icons"
                      tooltipText="Align Top"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextVerticalCenter tb-icons"
                      tooltipText="Align Middle"
                      cssClass="tb-item-middle"
                    ></e-item>
                    <e-item
                      prefixIcon="sf-icon-TextBottom tb-icons"
                      tooltipText="Align Bottom"
                      cssClass="tb-item-end"
                    ></e-item>
                  </e-items>
                </ejs-toolbar>
              </div>
              <div class="db-prop-separator"></div>
              <div class="row db-prop-row db-prop-header-text">
                Orientation Styles
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 org-pattern-parent">
                  <div
                   v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                    class="org-pattern-style org-pattern-1 vertical-alternate"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern1.svg');
                    "
                  ></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div
                     v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                    class="org-pattern-style org-pattern-2 vertical-left"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern2.svg');
                    "
                  ></div>
                </div>
              </div>
              <div class="row db-prop-row" style="margin-top: 5px">
                <div class="col-xs-6 org-pattern-parent">
                  <div
                     v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                    class="org-pattern-style org-pattern-3 vertical-right"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern3.svg');
                    "
                  ></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div
                     v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                    class="org-pattern-style org-pattern-4 horizontal-center"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern4.svg');
                    "
                  ></div>
                </div>
              </div>
              <div class="row db-prop-row" style="margin-top: 5px">
                <div class="col-xs-6 org-pattern-parent">
                  <div
                    v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                    class="org-pattern-style org-pattern-5 horizontal-right"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern5.svg');
                    "
                  ></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div
                    v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                    class="org-pattern-style org-pattern-6 horizontal-left"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern6.svg');
                    "
                  ></div>
                </div>
              </div>
              <div class="db-prop-separator"></div>
              <div class="row db-prop-header-text">OrgChart Templates</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern1" class="org-pattern-style" v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern2" class="org-pattern-style" v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern3" class="org-pattern-style" v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern4" class="org-pattern-style" v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
<ejs-dialog
      id="exportDialog"
      ref="exportDialogObj"
      width="400px"
      header="Export Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :visible="dialogVisibility"
      showCloseIcon="true"
      :buttons="exportingButtons"
    >
        <div id="exportDialogContent">
          <div class="row">
            <div class="row">File Name</div>
            <div class="row db-dialog-child-prop-row">
              <input type="text" id="exportfileName"  value ="Untitled Diagram ">
            </div>
          </div>
          <div class="row db-dialog-prop-row">
            <div class="col-xs-6 db-col-left">
              <div class="row">Format</div>
              <div class="row db-dialog-child-prop-row">
                <ejs-dropdownlist id="exportFormat"    :value="selectedItem.exportSettings.format" :dataSource="dropDownDataSources.fileFormats"
                            :fields="dropdownListFields">
                        </ejs-dropdownlist>
              </div>
            </div>
            <div class="col-xs-6 db-col-right">
              <div class="row">Region</div>
              <div class="row db-dialog-child-prop-row">
                 <ejs-dropdownlist id="exportRegion" :value="selectedItem.exportSettings.region" :dataSource="dropDownDataSources.diagramRegions"
                            :fields="dropdownListFields">
                  </ejs-dropdownlist>
              </div>
            </div>
          </div>
        </div>
</ejs-dialog>
<ejs-dialog
      id="printDialog"
      ref="printDialog"
      width="335px"
      header="Print Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :visible="dialogVisibility"
      showCloseIcon="true"
      :buttons="printingButtons"
    > 
        <div id="printDialogContent">
          <div class="row">
            <div class="row">Region</div>
            <div class="row db-dialog-child-prop-row">
              <ejs-dropdownlist :value="selectedItem.printSettings.region" :dataSource="dropDownDataSources.diagramRegions" :fields="dropdownListFields">
                    </ejs-dropdownlist>
            </div>
          </div>
          <div class="row db-dialog-prop-row">
            <div class="row">Print Settings</div>
            <div class="row db-dialog-child-prop-row">
               <ejs-dropdownlist :dataSource="dropDownDataSources.paperList" :fields="dropdownListFields" :value="selectedItem.printSettings.paperSize">
                    </ejs-dropdownlist>
            </div>
          </div>
          <div
            id="printCustomSize"
            class="row db-dialog-prop-row"
            style="display: none; height: 28px"
          >
            <div class="col-xs-6 db-col-left">
              <div class="db-text-container">
                <div class="db-text">
                  <span>W</span>
                </div>
                <div class="db-text-input">
                   <ejs-numerictextbox id="printPageWidth" min="100" step="1" format="n0" :value="selectedItem.printSettings.pageWidth"></ejs-numerictextbox>
                </div>
              </div>
            </div>
            <div class="col-xs-6 db-col-right">
              <div class="db-text-container">
                <div class="db-text">
                  <span>H</span>
                </div>
                <div class="db-text-input">
                  <ejs-numerictextbox id="printPageHeight" min="100" step="1" format="n0" :value="selectedItem.printSettings.pageHeight"></ejs-numerictextbox>
                </div>
              </div>
            </div>
          </div>
          <div
            id="printOrientation"
            class="row db-dialog-prop-row"
            style="height: 28px; padding: 5px 0px"
          >
            <div class="col-xs-3 db-prop-col-style" style="margin-right: 8px">
              <ejs-radiobutton id="printPortrait" label="Portrait" name="printSettings" :checked="selectedItem.printSettings.isPortrait">
                    </ejs-radiobutton>
            </div>
            <div class="col-xs-3 db-prop-col-style">
              <ejs-radiobutton id="printLandscape" label="Landscape" name="printSettings" :checked="selectedItem.printSettings.isLandscape">
                    </ejs-radiobutton>
            </div>
          </div>
          <div class="row db-dialog-prop-row" style="margin-top: 16px">
            <ejs-checkbox id="printMultiplePage" label="Scale to fit 1 page" :checked="selectedItem.printSettings.multiplePage"></ejs-checkbox>
          </div>
        </div>   
</ejs-dialog>
<ejs-dialog id="fileUploadDialog" ref="fileUploadDialog"  width="500px" height="485px" header="Upload File" :target="dlgTarget"
    isModal="true" :animationSettings="dialogAnimationSettings" :buttons="uploadButtons" showCloseIcon="true" allowDragging="true"
    :visible="dialogVisibility">
        <div id="uploadDialogContent" class="db-upload-content firstPage">
            <ejs-tooltip id="tooltip" :beforeRender="onTooltipBeforeRender"  :position="tooltipPosition">
                <div id="uploadInformationDiv" class="row db-dialog-prop-row" style="margin-top: 0px;">
                    <div class="row">
                        <div class="row" style="font-size: 12px;font-weight: 500;color: black;">
                            <div class="db-info-text">
                                Choose Format
                            </div>
                            <div class="db-format-type" style="display: none">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <div class="col-xs-3 db-prop-col-style">
                                <ejs-radiobutton id="csvFormat" label="csv" name="uploadFileFormat" checked="true" v-on:change="downloadFile.downloadFormatChange($event)">
                                </ejs-radiobutton>
                            </div>
                            <div class="col-xs-3 db-prop-col-style">
                                <ejs-radiobutton id="xmlFormat" label="xml" name="uploadFileFormat" v-on:change="downloadFile.downloadFormatChange($event)">
                                </ejs-radiobutton>
                            </div>
                            <div class="col-xs-3 db-prop-col-style">
                                <ejs-radiobutton id="jsonFormat" label="json" name="uploadFileFormat" v-on:change="downloadFile.downloadFormatChange($event)">
                                </ejs-radiobutton>
                            </div>
                            <!-- <ejs-dropdownlist value="CSV" [dataSource]="dropDownDataSources.importFormat" [fields]="dropdownListFields">
                        </ejs-dropdownlist> -->
                        </div>
                    </div>
                    <div class="row db-dialog-prop-row" style="padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">
                        <div class="db-info-parent" style="width: 10%; background-color:transparent; height: 60px;">
                        </div>
                        <div style="float:left; width: calc(90% - 5px)">
                            <ul style="padding-left: 25px; margin-bottom: 0px">
                                <li style="margin-bottom: 5px">
                                    <span id="descriptionText1" style="color: #515151;font-size: 11px;line-height: 15px;">Make
                                        sure that the every column of your table has a header</span>
                                </li>
                                <li>
                                    <span id="descriptionText2" style="color: #515151;font-size: 11px;line-height: 15px;">Each
                                        employee should have a reporting person (except for top most employee of the organization)
                                        and it should be indicated by any field from your data source.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row db-dialog-prop-row">
                        <ejs-button id="btnDownloadFile"  :content="selectedItem.orgDataSettings.buttonContent" v-on:click="downloadFile.downloadExampleFiles($event)">
                        </ejs-button>
                    </div>
                    <div class="row">
                        <div id="dropArea">
                            <span id="dropRegion" class="droparea"> Drop files here or
                                <a href="" id="browseFile">
                                    <u>Browse</u>
                                </a>
                            </span>
                            <ejs-uploader  id="defaultfileupload" :asyncSettings="path" :success="onUploadSuccess" :failure="onUploadFailure"
                                :progress="onUploadFileSelected" :allowedExtensions="selectedItem.orgDataSettings.extensionType">
                            </ejs-uploader>
                        </div>
                    </div>
                </div>
                <div id="parentChildRelationDiv" class="row db-dialog-prop-row">
                    <div class="row db-dialog-child-prop-row" style="margin-top:20px">
                        <div class="row">
                            <div class="db-info-text">
                                Employee Id
                            </div>
                            <div class="db-info-style db-employee-id">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <ejs-dropdownlist id="employeeId" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)" :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
                                :fields="dropdownListFields">
                            </ejs-dropdownlist>
                        </div>
                    </div>
                    <div class="row db-dialog-prop-row">
                        <div class="row">
                            <div class="db-info-text">
                                Supervisor Id
                            </div>
                            <div class="db-info-style db-supervisor-id">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <ejs-dropdownlist id="superVisorId" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)" :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
                                :fields="dropdownListFields">
                            </ejs-dropdownlist>
                        </div>
                    </div>
                </div>
                <div id="moreInformationDiv" class="row db-dialog-prop-row">
                    <div id="bindingFields" class="row">
                        <div class="row">
                            <div class="db-info-text">
                                Name
                            </div>
                            <div class="db-info-style db-nameField-id">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <ejs-dropdownlist id="orgNameField"  v-on:change="orgChartPropertyBinding.orgDropDownChange($event)"  :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
                                :fields="dropdownListFields"></ejs-dropdownlist>
                        </div>
                    </div>
                    <div id="bindingFields" class="row db-dialog-prop-row" style="margin-top:20px">
                        <div class="row">
                            <div class="db-info-text">
                                Binding Fields
                            </div>
                            <div class="db-info-style db-bindingField-id">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <ejs-multiselect id="orgBindingFields" v-on:change="orgChartPropertyBinding.orgMultiSelectChange($event)"  :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
                                mode="Delimiter"  :fields="dropdownListFields"></ejs-multiselect>
                        </div>
                    </div>
                    <div id="imageFields" class="row db-dialog-prop-row">
                        <div class="row">
                            <div class="db-info-text">
                                Image Field
                            </div>
                            <div class="db-info-style db-imageField-id">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <ejs-dropdownlist id="orgImageField" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)"  :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
                                 :fields="dropdownListFields">
                            </ejs-dropdownlist>
                        </div>
                    </div>
                    <div id="additionalFields" class="row db-dialog-prop-row">
                        <div class="row">
                            <div class="db-info-text">
                                Additional Fields
                            </div>
                            <div class="db-info-style db-additionalField-id">
                            </div>
                        </div>
                        <div class="row db-dialog-child-prop-row">
                            <ejs-multiselect id="orgAdditionalField" v-on:change="orgChartPropertyBinding.orgMultiSelectChange($event)"  :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
                                mode="Delimiter" :fields="dropdownListFields"></ejs-multiselect>
                        </div>
                    </div>
                </div>
            </ejs-tooltip>
        </div>
</ejs-dialog>
<div id="diagramTemplateDiv" class="db-diagram-template-div" style="display: none">
    <div class="db-diagram-template-image-div">
        <div class="db-diagram-template-image">
        </div>
    </div>
    <div class="db-diagram-template-text">
        <span id="diagramTemplateText"></span>
    </div>
</div>
<div id="diagramTemplateDiv1"  style="display: none">
    <div class="row">
        <div class="col-xs-3 temp-left-pane">
            <div class="row db-diagram-template-parent-text flowdiagram-template" >
                <span>Flow Chart</span>
            </div>
            <div class="row db-diagram-template-parent-text mindmap-template">
                <span>Mind Map</span>
            </div>
            <div class="row db-diagram-template-parent-text orgchart-template">
                <span>Org Chart</span>
            </div>
        </div>
        <div class="col-xs-9 diagramTemplates temp-right-pane" style="padding-left:0px;padding-right:0px">
        </div>
    </div>
</div>
<ejs-dialog
      id="openTemplateDialog"
      ref="openTemplateDialog"
      width="695px"
      height="470px"
      header="Create New Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :showCloseIcon="true"
      allowDragging="true"
      :visible="dialogVisibility"
></ejs-dialog>
<ejs-dialog
      id="saveDialog"
      ref="saveDialog"
      width="335px"
      header="Save Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      showCloseIcon="true"
      allowDragging="true"
      :visible="dialogVisibility"
      :buttons="saveButtons"
    >
        <div id="saveDialogContent">
          <div class="row">
            <div class="row">File Name</div>
            <div class="row db-dialog-child-prop-row">
              <input type="text" id="saveFileName" value="Diagram1" />
            </div>
          </div>
        </div>
      
</ejs-dialog>
<ejs-dialog
      id="moreShapesDialogContent"
      ref="moreShapesDialog"
      width="695px"
      height="470px"
      header="Shapes"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      showCloseIcon="true"
      allowDragging="true"
      :visible="dialogVisibility"
      :buttons="moreShapesButtons"
    > 
        <div id="moreShapesDialogContent">
          <div class="row">
            <div class="col-xs-3 temp-left-pane">
              <ejs-listview id="moreShapesList" ref="moreShapesList" :fields="listViewFields" :dataSource="dropDownDataSources.listViewData" 
                        showCheckBox="true" v-on:select="listViewSelectionChange($event)">
              </ejs-listview>
            </div>
            <div
              class="col-xs-9 diagramTemplates temp-right-pane"
              style="padding-left: 0px; padding-right: 0px"
            >
              <img
                id="shapePreviewImage"
                src="./assets/dbstyle/shapes_images/flow.png"
              />
            </div>
          </div>
        </div>   
</ejs-dialog>
<ejs-dialog id="tooltipDialog" ref="tooltipDialog" width="335px" header="Edit Tooltip" :target="dlgTarget" isModal="true" :animationSettings="dialogAnimationSettings"
    :visible="dialogVisibility" :buttons="tooltipButtons" showCloseIcon="true">
        <div id="tooltipDialogContent">
            <div class="row">
                <div>
                    <textarea id="objectTooltip" style="resize: none; width: 100%; height: 120px;"></textarea>
                </div>
            </div>
        </div>
</ejs-dialog>
<ejs-dialog id="hyperlinkDialog" ref="hyperlinkDialog" width="400px" header="Insert Link" :target="dlgTarget" isModal="true"
    :animationSettings="dialogAnimationSettings" :visible="dialogVisibility" :buttons="hyperlinkButtons" showCloseIcon="true">
        <div id="hyperlinkDialogContent">
            <div class="row">
                <div class="row">Enter URL</div>
                <div class="row db-dialog-child-prop-row">
                    <input type="text" id="hyperlink">
                </div>
            </div>
            <div class="row db-dialog-prop-row">
                <div class="row">Link Text (Optional)</div>
                <div class="row db-dialog-child-prop-row">
                    <input type="text" id="hyperlinkText">
                </div>
            </div>
        </div>
</ejs-dialog>
<div class="db-custom-prop-template" style="display:none">
    <div class="row">
        <div class="col-xs-6 db-col-left" style="width:70%">
            <input class="txtPropertyName" type="text" placeholder="Enter Property Name" style="width:100%; height:27px">
        </div>
        <div class="col-xs-6 db-col-right" style="width:30%">
            <button class="db-custom-prop-button" style="width:100%; text-transform: none;box-shadow: 0 0 0 0">Add Property</button>
        </div>
    </div>
</div>
<div class="db-custom-prop-info-template" style="display:none">
    <div class="row">
        <div class="col-xs-6 db-col-left propertyNameDiv">
        </div>
        <div class="col-xs-6 db-col-right propertyValueDiv">
            <input type="text" class="propertyValue" style="height: 27px" />
        </div>
        <div class="propertyTooltipDiv">
            <input type="checkbox" class="propertyCheckBox" />
        </div>
        <div class="propertyLabelDiv">
            <button class="btnRemoveProperty" style="height: 20px; width: 27px"></button>
        </div>
    </div>
</div>
<div class="db-place-holder" style="display:none">
    <div class="row">
        <input type="checkbox" class="chkPlaceholders" />
    </div>
</div>
<ejs-dialog id="customPropertyDialog"  width="500px" header="Additional Information" :target="dlgTarget"
    isModal="true" :animationSettings="dialogAnimationSettings" allowDragging="true" showCloseIcon="true" :visible="dialogVisibility">
</ejs-dialog>
<div class="db-layer-template" style="display: none">
    <div class="row">
        <div class="db-layer-content-name">
            <span class="db-layer-name"></span>
            <input type="text" class="db-layer-edit" />
        </div>
        <div class="db-layer-content-btn">
            <button class="db-layer-lock"></button>
        </div>
        <div class="db-layer-content-btn">
            <button class="db-layer-visible"></button>
        </div>
    </div>
</div>
<ejs-dialog id="layerDialog" ref="layerDialog" isModal="true" width="300px" height="400px" header="Layers" :target="dlgTarget" 
    :animationSettings="dialogAnimationSettings" allowDragging="true" :visible="dialogVisibility" :footerTemplate="layerFooterTemplate">
</ejs-dialog>
<div style="height: 100px;">
<ejs-dialog id="themeDialog"  width="174px" header="Themes" :target="dlgTarget" :isModal="isModalDialog" :animationSettings="dialogAnimationSettings"
    allowDragging="true" :visible="dialogVisibility" showCloseIcon="true" :position="themesdialogPosition" :close="closeThemeDialog"
    :created="themeDialogCreated">
  
        <div id="themeDialogContent">
            <div class="row">
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme1">
                    </div>
                </div>
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme2">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme3">
                    </div>
                </div>
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme4">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme5">
                    </div>
                </div>
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme6">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme7">
                    </div>
                </div>
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme8">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme9">
                    </div>
                </div>
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme10">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme11">
                    </div>
                </div>
                <div class="db-theme-style-div">
                    <div class="db-theme-style theme12">
                    </div>
                </div>
            </div>
        </div>
</ejs-dialog>
</div>
<ejs-dialog id="deleteConfirmationDialog"  width="400px" header="Delete Field" :target="dlgTarget"
    isModal="true" :animationSettings="dialogAnimationSettings" :visible="dialogVisibility" :buttons="deleteConfirmationButtons"
    showCloseIcon="true">
    <div id="deleteConfirmationContent">
            <span style="font-size: 13px; color: black">
                Please confirm that you want to delete this field?. All data will be lost for this field once you deleted.
            </span>
      </div>
</ejs-dialog>
</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Diagram,
  DiagramPlugin,
  UndoRedo,
  SymbolPalettePlugin,
  PortVisibility,
  PortConstraints,
  MouseEventArgs,
  ConnectorEditing,
  ComplexHierarchicalTree
} from "@syncfusion/ej2-vue-diagrams";
import { formatUnit, createElement, closest, Ajax } from "@syncfusion/ej2-base";
import { UploaderComponent } from "@syncfusion/ej2-vue-inputs";
import {
  ItemModel as ToolbarItemModel,
  OpenCloseMenuEventArgs,
  MenuEventArgs as ContextMenuEventArgs,
  ClickEventArgs,
  ToolbarComponent,
  MenuAnimationSettingsModel,
} from "@syncfusion/ej2-vue-navigations";
import {
  BeforeOpenCloseMenuEventArgs,
  MenuEventArgs,
  DropDownButtonComponent,
} from "@syncfusion/ej2-vue-splitbuttons";
import {
  DialogComponent,
  PositionDataModel,
  TooltipEventArgs,
  Position,
  Dialog
    } from "@syncfusion/ej2-vue-popups";
import {
  AnimationSettingsModel,
  TooltipComponent,
} from "@syncfusion/ej2-vue-popups";
import {
  FieldSettingsModel,
  DropDownListComponent,
} from "@syncfusion/ej2-vue-dropdowns";
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { Button, ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import {
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  Node,
  Connector,
  NodeConstraints,
  ShapeAnnotationModel,
  ConnectorConstraints,
  DiagramTools,
  SnapConstraints,
  AlignmentOptions,
  DiagramContextMenu,
  Snapping,
  BpmnDiagrams,
  HierarchicalTree,
  PrintAndExport,
  MindMap as MindMapTree,
  ZoomOptions,
  DataBinding,
  Overview,
  DiagramRegions,
  ConnectorBridging,
  LayoutAnimation,
  UserHandleModel,
  FileFormats,
  SymbolPalette,
  CommandManagerModel,
  Keys,
  KeyModifiers,
  SelectorConstraints,
  ICollectionChangeEventArgs,
  DiagramAction,
  SnapSettingsModel,
  PageSettingsModel,
  ScrollSettingsModel,
  SelectorModel,
  ContextMenuSettingsModel,
  IDropEventArgs,
  SymbolPaletteComponent,
} from "@syncfusion/ej2-vue-diagrams";
import {
  DropDownButtonPlugin,
  ItemModel,
} from "@syncfusion/ej2-vue-splitbuttons";
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin , TooltipPlugin} from "@syncfusion/ej2-vue-popups";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import {
  RadioButtonPlugin,
  CheckBoxPlugin,
  ButtonPlugin,
} from "@syncfusion/ej2-vue-buttons";
import { ContextMenuPlugin } from "@syncfusion/ej2-vue-navigations";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ColorPickerPlugin, SliderPlugin } from "@syncfusion/ej2-vue-inputs";
import { ListViewPlugin } from "@syncfusion/ej2-vue-lists";
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { UploaderPlugin } from "@syncfusion/ej2-vue-inputs";
import { PageCreation } from "./app/scripts/pages";
import { SelectorViewModel } from "./app/scripts/selector";
import { CustomTool } from "./app/scripts/userhandles";
import { OrgChartUtilityMethods, OrgChartData } from "./app/scripts/orgchart";
import { CustomProperties } from "./app/scripts/customproperties";
import { DiagramBuilderLayer } from "./app/scripts/layers";
import { DropDownDataSources } from "./app/scripts/dropdowndatasource";
import { DownloadExampleFiles } from "./app/scripts/downloaddata";
import { DiagramTheme } from "./app/scripts/themes";
import { PaperSize } from "./app/scripts/utilitymethods";
import { CommonKeyboardCommands } from "./app/scripts/commoncommands";
import {
  DiagramClientSideEvents,
  DiagramPropertyBinding,
  MindMapPropertyBinding,
  OrgChartPropertyBinding,
} from "./app/scripts/events";
import { Palettes } from "./app/scripts/palettes";
import { MindMap, MindMapUtilityMethods } from "./app/scripts/mindmap";
import {
  ListViewComponent,
  FieldsMapping,
  SelectedCollection,
  SelectEventArgs,
} from "@syncfusion/ej2-vue-lists";

import toolbarVue from './components/toolbarVue.vue';
import orderVue from './components/orderVue.vue';
import drawshapeVue from './components/drawshapeVue.vue'
import drawConnectorVue from './components/drawConnectorVue.vue';

Vue.use(DiagramPlugin);
Vue.use(DropDownButtonPlugin);
Vue.use(ToolbarPlugin);
Vue.use(SymbolPalettePlugin);
Vue.component(ToolbarPlugin.name, ToolbarComponent);
Vue.use(DialogPlugin);
Vue.use(DropDownListPlugin);
Vue.use(RadioButtonPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);
Vue.use(CheckBoxPlugin);
Vue.use(ButtonPlugin);
Vue.use(SliderPlugin);
Vue.use(ListViewPlugin);
Vue.use(MultiSelectPlugin);
Vue.use(UploaderPlugin);
Vue.use(ContextMenuPlugin);
Vue.use(TooltipPlugin);
Vue.component(DialogPlugin.name, DialogComponent);
let interval;
interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
];
let gridlines = {
  lineColor: "#EEEEEE",
  lineIntervals: interval,
};
let itemVue : any = Vue.component("itemTemplate", {
  template: `<div class="db-ddl-template-style">
              <span :class=data.className></span>
            </div>`,
  data() {
    return {
      data: {}
    };
  }
});

let valueVue:any = Vue.component("valueTemplate", {
  template:  `<div class="db-ddl-template-style">
              <span :class=data.className></span>
            </div>`,

  data() {
    return {
      data: {}
    };
  }
});
@Component({
  provide: {
    diagram: [Diagram, UndoRedo, BpmnDiagrams,DiagramContextMenu, ComplexHierarchicalTree, Snapping, DataBinding,PrintAndExport, HierarchicalTree, MindMapTree, ConnectorBridging, LayoutAnimation, ConnectorEditing ],
    SymbolPalette: [BpmnDiagrams ],
  },
  beforeMount(){

  }
  
})
  
export default class User extends Vue {
 
  public animationSettings: MenuAnimationSettingsModel = { effect: "None" };
  public dropdownListFields: FieldSettingsModel = {
    text: "text",
    value: "value",
  };
  public diagram: DiagramComponent;
  public symbolpalette: SymbolPaletteComponent;
  public saveDialog: DialogComponent;
  public printDialog: DialogComponent;
  public exportDialog: DialogComponent;
  public themeDialog: DialogComponent;
  public layerDialog!: DialogComponent;
  public customPropertyDialog!: DialogComponent;
  public tooltipDialog: DialogComponent;
  public hyperlinkDialog: DialogComponent;
  public deleteConfirmationDialog: DialogComponent;
  public moreShapesDialog: DialogComponent;
  public fileUploadDialog: DialogComponent;
  public defaultupload: UploaderComponent;
  public ddlTextPosition: DropDownListComponent;
  public tooltip: TooltipComponent;
  public openTemplateDialog: DialogComponent;
  public toolbarEditor: ToolbarComponent;
  public moreShapesList: ListViewComponent;
  public offsetXchange :SelectorViewModel;
  public dlgTarget: HTMLElement = document.body;
  public dialogAnimationSettings: AnimationSettingsModel = { effect: "None" };
  public dialogPosition: PositionDataModel = { X: 100, Y: 112 };
  public dialogVisibility = false;
  public isModalDialog = false;
  public themesdialogPosition: PositionDataModel = { X: "right", Y: 112 };
  public listViewFields: FieldsMapping = { isChecked: "checked" };
  public tooltipPosition: Position = "RightCenter";
  public commandManager: CommandManagerModel = this.getCommandSettings();
  public exportingButtons: any = this.getDialogButtons("export");
  public printingButtons: any = this.getDialogButtons("print");
  public moreShapesButtons: any = this.getDialogButtons("moreshapes");
  public saveButtons: any = this.getDialogButtons("save");
  public tooltipButtons: any = this.getDialogButtons("tooltip");
  public hyperlinkButtons: any = this.getDialogButtons("hyperlink");
  public deleteConfirmationButtons: any = this.getDialogButtons("deleteconfirmation");
  public uploadButtons: any = this.getUploadButtons();
  public path: Object = {
        saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
        removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove"
    };
  public dropDownDataSources: DropDownDataSources = new DropDownDataSources();
  public selectedItem: SelectorViewModel = new SelectorViewModel();
  public page: PageCreation = new PageCreation(this.selectedItem);
  public palettes: Palettes = new Palettes();
  public downloadFile: DownloadExampleFiles;
  public diagramThemes: DiagramTheme = new DiagramTheme(this.selectedItem);
  public diagramEvents: DiagramClientSideEvents = new DiagramClientSideEvents(this.selectedItem, this.page);
  public diagramPropertyBinding: DiagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem, this.page);
  public mindmapPropertyBinding: MindMapPropertyBinding = new MindMapPropertyBinding(this.selectedItem);
  public orgChartPropertyBinding: OrgChartPropertyBinding = new OrgChartPropertyBinding(this.selectedItem);
  public customProperty: CustomProperties = new CustomProperties(this.selectedItem, this.customPropertyDialog as unknown as DialogComponent);
  public diagramLayer: DiagramBuilderLayer = new DiagramBuilderLayer(this.selectedItem, this.layerDialog as unknown as DialogComponent);
  public layerFooterTemplate: string = this.diagramLayer.getLayerBottomPanel();
  private initLayerPanel = false;
  public overview: Overview;
  mounted() {
        window.addEventListener("load", this.onWindowLoad);
    }
  public onWindowLoad() {
    let diagram: any = document.getElementById("diagram");
    this.diagram = diagram.ej2_instances[0];
    let selectedItem : SelectorViewModel;
    let selectedItemObj:any = document.getElementById("diagram");
    selectedItem = selectedItemObj.ej2_instances[0];
    let paletteObj: any = document.getElementById("symbolpalette");
    this.symbolpalette = paletteObj.ej2_instances[0];
    let openTemplatedialog:any = document.getElementById("openTemplateDialog");
    this.openTemplateDialog = openTemplatedialog.ej2_instances[0];
    let tooltip : any = document.getElementById("tooltip");
    this.tooltip = tooltip.ej2_instances[0];
    let layerDialog: any = document.getElementById("layerDialog");
    this.layerDialog = layerDialog.ej2_instances[0];
    let saveDialog: any = document.getElementById("saveDialog");
    this.saveDialog = saveDialog.ej2_instances[0];
    let exportDialogObj : any = document.getElementById("exportDialog");
    this.exportDialog = exportDialogObj.ej2_instances[0];
    let printDialog : any = document.getElementById("printDialog");
    this.printDialog = printDialog.ej2_instances[0];
    let tooltipDialog :any = document.getElementById("tooltipDialog");
    this.tooltipDialog = tooltipDialog.ej2_instances[0];
    let hyperlinkDialog: any = document.getElementById("hyperlinkDialog");
    this.hyperlinkDialog = hyperlinkDialog.ej2_instances[0];
    let fileUploadDialog: any=document.getElementById("fileUploadDialog");
    this.fileUploadDialog = fileUploadDialog.ej2_instances[0];
    let themeDialog : any = document.getElementById("themeDialog");
    this.themeDialog = themeDialog.ej2_instances[0];
    let  moreShapesDialogContent: any = document.getElementById("moreShapesDialogContent");
    this.moreShapesDialog =  moreShapesDialogContent.ej2_instances[0];
    let moreShapesList : any =document.getElementById("moreShapesList");
    this.moreShapesList= moreShapesList.ej2_instances[0];
    let defaultupload: any = document.getElementById("defaultfileupload");
    this.defaultupload = defaultupload.ej2_instances[0];
    let customPropertyDialog :  any = document.getElementById("customPropertyDialog");
    this.customPropertyDialog = customPropertyDialog.ej2_instances[0];
    let  toolbarEditor : any = document.getElementById("toolbarEditor");
    this.toolbarEditor = toolbarEditor.ej2_instances[0];
    this.generateDiagram();
    this.page.addNewPage();
    CommonKeyboardCommands.selectedItem = this.selectedItem;
    CommonKeyboardCommands.page = this.page;
    document.onmouseover = this.menumouseover.bind(this);
    (this.selectedItem.utilityMethods.tempDialog as unknown as DialogComponent) = this.openTemplateDialog;
    (this.selectedItem.utilityMethods.toolbarEditor as unknown as ToolbarComponent)= this.toolbarEditor;
    (OrgChartUtilityMethods.uploadDialog as unknown as DialogComponent) = this.fileUploadDialog;
    (OrgChartUtilityMethods.customPropertyDialog as unknown as DialogComponent) = this.customPropertyDialog;
    this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
    this.customProperty.customPropertyDialog = this.customPropertyDialog;
    this.diagramLayer.layerDialog = this.layerDialog;
    this.downloadFile = new DownloadExampleFiles(this.selectedItem);
    this.selectedItem.utilityMethods.page = this.page;
    (document.getElementById("btnHideToolbar") as any).onclick = this.hideMenuBar.bind(this);
    (document.getElementById("diagramContainerDiv") as any).onmouseleave = this.diagramThemes.setNodeOldStyles.bind(this.diagramThemes);
  
        // let context: any = this;
        setTimeout(() => { this.loadPage(); }, 2000);
        setInterval(() => {this.savePage(); }, 2000);

        window.onbeforeunload = this.closeWindow.bind(this);

        }
  public width = "100%";
  public height = "100%";
  public palettewidth = "100%";
  public paletteheight = "100%";
  public symbolWidth = "50";
  public symbolHeight = "50";
  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: gridlines,
    verticalGridlines: gridlines,
    constraints: SnapConstraints.All & ~SnapConstraints.SnapToLines,
  };

  public itemTemplate()
  {
    return {template: itemVue};
  }
  public valueTemplate()
  {
   return {template: valueVue}; 
  }
   public toolbarTemplate() {
            return {
                template: toolbarVue
            }
   };
   public drawShapeTemplate() {
            return {
                template: drawshapeVue
            }
   };
  public drawConnectorTemplate() {
            return {
                template: drawConnectorVue
            }
   };
  public orderTemplate() {
            return {
                template: orderVue
            }
  };

  public pageSettings: PageSettingsModel = {
    background: { color: "white" },
    width: 816,
    height: 1056,
    multiplePage: true,
    margin: { left: 5, top: 5 },
    orientation: "Landscape",
  };
  public scrollSettings: ScrollSettingsModel = {
    canAutoScroll: true,
    scrollLimit: "Infinity",
    minZoom: 0.25,
    maxZoom: 30,
  };
  public selectedItems: SelectorModel = {
    constraints: SelectorConstraints.All & ~SelectorConstraints.ToolTip 
  };
  public setNodeDefaults(node: Node, diagram: Diagram): NodeModel {
        if (node.style) {
            if (node.style.fill === "transparent" && !node.children) {
                node.style.fill = "white";
            }
        }
        if(!((this.selectedItem as any).diagramType==="MindMap")||((this.selectedItem as any).diagramType==="OrgChart")){
           node.ports = [
                { offset: { x: 0, y: 0.5 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw | PortConstraints.Default},
                { offset: { x: 0.5, y: 0 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw | PortConstraints.Default},
                { offset: { x: 1, y: 0.5 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw | PortConstraints.Default},
                { offset: { x: 0.5, y: 1 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw | PortConstraints.Default}
            ];
        }
        let node1: NodeModel = {
            style: { strokeWidth: 1 }
        };
        return node1;
    }

    public setConnectorDefaults(connector: Connector, diagram: Diagram): ConnectorModel {
        let connector1: ConnectorModel = {
         
            annotations: [
                { content: "", style: { fill: "transparent" } }
            ],
            style: { strokeWidth: 2 }
        };
        return connector1;
    }
    public contextMenuSettings: ContextMenuSettingsModel = {
        show: true,
        items: this.selectedItem.customContextMenu.items
    };
    public customTool: CustomTool = new CustomTool();
    public getCustomTool: Function = this.customTool.getTool.bind(this)
  public renameDiagram(args: MouseEvent): void {
    document
      .getElementsByClassName("db-diagram-name-container")[0]
      .classList.add("db-edit-name");
    let element: HTMLInputElement = document.getElementById(
      "diagramEditable"
    ) as any;
    element.value = (document.getElementById("diagramName") as any).innerHTML;
    element.focus();
    element.select();
  }
  public diagramNameKeyDown(args: KeyboardEvent): void {
    if (args.which === 13) {
      (document.getElementById("diagramName") as any).innerHTML = (
        document.getElementById("diagramEditable") as any
      ).value;
      document
        .getElementsByClassName("db-diagram-name-container")[0]
        .classList.remove("db-edit-name");
    }
  }
    public moreShapesClick(args: MouseEvent): void {
        this.moreShapesDialog.show();
    }
    private buttonInstance: any;
    public menumouseover(args: MouseEvent): void {
        let target: any = args.target as HTMLButtonElement;
        if (target && (target.className === "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu" ||
            target.className === "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active")) {
            if (this.buttonInstance && this.buttonInstance.id !== target.id) {
                if (this.buttonInstance.getPopUpElement().classList.contains("e-popup-open")) {
                    this.buttonInstance.toggle();
                    let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove("e-btn-hover");
                }
            }
            let button1: any = target.ej2_instances[0];
            this.buttonInstance = button1;
            if (button1.getPopUpElement().classList.contains("e-popup-close")) {
                button1.toggle();
                if (button1.element.id === "btnArrangeMenu") {
                    this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
                }
                let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.add("e-btn-hover");
            }
        } else {
            if (closest(target, ".e-dropdown-popup") === null && closest(target, ".e-dropdown-btn") === null) {
                if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains("e-popup-open")) {
                    this.buttonInstance.toggle();
                    let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove("e-btn-hover");
                }
            }
        }
    }
    public loadPage(): void {
        (document.getElementsByClassName("diagrambuilder-container")[0] as HTMLDivElement).style.display = "";
        this.selectedItem.selectedDiagram.updateViewPort();
        this.overview = new Overview({ width: "255px", height: "200px", sourceID: "diagram" });
        this.overview.appendTo("#overview");
        (document.getElementById("overviewspan") as any).onclick = this.overviewSpanClick.bind(this);
        document.getElementsByClassName("sidebar")[0].className = "sidebar";
        if (window.location.search.length === 0) {
            this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
            (document.getElementsByClassName("sb-content-overlay")[0] as any).style.display = "none";
            this.openTemplateDialog.show();
           (this.openTemplateDialog as any).content = this.selectedItem.utilityMethods.getDefaultDiagramTemplates1(this.selectedItem );
            (this.diagram as any).layers[0].addInfo = { 'name': 'Layer0' }
        } 
        this.selectedItem.exportSettings.fileName = (document.getElementById("diagramName") as any).innerHTML;
    }

    public savePage(): void {
        // this.page.loadJson();
    }
    public menuClick(args: MenuEventArgs): void {
    let buttonElement: any = document.getElementsByClassName("e-btn-hover")[0];
    if (buttonElement) {
      buttonElement.classList.remove("e-btn-hover");
    }
    let diagram : Diagram = this.selectedItem.selectedDiagram as Diagram;
    let commandType: any = ((args.item as any).text.replace(/[" "]/g, ""));
    switch (commandType.toLowerCase()) {
      case "new":
        CommonKeyboardCommands.newDiagram();
        break;
      case "open":
        CommonKeyboardCommands.openUploadBox(true, ".json");
        break;
      case "save":
        CommonKeyboardCommands.download(
          this.page.savePage(),
          ( document.getElementById("diagramName") as any ).innerHTML
        );
        break;
      case "saveas":
        (document.getElementById("saveFileName") as HTMLInputElement).value =
          ( document.getElementById("diagramName") as any ).innerHTML;
        this.saveDialog.show();
        break;
      case "print":
        this.selectedItem.printSettings.pageHeight =
          this.selectedItem.pageSettings.pageHeight;
        this.selectedItem.printSettings.pageWidth =
          this.selectedItem.pageSettings.pageWidth;
        this.selectedItem.printSettings.paperSize =
          this.selectedItem.pageSettings.paperSize;
        this.selectedItem.printSettings.isPortrait =
          this.selectedItem.pageSettings.isPortrait;
        this.selectedItem.printSettings.isLandscape =
          !this.selectedItem.pageSettings.isPortrait;
        this.printDialog.show();
        break;
      case "export":
        this.exportDialog.show();
        break;
      case "showguides":
        diagram.snapSettings.constraints =
         (diagram.snapSettings as any) ^ SnapConstraints.SnapToObject;
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        break;
      case "showgrid":
        diagram.snapSettings.constraints =
          (diagram.snapSettings as any) ^ SnapConstraints.ShowLines;
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        let container: HTMLDivElement = document.getElementsByClassName(
          "db-current-diagram-container"
        )[0] as HTMLDivElement;
        if (!args.item.iconCss) {
          container.classList.add("db-hide-grid");
        } else {
          container.classList.remove("db-hide-grid");
        }
        break;
      case "snaptogrid":
        diagram.snapSettings.constraints =
         (diagram.snapSettings as any).constraints ^ SnapConstraints.SnapToLines;
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        break;
      case "fittoscreen":
        diagram.fitToPage({
          mode: "Page",
          region: "Content",
          margin: { left: 0, top: 0, right: 0, bottom: 0 },
        });
        break;
      case "showrulers":
       this.selectedItem.selectedDiagram.rulerSettings.showRulers =
          !this.selectedItem.selectedDiagram.rulerSettings.showRulers;
        if (this.selectedItem.selectedDiagram .rulerSettings.showRulers) {
          this.selectedItem.selectedDiagram .rulerSettings.dynamicGrid = false;
        }
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        container = document.getElementsByClassName(
          "db-current-diagram-container"
        )[0] as HTMLDivElement;
        if (!args.item.iconCss) {
          container.classList.remove("db-show-ruler");
        } else {
          container.classList.add("db-show-ruler");
        }
        break;
      case "zoomin":
        diagram.zoomTo({ type: "ZoomIn", zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom =
          ((diagram.scrollSettings.currentZoom as any) * 100).toFixed() + "%";
        break;
      case "zoomout":
        diagram.zoomTo({ type: "ZoomOut", zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom =
          ((diagram.scrollSettings.currentZoom as any) * 100).toFixed() + "%";
        break;
      case "showtoolbar":
        this.selectedItem.utilityMethods.hideElements(
          "hide-toolbar",
          this.selectedItem.selectedDiagram
        );
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        break;
      case "showstencil":
        this.selectedItem.utilityMethods.hideElements(
          "hide-palette",
          this.selectedItem.selectedDiagram
        );
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        break;
      case "showproperties":
        this.selectedItem.utilityMethods.hideElements(
          "hide-properties",
          this.selectedItem.selectedDiagram
        );
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        break;
      case 'showlayers':
          this.showHideLayers();
            break;
      case "themes":
        this.showHideThemes();
        break;
      case "showpager":
        this.selectedItem.utilityMethods.hideElements(
          "hide-pager",
          this.selectedItem.selectedDiagram
        );
        args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
        break;
      case 'showshortcuts':
        let node1: NodeModel = diagram.getObject('textNode');
        node1.visible = !node1.visible;
        this.selectedItem.selectedDiagram.dataBind();
        break;
      default:
        this.executeEditMenu(diagram, commandType);
        break;
    }
    diagram.dataBind();
  }
public nodeaspectratiochange(args:any)
{
 this.selectedItem.nodePropertyChange({propertyName: 'aspectRatio', propertyValue: args.checked});
}
  public beforeItemRender(args: MenuEventArgs): void {
        let shortCutText: string = this.getShortCutKey((args.item as any).text);
        if (shortCutText) {
            let shortCutSpan: HTMLElement = createElement("span");
            let text: any = args.item.text;
            shortCutSpan.textContent = shortCutText;
            shortCutSpan.style.pointerEvents = "none";
            args.element.appendChild(shortCutSpan);
            shortCutSpan.setAttribute("class", "db-shortcut");
        }
        let status: boolean = this.selectedItem.utilityMethods.enableMenuItems((args.item as any).text, this.selectedItem);
        if (status) {
            args.element.classList.add("e-disabled");
        } else {
            if (args.element.classList.contains("e-disabled")) {
                args.element.classList.remove("e-disabled");
            }
        }
    }
    
    public arrangeContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
    }

    public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        this.updateMenuStyle(args)
        if (args.event && closest(args.event.target as Element, ".e-dropdown-btn") !== null) {
            args.cancel = true;
        }
    }
    private updateMenuStyle(args: BeforeOpenCloseMenuEventArgs): void {
        for (let i: number = 0; i < args.element.children.length; i++) {
            (args.element.children[i] as HTMLElement).style.display = "block";
        }
    }

    public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
        if (args.event && closest(args.event.target as Element, ".e-dropdown-btn") !== null) {
            args.cancel = true;
        }
        if (!args.element) {
            args.cancel = true;
        }
    }

    public arrangeContextMenuOpen(args: OpenCloseMenuEventArgs): void {
        if (args.element.classList.contains("e-menu-parent")) {
            let popup: HTMLElement = document.querySelector("#btnArrangeMenu-popup") as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    }
    public getShortCutKey(menuItem: string): string {
        let shortCutKey: string = navigator.platform.indexOf("Mac") > -1 ? "Cmd" : "Ctrl";
        switch (menuItem) {
            case "New":
                shortCutKey = "Shift" + "+N";
                break;
            case "Open":
                shortCutKey = shortCutKey + "+O";
                break;
            case "Save":
                shortCutKey = shortCutKey + "+S";
                break;
            case "Undo":
                shortCutKey = shortCutKey + "+Z";
                break;
            case "Redo":
                shortCutKey = shortCutKey + "+Y";
                break;
            case "Cut":
                shortCutKey = shortCutKey + "+X";
                break;
            case "Copy":
                shortCutKey = shortCutKey + "+C";
                break;
            case "Paste":
                shortCutKey = shortCutKey + "+V";
                break;
            case "Delete":
                shortCutKey = "Delete";
                break;
            case "Duplicate":
                shortCutKey = shortCutKey + "+D";
                break;
            case "Select All":
                shortCutKey = shortCutKey + "+A";
                break;
            case "Zoom In":
                shortCutKey = shortCutKey + "++";
                break;
            case "Zoom Out":
                shortCutKey = shortCutKey + "+-";
                break;
            case "Group":
                shortCutKey = shortCutKey + "+G";
                break;
            case "Ungroup":
                shortCutKey = shortCutKey + "+U";
                break;
            case "Send To Back":
                shortCutKey = shortCutKey + "+Shift+B";
                break;
            case "Bring To Front":
                shortCutKey = shortCutKey + "+Shift+F";
                break;
            default:
                shortCutKey = "";
                break;
        }
        return shortCutKey;
    }
    public getLayerBottomPanel(): string {

        let bottomPanel: string = '<div class="db-layer-bottom-panel">' +
            '<div class="row" style="margin-top: 6px;">' +
            '<div class="col-xs-2">' +
            '<button id="btnAdd" style="right:16px;position:absolute"></button>' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<button id="btnDuplicate" style="right:14px;position:absolute"></button>' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<button id="btnRemove" style="right:12px;position:absolute"></button>' +
            '</div>' +
            '<div class="col-xs-2">' +
            '<button id="btnCloseLayer" style="right:10px;position:absolute"></button>' +
            '</div>' +
            // '<div class="col-xs-2" style="padding-left:0px">' +
            // '<button id="btnSelection" style="width:100%" ></button>' +
            // '</div>' +
            '</div>' +
            '</div>';
        return bottomPanel;
    }

   public showHideThemes(): void {
    let btnWindow: any = document.getElementById("btnWindowMenu");
    let iconCss: string = btnWindow.ej2_instances[0].items[5].iconCss;
      if (iconCss) {
        this.themeDialog.hide();
      } else {
        this.themeDialog.show();
      }
    btnWindow.ej2_instances[0].items[5].iconCss = iconCss ? "" : "sf-icon-Selection";
  }
  public executeEditMenu(diagram: Diagram, commandType: string): void {
        let key: string = "";
        switch (commandType.toLowerCase()) {
            case "undo":
                this.undo();
                if (this.selectedItem.diagramType === "MindMap" || this.selectedItem.diagramType === "OrgChart") {
                    diagram.doLayout();
                }
                break;
            case "redo":
                this.redo();
                break;
            case "cut":
                this.cutObjects();
                break;
            case "copy":
                this.copyObjects();
                break;
            case "paste":
                this.pasteObjects();
                break;
            case "delete":
                this.delete();
                break;
            case "duplicate":
                CommonKeyboardCommands.duplicateSelectedItems();
                break;
            case "selectall":
                this.selectAll();
                break;
            case "edittooltip":
                this.selectedItem.isModified = true;
                if ((diagram.selectedItems.nodes as any).length > 0) {
                    this.tooltipDialog.show();
                }
                break;
        }
    }
    private cutObjects(): void {
        this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
        ((this.selectedItem as any).selectedDiagram).cut();
    }

    private copyObjects(): void {
        this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
    }

    private pasteObjects(): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        if (this.selectedItem.pasteData.length > 0) {
            diagram.paste(this.selectedItem.pasteData);
        }
    }

    private sendToBack(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).sendToBack();
    }

    private bringToFront(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).bringToFront();
    }

    private group(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).group();
    }

    private ungroup(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).unGroup();
    }
    private undo(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram.undo());
    }
    private redo(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).redo();
    }
    private delete(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).remove();
    }
    private selectAll(): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).selectAll();
    }
    private distribute(value: any): void {
        this.selectedItem.isModified = true;
        ((this.selectedItem as any).selectedDiagram).distribute(value);
    }
    private canExecute(): boolean {
        return true;
    }
      private closeWindow(evt: BeforeUnloadEvent): any {
        let message: string = "Are you sure you want to close?";
        if (evt && this.selectedItem.isModified) {
            evt.returnValue = message;
            return evt;
        }
        return null;
    }
  public SegmentEditing(args:any){
     let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
    if(diagram.selectedItems.connectors){
      if(args.checked == true){
        for(let i=0;i<diagram.selectedItems.connectors.length;i++){
          let connector: any = (diagram.selectedItems as any).connectors[i];
          connector.constraints = ConnectorConstraints.DragSegmentThumb | ConnectorConstraints.Default ;
        }
      }     
    else
    {
      for(let i=0;i<diagram.selectedItems.connectors.length;i++){
      let connector: any = (diagram.selectedItems as any).connectors[i];
      connector.constraints = ConnectorConstraints.Default & ~(ConnectorConstraints.DragSegmentThumb);
      }
    }
    diagram.dataBind();
  }
}
  public collectionChange(args: ICollectionChangeEventArgs): void {
        if (this.selectedItem.diagramType === "GeneralDiagram") {
            if (args.state === "Changed" && args.type === "Addition" &&
                args.cause === (DiagramAction.Render | DiagramAction.ToolAction)) {
                if (this.selectedItem.themeStyle !== undefined && this.selectedItem.themeStyle !== null) {
                    this.diagramThemes.applyThemeStyleforElement(args.element,undefined);
                }
                this.selectedItem.isModified = true;
            }
        } else {
            if (args.state === "Changed" && this.selectedItem.isCopyLayoutElement) {
                if (args.element instanceof Node) {
                    if (args.element.addInfo) {
                        if ((args.element.addInfo as { [key: string]: any }).isFirstNode) {
                            this.selectedItem.pastedFirstItem = args.element;
                        }
                    }
                }
                this.selectedItem.isModified = true;
            }
        }
    }
    public drop(args: IDropEventArgs): void {
        if (this.selectedItem.diagramType === "OrgChart") {
            let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
             let sourceNode: any;
            let source: any = args.source;
         
            if (source instanceof Diagram) {
                if ((diagram.selectedItems as any).nodes.length === 1) {
                    sourceNode = (diagram.selectedItems as any).nodes[0] as Node;
                }
            } else if (source instanceof Node) {
                sourceNode = source;
            }
            if (sourceNode !== null && sourceNode.id !== "rootNode" && args.target instanceof Node) {
                let targetNode: Node = args.target;
                let connector: Connector = diagram.getObject(sourceNode.inEdges[0]) as Connector;
                connector.sourceID = targetNode.id;
                diagram.dataBind();
            }
            
            diagram.doLayout();
        }
    };
    public themeDialogCreated(args: Object): void {
        let themeDialogContent: any = document.getElementById("themeDialogContent");
        themeDialogContent.onmouseover = this.diagramThemes.themeMouseOver.bind(this.diagramThemes);
        themeDialogContent.onclick = this.diagramThemes.themeClick.bind(this.diagramThemes);
        themeDialogContent.onmouseleave = this.diagramThemes.applyOldStyle.bind(this.diagramThemes);
    }

    public tooltipCreated(args: Object): void {
        (this.tooltip as any).target = ".db-info-style";
    }
    public overviewSpanClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        let element: Element = document.getElementsByClassName("sidebar")[0];
        if (element.classList.contains("show-overview")) {
            element.classList.remove("show-overview");
            target.className = "db-overview";
        } else {
            element.classList.add("show-overview");
            target.className = "db-overview active";
            this.overview.refresh();
        }
    }
    public hideMenuBar(): void {
        let expandcollapseicon: any = document.getElementById("btnHideToolbar") as HTMLElement;
        let button1: Button = expandcollapseicon.ej2_instances[0];
        if (button1.iconCss.indexOf("sf-icon-Collapse tb-icons") > -1) {
            button1.iconCss = "sf-icon-DownArrow2 tb-icons";
        } else {
            button1.iconCss = "sf-icon-Collapse tb-icons";
        }
        this.selectedItem.utilityMethods.hideElements("hide-menubar", this.selectedItem.selectedDiagram);
        ((this.selectedItem as any).selectedDiagram).refresh();
    }
    public getUploadButtons(): any {
        let buttons: any = [];
        buttons.push({
            click: this.btnCancelClick.bind(this), buttonModel: { content: "Cancel", cssClass: "e-flat", isPrimary: true }
        });
        buttons.push({
            click: this.btnUploadNext.bind(this), buttonModel: { content: "Next", cssClass: "e-flat e-db-primary", isPrimary: true },
        });
        return buttons;
    }
    public getDialogButtons(dialogType: string): any {
    let buttons: any = [];
    switch (dialogType) {
      case "export":
        buttons.push({
          click: this.btnExportClick.bind(this),
          buttonModel: {
            content: "Export",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "print":
        buttons.push({
          click: this.btnPrintClick.bind(this),
          buttonModel: {
            content: "Print",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "save":
        buttons.push({
          click: this.btnSave.bind(this),
          buttonModel: {
            content: "Save",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "tooltip":
        buttons.push({
          click: this.btnTooltip.bind(this),
          buttonModel: {
            content: "Apply",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "hyperlink":
        buttons.push({
          click: this.btnHyperLink.bind(this),
          buttonModel: {
            content: "Apply",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "deleteconfirmation":
        buttons.push({
          click: this.btnDeleteConfirmation.bind(this),
          buttonModel: {
            content: "Ok",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "moreshapes":
        buttons.push({
          click: this.btnMoreShapes.bind(this),
          buttonModel: {
            content: "Apply",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
    }
    buttons.push({
      click: this.btnCancelClick.bind(this),
      buttonModel: {
        content: "Cancel",
        cssClass: "e-flat",
        isPrimary: true,
      },
    });
    return buttons;
  }
  private btnExportClick(): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram ;
        diagram.exportDiagram({
            fileName: this.selectedItem.exportSettings.fileName,
            format: this.selectedItem.exportSettings.format as FileFormats,
            region: this.selectedItem.exportSettings.region as DiagramRegions
        });
        this.exportDialog.hide();
    }
    private btnPrintClick(): void {
        let pageWidth: number = this.selectedItem.printSettings.pageWidth;
        let pageHeight: number = this.selectedItem.printSettings.pageHeight;
        let paperSize: PaperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
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
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        diagram.print({
            region: this.selectedItem.printSettings.region as DiagramRegions, pageHeight: pageHeight, pageWidth: pageWidth,
            multiplePage: !this.selectedItem.printSettings.multiplePage,
            pageOrientation: this.selectedItem.printSettings.isPortrait ? "Portrait" : "Landscape"
        });
        this.printDialog.hide();
    }
    private btnDeleteConfirmation(args: MouseEvent): void {
        this.customProperty.removeProperty(args);
    }
    public removeProperty(args: MouseEvent): void {
        for (let i: number = 0; i < ((this.selectedItem as any).selectedDiagram ).nodes.length; i++) {
            let node: Node = ((this.selectedItem as any).selectedDiagram ).nodes[i] as Node;
            if (node.id !== 'textNode') {
                let nodeInfo: any = node.addInfo;
                delete nodeInfo[this.customProperty.deleteField];
            }
        }
        let addInfo: any = ((this.selectedItem as any).selectedDiagram ).selectedItems.nodes[0].addInfo;
        this.customProperty.getPropertyDialogContent(addInfo);
        let imageField: boolean = false;
        if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
            imageField = true;
        }
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
        this.customProperty.deleteField = '';
        let dialog: any = document.getElementById('deleteConfirmationDialog');
        dialog.ej2_instances[0].hide();
    }
  
  public closeThemeDialog(args: Object): void {
    let btnWindow: any = document.getElementById("btnWindowMenu");
    btnWindow.ej2_instances[0].items[5].iconCss = "";
  }
  private btnMoreShapes(args: MouseEvent): void {
        let listSelectedItem: SelectedCollection = this.moreShapesList.getSelectedItems() as SelectedCollection;
        if (listSelectedItem.text.length > 0) {
            (this.symbolpalette as any).palettes = this.palettes.getPalettes(listSelectedItem.text as string[]);
            this.moreShapesDialog.hide();
        }
    }
    public listViewSelectionChange(args: SelectEventArgs): void {
        (document.getElementById("shapePreviewImage") as any).src="./assets/dbstyle/shapes_images/" + args.text.toLowerCase() + '.png';
    }
    private btnUploadNext(args:MouseEvent): void {
        const target: any = args.target;
        const buttonInstance: any = target.ej2_instances[0];
        const uploadDialogContent: any = document.getElementById('uploadDialogContent');
        if (OrgChartUtilityMethods.isUploadSuccess) {
            if (uploadDialogContent.className === 'db-upload-content firstPage') {
                if (OrgChartUtilityMethods.fileType === 'xml') {
                    (this.fileUploadDialog as any).header = ' Define Employee Information';
                    uploadDialogContent.className = 'db-upload-content thirdPage';
                    buttonInstance.content = 'Finish';
                } else {
                  (this.fileUploadDialog as any).header = ' Define Employee - Supervisor Relationship';
                    uploadDialogContent.className = 'db-upload-content secondPage';
                }
            } else if (uploadDialogContent.className === 'db-upload-content secondPage') {
                const id: string = this.selectedItem.orgDataSettings.id;
                const parent: string = this.selectedItem.orgDataSettings.parent;
                if (id && parent) {
                    if (!OrgChartUtilityMethods.validateParentChildRelation()) {
                        alert('We haven"t found the parent child relationship between the chosen fields');
                    } else {
                        (this.fileUploadDialog as any).header = ' Define Employee Information';
                        uploadDialogContent.className = 'db-upload-content thirdPage';
                        buttonInstance.content = 'Finish';
                    }
                } else {
                    alert('EmployeeId and SupervisorId can"t be empty');
                }

            } else {
                const nameField: string = this.selectedItem.orgDataSettings.nameField;
                if (nameField) {
                    uploadDialogContent.className = 'db-upload-content firstPage';
                    buttonInstance.content = 'Next';
                    OrgChartUtilityMethods.applyDataSource();
                    this.defaultupload.clearAll();
                } else {
                    alert('Name field can"t be empty');
                }
            }
        }
    }
    public diagramNameChange(args: MouseEvent): void {
        (document.getElementById("diagramName") as any).innerHTML = (document.getElementById("diagramEditable") as HTMLInputElement).value;
        document.getElementsByClassName("db-diagram-name-container")[0].classList.remove("db-edit-name");
        this.selectedItem.exportSettings.fileName = (document.getElementById("diagramName") as any).innerHTML;
    }
    private btnCancelClick(args: MouseEvent): void {
        let ss: any = (args.target as HTMLElement)as any;
        let key: any = (ss.offsetParent.id) as any;
        switch (key) {
            case "exportDialog":
                this.exportDialog.hide();
                break;
            case "printDialog":
                this.printDialog.hide();
                break;
            case "saveDialog":
                this.saveDialog.hide();
                break;
            case "customPropertyDialog":
                this.customPropertyDialog.hide();
                break;
            case "tooltipDialog":
                this.tooltipDialog.hide();
                break;
            case "hyperlinkDialog":
                this.hyperlinkDialog.hide();
                break;
            case "deleteConfirmationDialog":
                this.deleteConfirmationDialog.hide();
                break;
            case "fileUploadDialog":
                this.fileUploadDialog.hide();
                OrgChartUtilityMethods.isUploadSuccess = false;
                break;
            case "moreShapesDialogContent":
                this.moreShapesDialog.hide();
                break;
        }
    }
    private btnHyperLink(): void {
        let node: Node = ((this.selectedItem as any).selectedDiagram ).selectedItems.nodes[0] as Node;
        if (node.annotations.length > 0) {
            (node.annotations[0].hyperlink as any).link = (document.getElementById("hyperlink") as HTMLInputElement).value;
            (node.annotations[0].hyperlink as any).content = (document.getElementById("hyperlinkText") as HTMLInputElement).value;
            this.applyToolTipforHyperlink(node);
            ((this.selectedItem  as any).selectedDiagram).dataBind();
        } else {
            let annotation: ShapeAnnotationModel = {
                hyperlink: {
                    content: (document.getElementById("hyperlinkText") as HTMLInputElement).value,
                    link: (document.getElementById("hyperlink") as HTMLInputElement).value
                }
            };
            (this.selectedItem.selectedDiagram as any).addLabels(node, [annotation]);
            this.applyToolTipforHyperlink(node);
           (this.selectedItem.selectedDiagram as any).dataBind();
        }
        this.hyperlinkDialog.hide();
    }
    private applyToolTipforHyperlink(node: Node): void {
        node.constraints = NodeConstraints.Default & ~NodeConstraints.InheritTooltip | NodeConstraints.Tooltip;
        node.tooltip = {
            content: (node.annotations[0].hyperlink as any).link, relativeMode: "Object",
            position: "TopCenter", showTipPointer: true,
        };
    }
    private btnTooltip(): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        if ((this.selectedItem.selectedDiagram as any).selectedItems.nodes.length > 0) {
            let node: NodeModel = (this.selectedItem.selectedDiagram as any).selectedItems.nodes[0];
            this.customProperty.setTooltip(node, (document.getElementById("objectTooltip") as HTMLTextAreaElement).value);
            this.selectedItem.nodeProperties.tooltip = (node.tooltip as any).content as string;
            diagram.dataBind();
        }
        this.tooltipDialog.hide();
    }
    private btnSave(): void {
    CommonKeyboardCommands.download(this.page.savePage(), (document.getElementById("saveFileName") as HTMLInputElement).value);
      this.saveDialog.hide();
  }
    private registerBrowseEvent = false;
    public btnImportClick(args: MouseEvent): void {
        if (!this.registerBrowseEvent) {
            (this.defaultupload as any).dropArea = document.getElementById("dropRegion");
            (document.getElementById("browseFile") as any).onclick = () => {
                (document.getElementsByClassName("e-file-select-wrap") as any)[0].querySelector("button").click();
                return false;
            };
            this.registerBrowseEvent = true;
        }
        this.selectedItem.orgDataSettings.extensionType = ".csv";
        CommonKeyboardCommands.isOpen = false;
        this.defaultupload.clearAll();
        let uploadDialogContent: any = document.getElementById("uploadDialogContent");
        uploadDialogContent.className = "db-upload-content firstPage";
        OrgChartUtilityMethods.showUploadDialog();
    }
    
     public contextMenuClick(args: ContextMenuEventArgs): void {
        let buttonElement: any = document.getElementsByClassName("e-btn-hover")[0];
        if (buttonElement) {
            buttonElement.classList.remove("e-btn-hover");
        }
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        let commandType: string = "";
        if (args.element.innerText.indexOf("Ctrl") !== -1) {
            commandType = args.element.innerText.substring(0, args.element.innerText.indexOf("Ctrl")).trim();
        } else {
            commandType = args.element.innerText.trim();
        }
        commandType = commandType.replace(/[" "]/g, "");
        switch (commandType.toLowerCase()) {
            case "left":
            case "right":
            case "top":
            case "bottom":
            case "middle":
            case "center":
                this.selectedItem.isModified = true;
                diagram.align(args.item.text as AlignmentOptions);
                break;
            case "horizontally":
                this.distribute("RightToLeft");
                break;
            case "vertically":
                this.distribute("BottomToTop");
                break;
            case "width":
                this.selectedItem.isModified = true;
                diagram.sameSize("Width");
                break;
            case "height":
                this.selectedItem.isModified = true;
                diagram.sameSize("Height");
                break;
            case "bothwidthandheight":
                this.selectedItem.isModified = true;
                diagram.sameSize("Size");
                break;
            case "sendtoback":
                this.sendToBack();
                break;
            case "bringtofront":
                this.bringToFront();
                break;
            case "bringforward":
                this.selectedItem.isModified = true;
                diagram.moveForward();
                break;
            case "sendbackward":
                this.selectedItem.isModified = true;
                diagram.sendBackward();
                break;
            case "lock":
            case "unlock":
                this.lockObject();
                break;
            case "group":
                this.group();
                break;
            case "ungroup":
                this.ungroup();
                break;
        }
    }
    private generateDiagram(): void {
        let diagramInstance: DiagramComponent;
        let diagramObj: any = document.getElementById("diagram");
        diagramInstance = diagramObj.ej2_instances[0];
        (this.selectedItem as any).selectedDiagram =diagramInstance;
     
     this.selectedItem.diagramType = "GeneralDiagram";
        
        //this.diagram.layers[0].addInfo = { "name": "Layer0" };
    }
    public handle: UserHandleModel[] = [
        {
            name: "cloneHandle", pathColor: "white", backgroundColor: "black",
            pathData: "M 41.44 44.46 L 41.44 85.14 L 85.37 85.14 L 85.37 44.46 z M 26.82 25.63 L 100 25.63 L 100 100 L 26.82 100 z" +
                "M 0 0 L 65.85 0 L 65.85 12.75 L 12.54 12.75 L 12.54 73.33 L 0 73.33 L 0 12.75 L 0 6.39 z",
            side: "Left", offset: 1, horizontalAlignment: "Center", verticalAlignment: "Center"
        },
        {
            name: "linkHandle", pathColor: "white", backgroundColor: "black",
            pathData: "M 61.24 100 L 61.24 61.92 L 0 61.92 L 0 32.92 L 61.24 32.92 L 61.24 0 L 100 49.99 z",
            visible: true, offset: 1, side: "Right", horizontalAlignment: "Center", verticalAlignment: "Center"
        },
    ];
      public toolbarInsertClick(args: ClickEventArgs): void {
        
        let diagram: any = this.selectedItem.selectedDiagram;
        let commandType: any = ((args.item as any).tooltipText.replace(/[" "]/g, ""));
   
        if ((diagram.selectedItems as any).nodes.length > 0) {
            switch (commandType.toLowerCase()) {
                case "insertlink":
                    (document.getElementById("hyperlink") as HTMLInputElement).value = "";
                    (document.getElementById("hyperlinkText") as HTMLInputElement).value = "";
                    if (diagram.selectedItems.nodes[0].annotations.length > 0) {
                        let annotation: ShapeAnnotationModel = diagram.selectedItems.nodes[0].annotations[0];
                        if ((annotation.hyperlink as any).link || annotation.content) {
                            ((document.getElementById("hyperlink") as HTMLInputElement) as any).value = (annotation.hyperlink as any).link;
                            ((document.getElementById("hyperlinkText") as HTMLInputElement) as any ).value = (annotation.hyperlink as any).content || annotation.content;
                        }
                    }
                    this.hyperlinkDialog.show();
                    break;
                case "insertimage":
                    CommonKeyboardCommands.openUploadBox(false, ".jpg,.png,.bmp");
                    break;
            }
        }
    }
    public toolbarEditorClick(args: ClickEventArgs): void {
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        let commandType: string = (args.item.tooltipText as any).replace(/[" "]/g, "").toLowerCase();
        switch (commandType) {
            case "undo":
                this.undo();
                break;
            case "redo":
                this.redo();
                break;
            case "zoomin(ctrl++)":
                diagram.zoomTo({ type: "ZoomIn", zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = ((diagram.scrollSettings.currentZoom as any) * 100).toFixed() + "%";
                break;
            case "zoomout(ctrl+-)":
                diagram.zoomTo({ type: "ZoomOut", zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = ((diagram.scrollSettings.currentZoom as any) * 100).toFixed() + "%";
                break;
            case "pantool":
                diagram.tool = DiagramTools.ZoomPan;
                diagram.clearSelection();
                this.selectedItem.utilityMethods.objectTypeChange("diagram");
                break;
            case "pointer":
                diagram.drawingObject = {};
                diagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
                break;
            case "texttool":
                diagram.drawingObject = { shape: { type: "Text" }, style: { strokeColor: "none", fill: "none" } };
                diagram.tool = DiagramTools.ContinuousDraw;
                break;
            case "delete":
                this.delete();
                break;
            case "lock":
                this.lockObject();
                break;
            case "fillcolor":
                this.showColorPicker("nodeFillColor", "tb-item-fill");
                break;
            case "bordercolor":
                if ((this.selectedItem.selectedDiagram as any).selectedItems.nodes.length > 0) {
                    this.showColorPicker("nodeStrokeColor", "tb-item-stroke");
                } else {
                    this.showColorPicker("lineColor", "tb-item-stroke");
                }
                break;
            case "group":
                this.group();
                break;
            case "ungroup":
                this.ungroup();
                break;
            case "alignleft":
            case "alignright":
            case "aligntop":
            case "alignbottom":
            case "alignmiddle":
            case "aligncenter":
                this.selectedItem.isModified = true;
                let alignType: string = commandType.replace("align", "");
                let alignType1: AlignmentOptions = alignType.charAt(0).toUpperCase() + alignType.slice(1) as AlignmentOptions;
                diagram.align(alignType1);
                break;
            case "distributeobjectshorizontally":
                this.distribute("RightToLeft");
                break;
            case "distributeobjectsvertically":
                this.distribute("BottomToTop");
                break;
            case "showlayers":
                this.showHideLayers();
                break;
            case "themes":
                this.showHideThemes();
                break;
        }
        if (commandType === "pantool" || commandType === "pointer" || commandType === "texttool") {
            if ((args.item as any).cssClass.indexOf("tb-item-selected") === -1) {
                this.removeSelectedToolbarItem();
                args.item.cssClass += " tb-item-selected";
            }
        }
    }
    public showColorPicker(propertyName: string, toolbarName: string): void {
        let fillElement: HTMLButtonElement =
            (document.getElementById(propertyName) as any).parentElement.getElementsByClassName("e-dropdown-btn")[0] as HTMLButtonElement;
        fillElement.click();
        let popupElement: any = document.getElementById(fillElement.id + "-popup");
        let bounds: ClientRect = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
        popupElement.style.left = bounds.left + "px";
        popupElement.style.top = (bounds.top + 40) + "px";
    }
  private lockObject(): void {
        this.selectedItem.isModified = true;
        let diagram: Diagram = this.selectedItem.selectedDiagram as Diagram;
        for (let i: number = 0; i < (diagram.selectedItems.nodes as any).length; i++) {
            let node: any = (diagram.selectedItems as any).nodes[i];
            if (node.constraints & NodeConstraints.Drag) {
                node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
            } else {
                node.constraints = NodeConstraints.Default;
            }
        }
        for (let i: number = 0; i < (diagram.selectedItems.connectors as any).length; i++) {
            let connector: any = (diagram.selectedItems as any).connectors[i];
            if (connector.constraints & ConnectorConstraints.Drag) {
                connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
            } else {
                connector.constraints = ConnectorConstraints.Default;
            }
        }
        diagram.dataBind();
    }
  public showHideLayers(): void {
    let btnWindow: any = document.getElementById("btnWindowMenu");
    let iconCss: string = btnWindow.ej2_instances[0].items[3].iconCss;
    if (!this.initLayerPanel) {
      this.diagramLayer.initLayerBottomPanel();
      this.initLayerPanel = true;
    }
    if (iconCss) {
      this.layerDialog.hide();
    } else {
      this.diagramLayer.getLayerDialogContent();
      this.layerDialog.show();
    }
    btnWindow.ej2_instances[0].items[3].iconCss = iconCss ? "" : "sf-icon-Selection";
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
    public onUploadSuccess(args: { [key: string]: Object }): void {
        (document.getElementsByClassName("sb-content-overlay")[0] as HTMLDivElement).style.display = "none";
        if (args.operation !== "remove") {
            let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
            let file: Blob = file1.rawFile as Blob;
            OrgChartUtilityMethods.fileType = file1.type.toString();
            let reader: FileReader = new FileReader();
            if (OrgChartUtilityMethods.fileType.toLowerCase() === "jpg" || OrgChartUtilityMethods.fileType.toLowerCase() === "png") {
                reader.readAsDataURL(file);
                reader.onloadend = this.setImage.bind(this);
            } else {
                reader.readAsText(file);
                if (OrgChartUtilityMethods.fileType === "json" && CommonKeyboardCommands.isOpen) {
                    reader.onloadend = this.loadDiagram.bind(this);
                } else {
                    OrgChartUtilityMethods.isUploadSuccess = true;
                    reader.onloadend = OrgChartUtilityMethods.readFile.bind(OrgChartUtilityMethods);
                }
            }
            CommonKeyboardCommands.isOpen = false;
        }
    }
public onUploadFailure(args: { [key: string]: Object }): void {
        (document.getElementsByClassName("sb-content-overlay")[0] as HTMLDivElement).style.display = "none";
    }

    public onUploadFileSelected(args: { [key: string]: Object }): void {
        (document.getElementsByClassName("sb-content-overlay")[0] as HTMLDivElement).style.display = "";
    }

    public setImage(event: ProgressEvent): void {
        
        let node: NodeModel = (this.selectedItem.selectedDiagram as any).selectedItems.nodes[0];
        node.shape = { type: "Image", source: (event.target as FileReader).result as string, align: "None" };
    }

    public loadDiagram(event: ProgressEvent): void {
        this.page.loadPage(((event.target as FileReader) as any).result.toString());
        this.page.loadDiagramSettings();
        this.fileUploadDialog.hide();
    }

    public onTooltipBeforeRender(args: TooltipEventArgs): void {
      if (args.target) {
          (this.tooltip as any).content = this.orgChartPropertyBinding.getTooltipContent(args);
      }
    }
   public getCommandSettings(): CommandManagerModel {

        let commandManager: CommandManagerModel = {
            commands: [
                {
                    gesture: { key: Keys.D, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: CommonKeyboardCommands.duplicateSelectedItems.bind(CommonKeyboardCommands), name: "Duplicate"
                },
                {
                    gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.sendToBack.bind(this), name: "SendToBack"
                },
                {
                    gesture: { key: Keys.F, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.bringToFront.bind(this), name: "BringToFront"
                },
                {
                    gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.group.bind(this), name: "Group"
                },
                {
                    gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.ungroup.bind(this), name: "Ungroup"
                },
                {
                    gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.cutObjects.bind(this), name: "cutObjects"
                },
                {
                    gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.copyObjects.bind(this), name: "copyObjects"
                },
                {
                    gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.pasteObjects.bind(this), name: "pasteObjects"
                },
                {
                    gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.undo.bind(this), name: "undo"
                },
                {
                    gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.redo.bind(this), name: "redo"
                },
                {
                    gesture: { key: Keys.Delete, keyModifiers: KeyModifiers.None }, canExecute: this.canExecute,
                    execute: this.delete.bind(this), name: "delete"
                },
                {
                    gesture: { key: Keys.A, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.selectAll.bind(this), name: "selectAll"
                }
            ]
        };
        commandManager.commands = CommonKeyboardCommands.addCommonCommands((commandManager as any).commands);
        return commandManager;
    }
  }
</script>
