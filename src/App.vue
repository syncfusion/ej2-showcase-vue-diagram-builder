<template>
  <div class="diagrambuilder-container">
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
            :v-on:click="this.renameDiagram"
            >Untitled Diagram
          </span>
          <input
            id="diagramEditable"
            type="text"
            class="db-diagram-name"
            :v-on:keydown="diagramNameKeyDown"
            :v-on:focusout="diagramNameChange"
          />
          <span id="diagramreport" class="db-diagram-name db-save-text"></span>
        </div>
        <div class="db-menu-container">
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnFileMenu"
              cssClass="db-dropdown-menu"
              :items="this.fileMenuItems"
              @click="menuClick($event)"
              >File
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnEditMenu"
              cssClass="db-dropdown-menu"
              :items="this.editMenuItems"
              @click="menuClick($event)"
              >Edit
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnViewMenu"
              cssClass="db-dropdown-menu"
              :items="this.viewMenuItems"
              @click="menuClick($event)"
              >View
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnArrangeMenu"
              cssClass="db-dropdown-menu"
              :items="this.arrangeMenuItems"
              @click="menuClick($event)"
              >Arrange
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnWindowMenu"
              cssClass="db-dropdown-menu"
              :items="this.windowMenuItems"
              @click="menuClick($event)"
              >Window
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style" style="display: none">
            <ejs-dropdownbutton
              id="btnHelpMenu"
              cssClass="db-dropdown-menu"
              :items="this.HelpMenuItems"
              @click="menuClick($event)"
              >Help
            </ejs-dropdownbutton>
          </div>
        </div>
        <div class="db-toolbar-editor">
          <div class="db-toolbar-container">
            <ejs-toolbar id="toolbarEditor">
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
                <e-item cssClass="tb-item-end tb-zoom-dropdown-btn">
                  <ng-template>
                    <ejs-dropdownbutton id="btnZoomIncrement">
                    </ejs-dropdownbutton>
                  </ng-template>
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
                  ><ng-template>
                    <ejs-dropdownbutton id="btnDrawShape"></ejs-dropdownbutton>
                  </ng-template>
                </e-item>
                <e-item
                  tooltipText="Draw Connectors"
                  cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable"
                  ><ng-template>
                    <ejs-dropdownbutton id="btnDrawConnector">
                    </ejs-dropdownbutton>
                  </ng-template>
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
                  ><ng-template>
                    <ejs-dropdownbutton iconCss="sf-icon-Order">
                    </ejs-dropdownbutton>
                  </ng-template>
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
    </div>
    <div class="row content">
      <div class="sidebar show-overview">
        <div class="db-palette-parent">
          <ejs-symbolpalette
            id="symbolpalette"
            width="100%"
            height="100%"
            :symbolHeight="50"
            :symbolWidth="50"
          ></ejs-symbolpalette>
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
              :width="width"
              :height="height"
              :snapSettings="snapSettings"
              :pageSettings="pageSettings"
              :scrollSettings="scrollSettings"
              :selectedItems="selectedItems"
              :getNodeDefaults="setNodeDefaults"
              :getConnectorDefaults="setConnectorDefaults"
              :commandManager="commandManager"
              backgroundColor="transparent"
              :contextMenuSettings="contextMenuSettings"
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
              <div class="row db-prop-row">
                <ejs-dropdownlist id="pageSettingsList"></ejs-dropdownlist>
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
                  ></ejs-radiobutton>
                </div>
                <div class="col-xs-3 db-prop-col-style">
                  <ejs-radiobutton
                    id="pageLandscape"
                    label="Landscape"
                    name="pageSettings"
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
                        width="100%"
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
                <ejs-checkbox id="showPageBreaks" label="Page Breaks">
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
                          min="1"
                          format="n0"
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
                      ></ejs-checkbox>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <ejs-dropdownlist popupWidth="200px"></ejs-dropdownlist>
                    </div>
                    <div class="col-xs-4 db-col-right">
                      <div class="db-color-container">
                        <div class="db-color-input">
                          <ejs-colorpicker
                            id="nodeGradientColor"
                            type="color"
                            mode="Palette"
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
                          ></ejs-colorpicker>
                        </div>
                        <div class="db-color-btn">
                          <ejs-button iconCss="sf-icon-Pickers tb-icons">
                          </ejs-button>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 db-col-center">
                      <ejs-dropdownlist id="nodeBorderStyle" popupWidth="160px">
                        <ng-template>
                          <div class="db-ddl-template-style">
                            <span></span>
                          </div>
                        </ng-template>
                        <ng-template>
                          <div class="db-ddl-template-style">
                            <span></span>
                          </div>
                        </ng-template>
                      </ejs-dropdownlist>
                    </div>
                    <div class="col-xs-4 db-col-right">
                      <ejs-numerictextbox
                        id="nodeStrokeWidth"
                        min="0"
                        step="0.5"
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
                      ></ejs-slider>
                    </div>
                    <div class="col-xs-2 db-col-right">
                      <input
                        type="text"
                        readOnly="true"
                        class="db-readonly-input"
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
                  <ejs-dropdownlist></ejs-dropdownlist>
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
                <div class="col-xs-4 db-col-right db-prop-text-style">
                  <span class="db-prop-text-style">Thickness</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist id="lineStyle">
                    <ng-template>
                      <div class="db-ddl-template-style">
                        <span></span>
                      </div>
                    </ng-template>
                    <ng-template>
                      <div class="db-ddl-template-style">
                        <span></span>
                      </div>
                    </ng-template>
                  </ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox min="0.5" step="0.5"></ejs-numerictextbox>
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
                  <ejs-dropdownlist></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox min="1" step="1"></ejs-numerictextbox>
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
                  <ejs-dropdownlist></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox min="1" step="1"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left" style="margin-top: 5px">
                  <ejs-checkbox id="lineJump" label="Bridging"></ejs-checkbox>
                </div>
                <div
                  class="col-xs-4 db-col-right"
                  id="lineJumpSizeDiv"
                  style="display: none"
                >
                  <ejs-numerictextbox min="1" step="1"></ejs-numerictextbox>
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
                    id="default"
                    min="0"
                    max="100"
                    step="10"
                    type="MinRange"
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    type="text"
                    readonly="true"
                    class="db-readonly-input"
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
                  <ejs-dropdownlist height="34px"></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox min="1" step="1"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left" id="textPositionDiv">
                  <ejs-dropdownlist></ejs-dropdownlist>
                </div>
                <div class="col-xs-6 db-col-right" id="textColorDiv">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        id="textColor"
                        mode="Palette"
                        type="color"
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
                <div class="col-xs-6 db-col-left">
                  <ejs-toolbar id="toolbarTextStyle" overflowMode="Scrollable">
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
                <div class="col-xs-6 db-col-right">
                  <ejs-toolbar
                    id="toolbarTextSubAlignment"
                    overflowMode="Scrollable"
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
              <div class="row db-prop-row" id="toolbarTextAlignmentDiv">
                <ejs-toolbar
                  id="toolbarTextAlignment"
                  overflowMode="Scrollable"
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
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    id="textOpacityText"
                    type="text"
                    class="db-readonly-input"
                    readOnly="true"
                  />
                </div>
              </div>
            </div>
            <div id="mindMapContainer" class="db-mindmap-prop-container">
              <div class="row db-prop-header-text">MindMap Pattern</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern1"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern2"></div>
                </div>
              </div>
              <div class="row db-prop-row" style="margin-top: 5px">
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern3"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div class="mindmap-pattern-style mindmap-pattern4"></div>
                </div>
              </div>
              <div class="db-prop-separator"></div>
              <div class="row db-prop-header-text">MindMap Levels Styles</div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <ejs-dropdownlist id="mindMapLevels"></ejs-dropdownlist>
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
                      ></ejs-colorpicker>
                    </div>
                    <div class="db-color-btn">
                      <ejs-button iconCss="sf-icon-Pickers tb-icons">
                      </ejs-button>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 db-col-center">
                  <ejs-dropdownlist popupWidth="160px">
                    <ng-template>
                      <div class="db-ddl-template-style">
                        <span></span>
                      </div>
                    </ng-template>
                    <ng-template>
                      <div class="db-ddl-template-style">
                        <span></span>
                      </div>
                    </ng-template>
                  </ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox min="0.5" step="0.5"></ejs-numerictextbox>
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
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    type="text"
                    readOnly="true"
                    class="db-readonly-input"
                  />
                </div>
              </div>
              <div style="margin-top: 10px; margin-bottom: 15px"></div>
              <div class="row db-prop-header-text">Text Style</div>
              <div class="row db-prop-row">
                <div class="col-xs-8 db-col-left">
                  <ejs-dropdownlist height="34px"></ejs-dropdownlist>
                </div>
                <div class="col-xs-4 db-col-right">
                  <ejs-numerictextbox min="1" step="1"></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left">
                  <ejs-toolbar overflowMode="Scrollable">
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
                  <ejs-slider min="0" max="100" step="10" type="MinRange">
                  </ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right">
                  <input
                    type="text"
                    class="db-readonly-input"
                    readOnly="true"
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
                    min="25"
                    step="1"
                    format="n0"
                    value="50"
                  ></ejs-numerictextbox>
                </div>
                <div class="col-xs-6 db-col-right">
                  <ejs-numerictextbox
                    id="orgVerticalSpacing"
                    min="25"
                    step="1"
                    format="n0"
                    value="50"
                  ></ejs-numerictextbox>
                </div>
              </div>
              <div class="row db-prop-row">
                <ejs-toolbar id="orgChartAlignment" overflowMode="Scrollable">
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
                    class="org-pattern-style org-pattern-1 vertical-alternate"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern1.svg');
                    "
                  ></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div
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
                    class="org-pattern-style org-pattern-3 vertical-right"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern3.svg');
                    "
                  ></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div
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
                    class="org-pattern-style org-pattern-5 horizontal-right"
                    style="
                      background-image: url('./assets/dbstyle/orgchart_images/org-pattern5.svg');
                    "
                  ></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div
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
                  <div id="orgPattern1" class="org-pattern-style"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern2" class="org-pattern-style"></div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern3" class="org-pattern-style"></div>
                </div>
                <div class="col-xs-6 org-pattern-parent">
                  <div id="orgPattern4" class="org-pattern-style"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ejs-dialog
      id="exportDialog"
      width="400px"
      header="Export Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :buttons="exportingButtons"
      :visible="dialogVisibility"
      showCloseIcon="true"
    >
      <ng-template>
        <div id="exportDialogContent">
          <div class="row">
            <div class="row">File Name</div>
            <div class="row db-dialog-child-prop-row">
              <input type="text" id="exportfileName" />
            </div>
          </div>
          <div class="row db-dialog-prop-row">
            <div class="col-xs-6 db-col-left">
              <div class="row">Format</div>
              <div class="row db-dialog-child-prop-row">
                <ejs-dropdownlist id="exportFormat"></ejs-dropdownlist>
              </div>
            </div>
            <div class="col-xs-6 db-col-right">
              <div class="row">Region</div>
              <div class="row db-dialog-child-prop-row">
                <ejs-dropdownlist id="exportRegion"></ejs-dropdownlist>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
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
} from "@syncfusion/ej2-vue-popups";
import {
  AnimationSettingsModel,
  TooltipComponent,
} from "@syncfusion/ej2-vue-popups";
import {
  FieldSettingsModel,
  DropDownListComponent,
} from "@syncfusion/ej2-vue-dropdowns";
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
import { DialogPlugin } from "@syncfusion/ej2-vue-popups";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import {
  RadioButtonPlugin,
  CheckBoxPlugin,
  ButtonPlugin,
} from "@syncfusion/ej2-vue-buttons";
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

Vue.use(DiagramPlugin);
Vue.use(DropDownButtonPlugin);
Vue.use(ToolbarPlugin);
Vue.use(DiagramPlugin);
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
@Component({
  provide: {
    diagram: [Diagram, UndoRedo],
  },
})
export default class User extends Vue {
  public diagram: DiagramComponent;
  public symbolpalette: SymbolPaletteComponent;
  public printDialog: DialogComponent;
  public exportDialog: DialogComponent;
  public fileUploadDialog: DialogComponent;
  public openTemplateDialog: DialogComponent;
  public saveDialog: DialogComponent;
  public customPropertyDialog: DialogComponent;
  public layerDialog: DialogComponent;
  public tooltipDialog: DialogComponent;
  public hyperlinkDialog: DialogComponent;
  public themeDialog: DialogComponent;
  public deleteConfirmationDialog: DialogComponent;
  public btnHelpMenu: DropDownButtonComponent;
  public toolbarEditor: ToolbarComponent;
  public btnDrawShape: DropDownButtonComponent;
  public btnDrawConnector: DropDownButtonComponent;
  public defaultupload: UploaderComponent;
  public nodeBorder: DropDownListComponent;
  public fontFamily: DropDownListComponent;
  public gradientDirection: DropDownListComponent;
  public lineStyle: DropDownListComponent;
  public sourceType: DropDownListComponent;
  public targetType: DropDownListComponent;
  public mindMapLevel: DropDownListComponent;
  public mindmapStrokeStyle: DropDownListComponent;
  public ttextStyle: ToolbarComponent;
  public tooltip: TooltipComponent;
  public btnDownloadFile: ButtonComponent;
  public ddlTextPosition: DropDownListComponent;
  public moreShapesList: ListViewComponent;
  public animationSettings: MenuAnimationSettingsModel = { effect: "None" };
  public dropdownListFields: FieldSettingsModel = {
    text: "text",
    value: "value",
  };
  public moreShapesDialog: DialogComponent;
  public dlgTarget: HTMLElement = document.body;
  public dialogAnimationSettings: AnimationSettingsModel = { effect: "None" };
  public dialogPosition: PositionDataModel = { X: 100, Y: 112 };
  public dialogVisibility = false;
  public isModalDialog = false;
  public themesdialogPosition: PositionDataModel = { X: "right", Y: 112 };
  public listViewFields: FieldsMapping = { isChecked: "checked" };
  public tooltipPosition: Position = "RightCenter";
  public dropDownDataSources: DropDownDataSources = new DropDownDataSources();
  public fileMenuItems: ItemModel[] = this.getFileMenuItems();
  public width = "1000px";
  public height = "1000px";
  public snapSettings: SnapSettingsModel = {
    horizontalGridlines: {
      lineIntervals: [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
        9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
      ],
      lineColor: "#EEEEEE",
    },
    verticalGridlines: {
      lineIntervals: [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
        9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
      ],
      lineColor: "#EEEEEE",
    },
    constraints: SnapConstraints.All & ~SnapConstraints.SnapToLines,
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
    constraints: SelectorConstraints.All & ~SelectorConstraints.ToolTip,
  };
  public getFileMenuItems(): ItemModel[] {
    const menuItems: ItemModel[] = [
      { text: "New" },
      { text: "Open" },
      { separator: true },
      { text: "Save", iconCss: "sf-icon-Save" },
      { text: "Save As" },
      { text: "Export", iconCss: "sf-icon-Export" },
      { separator: true },
      { text: "Print", iconCss: "sf-icon-Print" },
    ];
    return menuItems;
  }
  public renameDiagram(args: MouseEvent): void {
    document
      .getElementsByClassName("db-diagram-name-container")[0]
      .classList.add("db-edit-name");
    let element: HTMLInputElement = document.getElementById(
      "diagramEditable"
    ) as HTMLInputElement;
    element.value = document.getElementById("diagramName").innerHTML;
    element.focus();
    element.select();
  }
  public diagramNameKeyDown(args: KeyboardEvent): void {
    if (args.which === 13) {
      document.getElementById("diagramName").innerHTML = (
        document.getElementById("diagramEditable") as HTMLInputElement
      ).value;
      document
        .getElementsByClassName("db-diagram-name-container")[0]
        .classList.remove("db-edit-name");
    }
  }
  public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    this.updateMenuStyle(args);
    if (
      args.event &&
      closest(args.event.target as Element, ".e-dropdown-btn") !== null
    ) {
      args.cancel = true;
    }
  }
  private updateMenuStyle(args: BeforeOpenCloseMenuEventArgs): void {
    for (let i = 0; i < args.element.children.length; i++) {
      (args.element.children[i] as HTMLElement).style.display = "block";
    }
  }
  public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    if (
      args.event &&
      closest(args.event.target as Element, ".e-dropdown-btn") !== null
    ) {
      args.cancel = true;
    }
    if (!args.element) {
      args.cancel = true;
    }
  }
  public showHideThemes(): void {
    let btnWindow: any = document.getElementById("btnWindowMenu");
    let iconCss: string = btnWindow.ej2_instances[0].items[5].iconCss;
    if (iconCss) {
      this.themeDialog.hide();
    } else {
      this.themeDialog.show();
    }
    btnWindow.ej2_instances[0].items[5].iconCss = iconCss
      ? ""
      : "sf-icon-Selection";
  }
}
</script>

<style lang="scss">
@import "./../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
@import "./../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
@import "./assets/index.css";
@import "./assets/dbstyle/diagrambuilder.css";
@import "./assets/db-icons1/style.css";
@import "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
