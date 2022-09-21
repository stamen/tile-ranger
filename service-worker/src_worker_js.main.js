/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/worker.js":
/*!***********************!*\
  !*** ./src/worker.js ***!
  \***********************/
/***/ (() => {

eval("const cacheName = \"tiles\";\nconst cacheAssets = [];\n\nconst addResourcesToCache = async (resources) => {\n  const cache = await caches.open(\"v1\");\n  await cache.addAll(resources);\n};\n\nself.addEventListener(\"install\", (e) => {\n  console.log(e);\n  e.waitUntil(addResourcesToCache([\"/tile.index.json\"]));\n});\n\nconst zxyregex = new RegExp(/worker\\-server\\/(\\d+\\/\\d+\\/\\d+)\\.webp/);\n\nasync function makeTile(tilearray) {\n  const r = new Response(tilearray, {\n    status: 200,\n    headers: {\n      \"Content-Type\": \"image/webp\",\n    },\n  });\n  return r;\n}\n\nasync function get(start, end) {\n  const response = await fetch(\"/chunk.tile\", {\n    headers: {\n      Range: `bytes=${start}-${end}`,\n    },\n  });\n\n  const buf = await response.arrayBuffer();\n\n  return buf;\n}\n\nself.addEventListener(\"fetch\", (ev) => {\n  const matches = zxyregex.exec(ev.request.url);\n  if (matches) {\n    ev.respondWith(\n      caches\n        .match(\"/tile.index.json\")\n        .then((r) => {\n          return r.json();\n        })\n        .then((d) => {\n          if (matches[1] in d) {\n            // return new Response(\"hi\")\n            const [start, end] = d[matches[1]];\n            return get(start, end).then((r) => {\n              return makeTile(r);\n            });\n            // ev.respondWith(res);\n          } else {\n            return fetch(ev.request);\n          }\n        })\n    );\n  } else {\n    console.log(`No matches found for ${ev.request}`);\n    ev.respondWith(fetch(ev.request));\n  }\n});\n\n\n//# sourceURL=webpack://tilestats/./src/worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/worker.js"]();
/******/ 	
/******/ })()
;