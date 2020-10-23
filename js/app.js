/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = (typeof self !== 'undefined' ? self : this)["webpackHotUpdate"];
/******/ 	(typeof self !== 'undefined' ? self : this)["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d8cd563d383c0a01206f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/Demo.vue":
/*!***********************!*\
  !*** ./demo/Demo.vue ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Demo.vue?vue&type=template&id=4e98d191& */ \"./demo/Demo.vue?vue&type=template&id=4e98d191&\");\n/* harmony import */ var _Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Demo.vue?vue&type=script&lang=js& */ \"./demo/Demo.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('4e98d191')) {\n      api.createRecord('4e98d191', component.options)\n    } else {\n      api.reload('4e98d191', component.options)\n    }\n    module.hot.accept(/*! ./Demo.vue?vue&type=template&id=4e98d191& */ \"./demo/Demo.vue?vue&type=template&id=4e98d191&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Demo.vue?vue&type=template&id=4e98d191& */ \"./demo/Demo.vue?vue&type=template&id=4e98d191&\");\n(function () {\n      api.rerender('4e98d191', {\n        render: _Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"demo/Demo.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZW1vL0RlbW8udnVlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZGVtby9EZW1vLnZ1ZT9hNjU4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRGVtby52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGU5OGQxOTEmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRGVtby52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0RlbW8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvQHZ1ZS9jbGktc2VydmljZS9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvZm9sc2UvRG9jdW1lbnRzL3dvcmtzcGFjZS92dWUtZWRpdG9yLWpzLW1hc3Rlci9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0ZTk4ZDE5MScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZTk4ZDE5MScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZTk4ZDE5MScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRGVtby52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGU5OGQxOTEmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNGU5OGQxOTEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImRlbW8vRGVtby52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./demo/Demo.vue\n");
  
  /***/ }),
  
  /***/ "./demo/Demo.vue?vue&type=script&lang=js&":
  /*!************************************************!*\
    !*** ./demo/Demo.vue?vue&type=script&lang=js& ***!
    \************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./Demo.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./demo/Demo.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZW1vL0RlbW8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2RlbW8vRGVtby52dWU/NmNlOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kIGZyb20gXCItIS4uL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMC0wIS4uL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRGVtby52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0wLTAhLi4vbm9kZV9tb2R1bGVzL0B2dWUvY2xpLXNlcnZpY2Uvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EZW1vLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./demo/Demo.vue?vue&type=script&lang=js&\n");
  
  /***/ }),
  
  /***/ "./demo/Demo.vue?vue&type=template&id=4e98d191&":
  /*!******************************************************!*\
    !*** ./demo/Demo.vue?vue&type=template&id=4e98d191& ***!
    \******************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_14a6efa2_vue_loader_template_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"14a6efa2-vue-loader-template\"}!../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./Demo.vue?vue&type=template&id=4e98d191& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"14a6efa2-vue-loader-template\\\"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./demo/Demo.vue?vue&type=template&id=4e98d191&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_14a6efa2_vue_loader_template_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_14a6efa2_vue_loader_template_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_template_id_4e98d191___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZW1vL0RlbW8udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlOThkMTkxJi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2RlbW8vRGVtby52dWU/OWQ1YiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLSEuLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOlxcXCJub2RlX21vZHVsZXMvLmNhY2hlL3Z1ZS1sb2FkZXJcXFwiLFxcXCJjYWNoZUlkZW50aWZpZXJcXFwiOlxcXCIxNGE2ZWZhMi12dWUtbG9hZGVyLXRlbXBsYXRlXFxcIn0hLi4vbm9kZV9tb2R1bGVzL0B2dWUvY2xpLXNlcnZpY2Uvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTAtMCEuLi9ub2RlX21vZHVsZXMvQHZ1ZS9jbGktc2VydmljZS9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0RlbW8udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRlOThkMTkxJlwiIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./demo/Demo.vue?vue&type=template&id=4e98d191&\n");
  
  /***/ }),
  
  /***/ "./demo/main.js":
  /*!**********************!*\
    !*** ./demo/main.js ***!
    \**********************/
  /*! no exports provided */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _Demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Demo */ \"./demo/Demo.vue\");\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src */ \"./src/index.js\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(_src__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].config.productionTip = false\n\nnew vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  render: h => h(_Demo__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n}).$mount('#app')\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZW1vL21haW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZW1vL21haW4uanM/YTFlYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBBcHAgZnJvbSAnLi9EZW1vJ1xuXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4uL3NyYydcblZ1ZS51c2UoRWRpdG9yKVxuXG5cblZ1ZS5jb25maWcucHJvZHVjdGlvblRpcCA9IGZhbHNlXG5cbm5ldyBWdWUoe1xuICByZW5kZXI6IGggPT4gaChBcHApXG59KS4kbW91bnQoJyNhcHAnKVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./demo/main.js\n");
  
  /***/ }),
  
  /***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./demo/Demo.vue?vue&type=script&lang=js&":
  /*!**********************************************************************************************************************************************************************************!*\
    !*** ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./demo/Demo.vue?vue&type=script&lang=js& ***!
    \**********************************************************************************************************************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _editorjs_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @editorjs/header */ \"./node_modules/@editorjs/header/dist/bundle.js\");\n/* harmony import */ var _editorjs_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editorjs_header__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _editorjs_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @editorjs/list */ \"./node_modules/@editorjs/list/dist/bundle.js\");\n/* harmony import */ var _editorjs_list__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_editorjs_list__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _editorjs_code__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @editorjs/code */ \"./node_modules/@editorjs/code/dist/bundle.js\");\n/* harmony import */ var _editorjs_code__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editorjs_code__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _editorjs_paragraph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @editorjs/paragraph */ \"./node_modules/@editorjs/paragraph/dist/bundle.js\");\n/* harmony import */ var _editorjs_paragraph__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editorjs_paragraph__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _editorjs_embed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @editorjs/embed */ \"./node_modules/@editorjs/embed/dist/bundle.js\");\n/* harmony import */ var _editorjs_embed__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editorjs_embed__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _editorjs_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @editorjs/table */ \"./node_modules/@editorjs/table/dist/bundle.js\");\n/* harmony import */ var _editorjs_table__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_editorjs_table__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _editorjs_checklist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @editorjs/checklist */ \"./node_modules/@editorjs/checklist/dist/bundle.js\");\n/* harmony import */ var _editorjs_checklist__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_editorjs_checklist__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _editorjs_marker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @editorjs/marker */ \"./node_modules/@editorjs/marker/dist/bundle.js\");\n/* harmony import */ var _editorjs_marker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_editorjs_marker__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _editorjs_warning__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @editorjs/warning */ \"./node_modules/@editorjs/warning/dist/bundle.js\");\n/* harmony import */ var _editorjs_warning__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_editorjs_warning__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _editorjs_raw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @editorjs/raw */ \"./node_modules/@editorjs/raw/dist/bundle.js\");\n/* harmony import */ var _editorjs_raw__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_editorjs_raw__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _editorjs_quote__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @editorjs/quote */ \"./node_modules/@editorjs/quote/dist/bundle.js\");\n/* harmony import */ var _editorjs_quote__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_editorjs_quote__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _editorjs_inline_code__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @editorjs/inline-code */ \"./node_modules/@editorjs/inline-code/dist/bundle.js\");\n/* harmony import */ var _editorjs_inline_code__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_editorjs_inline_code__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _editorjs_delimiter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @editorjs/delimiter */ \"./node_modules/@editorjs/delimiter/dist/bundle.js\");\n/* harmony import */ var _editorjs_delimiter__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_editorjs_delimiter__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _editorjs_simple_image__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @editorjs/simple-image */ \"./node_modules/@editorjs/simple-image/dist/bundle.js\");\n/* harmony import */ var _editorjs_simple_image__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_editorjs_simple_image__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _editorjs_attaches__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @editorjs/attaches */ \"./node_modules/@editorjs/attaches/dist/bundle.js\");\n/* harmony import */ var _editorjs_attaches__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_editorjs_attaches__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _editorjs_personality__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @editorjs/personality */ \"./node_modules/@editorjs/personality/dist/bundle.js\");\n/* harmony import */ var _editorjs_personality__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_editorjs_personality__WEBPACK_IMPORTED_MODULE_15__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data() {\n    return {\n      config: {\n        tools:{\n          header: {\n            class: _editorjs_header__WEBPACK_IMPORTED_MODULE_0___default.a,\n            config: {\n              placeholder: 'Enter a header',\n              levels: [2, 3, 4],\n              defaultLevel: 3,\n            }\n          },\n          list: {\n            class: _editorjs_list__WEBPACK_IMPORTED_MODULE_1___default.a,\n            inlineToolbar: true,\n          },\n          code: {\n            class: _editorjs_code__WEBPACK_IMPORTED_MODULE_2___default.a\n          },\n          paragraph: {\n            class: _editorjs_paragraph__WEBPACK_IMPORTED_MODULE_3___default.a,\n          },\n          embed: {\n            class: _editorjs_embed__WEBPACK_IMPORTED_MODULE_4___default.a,\n            config: {\n              services: {\n                youtube: true,\n                coub: true,\n                imgur: true\n              }\n            }\n          },\n          table: {\n            class: _editorjs_table__WEBPACK_IMPORTED_MODULE_5___default.a,\n            inlineToolbar: true,\n            config: {\n              rows: 2,\n              cols: 3,\n            },\n          },\n          checklist: {\n            class: _editorjs_checklist__WEBPACK_IMPORTED_MODULE_6___default.a,\n          },\n          Marker: {\n            class: _editorjs_marker__WEBPACK_IMPORTED_MODULE_7___default.a,\n            shortcut: 'CMD+SHIFT+M',\n          },\n          warning: {\n            class: _editorjs_warning__WEBPACK_IMPORTED_MODULE_8___default.a,\n            inlineToolbar: true,\n            shortcut: 'CMD+SHIFT+W',\n            config: {\n              titlePlaceholder: 'Title',\n              messagePlaceholder: 'Message',\n            },\n          },\n          raw: _editorjs_raw__WEBPACK_IMPORTED_MODULE_9___default.a,\n          quote: {\n            class: _editorjs_quote__WEBPACK_IMPORTED_MODULE_10___default.a,\n            inlineToolbar: true,\n            shortcut: 'CMD+SHIFT+O',\n            config: {\n              quotePlaceholder: 'Enter a quote',\n              captionPlaceholder: 'Quote\\'s author',\n            },\n          },\n          inlineCode: {\n            class: _editorjs_inline_code__WEBPACK_IMPORTED_MODULE_11___default.a,\n            shortcut: 'CMD+SHIFT+M',\n          },\n          delimiter: _editorjs_delimiter__WEBPACK_IMPORTED_MODULE_12___default.a,\n          image: _editorjs_simple_image__WEBPACK_IMPORTED_MODULE_13___default.a,\n          attaches: {\n            class: _editorjs_attaches__WEBPACK_IMPORTED_MODULE_14___default.a,\n            config: {\n              endpoint: 'http://localhost:8008/uploadFile'\n            }\n          },\n          personality: {\n            class: _editorjs_personality__WEBPACK_IMPORTED_MODULE_15___default.a,\n            config: {\n              endpoint: 'http://localhost:8008/uploadFile'  // Your backend file uploader endpoint\n            }\n          }\n        },\n        onReady: () => {\n          console.log('on ready')\n        },\n        onChange: (args) => {\n          console.log('Now I know that Editor\\'s content changed!')\n        },\n        data: {\n            \"time\": 1591362820044,\n            \"blocks\": [\n                {\n                    \"type\" : \"header\",\n                    \"data\" : {\n                        \"text\" : \"Editor.js\",\n                        \"level\" : 2\n                    }\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.\"\n                    }\n                },\n                {\n                    \"type\" : \"header\",\n                    \"data\" : {\n                        \"text\" : \"Key features\",\n                        \"level\" : 3\n                    }\n                },\n                {\n                    \"type\" : \"list\",\n                    \"data\" : {\n                        \"style\" : \"unordered\",\n                        \"items\" : [\n                            \"It is a block-styled editor\",\n                            \"It returns clean data output in JSON\",\n                            \"Designed to be extendable and pluggable with a simple API\",\n                            \"今天晚上，我还加了几个插件：\",\n                            \"拖拽移动顺序\",\n                            \"撤销文字的修改\",\n                            \"同时，下方还增加了【待办样式内容】、【表格】、【代码】、【图片】、【视频】、【Figma】、【附件】、【介绍】\",\n                        ]\n                    }\n                },\n                {\n                    \"type\" : \"checklist\",\n                    \"data\" : {\n                        \"items\" : [\n                            {\n                              \"text\" : \"This is a block-styled editor\",\n                              \"checked\" : true\n                            },\n                            {\n                              \"text\" : \"Clean output data\",\n                              \"checked\" : false\n                            },\n                            {\n                              \"text\" : \"Simple and powerful API\",\n                              \"checked\" : true\n                            }\n                        ]\n                    }\n                },\n                {\n                    \"type\" : \"table\",\n                    \"data\" : {\n                        \"content\" : [ [\"Kine\", \"1 pcs\", \"100$\"], [\"Pigs\", \"3 pcs\", \"200$\"], [\"Chickens\", \"12 pcs\", \"150$\"] ]\n                    }\n                },\n                {\n                    \"type\" : \"code\",\n                    \"data\" : {\n                        \"code\": \"body {\\n font-size: 14px;\\n line-height: 16px;\\n #这是一段代码，在代码样式框里\\n}\",\n                    }\n                },\n                {\n                    \"type\" : \"image\",\n                    \"data\" : {\n                        \"url\" : \"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg\",\n                        \"caption\" : \"Roadster // tesla.com\",\n                        \"withBorder\" : false,\n                        \"withBackground\" : false,\n                        \"stretched\" : false\n                    }\n                },\n                {\n                    \"type\" : \"header\",\n                    \"data\" : {\n                        \"text\" : \"下方是一个优酷视频，用于演示嵌入网页模块。同样的，蓝湖的原型、设计图也可以：\",\n                        \"level\" : 3\n                    }\n                },\n                {\n                  \"type\" : \"embed\",\n                  \"data\" : {\n                    \"service\" : \"coub\",\n                    \"source\" : \"https://player.youku.com/embed/XMjI2NjE5NzMwMA==\",\n                    \"embed\" : \"https://player.youku.com/embed/XMjI2NjE5NzMwMA==\",\n                    \"width\" : 580,\n                    \"height\" : 320,\n                    \"caption\" : \"My Life\"\n                  }\n                },\n                {\n                  \"type\" : \"embed\",\n                  \"data\" : {\n                    \"service\" : \"coub\",\n                    \"embed\" : \"https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FagKnTvFqJBqSbOZGwr4qaf%2F%25E8%2593%259D%25E6%25B9%2596%25E4%25B8%25BB%25E7%25AB%2599%25E6%2596%25B0%25E7%2589%2588%25E6%259C%25AC%3Fnode-id%3D4%253A0\",\n                    \"width\" : 580,\n                    \"height\" : 320,\n                    \"caption\" : \"上方是一个嵌入式的产品原型\"\n                  }\n                },\n                {\n                    \"type\" : \"header\",\n                    \"data\" : {\n                        \"text\" : \"下方是一个附件 Block\",\n                        \"level\" : 3\n                    }\n                },\n                {\n                  \"type\" : \"attaches\",\n                  \"data\" : {\n                      \"file\": {\n                          \"url\" : \"https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg\",\n                          \"size\": 91,\n                          \"name\": \"hero.jpg\",\n                          \"extension\": \"jpg\"\n                      },\n                      \"title\": \"Hero\"\n                  }\n                },\n                {\n                  \"type\" : \"personality\",\n                  \"data\" : {\n                      \"name\" : \"Elon Musk\",\n                      \"description\" : \"只有首先看到事情的可能性，才会有发生的机会。\",\n                      \"link\" : \"https://twitter.com/elonmusk\",\n                      \"photo\" : \"https://capella.pics/3c0e1b97-bc56-4961-b54e-2a6c2c3260f2.jpg\"\n                  }\n                },\n                {\n                    \"type\" : \"header\",\n                    \"data\" : {\n                        \"text\" : \"What does it mean «block-styled editor»\",\n                        \"level\" : 3\n                    }\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n                    }\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"There are dozens of <a href=\\\"https://github.com/editor-js\\\">ready-to-use Blocks</a> and the <a href=\\\"https://editorjs.io/creating-a-block-tool\\\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.\"\n                    }\n                },\n                {\n                    \"type\" : \"header\",\n                    \"data\" : {\n                        \"text\" : \"What does it mean clean data output\",\n                        \"level\" : 3\n                    }\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below\"\n                    }\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"Given data can be used as you want: render with HTML for <code class=\\\"inline-code\\\">Web clients</code>, render natively for <code class=\\\"inline-code\\\">mobile apps</code>, create markup for <code class=\\\"inline-code\\\">Facebook Instant Articles</code> or <code class=\\\"inline-code\\\">Google AMP</code>, generate an <code class=\\\"inline-code\\\">audio version</code> and so on.\"\n                    }\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"Clean data is useful to sanitize, validate and process on the backend.\"\n                    }\n                },\n                {\n                    \"type\" : \"delimiter\",\n                    \"data\" : {}\n                },\n                {\n                    \"type\" : \"paragraph\",\n                    \"data\" : {\n                        \"text\" : \"We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏\"\n                    }\n                },\n                {\n                    \"type\" : \"image\",\n                    \"data\" : {\n                        \"file\" : {\n                            \"url\" : \"https://codex.so/public/app/img/external/codex2x.png\"\n                        },\n                        \"caption\" : \"\",\n                        \"withBorder\" : false,\n                        \"stretched\" : false,\n                        \"withBackground\" : false\n                    }\n                },\n\n            ],\n            \"version\" : \"2.18.0\"\n        }\n      },\n    };\n  },\n  methods: {\n    onInitialized (editor) {\n      console.log(editor)\n    }\n  }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8hLi9kZW1vL0RlbW8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9EZW1vLnZ1ZT80YmFmIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICA8aDEgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+TGFuaHUgTmV3IERvYzwvaDE+XG4gICAgPGVkaXRvciByZWY9XCJlZGl0b3JcIiA6Y29uZmlnPVwiY29uZmlnXCIgOmluaXRpYWxpemVkPVwib25Jbml0aWFsaXplZFwiLz5cbiAgICA8aDIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+54K55Ye75LiK5pa556m655m95aSE77yM5Y+v5Lul5o+S5YWl5ZCE56eN57G75Z6LIEJsb2NrPC9oMj5cbiAgICA8aW1nIHN0eWxlPVwiY2xlYXI6IGJvdGg7ZGlzcGxheTogYmxvY2s7bWFyZ2luOiBhdXRvO1wiIHNyYz1cImh0dHA6Ly9sYW5odXN0YXRpYy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20vTWFnaWMtYm9hcmQtd2ViLzMucG5nXCIvPlxuICAgIDxpbWcgc3R5bGU9XCJjbGVhcjogYm90aDtkaXNwbGF5OiBibG9jazttYXJnaW46IGF1dG87XCIgc3JjPVwiaHR0cDovL2xhbmh1c3RhdGljLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS9NYWdpYy1ib2FyZC13ZWIvMS5wbmdcIi8+XG4gICAgPGJyPlxuICAgIDxpbWcgc3R5bGU9XCJjbGVhcjogYm90aDtkaXNwbGF5OiBibG9jazttYXJnaW46IGF1dG87XCIgc3JjPVwiaHR0cDovL2xhbmh1c3RhdGljLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS9NYWdpYy1ib2FyZC13ZWIvMi5wbmdcIi8+XG4gICAgPGJyPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgSGVhZGVyIGZyb20gJ0BlZGl0b3Jqcy9oZWFkZXInO1xuaW1wb3J0IExpc3QgZnJvbSAnQGVkaXRvcmpzL2xpc3QnO1xuaW1wb3J0IENvZGVUb29sIGZyb20gJ0BlZGl0b3Jqcy9jb2RlJ1xuaW1wb3J0IFBhcmFncmFwaCBmcm9tICdAZWRpdG9yanMvcGFyYWdyYXBoJ1xuaW1wb3J0IEVtYmVkIGZyb20gJ0BlZGl0b3Jqcy9lbWJlZCdcbmltcG9ydCBUYWJsZSBmcm9tICdAZWRpdG9yanMvdGFibGUnXG5pbXBvcnQgQ2hlY2tsaXN0IGZyb20gJ0BlZGl0b3Jqcy9jaGVja2xpc3QnXG5pbXBvcnQgTWFya2VyIGZyb20gJ0BlZGl0b3Jqcy9tYXJrZXInXG5pbXBvcnQgV2FybmluZyBmcm9tICdAZWRpdG9yanMvd2FybmluZydcbmltcG9ydCBSYXdUb29sIGZyb20gJ0BlZGl0b3Jqcy9yYXcnXG5pbXBvcnQgUXVvdGUgZnJvbSAnQGVkaXRvcmpzL3F1b3RlJ1xuaW1wb3J0IElubGluZUNvZGUgZnJvbSAnQGVkaXRvcmpzL2lubGluZS1jb2RlJ1xuaW1wb3J0IERlbGltaXRlciBmcm9tICdAZWRpdG9yanMvZGVsaW1pdGVyJ1xuaW1wb3J0IFNpbXBsZUltYWdlIGZyb20gJ0BlZGl0b3Jqcy9zaW1wbGUtaW1hZ2UnXG5pbXBvcnQgQXR0YWNoZXNUb29sIGZyb20gJ0BlZGl0b3Jqcy9hdHRhY2hlcydcbmltcG9ydCBQZXJzb25hbGl0eSBmcm9tICdAZWRpdG9yanMvcGVyc29uYWxpdHknXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIHRvb2xzOntcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGNsYXNzOiBIZWFkZXIsXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdFbnRlciBhIGhlYWRlcicsXG4gICAgICAgICAgICAgIGxldmVsczogWzIsIDMsIDRdLFxuICAgICAgICAgICAgICBkZWZhdWx0TGV2ZWw6IDMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICBjbGFzczogTGlzdCxcbiAgICAgICAgICAgIGlubGluZVRvb2xiYXI6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb2RlOiB7XG4gICAgICAgICAgICBjbGFzczogQ29kZVRvb2xcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhcmFncmFwaDoge1xuICAgICAgICAgICAgY2xhc3M6IFBhcmFncmFwaCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgICBjbGFzczogRW1iZWQsXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICAgICAgICB5b3V0dWJlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvdWI6IHRydWUsXG4gICAgICAgICAgICAgICAgaW1ndXI6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgIGNsYXNzOiBUYWJsZSxcbiAgICAgICAgICAgIGlubGluZVRvb2xiYXI6IHRydWUsXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgcm93czogMixcbiAgICAgICAgICAgICAgY29sczogMyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGVja2xpc3Q6IHtcbiAgICAgICAgICAgIGNsYXNzOiBDaGVja2xpc3QsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBNYXJrZXI6IHtcbiAgICAgICAgICAgIGNsYXNzOiBNYXJrZXIsXG4gICAgICAgICAgICBzaG9ydGN1dDogJ0NNRCtTSElGVCtNJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHdhcm5pbmc6IHtcbiAgICAgICAgICAgIGNsYXNzOiBXYXJuaW5nLFxuICAgICAgICAgICAgaW5saW5lVG9vbGJhcjogdHJ1ZSxcbiAgICAgICAgICAgIHNob3J0Y3V0OiAnQ01EK1NISUZUK1cnLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgIHRpdGxlUGxhY2Vob2xkZXI6ICdUaXRsZScsXG4gICAgICAgICAgICAgIG1lc3NhZ2VQbGFjZWhvbGRlcjogJ01lc3NhZ2UnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJhdzogUmF3VG9vbCxcbiAgICAgICAgICBxdW90ZToge1xuICAgICAgICAgICAgY2xhc3M6IFF1b3RlLFxuICAgICAgICAgICAgaW5saW5lVG9vbGJhcjogdHJ1ZSxcbiAgICAgICAgICAgIHNob3J0Y3V0OiAnQ01EK1NISUZUK08nLFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgIHF1b3RlUGxhY2Vob2xkZXI6ICdFbnRlciBhIHF1b3RlJyxcbiAgICAgICAgICAgICAgY2FwdGlvblBsYWNlaG9sZGVyOiAnUXVvdGVcXCdzIGF1dGhvcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5saW5lQ29kZToge1xuICAgICAgICAgICAgY2xhc3M6IElubGluZUNvZGUsXG4gICAgICAgICAgICBzaG9ydGN1dDogJ0NNRCtTSElGVCtNJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlbGltaXRlcjogRGVsaW1pdGVyLFxuICAgICAgICAgIGltYWdlOiBTaW1wbGVJbWFnZSxcbiAgICAgICAgICBhdHRhY2hlczoge1xuICAgICAgICAgICAgY2xhc3M6IEF0dGFjaGVzVG9vbCxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICBlbmRwb2ludDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwOC91cGxvYWRGaWxlJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGVyc29uYWxpdHk6IHtcbiAgICAgICAgICAgIGNsYXNzOiBQZXJzb25hbGl0eSxcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICBlbmRwb2ludDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwOC91cGxvYWRGaWxlJyAgLy8gWW91ciBiYWNrZW5kIGZpbGUgdXBsb2FkZXIgZW5kcG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHk6ICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb24gcmVhZHknKVxuICAgICAgICB9LFxuICAgICAgICBvbkNoYW5nZTogKGFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnTm93IEkga25vdyB0aGF0IEVkaXRvclxcJ3MgY29udGVudCBjaGFuZ2VkIScpXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwidGltZVwiOiAxNTkxMzYyODIwMDQ0LFxuICAgICAgICAgICAgXCJibG9ja3NcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiIDogXCJFZGl0b3IuanNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIiA6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwicGFyYWdyYXBoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIkhleS4gTWVldCB0aGUgbmV3IEVkaXRvci4gT24gdGhpcyBwYWdlIHlvdSBjYW4gc2VlIGl0IGluIGFjdGlvbiDigJQgdHJ5IHRvIGVkaXQgdGhpcyB0ZXh0LlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiIDogXCJLZXkgZmVhdHVyZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIiA6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIiA6IFwidW5vcmRlcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCIgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJdCBpcyBhIGJsb2NrLXN0eWxlZCBlZGl0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkl0IHJldHVybnMgY2xlYW4gZGF0YSBvdXRwdXQgaW4gSlNPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVzaWduZWQgdG8gYmUgZXh0ZW5kYWJsZSBhbmQgcGx1Z2dhYmxlIHdpdGggYSBzaW1wbGUgQVBJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCLku4rlpKnmmZrkuIrvvIzmiJHov5jliqDkuoblh6DkuKrmj5Lku7bvvJpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIuaLluaLveenu+WKqOmhuuW6j1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwi5pKk6ZSA5paH5a2X55qE5L+u5pS5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCLlkIzml7bvvIzkuIvmlrnov5jlop7liqDkuobjgJDlvoXlip7moLflvI/lhoXlrrnjgJHjgIHjgJDooajmoLzjgJHjgIHjgJDku6PnoIHjgJHjgIHjgJDlm77niYfjgJHjgIHjgJDop4bpopHjgJHjgIHjgJBGaWdtYeOAkeOAgeOAkOmZhOS7tuOAkeOAgeOAkOS7i+e7jeOAkVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJjaGVja2xpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1zXCIgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIlRoaXMgaXMgYSBibG9jay1zdHlsZWQgZWRpdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrZWRcIiA6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiIDogXCJDbGVhbiBvdXRwdXQgZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGVja2VkXCIgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIlNpbXBsZSBhbmQgcG93ZXJmdWwgQVBJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoZWNrZWRcIiA6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCIgOiBbIFtcIktpbmVcIiwgXCIxIHBjc1wiLCBcIjEwMCRcIl0sIFtcIlBpZ3NcIiwgXCIzIHBjc1wiLCBcIjIwMCRcIl0sIFtcIkNoaWNrZW5zXCIsIFwiMTIgcGNzXCIsIFwiMTUwJFwiXSBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImNvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogXCJib2R5IHtcXG4gZm9udC1zaXplOiAxNHB4O1xcbiBsaW5lLWhlaWdodDogMTZweDtcXG4gI+i/meaYr+S4gOauteS7o+egge+8jOWcqOS7o+eggeagt+W8j+ahhumHjFxcbn1cIixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiIDogXCJodHRwczovL3d3dy50ZXNsYS5jb20vdGVzbGFfdGhlbWUvYXNzZXRzL2ltZy9fdmVoaWNsZV9yZWRlc2lnbi9yb2Fkc3Rlcl9hbmRfc2VtaS9yb2Fkc3Rlci9oZXJvLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXB0aW9uXCIgOiBcIlJvYWRzdGVyIC8vIHRlc2xhLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoQm9yZGVyXCIgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aEJhY2tncm91bmRcIiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHJldGNoZWRcIiA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiIDogXCLkuIvmlrnmmK/kuIDkuKrkvJjphbfop4bpopHvvIznlKjkuo7mvJTnpLrltYzlhaXnvZHpobXmqKHlnZfjgILlkIzmoLfnmoTvvIzok53muZbnmoTljp/lnovjgIHorr7orqHlm77kuZ/lj6/ku6XvvJpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIiA6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImVtYmVkXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzZXJ2aWNlXCIgOiBcImNvdWJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwiaHR0cHM6Ly9wbGF5ZXIueW91a3UuY29tL2VtYmVkL1hNakkyTmpFNU56TXdNQT09XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW1iZWRcIiA6IFwiaHR0cHM6Ly9wbGF5ZXIueW91a3UuY29tL2VtYmVkL1hNakkyTmpFNU56TXdNQT09XCIsXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6IDU4MCxcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6IDMyMCxcbiAgICAgICAgICAgICAgICAgICAgXCJjYXB0aW9uXCIgOiBcIk15IExpZmVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImVtYmVkXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzZXJ2aWNlXCIgOiBcImNvdWJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbWJlZFwiIDogXCJodHRwczovL3d3dy5maWdtYS5jb20vZW1iZWQ/ZW1iZWRfaG9zdD1zaGFyZSZ1cmw9aHR0cHMlM0ElMkYlMkZ3d3cuZmlnbWEuY29tJTJGZmlsZSUyRmFnS25UdkZxSkJxU2JPWkd3cjRxYWYlMkYlMjVFOCUyNTkzJTI1OUQlMjVFNiUyNUI5JTI1OTYlMjVFNCUyNUI4JTI1QkIlMjVFNyUyNUFCJTI1OTklMjVFNiUyNTk2JTI1QjAlMjVFNyUyNTg5JTI1ODglMjVFNiUyNTlDJTI1QUMlM0Zub2RlLWlkJTNENCUyNTNBMFwiLFxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiA1ODAsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAzMjAsXG4gICAgICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCLkuIrmlrnmmK/kuIDkuKrltYzlhaXlvI/nmoTkuqflk4Hljp/lnotcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIuS4i+aWueaYr+S4gOS4qumZhOS7tiBCbG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsZXZlbFwiIDogM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiYXR0YWNoZXNcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgIFwiZmlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCIgOiBcImh0dHBzOi8vd3d3LnRlc2xhLmNvbS90ZXNsYV90aGVtZS9hc3NldHMvaW1nL192ZWhpY2xlX3JlZGVzaWduL3JvYWRzdGVyX2FuZF9zZW1pL3JvYWRzdGVyL2hlcm8uanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiA5MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiaGVyby5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJleHRlbnNpb25cIjogXCJqcGdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkhlcm9cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInBlcnNvbmFsaXR5XCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIiA6IFwiRWxvbiBNdXNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCLlj6rmnInpppblhYjnnIvliLDkuovmg4XnmoTlj6/og73mgKfvvIzmiY3kvJrmnInlj5HnlJ/nmoTmnLrkvJrjgIJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImxpbmtcIiA6IFwiaHR0cHM6Ly90d2l0dGVyLmNvbS9lbG9ubXVza1wiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicGhvdG9cIiA6IFwiaHR0cHM6Ly9jYXBlbGxhLnBpY3MvM2MwZTFiOTctYmM1Ni00OTYxLWI1NGUtMmE2YzJjMzI2MGYyLmpwZ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIiA6IFwiV2hhdCBkb2VzIGl0IG1lYW4gwqtibG9jay1zdHlsZWQgZWRpdG9ywrtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIiA6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwicGFyYWdyYXBoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIldvcmtzcGFjZSBpbiBjbGFzc2ljIGVkaXRvcnMgaXMgbWFkZSBvZiBhIHNpbmdsZSBjb250ZW50ZWRpdGFibGUgZWxlbWVudCwgdXNlZCB0byBjcmVhdGUgZGlmZmVyZW50IEhUTUwgbWFya3Vwcy4gRWRpdG9yLmpzIDxtYXJrIGNsYXNzPVxcXCJjZHgtbWFya2VyXFxcIj53b3Jrc3BhY2UgY29uc2lzdHMgb2Ygc2VwYXJhdGUgQmxvY2tzOiBwYXJhZ3JhcGhzLCBoZWFkaW5ncywgaW1hZ2VzLCBsaXN0cywgcXVvdGVzLCBldGM8L21hcms+LiBFYWNoIG9mIHRoZW0gaXMgYW4gaW5kZXBlbmRlbnQgY29udGVudGVkaXRhYmxlIGVsZW1lbnQgKG9yIG1vcmUgY29tcGxleCBzdHJ1Y3R1cmUpIHByb3ZpZGVkIGJ5IFBsdWdpbiBhbmQgdW5pdGVkIGJ5IEVkaXRvcidzIENvcmUuXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwicGFyYWdyYXBoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIlRoZXJlIGFyZSBkb3plbnMgb2YgPGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL2VkaXRvci1qc1xcXCI+cmVhZHktdG8tdXNlIEJsb2NrczwvYT4gYW5kIHRoZSA8YSBocmVmPVxcXCJodHRwczovL2VkaXRvcmpzLmlvL2NyZWF0aW5nLWEtYmxvY2stdG9vbFxcXCI+c2ltcGxlIEFQSTwvYT4gZm9yIGNyZWF0aW9uIGFueSBCbG9jayB5b3UgbmVlZC4gRm9yIGV4YW1wbGUsIHlvdSBjYW4gaW1wbGVtZW50IEJsb2NrcyBmb3IgVHdlZXRzLCBJbnN0YWdyYW0gcG9zdHMsIHN1cnZleXMgYW5kIHBvbGxzLCBDVEEtYnV0dG9ucyBhbmQgZXZlbiBnYW1lcy5cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIiA6IFwiV2hhdCBkb2VzIGl0IG1lYW4gY2xlYW4gZGF0YSBvdXRwdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIiA6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwicGFyYWdyYXBoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIgOiBcIkNsYXNzaWMgV1lTSVdZRy1lZGl0b3JzIHByb2R1Y2UgcmF3IEhUTUwtbWFya3VwIHdpdGggYm90aCBjb250ZW50IGRhdGEgYW5kIGNvbnRlbnQgYXBwZWFyYW5jZS4gT24gdGhlIGNvbnRyYXJ5LCBFZGl0b3IuanMgb3V0cHV0cyBKU09OIG9iamVjdCB3aXRoIGRhdGEgb2YgZWFjaCBCbG9jay4gWW91IGNhbiBzZWUgYW4gZXhhbXBsZSBiZWxvd1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcInBhcmFncmFwaFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiIDogXCJHaXZlbiBkYXRhIGNhbiBiZSB1c2VkIGFzIHlvdSB3YW50OiByZW5kZXIgd2l0aCBIVE1MIGZvciA8Y29kZSBjbGFzcz1cXFwiaW5saW5lLWNvZGVcXFwiPldlYiBjbGllbnRzPC9jb2RlPiwgcmVuZGVyIG5hdGl2ZWx5IGZvciA8Y29kZSBjbGFzcz1cXFwiaW5saW5lLWNvZGVcXFwiPm1vYmlsZSBhcHBzPC9jb2RlPiwgY3JlYXRlIG1hcmt1cCBmb3IgPGNvZGUgY2xhc3M9XFxcImlubGluZS1jb2RlXFxcIj5GYWNlYm9vayBJbnN0YW50IEFydGljbGVzPC9jb2RlPiBvciA8Y29kZSBjbGFzcz1cXFwiaW5saW5lLWNvZGVcXFwiPkdvb2dsZSBBTVA8L2NvZGU+LCBnZW5lcmF0ZSBhbiA8Y29kZSBjbGFzcz1cXFwiaW5saW5lLWNvZGVcXFwiPmF1ZGlvIHZlcnNpb248L2NvZGU+IGFuZCBzbyBvbi5cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJwYXJhZ3JhcGhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIiA6IFwiQ2xlYW4gZGF0YSBpcyB1c2VmdWwgdG8gc2FuaXRpemUsIHZhbGlkYXRlIGFuZCBwcm9jZXNzIG9uIHRoZSBiYWNrZW5kLlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImRlbGltaXRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIiA6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiIDogXCJwYXJhZ3JhcGhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIiA6IFwiV2UgaGF2ZSBiZWVuIHdvcmtpbmcgb24gdGhpcyBwcm9qZWN0IG1vcmUgdGhhbiB0aHJlZSB5ZWFycy4gU2V2ZXJhbCBsYXJnZSBtZWRpYSBwcm9qZWN0cyBoZWxwIHVzIHRvIHRlc3QgYW5kIGRlYnVnIHRoZSBFZGl0b3IsIHRvIG1ha2UgaXQncyBjb3JlIG1vcmUgc3RhYmxlLiBBdCB0aGUgc2FtZSB0aW1lIHdlIHNpZ25pZmljYW50bHkgaW1wcm92ZWQgdGhlIEFQSS4gTm93LCBpdCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYW55IHBsdWdpbiBmb3IgYW55IHRhc2suIEhvcGUgeW91IGVuam95LiDwn5iPXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIiA6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCIgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZpbGVcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiIDogXCJodHRwczovL2NvZGV4LnNvL3B1YmxpYy9hcHAvaW1nL2V4dGVybmFsL2NvZGV4MngucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhcHRpb25cIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpdGhCb3JkZXJcIiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHJldGNoZWRcIiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoQmFja2dyb3VuZFwiIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcInZlcnNpb25cIiA6IFwiMi4xOC4wXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Jbml0aWFsaXplZCAoZWRpdG9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlZGl0b3IpXG4gICAgfVxuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbjwvc3R5bGU+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./demo/Demo.vue?vue&type=script&lang=js&\n");
  
  /***/ }),
  
  /***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/Editor.vue?vue&type=script&lang=js&":
  /*!***********************************************************************************************************************************************************************************!*\
    !*** ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/Editor.vue?vue&type=script&lang=js& ***!
    \***********************************************************************************************************************************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/composition-api */ \"./node_modules/@vue/composition-api/dist/vue-composition-api.module.js\");\n/* harmony import */ var _editorjs_editorjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @editorjs/editorjs */ \"./node_modules/@editorjs/editorjs/dist/editor.js\");\n/* harmony import */ var _editorjs_editorjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_editorjs_editorjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var editorjs_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! editorjs-drag-drop */ \"./node_modules/editorjs-drag-drop/dist/bundle.js\");\n/* harmony import */ var editorjs_drag_drop__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(editorjs_drag_drop__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var editorjs_undo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! editorjs-undo */ \"./node_modules/editorjs-undo/dist/bundle.js\");\n/* harmony import */ var editorjs_undo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(editorjs_undo__WEBPACK_IMPORTED_MODULE_3__);\n//\n//\n//\n//\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__[\"defineComponent\"])({\n  name: 'vue-editor-js',\n  props: {\n    holder: {\n      type: String,\n      default: () => 'vue-editor-js',\n      require: true\n    },\n    config: {\n      type: Object,\n      default: () => ({}),\n      require: true\n    },\n    initialized: {\n      type: Function,\n      default: () => {}\n    }\n  },\n  setup: (props, context) => {\n    const state = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__[\"reactive\"])({ editor: null })\n\n    function initEditor(props) {\n      destroyEditor()\n      state.editor = new _editorjs_editorjs__WEBPACK_IMPORTED_MODULE_1___default.a({\n        holder: 'vue-editor-js',\n        ...props.config,\n        onReady: () => {\n          new editorjs_drag_drop__WEBPACK_IMPORTED_MODULE_2___default.a(state.editor);\n          new editorjs_undo__WEBPACK_IMPORTED_MODULE_3___default.a(state.editor);\n        },\n      })\n      props.initialized(state.editor)\n    }\n\n    function destroyEditor() {\n      if (state.editor) {\n        state.editor.destroy()\n        state.editor = null\n      }\n    }\n\n    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__[\"onMounted\"])(_ => initEditor(props))\n\n    return { props, state }\n  }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8hLi9zcmMvRWRpdG9yLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRWRpdG9yLnZ1ZT81MGVjIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiA6aWQ9XCJob2xkZXJcIiAvPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7XG4gIHJlYWN0aXZlLFxuICBvbk1vdW50ZWQsXG4gIHdhdGNoLFxuICBkZWZpbmVDb21wb25lbnRcbn0gZnJvbSAnQHZ1ZS9jb21wb3NpdGlvbi1hcGknXG5pbXBvcnQgRWRpdG9ySlMgZnJvbSAnQGVkaXRvcmpzL2VkaXRvcmpzJztcbmltcG9ydCBEcmFnRHJvcCBmcm9tICdlZGl0b3Jqcy1kcmFnLWRyb3AnO1xuaW1wb3J0IFVuZG8gZnJvbSAnZWRpdG9yanMtdW5kbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICd2dWUtZWRpdG9yLWpzJyxcbiAgcHJvcHM6IHtcbiAgICBob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICgpID0+ICd2dWUtZWRpdG9yLWpzJyxcbiAgICAgIHJlcXVpcmU6IHRydWVcbiAgICB9LFxuICAgIGNvbmZpZzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgZGVmYXVsdDogKCkgPT4gKHt9KSxcbiAgICAgIHJlcXVpcmU6IHRydWVcbiAgICB9LFxuICAgIGluaXRpYWxpemVkOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvbixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHt9XG4gICAgfVxuICB9LFxuICBzZXR1cDogKHByb3BzLCBjb250ZXh0KSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGVkaXRvcjogbnVsbCB9KVxuXG4gICAgZnVuY3Rpb24gaW5pdEVkaXRvcihwcm9wcykge1xuICAgICAgZGVzdHJveUVkaXRvcigpXG4gICAgICBzdGF0ZS5lZGl0b3IgPSBuZXcgRWRpdG9ySlMoe1xuICAgICAgICBob2xkZXI6ICd2dWUtZWRpdG9yLWpzJyxcbiAgICAgICAgLi4ucHJvcHMuY29uZmlnLFxuICAgICAgICBvblJlYWR5OiAoKSA9PiB7XG4gICAgICAgICAgbmV3IERyYWdEcm9wKHN0YXRlLmVkaXRvcik7XG4gICAgICAgICAgbmV3IFVuZG8oc3RhdGUuZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICBwcm9wcy5pbml0aWFsaXplZChzdGF0ZS5lZGl0b3IpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVzdHJveUVkaXRvcigpIHtcbiAgICAgIGlmIChzdGF0ZS5lZGl0b3IpIHtcbiAgICAgICAgc3RhdGUuZWRpdG9yLmRlc3Ryb3koKVxuICAgICAgICBzdGF0ZS5lZGl0b3IgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VudGVkKF8gPT4gaW5pdEVkaXRvcihwcm9wcykpXG5cbiAgICByZXR1cm4geyBwcm9wcywgc3RhdGUgfVxuICB9XG59KVxuPC9zY3JpcHQ+XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/Editor.vue?vue&type=script&lang=js&\n");
  
  /***/ }),
  
  /***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"14a6efa2-vue-loader-template\"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./demo/Demo.vue?vue&type=template&id=4e98d191&":
  /*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"14a6efa2-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./demo/Demo.vue?vue&type=template&id=4e98d191& ***!
    \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"demo\" },\n    [\n      _c(\"h1\", { staticStyle: { \"text-align\": \"center\" } }, [\n        _vm._v(\"Lanhu New Doc\")\n      ]),\n      _c(\"editor\", {\n        ref: \"editor\",\n        attrs: { config: _vm.config, initialized: _vm.onInitialized }\n      }),\n      _c(\"h2\", { staticStyle: { \"text-align\": \"center\" } }, [\n        _vm._v(\"点击上方空白处，可以插入各种类型 Block\")\n      ]),\n      _c(\"img\", {\n        staticStyle: { clear: \"both\", display: \"block\", margin: \"auto\" },\n        attrs: {\n          src:\n            \"http://lanhustatic.oss-cn-beijing.aliyuncs.com/Magic-board-web/3.png\"\n        }\n      }),\n      _c(\"img\", {\n        staticStyle: { clear: \"both\", display: \"block\", margin: \"auto\" },\n        attrs: {\n          src:\n            \"http://lanhustatic.oss-cn-beijing.aliyuncs.com/Magic-board-web/1.png\"\n        }\n      }),\n      _c(\"br\"),\n      _c(\"img\", {\n        staticStyle: { clear: \"both\", display: \"block\", margin: \"auto\" },\n        attrs: {\n          src:\n            \"http://lanhustatic.oss-cn-beijing.aliyuncs.com/Magic-board-web/2.png\"\n        }\n      }),\n      _c(\"br\")\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzP3tcImNhY2hlRGlyZWN0b3J5XCI6XCJub2RlX21vZHVsZXMvLmNhY2hlL3Z1ZS1sb2FkZXJcIixcImNhY2hlSWRlbnRpZmllclwiOlwiMTRhNmVmYTItdnVlLWxvYWRlci10ZW1wbGF0ZVwifSEuL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPyEuL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/IS4vbm9kZV9tb2R1bGVzL0B2dWUvY2xpLXNlcnZpY2Uvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPyEuL2RlbW8vRGVtby52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGU5OGQxOTEmLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZGVtby9EZW1vLnZ1ZT82OGNiIl0sInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImRlbW9cIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiaDFcIiwgeyBzdGF0aWNTdHlsZTogeyBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIiB9IH0sIFtcbiAgICAgICAgX3ZtLl92KFwiTGFuaHUgTmV3IERvY1wiKVxuICAgICAgXSksXG4gICAgICBfYyhcImVkaXRvclwiLCB7XG4gICAgICAgIHJlZjogXCJlZGl0b3JcIixcbiAgICAgICAgYXR0cnM6IHsgY29uZmlnOiBfdm0uY29uZmlnLCBpbml0aWFsaXplZDogX3ZtLm9uSW5pdGlhbGl6ZWQgfVxuICAgICAgfSksXG4gICAgICBfYyhcImgyXCIsIHsgc3RhdGljU3R5bGU6IHsgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSB9LCBbXG4gICAgICAgIF92bS5fdihcIueCueWHu+S4iuaWueepuueZveWkhO+8jOWPr+S7peaPkuWFpeWQhOenjeexu+WeiyBCbG9ja1wiKVxuICAgICAgXSksXG4gICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgIHN0YXRpY1N0eWxlOiB7IGNsZWFyOiBcImJvdGhcIiwgZGlzcGxheTogXCJibG9ja1wiLCBtYXJnaW46IFwiYXV0b1wiIH0sXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgc3JjOlxuICAgICAgICAgICAgXCJodHRwOi8vbGFuaHVzdGF0aWMub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL01hZ2ljLWJvYXJkLXdlYi8zLnBuZ1wiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICBzdGF0aWNTdHlsZTogeyBjbGVhcjogXCJib3RoXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiwgbWFyZ2luOiBcImF1dG9cIiB9LFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIHNyYzpcbiAgICAgICAgICAgIFwiaHR0cDovL2xhbmh1c3RhdGljLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS9NYWdpYy1ib2FyZC13ZWIvMS5wbmdcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiYnJcIiksXG4gICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgIHN0YXRpY1N0eWxlOiB7IGNsZWFyOiBcImJvdGhcIiwgZGlzcGxheTogXCJibG9ja1wiLCBtYXJnaW46IFwiYXV0b1wiIH0sXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgc3JjOlxuICAgICAgICAgICAgXCJodHRwOi8vbGFuaHVzdGF0aWMub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL01hZ2ljLWJvYXJkLXdlYi8yLnBuZ1wiXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX2MoXCJiclwiKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"14a6efa2-vue-loader-template\"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./demo/Demo.vue?vue&type=template&id=4e98d191&\n");
  
  /***/ }),
  
  /***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"14a6efa2-vue-loader-template\"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/Editor.vue?vue&type=template&id=195457b4&":
  /*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"14a6efa2-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/Editor.vue?vue&type=template&id=195457b4& ***!
    \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: _vm.holder } })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzP3tcImNhY2hlRGlyZWN0b3J5XCI6XCJub2RlX21vZHVsZXMvLmNhY2hlL3Z1ZS1sb2FkZXJcIixcImNhY2hlSWRlbnRpZmllclwiOlwiMTRhNmVmYTItdnVlLWxvYWRlci10ZW1wbGF0ZVwifSEuL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPyEuL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/IS4vbm9kZV9tb2R1bGVzL0B2dWUvY2xpLXNlcnZpY2Uvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPyEuL3NyYy9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5NTQ1N2I0Ji5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9FZGl0b3IudnVlP2FjMDUiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IGF0dHJzOiB7IGlkOiBfdm0uaG9sZGVyIH0gfSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"14a6efa2-vue-loader-template\"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/Editor.vue?vue&type=template&id=195457b4&\n");
  
  /***/ }),
  
  /***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
  /*!*************************************************!*\
    !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  eval("var map = {\n\t\"./log\": \"./node_modules/webpack/hot/log.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/webpack/hot sync ^\\\\.\\\\/log$\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3Qgc3luYyBeXFwuXFwvbG9nJC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvaG90IHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9sb2ckPzFjM2QiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdCBzeW5jIF5cXFxcLlxcXFwvbG9nJFwiOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/hot sync ^\\.\\/log$\n");
  
  /***/ }),
  
  /***/ "./src/Editor.vue":
  /*!************************!*\
    !*** ./src/Editor.vue ***!
    \************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.vue?vue&type=template&id=195457b4& */ \"./src/Editor.vue?vue&type=template&id=195457b4&\");\n/* harmony import */ var _Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor.vue?vue&type=script&lang=js& */ \"./src/Editor.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_cli_service_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('195457b4')) {\n      api.createRecord('195457b4', component.options)\n    } else {\n      api.reload('195457b4', component.options)\n    }\n    module.hot.accept(/*! ./Editor.vue?vue&type=template&id=195457b4& */ \"./src/Editor.vue?vue&type=template&id=195457b4&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.vue?vue&type=template&id=195457b4& */ \"./src/Editor.vue?vue&type=template&id=195457b4&\");\n(function () {\n      api.rerender('195457b4', {\n        render: _Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/Editor.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvRWRpdG9yLnZ1ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9FZGl0b3IudnVlP2VmZDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5NTQ1N2I0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VkaXRvci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0VkaXRvci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9mb2xzZS9Eb2N1bWVudHMvd29ya3NwYWNlL3Z1ZS1lZGl0b3ItanMtbWFzdGVyL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzE5NTQ1N2I0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzE5NTQ1N2I0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzE5NTQ1N2I0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5NTQ1N2I0JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE5NTQ1N2I0Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvRWRpdG9yLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Editor.vue\n");
  
  /***/ }),
  
  /***/ "./src/Editor.vue?vue&type=script&lang=js&":
  /*!*************************************************!*\
    !*** ./src/Editor.vue?vue&type=script&lang=js& ***!
    \*************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./Editor.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/Editor.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvRWRpdG9yLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRWRpdG9yLnZ1ZT9jMTA4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0wLTAhLi4vbm9kZV9tb2R1bGVzL0B2dWUvY2xpLXNlcnZpY2Uvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMC0wIS4uL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdG9yLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Editor.vue?vue&type=script&lang=js&\n");
  
  /***/ }),
  
  /***/ "./src/Editor.vue?vue&type=template&id=195457b4&":
  /*!*******************************************************!*\
    !*** ./src/Editor.vue?vue&type=template&id=195457b4& ***!
    \*******************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_14a6efa2_vue_loader_template_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"14a6efa2-vue-loader-template\"}!../node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./Editor.vue?vue&type=template&id=195457b4& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"14a6efa2-vue-loader-template\\\"}!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/@vue/cli-service/node_modules/vue-loader/lib/index.js?!./src/Editor.vue?vue&type=template&id=195457b4&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_14a6efa2_vue_loader_template_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_14a6efa2_vue_loader_template_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_195457b4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvRWRpdG9yLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTU0NTdiNCYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRWRpdG9yLnZ1ZT80OGYxIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCItIS4uL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6XFxcIm5vZGVfbW9kdWxlcy8uY2FjaGUvdnVlLWxvYWRlclxcXCIsXFxcImNhY2hlSWRlbnRpZmllclxcXCI6XFxcIjE0YTZlZmEyLXZ1ZS1sb2FkZXItdGVtcGxhdGVcXFwifSEuLi9ub2RlX21vZHVsZXMvQHZ1ZS9jbGktc2VydmljZS9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMC0wIS4uL25vZGVfbW9kdWxlcy9AdnVlL2NsaS1zZXJ2aWNlL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdG9yLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTU0NTdiNCZcIiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Editor.vue?vue&type=template&id=195457b4&\n");
  
  /***/ }),
  
  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! exports provided: install, Editor, default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"install\", function() { return install; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Editor\", function() { return Editor; });\n/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/composition-api */ \"./node_modules/@vue/composition-api/dist/vue-composition-api.module.js\");\n/* harmony import */ var _Editor_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor.vue */ \"./src/Editor.vue\");\nconst version = '__VERSION__'\n\n\n\nfunction install(Vue) {\n  if (install.installed) return;\n  install.installed = true;\n  Vue.use(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n  Vue.component('Editor', _Editor_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n}\n\nconst plugin = {\n  install,\n  version\n}\n\nconst Editor = _Editor_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n\nlet GlobalVue = null\n\nif (typeof window !== 'undefined') {\n  GlobalVue = window.Vue\n} else if (typeof global !== 'undefined') {\n  GlobalVue = global.Vue\n}\n\nif (GlobalVue) {\n  GlobalVue.use(plugin)\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (plugin);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB2ZXJzaW9uID0gJ19fVkVSU0lPTl9fJ1xuaW1wb3J0IFZ1ZUNvbXBvc2l0aW9uQXBpIGZyb20gJ0B2dWUvY29tcG9zaXRpb24tYXBpJztcbmltcG9ydCBFZGl0b3JDb21wb25lbnQgZnJvbSAnLi9FZGl0b3IudnVlJ1xuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbChWdWUpIHtcbiAgaWYgKGluc3RhbGwuaW5zdGFsbGVkKSByZXR1cm47XG4gIGluc3RhbGwuaW5zdGFsbGVkID0gdHJ1ZTtcbiAgVnVlLnVzZShWdWVDb21wb3NpdGlvbkFwaSlcbiAgVnVlLmNvbXBvbmVudCgnRWRpdG9yJywgRWRpdG9yQ29tcG9uZW50KVxufVxuXG5jb25zdCBwbHVnaW4gPSB7XG4gIGluc3RhbGwsXG4gIHZlcnNpb25cbn1cblxuZXhwb3J0IGNvbnN0IEVkaXRvciA9IEVkaXRvckNvbXBvbmVudFxuXG5sZXQgR2xvYmFsVnVlID0gbnVsbFxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgR2xvYmFsVnVlID0gd2luZG93LlZ1ZVxufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBHbG9iYWxWdWUgPSBnbG9iYWwuVnVlXG59XG5cbmlmIChHbG9iYWxWdWUpIHtcbiAgR2xvYmFsVnVlLnVzZShwbHVnaW4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");
  
  /***/ }),
  
  /***/ 1:
  /*!*******************************************************************************************************************************************************************************!*\
    !*** multi (webpack)/hot/dev-server.js ./node_modules/@vue/cli-service/node_modules/webpack-dev-server/client?http://192.168.50.47:8080&sockPath=/sockjs-node ./demo/main.js ***!
    \*******************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  __webpack_require__(/*! /Users/folse/Documents/workspace/vue-editor-js-master/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
  __webpack_require__(/*! /Users/folse/Documents/workspace/vue-editor-js-master/node_modules/@vue/cli-service/node_modules/webpack-dev-server/client/index.js?http://192.168.50.47:8080&sockPath=/sockjs-node */"./node_modules/@vue/cli-service/node_modules/webpack-dev-server/client/index.js?http://192.168.50.47:8080&sockPath=/sockjs-node");
  module.exports = __webpack_require__(/*! /Users/folse/Documents/workspace/vue-editor-js-master/demo/main.js */"./demo/main.js");
  
  
  /***/ })
  
  /******/ });