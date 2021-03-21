(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Home_js"],{

/***/ "./resources/js/Components/bubble.js":
/*!*******************************************!*\
  !*** ./resources/js/Components/bubble.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var Bubble = function Bubble(props) {
  console.log(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "".concat(props.position, " ").concat(props.color, " inline-block h-auto min-w-1/6 mx-4 my-2 p-2 rounded-lg")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "font-sans text-lg text-white font-semibold"
  }, props.text));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bubble);

/***/ }),

/***/ "./resources/js/Pages/Home.js":
/*!************************************!*\
  !*** ./resources/js/Pages/Home.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var _Components_bubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/bubble */ "./resources/js/Components/bubble.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var Home = function Home() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    color: '',
    position: '',
    text: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      subject = _useState2[0],
      setSubject = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      thisText = _useState4[0],
      setThisText = _useState4[1];

  function handleChange(e) {
    setThisText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubject({
      color: 'bg-blue-500',
      position: 'ml-auto',
      text: thisText
    });
  }

  function clearField() {
    setThisText('');
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    clearField();
  }, [subject]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx-auto w-1/2 mt-20 mb-16"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "shadow-inner h-64 px-2 mb-2 bg-gray-200 rounded-md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-row"
  }, subject.text ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_bubble__WEBPACK_IMPORTED_MODULE_2__.default, {
    color: subject.color,
    position: subject.position,
    text: subject.text
  }) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {
    className: "flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 outline-none resize-none",
    rows: "1",
    placeholder: "Place your message here...",
    value: thisText,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    className: "bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow-inner outline-none focus:outline-none mr-1 mb-1"
  }, "Send"))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ })

}]);