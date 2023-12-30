(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[33],{

/***/ 2173:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".sa-stage-button-middle > [class*=\"stage-header_stage-button_\"] {\r\n  border-radius: 0;\r\n}\r\n\r\n[dir=\"ltr\"] .sa-stage-button-middle > [class*=\"stage-header_stage-button_\"] {\r\n  border-left: none;\r\n}\r\n\r\n[dir=\"rtl\"] .sa-stage-button-middle > [class*=\"stage-header_stage-button_\"] {\r\n  border-right: none;\r\n}\r\n\r\n.sa-stage-hidden [class*=\"blocks_blocks_\"] .injectionDiv,\r\n.sa-stage-hidden [class*=\"asset-panel_wrapper_\"],\r\n.sa-stage-hidden [class*=\"backpack_backpack-header_\"] {\r\n  border-radius: 0;\r\n}\r\n\r\n/* [class*=\"gui_flex-wrapper_\"] is for specificity over hide-flyout */\r\n.sa-stage-hidden [class*=\"gui_flex-wrapper_\"] [class*=\"gui_stage-and-target-wrapper_\"],\r\n.sa-stage-hidden [class*=\"stage-wrapper_stage-wrapper_\"]:not([class*=\"stage-wrapper_full-screen_\"]),\r\n.sa-stage-hidden [class*=\"gui_target-wrapper_\"] {\r\n  padding: 0;\r\n}\r\n\r\n.sa-stage-hidden\r\n  [class*=\"stage-wrapper_stage-wrapper_\"]:not([class*=\"stage-wrapper_full-screen_\"])\r\n  [class*=\"controls_controls-container_\"],\r\n.sa-stage-hidden [class*=\"gui_target-wrapper_\"] {\r\n  display: none;\r\n}\r\n.sa-stage-hidden\r\n  [class*=\"stage-wrapper_stage-wrapper_\"]:not([class*=\"stage-wrapper_full-screen_\"])\r\n  [class*=\"stage-wrapper_stage-canvas-wrapper_\"] {\r\n  /* can't use display: none because that causes the canvas's clientWidth/Height to become 0 which causes crashes */\r\n  visibility: hidden;\r\n  position: absolute;\r\n  z-index: -9999;\r\n  /* move the stage to avoid a horizontal scroll bar */\r\n  right: 0;\r\n  /* and move it up so that the mouse can't hover over the stage while its hidden */\r\n  bottom: 100%;\r\n}\r\n[dir=\"rtl\"]\r\n  .sa-stage-hidden\r\n  [class*=\"stage-wrapper_stage-wrapper_\"]:not([class*=\"stage-wrapper_full-screen_\"])\r\n  [class*=\"stage-wrapper_stage-canvas-wrapper_\"] {\r\n  right: initial;\r\n  left: 0;\r\n}\r\n\r\n.sa-stage-hidden [class*=\"stage-header_stage-size-row\"] {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0.5rem;\r\n  height: 2.75rem;\r\n  align-items: center;\r\n}\r\n\r\n[dir=\"rtl\"] .sa-stage-hidden [class*=\"stage-header_stage-size-row\"] {\r\n  right: auto;\r\n  left: 0.5rem;\r\n}\r\n\r\n.sa-stage-hidden\r\n  /* specificity --> */ [class*=\"stage-header_stage-size-row_\"] /* <-- specificity */\r\n  [class*=\"stage-header_stage-button_\"]:not(.sa-hide-stage-button)\r\n  [class*=\"stage-header_stage-button-icon_\"] {\r\n  /* makes small and large stage buttons appear unselected */\r\n  filter: var(--editorDarkMode-accent-desaturateFilter, saturate(0));\r\n}\r\n/* from stage-header.css */\r\n[theme=\"dark\"]\r\n  .sa-stage-hidden\r\n  /* specificity --> */ [class*=\"stage-header_stage-size-row_\"] /* <-- specificity */\r\n  [class*=\"stage-header_stage-button_\"]:not(.sa-hide-stage-button)\r\n  [class*=\"stage-header_stage-button-icon_\"] {\r\n  filter: brightness(0) invert(1);\r\n}\r\n\r\n.sa-stage-hidden-outer .scratchEyedropper {\r\n  display: none;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 2195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "resources", function() { return /* binding */ resources; });

// CONCATENATED MODULE: ./src/addons/addons/hide-stage/userscript.js
/* harmony default export */ var userscript = (async function (_ref) {
  let {
    addon,
    console,
    msg
  } = _ref;
  let stageHidden = false;
  let bodyWrapper;
  let smallStageButton;
  let largeStageButton;
  let hideStageButton;
  function hideStage() {
    stageHidden = true;
    if (!bodyWrapper) return;
    document.body.classList.add("sa-stage-hidden-outer");
    // Inner class is applied to body wrapper so that it won't affect the project page.
    bodyWrapper.classList.add("sa-stage-hidden");
    hideStageButton.classList.remove(addon.tab.scratchClass("stage-header_stage-button-toggled-off"));
    window.dispatchEvent(new Event("resize")); // resizes the code area and paint editor canvas
  }

  function unhideStage(e) {
    stageHidden = false;
    if (!bodyWrapper) return;
    document.body.classList.remove("sa-stage-hidden-outer");
    bodyWrapper.classList.remove("sa-stage-hidden");
    hideStageButton.classList.add(addon.tab.scratchClass("stage-header_stage-button-toggled-off"));
    window.dispatchEvent(new Event("resize")); // resizes the code area and paint editor canvas
  }

  addon.self.addEventListener("disabled", () => unhideStage());
  while (true) {
    const stageControls = await addon.tab.waitForElement("[class*='stage-header_stage-size-toggle-group_']", {
      markAsSeen: true,
      reduxCondition: state => !state.scratchGui.mode.isPlayerOnly
    });
    bodyWrapper = document.querySelector("[class*='gui_body-wrapper_']");
    smallStageButton = stageControls.firstChild;
    smallStageButton.classList.add("sa-stage-button-middle");
    largeStageButton = stageControls.lastChild;
    hideStageButton = Object.assign(document.createElement("div"), {
      role: "button",
      className: addon.tab.scratchClass("button_outlined-button", "stage-header_stage-button", "stage-header_stage-button-first", {
        others: "sa-hide-stage-button"
      })
    });
    addon.tab.displayNoneWhileDisabled(hideStageButton);
    stageControls.insertBefore(hideStageButton, smallStageButton);
    hideStageButton.appendChild(Object.assign(document.createElement("img"), {
      className: addon.tab.scratchClass("stage-header_stage-button-icon"),
      src: addon.self.getResource("/icon.svg") /* rewritten by pull.js */,
      alt: msg("hide-stage"),
      draggable: false
    }));
    if (stageHidden) hideStage();else unhideStage();
    hideStageButton.addEventListener("click", hideStage);
    smallStageButton.addEventListener("click", unhideStage);
    largeStageButton.addEventListener("click", unhideStage);
  }
});
// EXTERNAL MODULE: ./node_modules/css-loader!./src/addons/addons/hide-stage/style.css
var style = __webpack_require__(2173);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-stage/icon.svg
/* harmony default export */ var icon = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjRkY0QzRDIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQgNGExIDEgMCAwIDAtMSAxdjEwYTEgMSAwIDAgMCAxIDFoMTJhMSAxIDAgMCAwIDEtMVY1LjVoLTRWNFoiLz48cGF0aCBkPSJNMTMgNGgzYTEgMSAwIDAgMSAxIDF2LjVoLTR6IiBmaWxsPSIjRkY0QzRDIi8+PC9nPjwvc3ZnPg0K");
// CONCATENATED MODULE: ./src/addons/addons/hide-stage/_runtime_entry.js
/* generated by pull.js */



const resources = {
  "userscript.js": userscript,
  "style.css": style_default.a,
  "icon.svg": icon
};

/***/ })

}]);