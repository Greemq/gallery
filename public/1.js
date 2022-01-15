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
      role: 101
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
    getLocalStream: function getLocalStream() {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(function (stream) {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
      })["catch"](function (err) {
        console.log("u got an error:" + err);
      });
    },
    createClient: function createClient() {
      var _this = this;

      this.uid = Math.round(Math.random(1000) * 10000000);
      this.client = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createClient({
        mode: 'rtc',
        codec: 'vp8'
      });
      this.client.init(this.agoraAppId, function () {
        return console.log('client initialized');
      }, function (err) {
        return _this.handleFail(err);
      });
    },
    createChannel: function createChannel() {
      var _this2 = this;

      // this.client.setClientRole(this.role);
      this.joinChannel();
      this.client.join(this.agoraAppId, this.channelName, null, function (uid) {
        var localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          // audio: true,
          video: true
        }); //Initialize the local stream

        localStream.init(function () {
          // Play the local stream
          localStream.play("me"); // Publish the local stream

          client.publish(localStream, function (err) {
            return _this2.handleFail(err);
          });
        }, function (err) {
          return _this2.handleFail(err);
        });
      }, function (err) {
        return _this2.handleFail(err);
      });
      this.client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        var streamId = String(stream.getId());

        try {
          this.addVideoStream(streamId);
        } catch (e) {
          console.log(e);
          var streamDiv = document.createElement("div");
          streamDiv.id = streamId;
          streamDiv.style.transform = "rotateY(180deg)";
          var remoteContainer = document.getElementById('remoteContainer');
          remoteContainer.appendChild(streamDiv);
        }

        stream.play(streamId);
      });
      this.client.on('stream-added', function (evt) {
        _this2.client.subscribe(evt.stream, function (err) {
          return _this2.handleFail(err);
        });
      });
    },
    joinChannel: function joinChannel() {
      var _this3 = this;

      this.client.join(this.agoraAppId, this.channelName, null, function (uid) {
        var localStream = agora_rtc_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.createStream({
          audio: true,
          video: true
        }); //Initialize the local stream

        localStream.init(function () {
          // Play the local stream
          localStream.play("me"); // Publish the local stream

          _this3.client.publish(localStream, function (err) {
            return _this3.handleFail(err);
          });
        }, function (err) {
          return _this3.handleFail(err);
        });
      }, function (err) {
        return _this3.handleFail(err);
      });
      this.client.on('stream-subscribed', function (evt) {
        var stream = evt.stream;
        var streamId = String(stream.getId());

        try {
          this.addVideoStream(streamId);
        } catch (e) {
          console.log(e);
          var streamDiv = document.createElement("div");
          streamDiv.id = streamId;
          streamDiv.style.transform = "rotateY(180deg)";
          var remoteContainer = document.getElementById('remoteContainer');
          remoteContainer.appendChild(streamDiv);
        }

        stream.play(streamId);
      });
      this.client.on('stream-added', function (evt) {
        _this3.client.subscribe(evt.stream, function (err) {
          return _this3.handleFail(err);
        });
      }); // this.client.on('stream-removed', this.removeVideoSteam(this.client.stream));
      // this.client.on('peer-leave', this.removeVideoSteam(this.client.stream));
    },
    handleFail: function handleFail(err) {
      console.log("Error : ", err);
    },
    addVideoStream: function addVideoStream(elementId) {
      var streamDiv = document.createElement("div");
      streamDiv.id = elementId;
      streamDiv.style = 'width:200px;height:200px;background-color:red';
      streamDiv.style.transform = "rotateY(180deg)";
      var remoteContainer = document.getElementById('remoteContainer');
      remoteContainer.appendChild(streamDiv);
    },
    removeVideoStream: function removeVideoStream(elementId) {
      var remoteDiv = document.getElementById(elementId);
      if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
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
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            attrs: { id: "getStr", type: "button" },
            on: { click: _vm.getLocalStream }
          },
          [_vm._v("get stream")]
        )
      ])
    ]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("div", [
      _c("div", [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.role,
              expression: "role"
            }
          ],
          attrs: { id: "RoleAttendee", type: "radio", value: "0" },
          domProps: { checked: _vm._q(_vm.role, "0") },
          on: {
            change: function($event) {
              _vm.role = "0"
            }
          }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "RoleAttendee" } }, [
          _vm._v("RoleAttendee")
        ]),
        _vm._v(" "),
        _c("br"),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.role,
              expression: "role"
            }
          ],
          attrs: { id: "RolePublisher", type: "radio", value: "1" },
          domProps: { checked: _vm._q(_vm.role, "1") },
          on: {
            change: function($event) {
              _vm.role = "1"
            }
          }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "RolePublisher" } }, [
          _vm._v("RolePublisher")
        ]),
        _vm._v(" "),
        _c("br"),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.role,
              expression: "role"
            }
          ],
          attrs: { id: "RoleSubscriber", type: "radio", value: "2" },
          domProps: { checked: _vm._q(_vm.role, "2") },
          on: {
            change: function($event) {
              _vm.role = "2"
            }
          }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "RoleSubscriber" } }, [
          _vm._v("RoleSubscriber")
        ]),
        _vm._v(" "),
        _c("br"),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.role,
              expression: "role"
            }
          ],
          attrs: { id: "RoleAdmin", type: "radio", value: "101" },
          domProps: { checked: _vm._q(_vm.role, "101") },
          on: {
            change: function($event) {
              _vm.role = "101"
            }
          }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "RoleAdmin" } }, [_vm._v("RoleAdmin")]),
        _vm._v(" "),
        _c("br"),
        _vm._v(" "),
        _c("span", [_vm._v("Выбрано: " + _vm._s(_vm.role))])
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("h4", [_vm._v("My Feed :")]),
      _vm._v(" "),
      _c("div", { attrs: { id: "me" } }),
      _vm._v(" "),
      _c("div", { attrs: { id: "remoteContainer" } })
    ])
  }
]
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