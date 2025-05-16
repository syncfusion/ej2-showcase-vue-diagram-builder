<template>
  <div>
    <ejs-contextmenu id="arrangeContextMenu" :animationSettings="dialogAnimationSettings"
      :items="dropDownDataSources.arrangeMenuItems" @onOpen="arrangeContextMenuOpen" cssClass="arrangeMenu"
      @select="contextMenuClick" :beforeClose="arrangeMenuBeforeClose">
    </ejs-contextmenu>
    <div class="diagrambuilder-container">
      <div class="db-header-container">
        <div class="db-diagram-name-container">
          <span id="diagramName" style="
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        " class="db-diagram-name" @click="renameDiagram">
            Untitled Diagram
          </span>
          <input id="diagramEditable" type="text" class="db-diagram-name" @keydown="diagramNameKeyDown"
            @focusout="diagramNameChange" />
          <span id="diagramreport" class="db-diagram-name db-save-text"></span>
        </div>
        <div class="db-menu-container">
          <div class="db-menu-style">
            <ejs-dropdownbutton id="btnFileMenu" cssClass="db-dropdown-menu" :items="dropDownDataSources.fileMenuItems"
              @select="menuClick" :beforeOpen="arrangeMenuBeforeOpen" :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender">
              File
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton id="btnEditMenu" cssClass="db-dropdown-menu" :items="dropDownDataSources.editMenuItems"
              @select="menuClick" :beforeOpen="arrangeMenuBeforeOpen" :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender">
              Edit
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton id="btnViewMenu" cssClass="db-dropdown-menu" :items="dropDownDataSources.viewMenuItems"
              @select="menuClick" :beforeOpen="arrangeMenuBeforeOpen" :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender">
              View
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton id="btnArrangeMenu" cssClass="db-dropdown-menu"
              :items="dropDownDataSources.arrangeMenuItems" @select="menuClick" :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose" :beforeItemRender="beforeItemRender"
              target='.e-contextmenu-wrapper.arrangeMenu'>
              Arrange
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton id="btnWindowMenu" cssClass="db-dropdown-menu"
              :items="dropDownDataSources.windowMenuItems" @select="menuClick" :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose" :beforeItemRender="beforeItemRender">
              Window
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style" style="display: none">
            <ejs-dropdownbutton id="btnHelpMenu" cssClass="db-dropdown-menu" :items="dropDownDataSources.helpMenuItems"
              @select="menuClick" :beforeItemRender="beforeItemRender">
              Help
            </ejs-dropdownbutton>
          </div>
        </div>
      </div>

      <div class='db-toolbar-editor'>
        <div class='db-toolbar-container '>
          <ejs-toolbar ref="toolbarEditor" id="toolbarEditor" overflowMode="Scrollable" @clicked="toolbarEditorClick">
            <e-items>
              <e-item prefixIcon="sf-icon-Undo tb-icons" tooltipText="Undo"
                cssClass="tb-item-start tb-item-undo"></e-item>
              <e-item prefixIcon="sf-icon-Redo tb-icons" tooltipText="Redo"
                cssClass="tb-item-end tb-item-redo"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-ZoomOut tb-icons" tooltipText="Zoom Out(Ctrl + -)"
                cssClass="tb-item-start"></e-item>
              <e-item cssClass="tb-item-end tb-zoom-dropdown-btn" :template="'toolbarTemplate'" align="Left"></e-item>
              <template v-slot:toolbarTemplate>
                <div>
                  <ejs-dropdownbutton :items="menuItems" @select="zoomChange($event)"
                    :content="selectedItem.scrollSettings.currentZoom"></ejs-dropdownbutton>
                </div>
              </template>
              <e-item prefixIcon="sf-icon-ZoomIn tb-icons" tooltipText="Zoom In(Ctrl + +)"
                cssClass="tb-item-end"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-Pan tb-icons" tooltipText="Pan Tool" cssClass="tb-item-start"></e-item>
              <e-item prefixIcon="sf-icon-Selector tb-icons" tooltipText="Pointer"
                cssClass="tb-item-middle tb-item-selected"></e-item>
              <e-item tooltipText="Draw Shapes"
                cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable"
                :template="'drawShapeTemplate'"></e-item>
              <template v-slot:drawShapeTemplate>
                <div>
                  <ejs-dropdownbutton id="btnDrawShape" iconCss="sf-icon-DrawingMode" :items="drawShapeMenuItems"
                    @select="drawShapeChange"></ejs-dropdownbutton>
                </div>
              </template>
              <e-item tooltipText="Draw Connectors"
                cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable"
                :template="'drawConnectorTemplate'"></e-item>
              <template v-slot:drawConnectorTemplate>
                <div>
                  <ejs-dropdownbutton id="btnDrawConnector" :items="drawConnectorMenuItems"
                    iconCss="sf-icon-ConnectorMode" @select="drawConnectorChange"
                    :content="zoomContent"></ejs-dropdownbutton>
                </div>
              </template>
              <e-item prefixIcon="sf-icon-TextInput tb-icons" tooltipText="Text Tool"
                cssClass="tb-item-end tb-custom-diagram-disable"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-ColorPickers tb-icons" mode="Palette" tooltipText="Fill Color"
                cssClass="tb-item-start tb-item-fill"></e-item>
              <e-item prefixIcon="sf-icon-Pickers tb-icons" mode="Palette" tooltipText="Border Color"
                cssClass="tb-item-end tb-item-stroke"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-Group tb-icons" tooltipText="Group"
                cssClass="tb-item-start tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-Ungroup tb-icons" tooltipText="Ungroup"
                cssClass="tb-item-end tb-item-ungroup"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-Lock tb-icons" tooltipText="Lock"
                cssClass="tb-item-start tb-item-lock-category"></e-item>
              <e-item prefixIcon="sf-icon-Delete tb-icons" tooltipText="Delete"
                cssClass="tb-item-end tb-item-lock-category"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-Layers tb-icons" tooltipText="Show Layers"
                cssClass="tb-item-start tb-custom-diagram-disable"></e-item>
              <e-item prefixIcon="db-theme-svg tb-icons" tooltipText="Themes"
                cssClass="tb-item-end tb-custom-diagram-disable"></e-item>
              <e-item type="Separator"></e-item>
              <e-item tooltipText="Order" cssClass="tb-item-end tb-item-order tb-dropdown-btn-icon"
                :template="'orderTemplate'"></e-item>
              <template v-slot:orderTemplate>
                <div>
                  <ejs-dropdownbutton ref="dropDownButton" iconCss="sf-icon-Order" :items="ordermenuItems"
                    @select="orderCommandsChange"></ejs-dropdownbutton>
                </div>
              </template>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-AlignLeft tb-icons" tooltipText="Align Left"
                cssClass="tb-item-start tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-AlignHorizontally tb-icons" tooltipText="Align Center"
                cssClass="tb-item-middle tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-AlignRight tb-icons" tooltipText="Align Right"
                cssClass="tb-item-middle tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-AilgnTop tb-icons" tooltipText="Align Top"
                cssClass="tb-item-middle tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-AlignVertically tb-icons" tooltipText="Align Middle"
                cssClass="tb-item-middle tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-AlignBottom tb-icons" tooltipText="Align Bottom"
                cssClass="tb-item-middle tb-item-align-category"></e-item>
              <e-item prefixIcon="sf-icon-DistributeHorizontal tb-icons" tooltipText="Distribute Objects Vertically"
                cssClass="tb-item-middle tb-item-space-category"></e-item>
              <e-item prefixIcon="sf-icon-DistributeVertical tb-icons" tooltipText="Distribute Objects Horizontally"
                cssClass="tb-item-end tb-item-space-category"></e-item>
            </e-items>
          </ejs-toolbar>
        </div>
        <div class="db-toolbar-hide-btn">
          <ejs-button id="btnHideToolbar" iconCss="sf-icon-Collapse tb-icons"></ejs-button>
        </div>

      </div>
      <div class="sidebar show-overview">
        <div class="db-palette-parent">
          <ejs-symbolpalette id="symbolpalette" ref="paletteObj" width="100%" height="100%"
            :palettes='palettes.palettes' :getSymbolInfo='palettes.getSymbolInfo' :symbolMargin='palettes.symbolMargin'
            :getNodeDefaults='palettes.setPaletteNodeDefaults' :enableSearch='palettes.enableSearch' :symbolHeight="50"
            :symbolWidth="50">
          </ejs-symbolpalette>
        </div>
        <div class="db-overview-parent">
          <div id="overview"></div>
        </div>
        <div id="moreShapesDiv" class="db-palette-more-shapes">
          <div id="overviewspan" class="db-overview">
            <span></span>
          </div>
          <div class="db-palette-more-shapes-text" v-on:click="moreShapesClick($event)">
            More Shapes
          </div>
        </div>
      </div>
      <div class="main-content" role="main">
        <div class="db-diagram-container">
          <div id="diagramContainerDiv" class="db-current-diagram-container">
            <ejs-diagram id="diagram" ref="diagram" :width="width" :height="height" :snapSettings="snapSettings"
              :pageSettings="pageSettings" :scrollSettings="scrollSettings" :selectedItems="selectedItems"
              :getNodeDefaults="setNodeDefaults" :getConnectorDefaults="setConnectorDefaults"
              :selectionChange="this.diagramEvents.selectionChange.bind(this.diagramEvents)"
              :positionChange="diagramEvents.nodePositionChange.bind(diagramEvents)"
              :sizeChange="diagramEvents.nodeSizeChange.bind(diagramEvents)"
              :rotateChange="diagramEvents.nodeRotationChange.bind(diagramEvents)"
              :contextMenuOpen="diagramEvents.diagramContextMenuOpen.bind(diagramEvents)"
              :contextMenuClick="diagramEvents.diagramContextMenuClick.bind(diagramEvents)"
              :dragEnter="diagramEvents.dragEnter.bind(diagramEvents)"
              :historyChange="diagramEvents.historyChange.bind(diagramEvents)"
              :scrollChange="diagramEvents.scrollChange.bind(diagramEvents)" :collectionChange="collectionChange"
              :contextMenuSettings="contextMenuSettings" :getCustomTool="getCustomTool"></ejs-diagram>
          </div>
          <div class="db-more-diagram-options-container">
            <div id="pageOptionList"></div>
          </div>
        </div>

        <div class="db-property-editor-container" style="overflow: auto">
          <div id="generalDiagramContainer" class="db-general-diagram-prop-container">
            <div id="diagramPropertyContainer" class="db-diagram-prop-container">
              <div class="row db-prop-header-text">Page Settings</div>
              <div class="row db-prop-row" style="background:white">
                <ejs-dropdownlist id="pageSettingsList" :dataSource="dropDownDataSources.paperList"
                  v-on:change="diagramPropertyBinding.paperListChange($event)" :fields="dropdownListFields"
                  :value="selectedItem.pageSettings.paperSize"></ejs-dropdownlist>
              </div>
              <div class="row db-prop-row" id="pageOrientation">
                <div class="col-xs-3 db-prop-col-style" style="margin-right: 8px; width: 30%">
                  <ejs-radiobutton id="pagePortrait" label="Portrait" name="pageSettings"
                    :checked="selectedItem.pageSettings.isPortrait"
                    v-on:change="diagramPropertyBinding.pageOrientationChange($event)"></ejs-radiobutton>
                </div>
                <div class="col-xs-3 db-prop-col-style">
                  <ejs-radiobutton id="pageLandscape" label="Landscape" name="pageSettings"
                    :checked="selectedItem.pageSettings.isLandscape"
                    v-on:change="diagramPropertyBinding.pageOrientationChange($event)">
                  </ejs-radiobutton>
                </div>
              </div>
              <div class="row db-prop-row" id="pageDimension" style="display: none">
                <div class="col-xs-6 db-col-left">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>W</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox id="pageWidth" min="100" format="n0"
                        :value="selectedItem.pageSettings.pageWidth"
                        v-on:change="diagramPropertyBinding.pageDimensionChange($event)"></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 db-col-right">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>H</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox id="pageHeight" min="100" format="n0"
                        :value="selectedItem.pageSettings.pageHeight"
                        v-on:change="diagramPropertyBinding.pageDimensionChange($event)"></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker type="color" mode="Palette" :showButtons="false" width="100%"
                        :value="selectedItem.pageSettings.backgroundColor"
                        v-on:change="diagramPropertyBinding.pageBackgroundChange1($event)"></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-ColorPickers tb-icons"></ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <ejs-checkbox id="showPageBreaks" label="Page Breaks" :checked="selectedItem.pageSettings.pageBreaks"
                  v-on:change="diagramPropertyBinding.pageBreaksChange($event)">
                </ejs-checkbox>
              </div>
            </div>
            <div id="nodePropertyContainer" class="db-node-prop-container" style="display: none">
              <div class="db-node-behaviour-prop">
                <div class="row db-prop-header-text">Dimensions</div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>X</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox id="nodeOffsetX" format="n0"
                          v-model="this.selectedItem.nodeProperties.offsetX"></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>Y</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox id="nodeOffsetY" format="n0"
                          v-model="selectedItem.nodeProperties.offsetY"></ejs-numerictextbox>
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
                        <ejs-numerictextbox id="nodeWidth" format="n0"
                          v-model="selectedItem.nodeProperties.width"></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text">
                        <span>H</span>
                      </div>
                      <div class="db-text-input">
                        <ejs-numerictextbox id="nodeHeight" min="1" format="n0"
                          v-model="selectedItem.nodeProperties.height"></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-checkbox id="aspectRatio" label="Aspect Ratio"
                      v-model="selectedItem.nodeProperties.aspectRatio"></ejs-checkbox>
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
                        <ejs-numerictextbox id="nodeRotateAngle" format="n0"
                          v-model="selectedItem.nodeProperties.rotateAngle"></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="db-prop-separator"></div>
                <div class="row db-prop-header-text">Insert</div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-toolbar id="toolbarNodeInsert" overflowMode="Scrollable"
                      v-on:clicked="toolbarInsertClick($event)">
                      <e-items>
                        <e-item prefixIcon="sf-icon-InsertLink tb-icons" tooltipText="Insert Link"
                          cssClass="tb-item-start"></e-item>
                        <e-item prefixIcon="sf-icon-InsertImage tb-icons" tooltipText="Insert Image"
                          cssClass="tb-item-end"></e-item>
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
                          <ejs-colorpicker id="nodeFillColor" type="color" mode="Palette" :showButtons="false"
                            v-model="selectedItem.nodeProperties.fillColor"></ejs-colorpicker>
                        </div>
                        <div class="db-color-btn">
                          <ejs-button iconCss="sf-icon-ColorPickers tb-icons"></ejs-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="gradientStyle" class="row db-prop-row db-gradient-style-hide">
                    <div class="col-xs-4 db-col-left">
                      <ejs-checkbox id="gradient" label="Gradient"
                        v-model="selectedItem.nodeProperties.gradient"></ejs-checkbox>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <ejs-dropdownlist v-model="selectedItem.nodeProperties.gradientDirection"
                        :dataSource="dropDownDataSources.gradientDirections" :fields="dropdownListFields"
                        popupWidth="200px"></ejs-dropdownlist>
                    </div>
                    <div class="col-xs-4 db-col-right">
                      <div class="db-color-container">
                        <div class="db-color-input">
                          <ejs-colorpicker id="nodeGradientColor" type="color" mode="Palette" :showButtons="false"
                            v-model="selectedItem.nodeProperties.gradientColor"></ejs-colorpicker>
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
                          <ejs-colorpicker id="nodeStrokeColor" type="color" mode="Palette" :showButtons="false"
                            v-model="selectedItem.nodeProperties.strokeColor"></ejs-colorpicker>
                        </div>
                        <div class="db-color-btn">
                          <ejs-button iconCss="sf-icon-Pickers tb-icons">
                          </ejs-button>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <ejs-dropdownlist id="nodeBorderStyle" v-model="selectedItem.nodeProperties.strokeStyle"
                        :dataSource="dropDownDataSources.borderStyles" popupWidth="160px" :fields="dropdownListFields"
                        :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                      </ejs-dropdownlist>
                    </div>
                    <div class="col-xs-4 db-col-right">
                      <ejs-numerictextbox id="nodeStrokeWidth" :step="0.5"
                        v-model="selectedItem.nodeProperties.strokeWidth"></ejs-numerictextbox>
                    </div>
                  </div>
                  <div class="row db-prop-row">
                    <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                      <span class="db-prop-text-style">Opacity</span>
                    </div>
                    <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                      <ejs-slider min="0" max="100" step="10" type="MinRange"
                        v-model="selectedItem.nodeProperties.opacity" @input="updateOpacity"></ejs-slider>
                    </div>
                    <div class="col-xs-2 db-col-right">
                      <input type="text" readOnly="true" class="db-readonly-input"
                        :value="selectedItem.nodeProperties.opacityText" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="connectorPropertyContainer" class="db-connector-prop-container" style="display: none">
              <div class="row db-prop-header-text">Connector Properties</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left db-prop-text-style">
                  <span class="db-prop-text-style">Connector Type</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6 db-col-left">
                  <ejs-dropdownlist v-model="selectedItem.connectorProperties.lineType"
                    :dataSource="dropDownDataSources.lineTypes" :fields="dropdownListFields">
                  </ejs-dropdownlist>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker id="lineColor" mode="Palette" type="color" :showButtons="false"
                        v-model="selectedItem.connectorProperties.lineColor"></ejs-colorpicker>
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
                  <ejs-dropdownlist id="lineStyle" v-model="selectedItem.nodeProperties.strokeStyle"
                    :dataSource="dropDownDataSources.borderStyles" popupWidth="160px" :fields="dropdownListFields"
                    :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                  </ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :min="0.5" :step="0.5" id="lineWidth"
                    v-model="selectedItem.connectorProperties.lineWidth"></ejs-numerictextbox>
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
                  <ejs-dropdownlist v-model="selectedItem.connectorProperties.sourceType"
                    :dataSource="dropDownDataSources.decoratorList" :fields="dropdownListFields"></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :step="1" id="sourceSize"
                    v-model="selectedItem.connectorProperties.sourceSize"></ejs-numerictextbox>
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
                  <ejs-dropdownlist v-model="selectedItem.connectorProperties.targetType"
                    :dataSource="dropDownDataSources.decoratorList" fields="dropdownListFields"></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :step="1" id="targetSize"
                    v-model="selectedItem.connectorProperties.targetSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left" style="margin-top: 5px">
                  <ejs-checkbox id="lineJump" label="Bridging"
                    v-model="selectedItem.connectorProperties.lineJump"></ejs-checkbox>
                </div>
                <div class="col-xs-4 db-col-right" id="lineJumpSizeDiv" style="display: none">
                  <ejs-numerictextbox :min="1" :step="1"
                    v-model="selectedItem.connectorProperties.lineJumpSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <ejs-checkbox id="SegmentEditing" :checked="false" label="Segment Editing"
                  v-on:change="SegmentEditing($event)"></ejs-checkbox>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                  <ejs-slider id="default" min="0" max="100" step="10" type="MinRange"
                    v-model="selectedItem.connectorProperties.opacity"></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input type="text" readonly="true" class="db-readonly-input"
                    v-model="selectedItem.connectorProperties.opacityText" />
                </div>
              </div>
            </div>
            <div id="textPropertyContainer" class="db-text-prop-container" style="display: none">
              <div class="db-prop-separator"></div>
              <div class="row db-prop-header-text">Text</div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist height="34px" :dataSource="dropDownDataSources.fontFamilyList"
                    v-model="selectedItem.textProperties.fontFamily" :fields="dropdownListFields"
                    index=0></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox :min="1" :step="1"
                    v-model="selectedItem.textProperties.fontSize"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left" id="textPositionDiv">
                  <ejs-dropdownlist id="ddlTextPosition" index=0
                    :dataSource="selectedItem.textProperties.textPositionDataSource"
                    :value="selectedItem.textProperties.textPosition" :fields="dropdownListFields"
                    v-on:change="diagramPropertyBinding.textPositionChange($event)"></ejs-dropdownlist>
                </div>
                <div class="col-xs-6 db-col-right" id="textColorDiv">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker id="textColor" mode="Palette" type="color" :showButtons="false"
                        v-model="selectedItem.textProperties.fontColor"></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-ColorPickers tb-icons"></ejs-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div>
                  <ejs-toolbar id="toolbarTextStyle" overflowMode="Scrollable"
                    v-on:clicked="diagramPropertyBinding.toolbarTextStyleChange($event)">
                    <e-items>
                      <e-item prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start"></e-item>
                      <e-item prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic"
                        cssClass="tb-item-middle"></e-item>
                      <e-item prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline"
                        cssClass="tb-item-end"></e-item>
                    </e-items>
                  </ejs-toolbar>
                </div>
                <div>
                  <ejs-toolbar id="toolbarTextSubAlignment" overflowMode="Scrollable"
                    v-on:clicked="diagramPropertyBinding.toolbarTextSubAlignChange($event)">
                    <e-items>
                      <e-item prefixIcon="sf-icon-ParaAlignLeft tb-icons" tooltipText="Align Text Left"
                        cssClass="tb-item-start"></e-item>
                      <e-item prefixIcon="sf-icon-ParaAlignCenter tb-icons" tooltipText="Align Text Center"
                        cssClass="tb-item-middle"></e-item>
                      <e-item prefixIcon="sf-icon-ParaAlignRight tb-icons" tooltipText="Align Text Right"
                        cssClass="tb-item-end"></e-item>
                    </e-items>
                  </ejs-toolbar>
                </div>
              </div>
              <div class="row db-prop-row" id="toolbarTextAlignmentDiv">
                <ejs-toolbar id="toolbarTextAlignment" overflowMode="Scrollable"
                  v-on:clicked="diagramPropertyBinding.toolbarTextAlignChange($event)">
                  <e-items>
                    <e-item prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Right"
                      cssClass="tb-item-start"></e-item>
                    <e-item prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Center"
                      cssClass="tb-item-middle"></e-item>
                    <e-item prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Left"
                      cssClass="tb-item-middle"></e-item>
                    <e-item prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Bottom"
                      cssClass="tb-item-middle"></e-item>
                    <e-item prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Middle"
                      cssClass="tb-item-middle"></e-item>
                    <e-item prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Top"
                      cssClass="tb-item-end"></e-item>
                  </e-items>
                </ejs-toolbar>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                  <ejs-slider min="0" max="100" step="10" type="MinRange"
                    v-model="selectedItem.textProperties.opacity"></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input id="textOpacityText" type="text" class="db-readonly-input" readOnly="true"
                    v-model="selectedItem.textProperties.opacityText" />
                </div>
              </div>
            </div>
          </div>
          <div id="mindMapContainer" class="db-mindmap-prop-container">
            <div class="row db-prop-header-text">MindMap Pattern</div>
            <div class="row db-prop-row">
              <div class="col-xs-6 org-pattern-parent">
                <div class="mindmap-pattern-style mindmap-pattern1"
                  v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div class="mindmap-pattern-style mindmap-pattern2"
                  v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
              </div>
            </div>
            <div class="row db-prop-row" style="margin-top: 5px">
              <div class="col-xs-6 org-pattern-parent">
                <div class="mindmap-pattern-style mindmap-pattern3"
                  v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div class="mindmap-pattern-style mindmap-pattern4"
                  v-on:click="mindmapPropertyBinding.mindmapPatternChange($event)"></div>
              </div>
            </div>
            <div class="db-prop-separator"></div>
            <div class="row db-prop-header-text">MindMap Levels Styles</div>
            <div class="row db-prop-row">
              <div class="col-xs-6 db-col-left">
                <ejs-dropdownlist id="mindMapLevels" v-model="selectedItem.mindmapSettings.levelType"
                  :dataSource="dropDownDataSources.mindmapLevels" :fields="dropdownListFields"></ejs-dropdownlist>
              </div>
            </div>
            <div id="mindMapFill" class="row db-prop-row">
              <div class="col-xs-6 db-col-left">
                <div class="db-color-container">
                  <div class="db-color-input">
                    <ejs-colorpicker id="mindmapFill" mode="Palette" type="color" :showButtons="false"
                      v-model="selectedItem.mindmapSettings.fill"></ejs-colorpicker>
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
                    <ejs-colorpicker id="mindmapStroke" mode="Palette" type="color" :showButtons="false"
                      v-model="selectedItem.mindmapSettings.stroke"></ejs-colorpicker>
                  </div>
                  <div class="db-color-btn">
                    <ejs-button iconCss="sf-icon-Pickers tb-icons">
                    </ejs-button>
                  </div>
                </div>
              </div>
              <div class="col-xs-4 db-col-center">
                <ejs-dropdownlist v-model="selectedItem.mindmapSettings.strokeStyle"
                  :dataSource="dropDownDataSources.borderStyles" popupWidth="160px" :fields="dropdownListFields"
                  :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                </ejs-dropdownlist>
              </div>
              <div class="col-xs-4 db-col-right">
                <ejs-numerictextbox :min="0.5" :step="0.5"
                  v-model="selectedItem.mindmapSettings.strokeWidth"></ejs-numerictextbox>
              </div>
            </div>
            <div class="row db-prop-row">
              <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                <span class="db-prop-text-style">Opacity</span>
              </div>
              <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                <ejs-slider min="0" max="100" step="10" type="MinRange"
                  v-model="selectedItem.mindmapSettings.opacity"></ejs-slider>
              </div>
              <div class="col-xs-2 db-col-right">
                <input type="text" readOnly="true" class="db-readonly-input"
                  v-model="selectedItem.mindmapSettings.opacityText" />
              </div>
            </div>
            <div style="margin-top: 10px; margin-bottom: 15px"></div>
            <div class="row db-prop-header-text">Text Style</div>
            <div class="row db-prop-row">
              <div class="col-xs-8 db-col-left">
                <ejs-dropdownlist height='34px' :dataSource='dropDownDataSources.fontFamilyList'
                  v-model='selectedItem.mindmapSettings.fontFamily' :fields='dropdownListFields'>
                </ejs-dropdownlist>
              </div>
              <div class="col-xs-4 db-col-right">
                <ejs-numerictextbox :min="1" :step="1"
                  v-model="selectedItem.mindmapSettings.fontSize"></ejs-numerictextbox>
                <!-- <ejs-numerictextbox :min="0.5" :step="0.5" v-model="selectedItem.mindmapSettings.strokeWidth"></ejs-numerictextbox> -->
              </div>
            </div>
            <div class="row db-prop-row">
              <div class="col-xs-6 db-col-left">
                <ejs-toolbar overflowMode="Scrollable"
                  v-on:clicked="mindmapPropertyBinding.mindmapTextStyleChange($event)">
                  <e-items>
                    <e-item prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start"></e-item>
                    <e-item prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic"
                      cssClass="tb-item-middle"></e-item>
                    <e-item prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline"
                      cssClass="tb-item-end"></e-item>
                  </e-items>
                </ejs-toolbar>
              </div>
              <div class="col-xs-6 db-col-right" id="textColorDiv">
                <div class="db-color-container">
                  <div class="db-color-input">
                    <ejs-colorpicker id="mindmapTextColor" mode="Palette" type="color" :showButtons="false"
                      v-model="selectedItem.mindmapSettings.fontColor"></ejs-colorpicker>
                  </div>
                  <div class="db-color-btn">
                    <ejs-button iconCss="sf-icon-ColorPickers tb-icons">
                    </ejs-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row db-prop-row">
              <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                <span class="db-prop-text-style">Opacity</span>
              </div>
              <div class="col-xs-8 db-col-left" style="padding-right: 10px">
                <ejs-slider min="0" max="100" step="10" type="MinRange"
                  v-model="selectedItem.mindmapSettings.textOpacity">
                </ejs-slider>
              </div>
              <div class="col-xs-2 db-col-right">
                <input type="text" class="db-readonly-input" readOnly="true"
                  v-model="selectedItem.mindmapSettings.textOpacityText" />
              </div>
            </div>
          </div>
          <div id="orgChartContainer" class="db-orgchart-prop-container">
            <div class="row db-prop-row db-prop-header-text">Import</div>
            <div class="row db-prop-row" style="height: 28px">
              <ejs-button id="btnImportData" content="Import Data" cssClass="db-btn-primary"
                v-on:click.native="btnImportClick($event)"></ejs-button>
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
                <ejs-numerictextbox id="orgHorizontalSpacing" :min="25" :step="1" format="n0" :value="50"
                  v-on:change="orgChartPropertyBinding.orgChartSpacingChange($event)"></ejs-numerictextbox>
              </div>
              <div class="col-xs-6 db-col-right">
                <ejs-numerictextbox id="orgVerticalSpacing" :min="25" :step="1" format="n0" :value="50"
                  v-on:change="orgChartPropertyBinding.orgChartSpacingChange($event)"></ejs-numerictextbox>
              </div>
            </div>
            <div class="row db-prop-row">
              <ejs-toolbar id="orgChartAlignment" overflowMode="Scrollable"
                v-on:clicked="orgChartPropertyBinding.orgChartAligmentChange($event)">
                <e-items>
                  <e-item prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Left"
                    cssClass="tb-item-start"></e-item>
                  <e-item prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Center"
                    cssClass="tb-item-middle"></e-item>
                  <e-item prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Right"
                    cssClass="tb-item-middle"></e-item>
                  <e-item prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Top"
                    cssClass="tb-item-middle"></e-item>
                  <e-item prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Middle"
                    cssClass="tb-item-middle"></e-item>
                  <e-item prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Bottom"
                    cssClass="tb-item-end"></e-item>
                </e-items>
              </ejs-toolbar>
            </div>
            <div class="db-prop-separator"></div>
            <div class="row db-prop-row db-prop-header-text">
              Orientation Styles
            </div>
            <div class="row db-prop-row">
              <div class="col-xs-6 org-pattern-parent">
                <div v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                  class="org-pattern-style org-pattern-1 vertical-alternate" style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern1.svg');
                    "></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                  class="org-pattern-style org-pattern-2 vertical-left" style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern2.svg');
                    "></div>
              </div>
            </div>
            <div class="row db-prop-row" style="margin-top: 5px">
              <div class="col-xs-6 org-pattern-parent">
                <div v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                  class="org-pattern-style org-pattern-3 vertical-right" style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern3.svg');
                    "></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                  class="org-pattern-style org-pattern-4 horizontal-center" style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern4.svg');
                    "></div>
              </div>
            </div>
            <div class="row db-prop-row" style="margin-top: 5px">
              <div class="col-xs-6 org-pattern-parent">
                <div v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                  class="org-pattern-style org-pattern-5 horizontal-right" style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern5.svg');
                    "></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div v-on:click="orgChartPropertyBinding.layoutOrientationChange($event)"
                  class="org-pattern-style org-pattern-6 horizontal-left" style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern6.svg');
                    "></div>
              </div>
            </div>
            <div class="db-prop-separator"></div>
            <div class="row db-prop-header-text">OrgChart Templates</div>
            <div class="row db-prop-row">
              <div class="col-xs-6 org-pattern-parent">
                <div id="orgPattern1" class="org-pattern-style"
                  v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div id="orgPattern2" class="org-pattern-style"
                  v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
              </div>
            </div>
            <div class="row db-prop-row">
              <div class="col-xs-6 org-pattern-parent">
                <div id="orgPattern3" class="org-pattern-style"
                  v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
              </div>
              <div class="col-xs-6 org-pattern-parent">
                <div id="orgPattern4" class="org-pattern-style"
                  v-on:click="orgChartPropertyBinding.layoutPatternChange($event)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ejs-dialog id="exportDialog" ref="exportDialogObj" width="400px" header="Export Diagram" :target="dlgTarget"
      isModal="true" :animationSettings="dialogAnimationSettings" :visible="dialogVisibility" showCloseIcon="true"
      :buttons="exportingButtons">
      <div id="exportDialogContent">
        <div class="row">
          <div class="row">File Name</div>
          <div class="row db-dialog-child-prop-row">
            <input type="text" id="exportfileName" value="Untitled Diagram ">
          </div>
        </div>
        <div class="row db-dialog-prop-row">
          <div class="col-xs-6 db-col-left">
            <div class="row">Format</div>
            <div class="row db-dialog-child-prop-row">
              <ejs-dropdownlist id="exportFormat" :value="selectedItem.exportSettings.format"
                :dataSource="dropDownDataSources.fileFormats" :fields="dropdownListFields">
              </ejs-dropdownlist>
            </div>
          </div>
          <div class="col-xs-6 db-col-right">
            <div class="row">Region</div>
            <div class="row db-dialog-child-prop-row">
              <ejs-dropdownlist id="exportRegion" :value="selectedItem.exportSettings.region"
                :dataSource="dropDownDataSources.diagramRegions" :fields="dropdownListFields">
              </ejs-dropdownlist>
            </div>
          </div>
        </div>
      </div>
    </ejs-dialog>
    <ejs-dialog id="fileUploadDialog" ref="fileUploadDialog" width="500px" height="485px" header="Upload File"
      :target="dlgTarget" isModal="true" :animationSettings="dialogAnimationSettings" :buttons="uploadButtons"
      showCloseIcon="true" allowDragging="true" :visible="dialogVisibility">
      <div id="uploadDialogContent" class="db-upload-content firstPage">
        <ejs-tooltip id="tooltip" :beforeRender="onTooltipBeforeRender" :position="tooltipPosition">
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
                  <ejs-radiobutton id="csvFormat" label="csv" name="uploadFileFormat" checked="true"
                    v-on:change="downloadFile.downloadFormatChange($event)">
                  </ejs-radiobutton>
                </div>
                <div class="col-xs-3 db-prop-col-style">
                  <ejs-radiobutton id="xmlFormat" label="xml" name="uploadFileFormat"
                    v-on:change="downloadFile.downloadFormatChange($event)">
                  </ejs-radiobutton>
                </div>
                <div class="col-xs-3 db-prop-col-style">
                  <ejs-radiobutton id="jsonFormat" label="json" name="uploadFileFormat"
                    v-on:change="downloadFile.downloadFormatChange($event)">
                  </ejs-radiobutton>
                </div>
                <!-- <ejs-dropdownlist value="CSV" [dataSource]="dropDownDataSources.importFormat" [fields]="dropdownListFields">
                        </ejs-dropdownlist> -->
              </div>
            </div>
            <div class="row db-dialog-prop-row"
              style="padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">
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
              <ejs-button id="btnDownloadFile" :content="selectedItem.orgDataSettings.buttonContent"
                v-on:click="downloadFile.downloadExampleFiles($event)">
              </ejs-button>
            </div>
            <div class="row">
              <div id="dropArea">
                <span id="dropRegion" class="droparea"> Drop files here or
                  <a href="" id="browseFile">
                    <u>Browse</u>
                  </a>
                </span>
                <ejs-uploader ref="defaultfileupload" id="defaultfileupload" :asyncSettings="path"
                  :success="onUploadSuccess" :failure="onUploadFailure" :progress="onUploadFileSelected"
                  :allowedExtensions="selectedItem.orgDataSettings.extensionType">
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
                <ejs-dropdownlist id="employeeId" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)"
                  :dataSource="selectedItem.orgDataSettings.dataSourceColumns" :fields="dropdownListFields">
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
                <ejs-dropdownlist id="superVisorId" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)"
                  :dataSource="selectedItem.orgDataSettings.dataSourceColumns" :fields="dropdownListFields">
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
                <ejs-dropdownlist id="orgNameField" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)"
                  :dataSource="selectedItem.orgDataSettings.dataSourceColumns"
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
                <ejs-multiselect id="orgBindingFields"
                  v-on:change="orgChartPropertyBinding.orgMultiSelectChange($event)"
                  :dataSource="selectedItem.orgDataSettings.dataSourceColumns" mode="Delimiter"
                  :fields="dropdownListFields"></ejs-multiselect>
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
                <ejs-dropdownlist id="orgImageField" v-on:change="orgChartPropertyBinding.orgDropDownChange($event)"
                  :dataSource="selectedItem.orgDataSettings.dataSourceColumns" :fields="dropdownListFields">
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
                <ejs-multiselect id="orgAdditionalField"
                  v-on:change="orgChartPropertyBinding.orgMultiSelectChange($event)"
                  :dataSource="selectedItem.orgDataSettings.dataSourceColumns" mode="Delimiter"
                  :fields="dropdownListFields"></ejs-multiselect>
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
    <div id="diagramTemplateDiv1" style="display: none">
      <div class="row">
        <div class="col-xs-3 temp-left-pane">
          <div class="row db-diagram-template-parent-text flowdiagram-template">
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
    <ejs-dialog id="openTemplateDialog" ref="openTemplateDialog" width="695px" height="470px"
      header="Create New Diagram" :target="dlgTarget" isModal="true" :animationSettings="dialogAnimationSettings"
      :showCloseIcon="true" allowDragging="true" :visible="dialogVisibility"></ejs-dialog>
    <ejs-dialog id="saveDialog" ref="saveDialog" width="335px" header="Save Diagram" :target="dlgTarget" isModal="true"
      :animationSettings="dialogAnimationSettings" showCloseIcon="true" allowDragging="true" :visible="dialogVisibility"
      :buttons="saveButtons">
      <div id="saveDialogContent">
        <div class="row">
          <div class="row">File Name</div>
          <div class="row db-dialog-child-prop-row">
            <input type="text" id="saveFileName" value="Diagram1" />
          </div>
        </div>
      </div>

    </ejs-dialog>
    <ejs-dialog id="moreShapesDialogContent" ref="moreShapesDialog" width="695px" height="470px" header="Shapes"
      :target="dlgTarget" isModal="true" :animationSettings="dialogAnimationSettings" showCloseIcon="true"
      allowDragging="true" :visible="dialogVisibility" :buttons="moreShapesButtons">
      <div id="moreShapesDialogContent">
        <div class="row">
          <div class="col-xs-3 temp-left-pane">
            <ejs-listview id="moreShapesList" ref="moreShapesList" :fields="listViewFields"
              :dataSource="dropDownDataSources.listViewData" showCheckBox="true"
              v-on:select="listViewSelectionChange($event)">
            </ejs-listview>
          </div>
          <div class="col-xs-9 diagramTemplates temp-right-pane" style="padding-left: 0px; padding-right: 0px">
            <img id="shapePreviewImage" src="./assets/dbstyle/shapes_images/flow.png" />
          </div>
        </div>
      </div>
    </ejs-dialog>
    <ejs-dialog id="tooltipDialog" ref="tooltipDialog" width="335px" header="Edit Tooltip" :target="dlgTarget"
      isModal="true" :animationSettings="dialogAnimationSettings" :visible="dialogVisibility" :buttons="tooltipButtons"
      showCloseIcon="true">
      <div id="tooltipDialogContent">
        <div class="row">
          <div>
            <textarea id="objectTooltip" style="resize: none; width: 100%; height: 120px;"></textarea>
          </div>
        </div>
      </div>
    </ejs-dialog>
    <ejs-dialog id="hyperlinkDialog" ref="hyperlinkDialog" width="400px" header="Insert Link" :target="dlgTarget"
      isModal="true" :animationSettings="dialogAnimationSettings" :visible="dialogVisibility"
      :buttons="hyperlinkButtons" showCloseIcon="true">
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
          <button class="db-custom-prop-button" style="width:100%; text-transform: none;box-shadow: 0 0 0 0">Add
            Property</button>
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
    <ejs-dialog id="customPropertyDialog" width="500px" header="Additional Information" :target="dlgTarget"
      isModal="true" :animationSettings="dialogAnimationSettings" allowDragging="true" showCloseIcon="true"
      :visible="dialogVisibility">
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
    <ejs-dialog id="layerDialog" ref="layerDialog" isModal="true" width="300px" height="400px" header="Layers"
      :target="dlgTarget" :animationSettings="dialogAnimationSettings" allowDragging="true" :visible="dialogVisibility"
      :footerTemplate="'footerTemplate'">
      <template v-slot:footerTemplate>
        <div class="db-layer-bottom-panel">
          <div class="row" style="margin-top: 6px;">
            <div class="col-xs-2">
              <button id="btnAdd" style="right:16px;position:absolute"></button>
            </div>
            <div class="col-xs-2">
              <button id="btnDuplicate" style="right:14px;position:absolute"></button>
            </div>
            <div class="col-xs-2">
              <button id="btnRemove" style="right:12px;position:absolute"></button>
            </div>
            <div class="col-xs-2">
              <button id="btnCloseLayer" style="right:10px;position:absolute"></button>
            </div>
          </div>
        </div>
      </template>
    </ejs-dialog>
    <div style="height: 100px;">
      <ejs-dialog id="themeDialog" width="174px" header="Themes" :target="dlgTarget" :isModal="isModalDialog"
        :animationSettings="dialogAnimationSettings" allowDragging="true" :visible="dialogVisibility"
        showCloseIcon="true" :position="themesdialogPosition" :close="closeThemeDialog" :created="themeDialogCreated">

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
    <ejs-dialog id="deleteConfirmationDialog" width="400px" header="Delete Field" :target="dlgTarget" isModal="true"
      :animationSettings="dialogAnimationSettings" :visible="dialogVisibility" :buttons="deleteConfirmationButtons"
      showCloseIcon="true">
      <div id="deleteConfirmationContent">
        <span style="font-size: 13px; color: black">
          Please confirm that you want to delete this field?. All data will be lost for this field once you deleted.
        </span>
      </div>
    </ejs-dialog>
  </div>
</template>
<script>
import { ref, reactive, defineComponent, onMounted,  getCurrentInstance } from "vue";
import { formatUnit, closest, createElement } from "@syncfusion/ej2-base";
import {
  PortVisibility,
  PortConstraints,
  NodeConstraints,

} from "@syncfusion/ej2-vue-diagrams";
import { DropDownDataSources } from "./app/scripts/dropdowndatasource";
import { Palettes } from "./app/scripts/palettes";
import { SelectorViewModel } from "./app/scripts/selector";
import { PageCreation } from "./app/scripts/pages";
import { CommonKeyboardCommands } from "./app/scripts/commoncommands";
import { DiagramBuilderLayer } from "./app/scripts/layers";
import { UtilityMethods } from "./app/scripts/utilitymethods";
import { CustomProperties } from "./app/scripts/customproperties";
import { CustomTool } from "./app/scripts/userhandles";
import { OrgChartUtilityMethods } from "./app/scripts/orgchart";
import { DownloadExampleFiles } from "./app/scripts/downloaddata";
import { DiagramTheme } from "./app/scripts/themes";

import {
  DiagramClientSideEvents,
  DiagramPropertyBinding,
  MindMapPropertyBinding,
  OrgChartPropertyBinding,
} from "./app/scripts/events";

import { DiagramComponent, SymbolPaletteComponent, BpmnDiagrams, SnapConstraints, SelectorConstraints, DiagramTools, UndoRedo, Overview, DiagramAction, PrintAndExport, DiagramContextMenu,
        ComplexHierarchicalTree, HierarchicalTree, ConnectorConstraints, ConnectorEditing, ConnectorBridging, MindMapTree, Snapping, DataBinding, LayoutAnimation, Diagram, MindMap
 } from "@syncfusion/ej2-vue-diagrams";
import { ContextMenuComponent, ToolbarComponent, ItemDirective, ItemsDirective } from '@syncfusion/ej2-vue-navigations';
import {
  BeforeOpenCloseMenuEventArgs,
  MenuEventArgs,
  DropDownButtonComponent,
} from "@syncfusion/ej2-vue-splitbuttons";

import { RadioButtonComponent, ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { ColorPickerComponent } from "@syncfusion/ej2-vue-inputs";
import { DialogComponent } from "@syncfusion/ej2-vue-popups";
import { UploaderComponent } from "@syncfusion/ej2-vue-inputs";
import { NumericTextBoxComponent, SliderComponent } from "@syncfusion/ej2-vue-inputs";
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';
import drawConnectorVue from './components/drawConnectorVue.vue';
let interval;
let selectedItem;
let diagram;
let container;
let page;
let tooltipDialog;
let saveDialog
let exportDialog;
let overview;
let openTemplateDialog;
let layerDialog;
let diagramLayer;
let themeDialog;
let diagramEvents;
let hyperlinkDialog;
let diagramPropertyBinding;
let defaultupload;
let customPropertyDialog;
let customProperty;
let moreShapesDialog;
let moreShapesList;
let symbolpalette;
let mindmapPropertyBinding;
let orgChartPropertyBinding;
let layerFooterTemplate;
let ddlTextPosition;
let customTool
let getCustomTool
let fileUploadDialog
let downloadFile

interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
];
let gridlines = {
  lineColor: "#EEEEEE",
  lineIntervals: interval,
};
export default defineComponent({
  name: "App",
  components: {
    'ejs-symbolpalette': SymbolPaletteComponent,
    'ejs-diagram': DiagramComponent,
    'ejs-contextmenu': ContextMenuComponent,
    'ejs-dropdownbutton': DropDownButtonComponent,
    "ejs-toolbar": ToolbarComponent,
    "e-items": ItemsDirective,
    "e-item": ItemDirective,
    "ejs-radiobutton": RadioButtonComponent,
    'ejs-dropdownlist': DropDownListComponent,
    "ejs-checkbox": CheckBoxComponent,
    "ejs-colorpicker": ColorPickerComponent,
    "ejs-dialog": DialogComponent,
    'ejs-uploader': UploaderComponent,
    "ejs-numerictextbox": NumericTextBoxComponent,
    'ejs-slider': SliderComponent,
    "ejs-listview": ListViewComponent,
    "ejs-button": ButtonComponent
  },
  setup() {
    const selectedItem = reactive(new SelectorViewModel());
    const palettes = new Palettes();
    const dropDownDataSources = new DropDownDataSources();
    const diagramEvents = new DiagramClientSideEvents(selectedItem);
    const dialogVisibility = false;
    const instance = getCurrentInstance();
    const customTool = new CustomTool();
    const diagramThemes = new DiagramTheme(selectedItem);
    const getCustomTool = customTool.getTool.bind(instance.ctx)
    const menuItems = [
         { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
          { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
          { text: 'Fit To Screen' }
         
      ]
    const drawShapeMenuItems = [
      { iconCss: "sf-icon-Square", text: "Rectangle" },
      { iconCss: "sf-icon-Ellipse", text: "Ellipse" },
      { iconCss: "sf-icon-Triangle", text: "Polygon" }
    ];
    const drawConnectorMenuItems = [
      { iconCss: "sf-icon-StraightLine", text: "Straight Line" },
      { iconCss: "sf-icon-ConnectorMode", text: "Orthogonal Line" },
      { iconCss: "sf-icon-BeizerLine", text: "Bezier" },
      { iconCss: "sf-icon-free_hand", text: "Free Hand" }
    ];
    const ordermenuItems = [
      { iconCss: "sf-icon-Sendback", text: "Send To Back" },
      { iconCss: "sf-icon-BringFront", text: "Bring To Front" },
      { iconCss: "sf-icon-SendBackward", text: "Send Backward" },
      { iconCss: "sf-icon-BringForward", text: "Bring Forward" },
    ];
    const themesdialogPosition = { X: "right", Y: 112 };
    const snapSettings = {
      horizontalGridlines: gridlines,
      verticalGridlines: gridlines,
      constraints: SnapConstraints.All & ~SnapConstraints.SnapToLines,
    };
    const dialogAnimationSettings = reactive({ effect: "None" });
    const pageSettings = reactive({
      background: { color: '#FFFFFF' },
      width: 816,
      height: 1070,
      multiplePage: true,
      margin: { left: 5, top: 5 },
      orientation: 'Landscape',
    });
    const path = {
        saveUrl:
          "https://services.syncfusion.com/vue/production/api/FileUploader/Save",
        removeUrl:
          "https://services.syncfusion.com/vue/production/api/FileUploader/Remove",
    };
    
    const contextMenuSettings = {
        show: true,
        items: selectedItem.customContextMenu.items
    };
    const rulerSettings = reactive({
      showRulers: true
    });
    const dropdownListFields = {
      text: "text",
      value: "value",
    };
    function createNode(
      id,
      offsetX,
      offsetY,
      height,
      width,
      pathData,
      ports,
      fill,
      binarystate,
      controltype
    ) {
      let node = {};
      node.id = id;
      node.offsetX = offsetX;
      node.offsetY = offsetY;
      node.height = height;
      node.width = width;
      node.shape = { type: "Path", data: pathData };
      node.ports = ports;
      node.constraints = NodeConstraints.Default & ~NodeConstraints.InConnect;
      node.ports.forEach((element) => {
        element.height = 12;
        element.width = 10;
        element.shape = "Circle";
        element.visibility = PortVisibility.Visible;
      });
      node.style = { fill: fill, strokeWidth: 0 };
      node.addInfo = { binarystate: binarystate, controltype: controltype };
      return node;
    }
    function createConnector(
      id,
      sourcePoint,
      targetPoint,
      sourceID,
      targetID,
      sourcePortID,
      targetPortID
    ) {
      return {
        id,
        sourceID,
        targetID,
        type: "Bezier",
        sourceDecorator: { shape: undefined },
        targetDecorator: { shape: undefined },
        style: { strokeWidth: 2 },
        sourcePortID,
        targetPortID,
        addInfo: { binarystate: 0 },
      };
    }
    return {
      palettes,
      dropDownDataSources,
      dialogAnimationSettings,
      pageSettings,
      rulerSettings,
      diagramEvents,
      selectedItem,
      dialogVisibility,
      page,
      snapSettings,
      contextMenuSettings,
      customTool,
      getCustomTool,
      menuItems,
      drawShapeMenuItems,
      drawConnectorMenuItems,
      ordermenuItems,
      themesdialogPosition,
      diagramThemes,
      path,
      dropdownListFields
    };
  },
  mounted: function () {

    window.addEventListener("load", this.onWindowLoad);
    diagram = this.$refs.diagram.ej2Instances;
    let toolbarEditor = this.$refs.toolbarEditor;
    this.toolbarEditor = toolbarEditor.ej2Instances;
    selectedItem = new SelectorViewModel(diagram);
    
    defaultupload = document.getElementById("defaultfileupload");
    tooltipDialog = document.getElementById("tooltipDialog");
    saveDialog = document.getElementById("saveDialog");
    exportDialog = document.getElementById("exportDialog");
    openTemplateDialog = document.getElementById("openTemplateDialog");
    layerDialog = document.getElementById("layerDialog");
    themeDialog = document.getElementById("themeDialog");
    hyperlinkDialog = document.getElementById("hyperlinkDialog");
    customPropertyDialog = document.getElementById("customPropertyDialog");
    moreShapesDialog = document.getElementById("moreShapesDialogContent");
    moreShapesList = document.getElementById("moreShapesList");
    symbolpalette = document.getElementById("symbolpalette");
    ddlTextPosition = document.getElementById("ddlTextPosition");
    fileUploadDialog = document.getElementById("fileUploadDialog");
  },
  computed: {
    exportingButtons() {
      return this.getDialogButtons('export');
    },
    hyperlinkButtons() {
      return this.getDialogButtons('hyperlink');
    },
    uploadButtons() {
      return this.getUploadButtons();
    },
    saveButtons(){
      return this.getDialogButtons("save");
    },
    tooltipButtons(){
      return this.getDialogButtons("tooltip");
    },
    moreShapesButtons(){
      return this.getDialogButtons("moreshapes");
    }
  },


  methods: {

    onWindowLoad() {
      this.selectedItem.selectedDiagram = diagram;
      CommonKeyboardCommands.selectedItem = selectedItem;
      CommonKeyboardCommands.selectedItem.selectedDiagram = diagram;
      this.tooltipDialog = tooltipDialog.ej2_instances[0];
      this.saveDialog = saveDialog.ej2_instances[0];
      this.exportDialog = exportDialog.ej2_instances[0];
      this.openTemplateDialog = openTemplateDialog.ej2_instances[0];
      this.selectedItem.utilityMethods.tempDialog = this.openTemplateDialog;
      this.layerDialog = layerDialog.ej2_instances[0];
      diagramLayer = new DiagramBuilderLayer(this.selectedItem, this.layerDialog);
      this.diagramLayer = diagramLayer;
      this.diagramLayer.layerDialog = this.layerDialog;
      this.themeDialog = themeDialog.ej2_instances[0];
      this.hyperlinkDialog = hyperlinkDialog.ej2_instances[0];
      page = new PageCreation(this.selectedItem);
      this.selectedItem.utilityMethods.page = page;
      this.page = page;
      diagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem, this.page);
      this.diagramPropertyBinding = diagramPropertyBinding;
      this.page.addNewPage();
      this.defaultupload = defaultupload.ej2_instances[0];
      this.customPropertyDialog = customPropertyDialog.ej2_instances[0];
      customProperty = new CustomProperties(this.selectedItem, this.customPropertyDialog);
      this.customProperty = customProperty;
      this.moreShapesDialog = moreShapesDialog.ej2_instances[0];
      this.moreShapesList = moreShapesList.ej2_instances[0];
      this.symbolpalette = symbolpalette.ej2_instances[0];
      mindmapPropertyBinding = new MindMapPropertyBinding(this.selectedItem);
      this.mindmapPropertyBinding = mindmapPropertyBinding;
      orgChartPropertyBinding = new OrgChartPropertyBinding(this.selectedItem);
      this.orgChartPropertyBinding = orgChartPropertyBinding;
      layerFooterTemplate = this.diagramLayer.getLayerBottomPanel();
      this.fileUploadDialog = fileUploadDialog.ej2_instances[0];
      OrgChartUtilityMethods.uploadDialog = this.fileUploadDialog
      downloadFile = new DownloadExampleFiles(this.selectedItem);
      this.downloadFile  = downloadFile;
      (document.getElementById("btnHideToolbar")).onclick = this.hideMenuBar.bind(this);  

      document.addEventListener('mouseover', this.menumouseover)
      setTimeout(() => {
        this.loadPage();
      }, 2000);
    },

    //Method is called during the initialization process
    loadPage() {
      (document.getElementsByClassName("diagrambuilder-container")[0]).style.display = "";
      this.selectedItem.selectedDiagram.updateViewPort();
      this.overview = new Overview({ width: "255px", height: "200px", sourceID: "diagram" });
      this.overview.appendTo("#overview");
      (document.getElementById("overviewspan")).onclick = this.overviewSpanClick.bind(this);
      document.getElementsByClassName("sidebar")[0].className = "sidebar";
      if (window.location.search.length === 0) {
        this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
        (document.getElementsByClassName("sb-content-overlay")[0]).style.display = "none";
        this.openTemplateDialog.show();
        (this.openTemplateDialog).content = this.selectedItem.utilityMethods.getDefaultDiagramTemplates1(this.selectedItem);
        (diagram).layers[0].addInfo = { 'name': 'Layer0' }
      }
      this.selectedItem.exportSettings.fileName = (document.getElementById("diagramName")).innerHTML;
    },
    getCustomTool(){
      customTool.getTool.bind(this);
    },

    // Toggle the visibility of the overview panel when the 'overviewspan' element is clicked.
    overviewSpanClick(args) {
      let target = args.target;
      let element = document.getElementsByClassName("sidebar")[0];
      if (element.classList.contains("show-overview")) {
        element.classList.remove("show-overview");
        target.className = "db-overview";
      } else {
        element.classList.add("show-overview");
        target.className = "db-overview active";
        this.overview.refresh();
      }
    },
    // Handle mouse-over events on menu items, specifically for dropdown buttons.
    menumouseover(args) {
      let target = args.target;
      if (target && (target.className === "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu" ||
        target.className === "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active")) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
          if (this.buttonInstance.getPopUpElement().classList.contains("e-popup-open")) {
            this.buttonInstance.toggle();
            let buttonElement = document.getElementById(this.buttonInstance.element.id);
            buttonElement.classList.remove("e-btn-hover");
          }
        }
        let button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains("e-popup-close")) {
          button1.toggle();
          if (button1.element.id === "btnArrangeMenu") {
            this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
          }
          let buttonElement = document.getElementById(this.buttonInstance.element.id);
          buttonElement.classList.add("e-btn-hover");
        }
      } else {
        if (closest(target, ".e-dropdown-popup") === null && closest(target, ".e-dropdown-btn") === null) {
          if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains("e-popup-open")) {
            this.buttonInstance.toggle();
            let buttonElement = document.getElementById(this.buttonInstance.element.id);
            buttonElement.classList.remove("e-btn-hover");
          }
        }
      }
    },
    // Set default style properties for newly added nodes.
    setNodeDefaults(node, diagram) {
      if (node.style) {
        if (node.style.fill === "transparent" && !node.children) {
          node.style.fill = "white";
        }
      }
      let node1 = {
        style: { strokeWidth: 1 }
      };
      return node1;
    },
    // Set default style properties for newly added connectors.
    setConnectorDefaults(connector, diagram) {
      let connector1 = {

        annotations: [
          { content: "", style: { fill: "transparent" } }
        ],
        style: { strokeWidth: 2 }
      };
      return connector1;
    },
    // Start the process to rename the diagram when its name field is clicked.
    renameDiagram(args) {
      document.querySelector(".db-diagram-name-container").classList.add("db-edit-name");
      const editableElement = document.getElementById("diagramEditable");
      const diagramNameElement = document.getElementById("diagramName");
      if (diagramNameElement) {
        editableElement.value = diagramNameElement.innerText || diagramNameElement.textContent;
      }
      editableElement.focus();
      editableElement.select();
    },
    // Adjust context menu position on opening to ensure it aligns with the target element.
    arrangeContextMenuOpen(args) {
      if (args.element.classList.contains("e-menu-parent")) {
        let popup = document.querySelector("#btnArrangeMenu-popup");
        args.element.style.left = formatUnit(
          parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10)
        );
        args.element.style.top = formatUnit(
          parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10)
        );
      }
    },
    // Prevent the arrange menu from closing if an internal dropdown button is clicked.
    arrangeMenuBeforeClose(args) {
      if (
        args.event &&
        closest(args.event.target, ".e-dropdown-btn") !== null
      ) {
        args.cancel = true;
      }
      if (!args.element) {
        args.cancel = true;
      }
    },
    // Customize menu styling before opening, particularly for enabling certain menu items.
    arrangeMenuBeforeOpen(args) {
      this.updateMenuStyle(args)
      if (args.event && closest(args.event.target, ".e-dropdown-btn") !== null) {
        args.cancel = true;
      }
    },
    // Utility method to adjust menu item visibility or styling as needed.
    updateMenuStyle(args) {
      for (let i = 0; i < args.element.children.length; i++) {
        (args.element.children[i]).style.display = "block";
      }
    },
    // Determine and return the shortcut key for a given menu item.
    getShortCutKey(menuItem) {
      let shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
      switch (menuItem) {
        case 'New':
          shortCutKey = 'Shift' + '+N';
          break;
        case 'Open':
          shortCutKey = shortCutKey + '+O';
          break;
        case 'Save':
          shortCutKey = shortCutKey + '+S';
          break;
        case 'Undo':
          shortCutKey = shortCutKey + '+Z';
          break;
        case 'Redo':
          shortCutKey = shortCutKey + '+Y';
          break;
        case 'Cut':
          shortCutKey = shortCutKey + '+X';
          break;
        case 'Copy':
          shortCutKey = shortCutKey + '+C';
          break;
        case 'Paste':
          shortCutKey = shortCutKey + '+V';
          break;
        case 'Delete':
          shortCutKey = 'Delete';
          break;
        case 'Duplicate':
          shortCutKey = shortCutKey + '+D';
          break;
        case 'Select All':
          shortCutKey = shortCutKey + '+A';
          break;
        case 'Zoom In':
          shortCutKey = shortCutKey + '++';
          break;
        case 'Zoom Out':
          shortCutKey = shortCutKey + '+-';
          break;
        case 'Group':
          shortCutKey = shortCutKey + '+G';
          break;
        case 'Ungroup':
          shortCutKey = shortCutKey + '+U';
          break;
        case 'Send To Back':
          shortCutKey = shortCutKey + '+Shift+B';
          break;
        case 'Bring To Front':
          shortCutKey = shortCutKey + '+Shift+F';
          break;
        default:
          shortCutKey = '';
          break;
      }
      return shortCutKey;
    },
    // Determine and return the shortcut key for a given menu item.
    beforeItemRender(args) {   
      let shortCutText = this.getShortCutKey((args.item).text);
      if (shortCutText) {
        let shortCutSpan = createElement("span");
        let text = args.item.text;
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = "none";
        args.element.appendChild(shortCutSpan);
        shortCutSpan.setAttribute("class", "db-shortcut");
      }
      let status = this.selectedItem.utilityMethods.enableMenuItems((args.item).text, this.selectedItem);
      if (status) {
        args.element.classList.add("e-disabled");
      } else {
        if (args.element.classList.contains("e-disabled")) {
          args.element.classList.remove("e-disabled");
        }
      }
    },
    // Handle toolbar button clicks to perform diagram commands.
    toolbarEditorClick(args) {
      let diagram = this.$refs.diagram.ej2Instances;
      let commandType = (args.item.tooltipText).replace(/[" "]/g, "").toLowerCase();
      switch (commandType) {
        case "undo":
          diagram.undo();
          break;
        case "redo":
          diagram.redo();
          break;
        case "zoomin(ctrl++)":
          diagram.zoomTo({ type: "ZoomIn", zoomFactor: 0.2 });
          this.selectedItem.scrollSettings.currentZoom = ((diagram.scrollSettings.currentZoom) * 100).toFixed() + "%";
          break;
        case "zoomout(ctrl+-)":
          diagram.zoomTo({ type: "ZoomOut", zoomFactor: 0.2 });
          this.selectedItem.scrollSettings.currentZoom = ((diagram.scrollSettings.currentZoom) * 100).toFixed() + "%";
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
          if ((diagram).selectedItems.nodes.length > 0) {
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
          let alignType = commandType.replace("align", "");
          let alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
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
        if ((args.item).cssClass.indexOf("tb-item-selected") === -1) {
          this.removeSelectedToolbarItem();
          args.item.cssClass += " tb-item-selected";
        }
      }
    },
    // Remove the selected item class from toolbar items
    removeSelectedToolbarItem() {
      for (let i = 0; i < (this.toolbarEditor).items.length; i++) {
        let item = (this.toolbarEditor).items[i];
        if (item.cssClass.indexOf("tb-item-selected") !== -1) {
          item.cssClass = item.cssClass.replace(" tb-item-selected", "");
        }
      }
      this.toolbarEditor.dataBind();
      (document.getElementById("btnDrawShape")).classList.remove("tb-item-selected");
      (document.getElementById("btnDrawConnector")).classList.remove("tb-item-selected");
    },
    // Handle menu item clicks to perform file and view operations.
    menuClick(args) {
      let buttonElement = document.getElementsByClassName("e-btn-hover")[0];
      if (buttonElement) {
        buttonElement.classList.remove("e-btn-hover");
      }
      let diagram = this.selectedItem.selectedDiagram;
      let commandType = ((args.item).text.replace(/[" "]/g, ""));
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
            (document.getElementById("diagramName")).innerHTML
          );
          break;
        case "saveas":
          (document.getElementById("saveFileName")).value =
            (document.getElementById("diagramName")).innerHTML;
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
          this.btnPrintClick()
          break;
        case "export":
          this.exportDialog.show();
          break;
        case "showguides":
          diagram.snapSettings.constraints =
            (diagram.snapSettings) ^ SnapConstraints.SnapToObject;
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
          break;
        case "showgrid":
          diagram.snapSettings.constraints =
            (diagram.snapSettings) ^ SnapConstraints.ShowLines;
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
          container = document.getElementsByClassName(
            "db-current-diagram-container"
          )[0];
          if (!args.item.iconCss) {
            container.classList.add("db-hide-grid");
          } else {
            container.classList.remove("db-hide-grid");
          }
          break;
        case "snaptogrid":
          diagram.snapSettings.constraints =
            (diagram.snapSettings).constraints ^ SnapConstraints.SnapToLines;
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
          diagram.rulerSettings.showRulers =
            !diagram.rulerSettings.showRulers;
          if (diagram.rulerSettings.showRulers) {
            diagram.rulerSettings.dynamicGrid = false;
          }
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
          container = document.getElementsByClassName(
            "db-current-diagram-container"
          )[0];
          if (!args.item.iconCss) {
            container.classList.remove("db-show-ruler");
          } else {
            container.classList.add("db-show-ruler");
          }
          break;
        case "zoomin":
          diagram.zoomTo({ type: "ZoomIn", zoomFactor: 0.2 });
          this.selectedItem.scrollSettings.currentZoom =
            ((diagram.scrollSettings.currentZoom) * 100).toFixed() + "%";
          break;
        case "zoomout":
          diagram.zoomTo({ type: "ZoomOut", zoomFactor: 0.2 });
          this.selectedItem.scrollSettings.currentZoom =
            ((diagram.scrollSettings.currentZoom) * 100).toFixed() + "%";
          break;
        case "showtoolbar":
          this.selectedItem.utilityMethods.hideElements(
            "hide-toolbar",
            diagram
          );
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
          break;
        case "showstencil":
          this.selectedItem.utilityMethods.hideElements(
            "hide-palette",
            diagram
          );
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
          break;
        case "showproperties":
          this.selectedItem.utilityMethods.hideElements(
            "hide-properties",
            diagram
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
            diagram
          );
          args.item.iconCss = args.item.iconCss ? "" : "sf-icon-Selection";
          break;
        case 'showshortcuts':
          let node1 = diagram.getObject('textNode');
          node1.visible = !node1.visible;
          diagram.dataBind();
          break;
        default:
          this.executeEditMenu(diagram, commandType);
          break;
      }
      diagram.dataBind();
    },
    // Execute edit menu commands
    executeEditMenu(diagram, commandType) {
      //let key = "";
      switch (commandType.toLowerCase()) {
        case "undo":
          diagram.undo();
          if (this.selectedItem.diagramType === "MindMap" || this.selectedItem.diagramType === "OrgChart") {
            diagram.doLayout();
          }
          break;
        case "redo":
          diagram.redo();
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
          diagram.selectAll();
          break;
        case "edittooltip":
          this.selectedItem.isModified = true;
          if ((diagram.selectedItems.nodes).length > 0) {
            this.tooltipDialog.show();
          }
          break;
      }
    },
    // Cut the selected objects.
    cutObjects() {
      this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
      diagram.cut();
    },
    // Copy the selected objects.
    copyObjects() {
      this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
    },
    // Paste the previously copied or cut objects.
    pasteObjects() {
      let diagram = this.selectedItem.selectedDiagram;
      if (this.selectedItem.pasteData.length > 0) {
        diagram.paste(this.selectedItem.pasteData);
      }
    },
    // Delete selected objects from the diagram.
    delete() {
      this.selectedItem.isModified = true;
      diagram.remove();
    },
    // Select all objects in the diagram.
    selectAll() {
      this.selectedItem.isModified = true;
      ((this.selectedItem).selectedDiagram).selectAll();
    },
    // Toggle the visibility of the layers panel.
    showHideLayers() {
      let btnWindow = document.getElementById("btnWindowMenu");
      let iconCss = btnWindow.ej2_instances[0].items[3].iconCss;
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
    },
    // Toggle the visibility of the themes panel.
    showHideThemes() {
      let btnWindow = document.getElementById("btnWindowMenu");
      let iconCss = btnWindow.ej2_instances[0].items[5].iconCss;
      if (iconCss) {
        this.themeDialog.hide();
      } else {
        this.themeDialog.show();
      }
      btnWindow.ej2_instances[0].items[5].iconCss = iconCss ? "" : "sf-icon-Selection";
    },
    // Update the opacity of the selected node to the specified value.
    updateOpacity(newValue) {
      this.selectedItem.nodeProperties.opacity = newValue;
    },
    // Show the color picker for the specified property.
    showColorPicker(propertyName, toolbarName) {
      let fillElement =
        (document.getElementById(propertyName)).parentElement.getElementsByClassName("e-dropdown-btn")[0];
      fillElement.click();
      let popupElement = document.getElementById(fillElement.id + "-popup");
      let bounds = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
      popupElement.style.left = bounds.left + "px";
      popupElement.style.top = (bounds.top + 40) + "px";
    },
    // Group the selected elements in the diagram.
    group() {
      this.selectedItem.isModified = true;
      ((this.selectedItem).selectedDiagram).group();
    },
    // Ungroup the selected elements in the diagram.
    ungroup() {
      this.selectedItem.isModified = true;
      ((this.selectedItem).selectedDiagram).unGroup();
    },
    // Lock selected objects to prevent their movement or editing.
    lockObject() {
      this.selectedItem.isModified = true;
      let diagram = this.selectedItem.selectedDiagram;
      for (let i = 0; i < (diagram.selectedItems.nodes).length; i++) {
        let node = (diagram.selectedItems).nodes[i];
        if (node.constraints & NodeConstraints.Drag) {
          node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
        } else {
          node.constraints = NodeConstraints.Default;
        }
      }
      for (let i = 0; i < (diagram.selectedItems.connectors).length; i++) {
        let connector = (diagram.selectedItems).connectors[i];
        if (connector.constraints & ConnectorConstraints.Drag) {
          connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
        } else {
          connector.constraints = ConnectorConstraints.Default;
        }
      }
      diagram.dataBind();
    },
    // Distribute the selected objects horizontally or vertically.
    distribute(value) {
      this.selectedItem.isModified = true;
      ((this.selectedItem).selectedDiagram).distribute(value);
    },
    // Handle context menu item clicks for alignment or ordering of elements.
    contextMenuClick(args) {
      let buttonElement = document.getElementsByClassName("e-btn-hover")[0];
      if (buttonElement) {
        buttonElement.classList.remove("e-btn-hover");
      }
      let diagram = this.selectedItem.selectedDiagram;
      let commandType = "";
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
          diagram.align(args.item.text);
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
    },
    // Send selected objects to the back of the z-order.
    sendToBack() {
      this.selectedItem.isModified = true;
      ((this.selectedItem).selectedDiagram).sendToBack();
    },
    // Bring selected objects to the front of the z-order.
    bringToFront() {
      this.selectedItem.isModified = true;
      ((this.selectedItem).selectedDiagram).bringToFront();
    },
    // Handle changes in the collection
    collectionChange(args) {
      if (this.selectedItem.diagramType === "GeneralDiagram") {
        if (args.state === "Changed" && args.type === "Addition" &&
          args.cause === (DiagramAction.Render | DiagramAction.ToolAction)) {
          if (this.selectedItem.themeStyle !== undefined && this.selectedItem.themeStyle !== null) {
            this.diagramThemes.applyThemeStyleforElement(args.element, undefined);
          }
          this.selectedItem.isModified = true;
        }
      } else {
        if (args.state === "Changed" && this.selectedItem.isCopyLayoutElement) {
          if (args.element instanceof Node) {
            if (args.element.addInfo) {
              if ((args.element.addInfo).isFirstNode) {
                this.selectedItem.pastedFirstItem = args.element;
              }
            }
          }
          this.selectedItem.isModified = true;
        }
      }
    },
    // Generate buttons for specific dialogs, showed based on the dialog type.
    getDialogButtons(dialogType) {
      let buttons = [];
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
    },
     // Generate buttons for the file upload dialog.
    getUploadButtons() {
      let buttons = [];
      buttons.push({
        click: this.btnCancelClick.bind(this), buttonModel: { content: "Cancel", cssClass: "e-flat", isPrimary: true }
      });
      buttons.push({
        click: this.btnUploadNext.bind(this), buttonModel: { content: "Next", cssClass: "e-flat e-db-primary", isPrimary: true },
      });
      return buttons;
    },
    // Handle the export button click event to export the diagram.
    btnExportClick() {
      let diagram = this.selectedItem.selectedDiagram;
      diagram.exportDiagram({
        fileName: this.selectedItem.exportSettings.fileName,
        format: this.selectedItem.exportSettings.format,
        region: this.selectedItem.exportSettings.region
      });
      this.exportDialog.hide();
    },
    // Handle the cancel button click event for various dialogs.
    btnCancelClick(args) {
      let ss = (args.target);
      let key = (ss.offsetParent.id);
      switch (key) {
        case "exportDialog":
          this.exportDialog.hide();
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
    },
    // Called when the print button is clicked to configure and execute a print operation for the diagram.
    btnPrintClick() {
      let pageWidth = this.selectedItem.printSettings.pageWidth;
      let pageHeight = this.selectedItem.printSettings.pageHeight;
      let paperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
      if (paperSize.pageHeight && paperSize.pageWidth) {
        pageWidth = paperSize.pageWidth;
        pageHeight = paperSize.pageHeight;
      }
      if (this.selectedItem.pageSettings.isPortrait) {
        if (pageWidth > pageHeight) {
          let temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }
      } else {
        if (pageHeight > pageWidth) {
          let temp = pageHeight;
          pageHeight = pageWidth;
          pageWidth = temp;
        }
      }
      let diagram = this.selectedItem.selectedDiagram;
      diagram.print({
        region: this.selectedItem.printSettings.region, pageHeight: pageHeight, pageWidth: pageWidth,
        multiplePage: !this.selectedItem.printSettings.multiplePage,
        pageOrientation: this.selectedItem.printSettings.isPortrait ? "Portrait" : "Landscape"
      });
    },
    // Advances the file upload dialog to the next stage.
    btnUploadNext(args) {
      const target = args.target;
      const buttonInstance = target.ej2_instances[0];
      const uploadDialogContent = document.getElementById('uploadDialogContent');
      if (OrgChartUtilityMethods.isUploadSuccess) {
        if (uploadDialogContent.className === 'db-upload-content firstPage') {
          if (OrgChartUtilityMethods.fileType === 'xml') {
            (this.fileUploadDialog).header = ' Define Employee Information';
            uploadDialogContent.className = 'db-upload-content thirdPage';
            buttonInstance.content = 'Finish';
          } else {
            (this.fileUploadDialog).header = ' Define Employee - Supervisor Relationship';
            uploadDialogContent.className = 'db-upload-content secondPage';
          }
        } else if (uploadDialogContent.className === 'db-upload-content secondPage') {
          const id = this.selectedItem.orgDataSettings.id;
          const parent = this.selectedItem.orgDataSettings.parent;
          if (id && parent) {
            if (!OrgChartUtilityMethods.validateParentChildRelation()) {
              alert('We haven"t found the parent child relationship between the chosen fields');
            } else {
              (this.fileUploadDialog).header = ' Define Employee Information';
              uploadDialogContent.className = 'db-upload-content thirdPage';
              buttonInstance.content = 'Finish';
            }
          } else {
            alert('EmployeeId and SupervisorId can"t be empty');
          }

        } else {
          const nameField = this.selectedItem.orgDataSettings.nameField;
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
    },
     // Handle hyperlink dialog completion, applying hyperlink to the selected node.
    btnHyperLink() {
      let node = ((this.selectedItem).selectedDiagram).selectedItems.nodes[0];
      if (node.annotations.length > 0) {
        (node.annotations[0].hyperlink).link = (document.getElementById("hyperlink")).value;
        (node.annotations[0].hyperlink).content = (document.getElementById("hyperlinkText")).value;
        this.applyToolTipforHyperlink(node);
        ((this.selectedItem).selectedDiagram).dataBind();
      } else {
        let annotation = {
          hyperlink: {
            content: (document.getElementById("hyperlinkText")).value,
            link: (document.getElementById("hyperlink")).value
          }
        };
        (this.selectedItem.selectedDiagram).addLabels(node, [annotation]);
        this.applyToolTipforHyperlink(node);
        (this.selectedItem.selectedDiagram).dataBind();
      }
      this.hyperlinkDialog.hide();
    },
     // Applies the selected more shapes to the symbol palette.
    btnMoreShapes(args) {
        let listSelectedItem = this.moreShapesList.getSelectedItems();
        if (listSelectedItem.text.length > 0) {
            (this.symbolpalette).palettes = this.palettes.getPalettes(listSelectedItem.text);
            this.moreShapesDialog.hide();
        }
    },
    // Handle toolbar button for inserting links or images into the diagram.
    toolbarInsertClick(args) {

      let diagram = this.selectedItem.selectedDiagram;
      let commandType = ((args.item).tooltipText.replace(/[" "]/g, ""));

      if ((diagram.selectedItems).nodes.length > 0) {
        switch (commandType.toLowerCase()) {
          case "insertlink":
            (document.getElementById("hyperlink")).value = "";
            (document.getElementById("hyperlinkText")).value = "";
            if (diagram.selectedItems.nodes[0].annotations.length > 0) {
              let annotation = diagram.selectedItems.nodes[0].annotations[0];
              if ((annotation.hyperlink).link || annotation.content) {
                ((document.getElementById("hyperlink"))).value = (annotation.hyperlink).link;
                ((document.getElementById("hyperlinkText"))).value = (annotation.hyperlink).content || annotation.content;
              }
            }
            this.hyperlinkDialog.show();
            break;
          case "insertimage":
            CommonKeyboardCommands.openUploadBox(false, ".jpg,.png,.bmp");
            break;
        }
      }
    },
    // Handle toolbar button for inserting links or images into the diagram.
    applyToolTipforHyperlink(node) {
      node.constraints = NodeConstraints.Default & ~NodeConstraints.InheritTooltip | NodeConstraints.Tooltip;
      node.tooltip = {
        content: (node.annotations[0].hyperlink).link, relativeMode: "Object",
        position: "TopCenter", showTipPointer: true,
      };
    },
    // Called when the save button is clicked to save the current diagram state.
    btnSave() {
    CommonKeyboardCommands.download(this.page.savePage(), (document.getElementById("saveFileName")).value);
      this.saveDialog.hide();
  },
  // Load a diagram from a file and apply necessary settings.
  loadDiagram(event) {
        this.page.loadPage(((event.target)).result.toString());
        this.page.loadDiagramSettings();
        this.fileUploadDialog.hide();
    },
    // Handle a successful upload event to process uploaded files.
  onUploadSuccess(args) {
        (document.getElementsByClassName("sb-content-overlay")[0]).style.display = "none";
        if (args.operation !== "remove") {
            let file1 = args.file;
            let file = file1.rawFile;
            OrgChartUtilityMethods.fileType = file1.type.toString();
            let reader = new FileReader();
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
    },
    // Handle upload failures or errors during file processing.
    onUploadFailure(args) {
      console.log("filure")
        (document.getElementsByClassName("sb-content-overlay")[0]).style.display = "none";
    },
    // Handle upload failures or errors during file processing.
    onUploadFileSelected(args) {
        (document.getElementsByClassName("sb-content-overlay")[0]).style.display = "";
    },
    // Apply tooltips to selected items using the tooltip dialog.
    btnTooltip() {
        let diagram = this.selectedItem.selectedDiagram;
        if ((this.selectedItem.selectedDiagram).selectedItems.nodes.length > 0) {
            let node = (this.selectedItem.selectedDiagram).selectedItems.nodes[0];
            this.customProperty.setTooltip(node, (document.getElementById("objectTooltip")).value);
            this.selectedItem.nodeProperties.tooltip = (node.tooltip).content;
            diagram.dataBind();
        }
        this.tooltipDialog.hide();
    },
    // Setup the import button to handle file uploads for org charts.
    btnImportClick(args) {
        if (!this.registerBrowseEvent) {
            (this.defaultupload).dropArea = document.getElementById("dropRegion");
            (document.getElementById("browseFile")).onclick = () => {
                (document.getElementsByClassName("e-file-select-wrap"))[0].querySelector("button").click();
                return false;
            };
            this.registerBrowseEvent = true;
        }
        this.selectedItem.orgDataSettings.extensionType = ".csv";
        CommonKeyboardCommands.isOpen = false;
        this.defaultupload.clearAll();
        let uploadDialogContent = document.getElementById("uploadDialogContent");
        uploadDialogContent.className = "db-upload-content firstPage";
        OrgChartUtilityMethods.showUploadDialog();
    },
    // Display more shapes dialog on click event.
    moreShapesClick(args) {
        this.moreShapesDialog.show();
    },
    // Update the preview image when different shapes are selected.
    listViewSelectionChange(args) {
        (document.getElementById("shapePreviewImage")).src="./assets/dbstyle/shapes_images/" + args.text.toLowerCase() + '.png';
    },
    // Enable or disable segment editing on selected connectors.
    SegmentEditing(args) {
      let diagram = this.selectedItem.selectedDiagram;
      if (diagram.selectedItems.connectors) {
        if (args.checked == true) {
          for (let i = 0; i < diagram.selectedItems.connectors.length; i++) {
            let connector = (diagram.selectedItems).connectors[i];
            connector.constraints = ConnectorConstraints.DragSegmentThumb | ConnectorConstraints.Default;
          }
        }
        else {
          for (let i = 0; i < diagram.selectedItems.connectors.length; i++) {
            let connector = (diagram.selectedItems).connectors[i];
            connector.constraints = ConnectorConstraints.Default & ~(ConnectorConstraints.DragSegmentThumb);
          }
        }
        diagram.dataBind();
      }
    },
    // Handle zoom level change from dropdown or fit to screen action.
    zoomChange(args) {
      let diagram = this.selectedItem.selectedDiagram;
      if (args.item.text === "Custom") {
        let ss = "";
      } else if (args.item.text === "Fit To Screen") {
        this.selectedItem.scrollSettings.currentZoom = "Fit ...";
        diagram.fitToPage({ mode: "Page", region: "Content", margin: { left: 0, top: 0, right: 0, bottom: 0 } });
      } else {
        let currentZoom = diagram.scrollSettings.currentZoom;
        let zoom = {};
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
        ((this.selectedItem).scrollSettings).currentZoom = args.item.text;
        diagram.zoomTo(zoom);
      }
    },
    //Handle method for draw a shape
    drawShapeChange(args) {
      let diagram = this.selectedItem.selectedDiagram;
      if (args.item.text === "Rectangle") {
        diagram.drawingObject = { shape: { type: "Basic", shape: "Rectangle" }, style: { strokeWidth: 1 } };
      } else if (args.item.text === "Ellipse") {
        diagram.drawingObject = { shape: { type: "Basic", shape: "Ellipse" }, style: { strokeWidth: 1 } };
      } else if (args.item.text === "Polygon") {
        diagram.drawingObject = { shape: { type: "Basic", shape: "Polygon" }, style: { strokeWidth: 1 } };
      }
      diagram.tool = DiagramTools.ContinuousDraw;
      this.removeSelectedToolbarItem();
      (document.getElementById("btnDrawShape")).classList.add("tb-item-selected");
    },
    removeSelectedToolbarItem() {
      for (let i = 0; i < (this.toolbarEditor).items.length; i++) {
        let item = (this.toolbarEditor).items[i];
        if (item.cssClass.indexOf("tb-item-selected") !== -1) {
          item.cssClass = item.cssClass.replace(" tb-item-selected", "");
        }
      }
      this.toolbarEditor.dataBind();
      (document.getElementById("btnDrawShape")).classList.remove("tb-item-selected");
      (document.getElementById("btnDrawConnector")).classList.remove("tb-item-selected");
    },
    //Handle method for draw a connector
    drawConnectorChange(args) {
      const diagramInstance = this.selectedItem.selectedDiagram;
      if (!diagramInstance) return;

      if (args.item.text === "Straight Line") {
        diagramInstance.drawingObject = { type: "Straight", style: { strokeWidth: 1 } };
      } else if (args.item.text === "Orthogonal Line") {
        diagramInstance.drawingObject = { type: "Orthogonal", style: { strokeWidth: 1 } };
      } else if (args.item.text === "Bezier") {
        diagramInstance.drawingObject = { type: "Bezier", style: { strokeWidth: 1 } };
      } else if (args.item.text === "Free Hand") {
        diagramInstance.drawingObject = { type: "Freehand", style: { strokeWidth: 1 } };
      }
      
      diagramInstance.tool = DiagramTools.ContinuousDraw;
      diagramInstance.clearSelection();
      this.removeSelectedToolbarItem();
      
      (document.getElementById("btnDrawConnector")).classList.add("tb-item-selected");
    },
    //Handle method for change a order command
    orderCommandsChange(args) {
      const diagramInstance = this.selectedItem.selectedDiagram;
      if (args.item.text === "Send To Back") {
        this.sendToBack();
      } else if (args.item.text === "Bring To Front") {
        this.bringToFront();
      } else if (args.item.text === "Bring Forward") {
        selectedItem.isModified = true;
        diagramInstance.moveForward();
      } else if (args.item.text === "Send Backward") {
        selectedItem.isModified = true;
        diagramInstance.sendBackward();
      }
    },
    //close theme dialog
    closeThemeDialog(args) {
      let btnWindow = document.getElementById("btnWindowMenu");
      btnWindow.ej2_instances[0].items[5].iconCss = "";
    },
    //Create theme dialog
    themeDialogCreated(args) {
        let themeDialogContent = document.getElementById("themeDialogContent");
        themeDialogContent.onmouseover = this.diagramThemes.themeMouseOver.bind(this.diagramThemes);
        themeDialogContent.onclick = this.diagramThemes.themeClick.bind(this.diagramThemes);
        themeDialogContent.onmouseleave = this.diagramThemes.applyOldStyle.bind(this.diagramThemes);
    },
    //Handle method for hide menu bar
    hideMenuBar() {
        let expandcollapseicon = document.getElementById("btnHideToolbar");
        let button1 = expandcollapseicon.ej2_instances[0];
        if (button1.iconCss.indexOf("sf-icon-Collapse tb-icons") > -1) {
            button1.iconCss = "sf-icon-DownArrow2 tb-icons";
        } else {
            button1.iconCss = "sf-icon-Collapse tb-icons";
        }
        this.selectedItem.utilityMethods.hideElements("hide-menubar", this.selectedItem.selectedDiagram);
        ((this.selectedItem).selectedDiagram).refresh();
    }

  },
  provide: {
    diagram: [Diagram, UndoRedo, BpmnDiagrams, PrintAndExport, DiagramContextMenu, HierarchicalTree, ComplexHierarchicalTree, ConnectorBridging, ConnectorEditing, MindMap, MindMapTree, Snapping, DataBinding, LayoutAnimation],
    SymbolPalette: [BpmnDiagrams]
  }


});
</script>
