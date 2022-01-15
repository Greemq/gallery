(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/Try1.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Agora/Try1.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! agora-rtc-sdk */ "./node_modules/agora-rtc-sdk/AgoraRTCSDK.min.js");
/* harmony import */ var agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Try1",
  data: function data() {
    return {
      client: null,
      // agoraAppId: 'b0e7072ea1f8479fb58b857449c7f702',
      agoraAppId: 'ff487d0a29264aa78133c3ea7eccd374',
      channelName: null,
      uid: null,
      role: 101,
      stream: null,
      video: false
    };
  },
  watch: {
    'video': function video() {
      if (this.video) this.stream.disableAudio();else this.stream.enableAudio();
    }
  },
  mounted: function mounted() {
    navigator.permissions.query({
      name: 'camera'
    }).then(function (permissionStatus) {
      console.log(permissionStatus); // in my browser on this page it logs:
      //{
      //   status: "prompt",
      //   onchange: null,
      // }
    });
    this.createClient();
  },
  methods: {
    videoControl: function videoControl() {
      this.video = !this.video;
    },
    createClient: function createClient() {
      var _this = this;

      this.uid = Math.round(Math.random(1000) * 10000000);
      this.client = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createClient({
        mode: 'rtc',
        codec: 'vp8'
      });
      this.client.init(this.agoraAppId, function () {
        console.log('client initialized');

        _this.addListeners();
      }, function (err) {
        return _this.handleFail(err);
      });
    },
    addListeners: function addListeners() {
      var _this2 = this;

      this.client.on('stream-subscribed', function (evt) {
        this.stream = evt.stream;
        var streamId = String(this.stream.getId());
        console.log('my error ' + e);
        var streamDiv = document.createElement("div");
        streamDiv.id = streamId;
        streamDiv.style = "transform:rotateY(180deg)";
        var remoteContainer = document.getElementById('remoteContainer');
        remoteContainer.appendChild(streamDiv);
        this.stream.play(streamId);
      });
      this.client.on('stream-added', function (evt) {
        _this2.client.subscribe(evt.stream, function (err) {
          return _this2.handleFail(err);
        });
      });
    },
    createChannel: function createChannel() {
      var _this3 = this;

      this.client.join(this.agoraAppId, this.channelName, null, function (uid) {
        var localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          audio: true,
          video: true
        });
        _this3.stream = localStream;
        localStream.init(function () {
          localStream.play("me");
          var me = document.getElementById('me');
          client.publish(localStream, function (err) {
            return _this3.handleFail(err);
          });
        }, function (err) {
          return _this3.handleFail(err);
        });
      }, function (err) {
        return _this3.handleFail(err);
      });
    },
    joinChannel: function joinChannel() {
      var _this4 = this;

      this.client.join(this.agoraAppId, this.channelName, null, function (uid) {
        var localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          audio: true,
          video: true
        });
        _this4.stream = localStream;
        localStream.init(function () {
          localStream.play("me");

          _this4.client.publish(localStream, function (err) {
            return _this4.handleFail(err);
          });
        }, function (err) {
          return _this4.handleFail(err);
        });
      }, function (err) {
        return _this4.handleFail(err);
      });
      this.addListeners();
    },
    handleFail: function handleFail(err) {
      console.log("Error : ", err);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Agora/Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("p", [
      _vm._v("App id : "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.agoraAppId,
            expression: "agoraAppId"
          }
        ],
        attrs: { id: "app-id", type: "text", value: "" },
        domProps: { value: _vm.agoraAppId },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.agoraAppId = $event.target.value
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.channelName,
          expression: "channelName"
        }
      ],
      attrs: { placeholder: "channelName", type: "text" },
      domProps: { value: _vm.channelName },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.channelName = $event.target.value
        }
      }
    }),
    _vm._v(" "),
    _c("h2", [_vm._v(_vm._s(_vm.uid))]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", [
        _c(
          "button",
          {
            attrs: { id: "host-join", type: "button" },
            on: { click: _vm.createChannel }
          },
          [_vm._v("Join as host")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            attrs: { id: "audience-join", type: "button" },
            on: { click: _vm.joinChannel }
          },
          [_vm._v("Join as audience")]
        ),
        _vm._v(" "),
        _c("button", { attrs: { id: "leave", type: "button" } }, [
          _vm._v("Leave")
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", [
      _c("h4", [_vm._v("My Feed :")]),
      _vm._v(" "),
      _c("div", {
        staticStyle: { width: "200px", height: "200px" },
        attrs: { id: "me" }
      }),
      _vm._v(" "),
      _c("div", {
        staticStyle: {
          width: "400px",
          height: "400px",
          "background-color": "seagreen"
        },
        attrs: { id: "remoteContainer" }
      }),
      _vm._v(" "),
      _c("button", { on: { click: _vm.videoControl } }, [
        _vm._v("video controls")
      ])
    ]),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _c("br")
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Pages/Agora/Try1.vue":
/*!*******************************************!*\
  !*** ./resources/js/Pages/Agora/Try1.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Try1_vue_vue_type_template_id_bcb6d6d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true& */ "./resources/js/Pages/Agora/Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true&");
/* harmony import */ var _Try1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Try1.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Agora/Try1.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Try1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Try1_vue_vue_type_template_id_bcb6d6d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Try1_vue_vue_type_template_id_bcb6d6d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "bcb6d6d4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Agora/Try1.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Agora/Try1.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Agora/Try1.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Try1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Try1.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/Try1.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Try1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Agora/Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Pages/Agora/Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Try1_vue_vue_type_template_id_bcb6d6d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/Try1.vue?vue&type=template&id=bcb6d6d4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Try1_vue_vue_type_template_id_bcb6d6d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Try1_vue_vue_type_template_id_bcb6d6d4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);