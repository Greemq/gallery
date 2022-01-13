(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/main.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Agora/main.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! agora-rtc-sdk */ "./node_modules/agora-rtc-sdk/AgoraRTCSDK.min.js");
/* harmony import */ var agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Helpers_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Helpers/api */ "./resources/js/Helpers/api.js");
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
  name: "mainAgora",
  data: function data() {
    return {
      client: null,
      roomName: null,
      // agoraAppId: 'b0e7072ea1f8479fb58b857449c7f702',
      agoraAppId: 'ff487d0a29264aa78133c3ea7eccd374',
      // agoraToken: null,
      // agoraToken: '006b0e7072ea1f8479fb58b857449c7f702IABDNBiS2X1uKzalH+u03t7KfyyWZDGEbRJcQQ/ZbcB8cHbzGBgAAAAAEABLPQ3JgpHhYQEAAQCBkeFh',
      agoraToken: null,
      uid: null,
      remoteContainer: null
    };
  },
  mounted: function mounted() {
    this.uid = Math.round(Math.random(1000) * 1000000); // this.client.init(this.agoraAppId, () => {
    //     console.log('client init');
    // }, (err) => {
    //     this.handleFail(err);
    // });
    //
    // this.client.join(null,);
  },
  methods: {
    createClient: function createClient() {
      this.remoteContainer = document.getElementById('remote-container');
      this.client = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createClient({
        mode: 'rtc',
        codec: 'vp8'
      });
      this.createChannel();
    },
    createChannel: function createChannel() {
      var _this = this;

      var appid = document.getElementById("app-id").value;
      this.client.init(appid, function () {
        return console.log('client initialized');
      }, function (err) {
        return _this.handleFail(err);
      });
      this.client.join(this.agoraToken, this.roomName, this.uid, function (uid) {
        var localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          video: true,
          audio: true
        });
        localStream.init(function () {
          localStream.play('me');

          _this.client.publish(localStream);
        });
        console.log('appId: ' + appid + '\nchannel id: ' + _this.roomName + '\nuser id: ' + uid);
      }, function (err) {
        return _this.handleFail(err);
      });
      this.client.on('stream-added', function (evt) {
        _this.client.subscribe(evt.stream, function (err) {
          return _this.handleFail(err);
        });
      });
      this.client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        this.addVideoStream(stream.getId());
        stream.play(stream.getId());
      }); // this.client.on('stream-removed', this.removeVideoSteam(this.client.stream));
      // this.client.on('peer-leave', this.removeVideoSteam(this.client.stream));
    },
    getRtcToken: function getRtcToken() {
      var _this2 = this;

      _Helpers_api__WEBPACK_IMPORTED_MODULE_1__["default"].get('/api/createRtcToken/' + this.roomName + '/' + this.uid, {}).then(function (res) {
        _this2.agoraToken = res.data;
        console.log(res);
      });
    },
    handleFail: function handleFail(err) {
      console.log("Error : ", err);
    },
    addVideoStream: function addVideoStream(streamId) {
      var streamDiv = document.createElement('div');
      streamDiv.id = streamId;
      streamDiv.style.transform = "rotateY(180deg)";
      this.remoteContainer.appendChild(streamDiv);
    },
    removeVideoSteam: function removeVideoSteam(evt) {
      var stream = evt.stream;
      stream.stop();
      var remDiv = document.getElementById(stream.getId());
      remDiv.parentNode.removeChild(remDiv);
      console.log('Stream removed' + stream.getId());
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/main.vue?vue&type=template&id=2b6616d9&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Agora/main.vue?vue&type=template&id=2b6616d9&scoped=true& ***!
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
    _c("div", [
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
            value: _vm.agoraToken,
            expression: "agoraToken"
          }
        ],
        attrs: { placeholder: "agoratoken", type: "text" },
        domProps: { value: _vm.agoraToken },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.agoraToken = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.roomName,
            expression: "roomName"
          }
        ],
        attrs: { placeholder: "roomname", type: "text" },
        domProps: { value: _vm.roomName },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.roomName = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("h2", [_vm._v(_vm._s(_vm.uid))])
    ]),
    _vm._v(" "),
    _c("button", { on: { click: _vm.createClient } }, [
      _vm._v("create channel")
    ]),
    _vm._v(" "),
    _c("button", { on: { click: _vm.getRtcToken } }, [_vm._v("create token")]),
    _vm._v(" "),
    _c("div", {
      staticStyle: {
        width: "500px",
        height: "500px",
        "background-color": "#0c5460"
      },
      attrs: { id: "video_stream" }
    }),
    _vm._v(" "),
    _c("h4", [_vm._v("My Feed :")]),
    _vm._v(" "),
    _c("div", { attrs: { id: "me" } }),
    _vm._v(" "),
    _c("h4", [_vm._v("Remote Feeds :")]),
    _vm._v(" "),
    _c("div", { attrs: { id: "remote-container" } })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Config/config.js":
/*!***************************************!*\
  !*** ./resources/js/Config/config.js ***!
  \***************************************/
/*! exports provided: APP_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_URL", function() { return APP_URL; });
var APP_URL = process.env.VUE_APP_URL;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./resources/js/Helpers/api.js":
/*!*************************************!*\
  !*** ./resources/js/Helpers/api.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config/config */ "./resources/js/Config/config.js");

var request = axios.create({
  baseURL: _Config_config__WEBPACK_IMPORTED_MODULE_0__["APP_URL"]
});
/* harmony default export */ __webpack_exports__["default"] = (request);

/***/ }),

/***/ "./resources/js/Pages/Agora/main.vue":
/*!*******************************************!*\
  !*** ./resources/js/Pages/Agora/main.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_vue_vue_type_template_id_2b6616d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.vue?vue&type=template&id=2b6616d9&scoped=true& */ "./resources/js/Pages/Agora/main.vue?vue&type=template&id=2b6616d9&scoped=true&");
/* harmony import */ var _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Agora/main.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _main_vue_vue_type_template_id_2b6616d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _main_vue_vue_type_template_id_2b6616d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2b6616d9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Agora/main.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Agora/main.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Agora/main.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/main.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Agora/main.vue?vue&type=template&id=2b6616d9&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Pages/Agora/main.vue?vue&type=template&id=2b6616d9&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_2b6616d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./main.vue?vue&type=template&id=2b6616d9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Agora/main.vue?vue&type=template&id=2b6616d9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_2b6616d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_2b6616d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);