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
      localStream: null
    };
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
    audioControl: function audioControl() {
      if (this.localStream._isAudioMuted()) this.localStream.muteAudio();else this.localStream.unmuteAudio();
    },
    listeners: function listeners() {
      var _this = this;

      this.client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        var streamId = String(stream.getId());
        var streamDiv = document.createElement("div");
        streamDiv.id = streamId;
        streamDiv.style = "transform:rotateY(180deg);height:100%";
        var remoteContainer = document.getElementById('remoteContainer');
        remoteContainer.appendChild(streamDiv);
        stream.play(streamId);
      });
      this.client.on('stream-added', function (evt) {
        _this.client.subscribe(evt.stream, function (err) {
          return _this.handleFail(err);
        });
      });
    },
    createClient: function createClient() {
      var _this2 = this;

      this.uid = Math.round(Math.random(1000) * 10000000);
      this.client = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createClient({
        mode: 'rtc',
        codec: 'vp8'
      });
      this.client.init(this.agoraAppId, function () {
        return console.log('client initialized');
      }, function (err) {
        return _this2.handleFail(err);
      });
    },
    createChannel: function createChannel() {
      var _this3 = this;

      this.joinChannel();
      this.client.join(this.agoraAppId, this.channelName, null, function (uid) {
        _this3.localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          audio: true,
          video: true
        });

        _this3.localStream.init(function () {
          _this3.localStream.play("me");

          _this3.client.publish(_this3.localStream, function (err) {
            return _this3.handleFail(err);
          });
        }, function (err) {
          return _this3.handleFail(err);
        });
      }, function (err) {
        return _this3.handleFail(err);
      });
      this.listeners(); // this.client.on('stream-subscribed', function (evt) {
      //     let stream = evt.stream;
      //     let streamId = String(stream.getId());
      //     try {
      //         this.addVideoStream(streamId);
      //     } catch (e) {
      //         console.log(e);
      //         let streamDiv = document.createElement("div");
      //         streamDiv.id = streamId;
      //         streamDiv.style.transform = "rotateY(180deg)";
      //         let remoteContainer = document.getElementById('remoteContainer');
      //         remoteContainer.appendChild(streamDiv);
      //     }
      //
      //
      //     stream.play(streamId);
      // });
      //
      // this.client.on('stream-added', (evt) => {
      //     this.client.subscribe(evt.stream, (err) => this.handleFail(err));
      // });
    },
    joinChannel: function joinChannel() {
      var _this4 = this;

      this.client.join(this.agoraAppId, this.channelName, null, function (uid) {
        _this4.localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          audio: true,
          video: true
        });

        _this4.localStream.init(function () {
          _this4.localStream.play("me");

          _this4.client.publish(_this4.localStream, function (err) {
            return _this4.handleFail(err);
          });
        }, function (err) {
          return _this4.handleFail(err);
        });
      }, function (err) {
        return _this4.handleFail(err);
      });
      this.listeners(); // this.client.on('stream-subscribed', function (evt) {
      //     let stream = evt.stream;
      //     let streamId = String(stream.getId());
      //     try {
      //         this.addVideoStream(streamId);
      //     } catch (e) {
      //         let streamDiv = document.createElement("div");
      //         streamDiv.id = streamId;
      //         streamDiv.style.transform = "rotateY(180deg)";
      //         let remoteContainer = document.getElementById('remoteContainer');
      //         remoteContainer.appendChild(streamDiv);
      //     }
      //
      //
      //     stream.play(streamId);
      // });
      //
      // this.client.on('stream-added', (evt) => {
      //     this.client.subscribe(evt.stream, (err) => this.handleFail(err));
      // });
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
      _c("button", { on: { click: _vm.audioControl } }, [
        _vm._v("Audio control")
      ]),
      _vm._v(" "),
      _c("h4", [_vm._v("My Feed :")]),
      _vm._v(" "),
      _c("div", {
        staticStyle: {
          width: "300px",
          height: "300px",
          "background-color": "seagreen"
        },
        attrs: { id: "me" }
      }),
      _vm._v(" "),
      _c("h4", [_vm._v("Stream:")]),
      _vm._v(" "),
      _c("div", {
        staticStyle: {
          width: "300px",
          height: "300px",
          "background-color": "#0c5460"
        },
        attrs: { id: "remoteContainer" }
      })
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