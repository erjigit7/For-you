(function(){
    var script = {
 "mouseWheelEnabled": true,
 "paddingBottom": 0,
 "id": "rootPlayer",
 "gap": 10,
 "children": [
  "this.MainViewer",
  "this.Container_22BB12F4_3075_D173_4184_EC3BC4955417",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9"
 ],
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "width": "100%",
 "layout": "absolute",
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "class": "Player",
 "propagateClick": true,
 "verticalAlign": "top",
 "scripts": {
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "existsKey": function(key){  return key in window; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getKey": function(key){  return window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } }
 },
 "minHeight": 20,
 "paddingLeft": 0,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "desktopMipmappingEnabled": false,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 20,
 "scrollBarWidth": 10,
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_camera"
},
{
 "hfovMax": 130,
 "label": "01_Interactive LightMix",
 "id": "panorama_12BDC117_19AD_F276_41A6_05A9D14354B4",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_159F2B03_1AA3_564E_4165_455195D1F30C",
  "this.overlay_0ADBA74C_1AA3_5EDA_41A4_D2B0FD163E64",
  "this.overlay_15B649FA_1AA2_D5BE_41B1_280950173BBD",
  "this.overlay_0A69FFFE_1AAD_4DB6_41A2_2890CF6FAFAC"
 ],
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -19,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23",
   "backwardYaw": -19
  },
  {
   "distance": 1,
   "yaw": 69.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A",
   "backwardYaw": 69.94
  }
 ],
 "hfov": 360,
 "hfovMin": "135%",
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 161,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0EDB49A5_1B67_324A_41B3_763619C0CFA8"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -110.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0E9579B5_1B67_324A_41AA_50BA8978A8D6"
},
{
 "mouseControlMode": "drag_acceleration",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "buttonCardboardView": "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "viewerArea": "this.MainViewer",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 161,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0EB1D9A5_1B67_324A_41A3_AFAC8F609B32"
},
{
 "hfovMax": 130,
 "label": "01_Interactive LightMix-1",
 "id": "panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_14AB936A_1AA5_56DE_41B9_C049695DCCF9",
  "this.overlay_0ACF2BF1_1AAD_55CB_41B7_F17FD5FBD1DD",
  "this.overlay_0ACF5BF1_1AAD_55CB_41BA_3BCE2D4A0FB5",
  "this.overlay_0ACF4BF1_1AAD_55CB_41B5_7AD11D3EAF8B",
  "this.overlay_0ACF7BF1_1AAD_55CB_41B2_6C56FB9DFC5C"
 ],
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -19,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4",
   "backwardYaw": -19
  },
  {
   "distance": 1,
   "yaw": 69.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A",
   "backwardYaw": -19
  }
 ],
 "hfov": 360,
 "hfovMin": "135%",
 "partial": false
},
{
 "items": [
  {
   "media": "this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_camera"
  },
  {
   "media": "this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_camera"
  },
  {
   "media": "this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -110.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0E85A9BF_1B67_35B6_4187_5B0FB6B15213"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -110.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0EA799B5_1B67_324A_41A8_E15C7777F133"
},
{
 "items": [
  {
   "media": "this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_camera"
  },
  {
   "media": "this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_camera"
  },
  {
   "media": "this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfovMax": 130,
 "label": "01_Interactive LightMix-f",
 "id": "panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A",
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "rowCount": 4,
      "height": 2048,
      "colCount": 4
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_1505FFAB_1AA3_4E5E_4179_95EC17C451E9",
  "this.overlay_0A2D7027_1AAF_5256_4199_90079579FC78",
  "this.overlay_0A2D6027_1AAF_5256_419C_78BA26543066",
  "this.overlay_0A2D9027_1AAF_5256_41A8_8658333F4D07",
  "this.overlay_0A2D8027_1AAF_5256_41B4_23863201E98D"
 ],
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "distance": 1,
   "yaw": -19,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23",
   "backwardYaw": 69.94
  },
  {
   "distance": 1,
   "yaw": 69.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4",
   "backwardYaw": 69.94
  }
 ],
 "hfov": 360,
 "hfovMin": "135%",
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 161,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_0ECCF9A5_1B67_324A_4194_779012E7DD4A"
},
{
 "toolTipFontFamily": "Georgia",
 "paddingBottom": 0,
 "id": "MainViewer",
 "left": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipPaddingBottom": 7,
 "transitionMode": "blending",
 "playbackBarBorderRadius": 0,
 "progressRight": 0,
 "playbackBarBottom": 5,
 "toolTipBorderSize": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarHeadBorderRadius": 0,
 "class": "ViewerArea",
 "propagateClick": true,
 "toolTipFontStyle": "normal",
 "toolTipShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "paddingLeft": 0,
 "progressOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "toolTipPaddingTop": 7,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "vrPointerSelectionColor": "#FF6600",
 "progressBarBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#FFFFFF",
 "height": "100%",
 "playbackBarHeadShadow": true,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadHeight": 15,
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "progressBottom": 0,
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "toolTipShadowOpacity": 0,
 "progressHeight": 10,
 "toolTipShadowSpread": 0,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "toolTipOpacity": 0.5,
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 10,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "toolTipFontSize": 13,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "minHeight": 50,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipDisplayTime": 600,
 "top": 0,
 "playbackBarHeight": 10,
 "toolTipBorderRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "toolTipBorderColor": "#767676",
 "playbackBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBackgroundOpacity": 1,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "minWidth": 100,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderSize": 0,
 "playbackBarHeadWidth": 6,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "transitionDuration": 500,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderRadius": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingRight": 10,
 "borderRadius": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "paddingBottom": 0,
 "id": "Container_22BB12F4_3075_D173_4184_EC3BC4955417",
 "left": 70,
 "backgroundOpacity": 0,
 "width": 550,
 "gap": 10,
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
  "this.Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
  "this.Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
  "this.Label_22BB32F4_3075_D173_4191_C8B45B85DEB8"
 ],
 "overflow": "visible",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": 34,
 "height": 140,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--STICKER"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": 115.05,
 "right": "0%",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": 641,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-- SETTINGS"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "left": "0%",
 "backgroundOpacity": 0,
 "width": 330,
 "gap": 10,
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "layout": "absolute",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": "100%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "right": "0%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--INFO photo"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "right": "0%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "right": "0%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--LOCATION"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "right": "0%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--FLOORPLAN"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "right": "0%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "children": [
  "this.Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
  "this.Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C"
 ],
 "right": "0%",
 "scrollBarColor": "#04A3E1",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--REALTOR"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "toggle",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "toggle",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "data": {
  "name": "IconButton MUTE"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.3,
   "hfov": 17.48
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23, this.camera_0EB1D9A5_1B67_324A_41A3_AFAC8F609B32); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_0E9CB5EA_1AAF_3DDE_41B5_3A2F6BF8E974",
   "yaw": -19,
   "pitch": -4.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 17.48
  }
 ],
 "id": "overlay_159F2B03_1AA3_564E_4165_455195D1F30C",
 "data": {
  "label": "Circle Generic 04"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 69.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.68,
   "hfov": 29.02
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A, this.camera_0EA799B5_1B67_324A_41A8_E15C7777F133); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_0E9F65EA_1AAF_3DDE_419D_62F7B222DB83",
   "yaw": 69.94,
   "pitch": -3.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 29.02
  }
 ],
 "id": "overlay_0ADBA74C_1AA3_5EDA_41A4_D2B0FD163E64",
 "data": {
  "label": "Circle Generic 04"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -18.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_2_0_map.gif",
      "width": 45,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.95,
   "hfov": 20.59
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 20.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_2_0.png",
      "width": 343,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": 1.95,
   "yaw": -18.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_15B649FA_1AA2_D5BE_41B1_280950173BBD",
 "data": {
  "label": "\u0427\u0435\u0440\u0435\u0437 Photoshop"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 74.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_3_0_map.gif",
      "width": 90,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.2,
   "hfov": 26.84
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 26.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_3_0.png",
      "width": 448,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": 3.2,
   "yaw": 74.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0A69FFFE_1AAD_4DB6_41A2_2890CF6FAFAC",
 "data": {
  "label": "\u0427\u0435\u0440\u0435\u0437 Freepic"
 }
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "toggle",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "data": {
  "name": "IconButton GYRO"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "data": {
  "name": "IconButton VR"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "toggle",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "data": {
  "name": "IconButton HS "
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 9.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_0_0_map.gif",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 77.19,
   "hfov": 8.86
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 8.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_0_0.png",
      "width": 665,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 77.19,
   "yaw": 9.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_14AB936A_1AA5_56DE_41B9_C049695DCCF9",
 "data": {
  "label": "\u0427\u0435\u0440\u0435\u0437 Photoshop"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.3,
   "hfov": 17.48
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4, this.camera_0EDB49A5_1B67_324A_41B3_763619C0CFA8); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_0E9E45EA_1AAF_3DDE_41AF_BC2D9A8850EA",
   "yaw": -19,
   "pitch": -4.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 17.48
  }
 ],
 "id": "overlay_0ACF2BF1_1AAD_55CB_41B7_F17FD5FBD1DD",
 "data": {
  "label": "Circle Generic 04"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 69.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.68,
   "hfov": 29.02
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A, this.camera_0ECCF9A5_1B67_324A_4194_779012E7DD4A); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_0E9185EA_1AAF_3DDE_41B1_D4FF9C04BC88",
   "yaw": 69.94,
   "pitch": -3.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 29.02
  }
 ],
 "id": "overlay_0ACF5BF1_1AAD_55CB_41BA_3BCE2D4A0FB5",
 "data": {
  "label": "Circle Generic 04"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -13.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_3_0_map.gif",
      "width": 45,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.19,
   "hfov": 20.6
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 20.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_3_0.png",
      "width": 343,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": 1.19,
   "yaw": -13.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0ACF4BF1_1AAD_55CB_41B5_7AD11D3EAF8B",
 "data": {
  "label": "\u0411\u0430\u0437\u043e\u0432\u044b\u0439"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 74.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_4_0_map.gif",
      "width": 90,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 3.2,
   "hfov": 26.84
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 26.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_4_0.png",
      "width": 448,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": 3.2,
   "yaw": 74.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0ACF7BF1_1AAD_55CB_41B2_6C56FB9DFC5C",
 "data": {
  "label": "\u0427\u0435\u0440\u0435\u0437 Freepic"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 9.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_0_0_map.gif",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 77.19,
   "hfov": 8.86
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 8.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_0_0.png",
      "width": 665,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 77.19,
   "yaw": 9.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1505FFAB_1AA3_4E5E_4179_95EC17C451E9",
 "data": {
  "label": "\u0427\u0435\u0440\u0435\u0437 Freepic"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.3,
   "hfov": 17.48
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23, this.camera_0E9579B5_1B67_324A_41AA_50BA8978A8D6); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_0E9155EA_1AAF_3DDE_41A2_7614A444D44C",
   "yaw": -19,
   "pitch": -4.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 17.48
  }
 ],
 "id": "overlay_0A2D7027_1AAF_5256_4199_90079579FC78",
 "data": {
  "label": "Circle Generic 04"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 69.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -3.68,
   "hfov": 29.02
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_12BDC117_19AD_F276_41A6_05A9D14354B4, this.camera_0E85A9BF_1B67_35B6_4187_5B0FB6B15213); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_0E90B5EA_1AAF_3DDE_4190_F88FE9B5D257",
   "yaw": 69.94,
   "pitch": -3.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100,
   "hfov": 29.02
  }
 ],
 "id": "overlay_0A2D6027_1AAF_5256_419C_78BA26543066",
 "data": {
  "label": "Circle Generic 04"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -18.21,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_3_0_map.gif",
      "width": 45,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.95,
   "hfov": 20.59
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 20.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_3_0.png",
      "width": 343,
      "class": "ImageResourceLevel",
      "height": 121
     }
    ]
   },
   "pitch": 1.95,
   "yaw": -18.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0A2D9027_1AAF_5256_41A8_8658333F4D07",
 "data": {
  "label": "\u0427\u0435\u0440\u0435\u0437 Photoshop"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 77.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_4_0_map.gif",
      "width": 90,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.46,
   "hfov": 26.76
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 26.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_4_0.png",
      "width": 448,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": 5.46,
   "yaw": 77.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0A2D8027_1AAF_5256_41B4_23863201E98D",
 "data": {
  "label": "\u0411\u0430\u0437\u043e\u0432\u044b\u0439"
 }
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
 "left": "0%",
 "backgroundOpacity": 1,
 "width": 366,
 "shadowColor": "#000000",
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": 2,
 "shadowSpread": 1,
 "height": 78,
 "shadow": true,
 "backgroundColorDirection": "vertical",
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadowBlurRadius": 7,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "white block"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
 "left": 0,
 "backgroundOpacity": 1,
 "width": 366,
 "shadowColor": "#000000",
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0.01
 ],
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": 86,
 "shadowSpread": 1,
 "height": 46,
 "shadow": true,
 "backgroundColorDirection": "vertical",
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadowBlurRadius": 7,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "blue block"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "paddingBottom": 0,
 "data": {
  "name": "text 1"
 },
 "id": "Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
 "left": 10,
 "backgroundOpacity": 0,
 "width": 391,
 "fontFamily": "Oswald",
 "class": "Label",
 "propagateClick": true,
 "verticalAlign": "top",
 "text": "LOREM IPSUM",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": 0,
 "height": 75,
 "shadow": false,
 "fontColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "fontSize": 61,
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "paddingRight": 0,
 "borderRadius": 0,
 "fontWeight": "bold"
},
{
 "paddingBottom": 0,
 "data": {
  "name": "text 2"
 },
 "id": "Label_22BB32F4_3075_D173_4191_C8B45B85DEB8",
 "left": 12,
 "backgroundOpacity": 0,
 "width": 385,
 "fontFamily": "Oswald",
 "textShadowOpacity": 1,
 "textShadowHorizontalLength": 0,
 "class": "Label",
 "propagateClick": true,
 "verticalAlign": "top",
 "text": "DOLOR SIT AMET, CONSECTETUR",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": 90,
 "height": 44,
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "fontSize": 28,
 "textShadowBlurRadius": 10,
 "textShadowColor": "#000000",
 "textShadowVerticalLength": 0,
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "textDecoration": "none",
 "paddingRight": 0,
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": 110,
 "right": "0%",
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "overflow": "visible",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": 110,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "horizontalAlign": "center",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "gap": 3,
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "right": "0%",
 "width": "91.304%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "vertical",
 "minHeight": 1,
 "paddingLeft": 0,
 "bottom": "0%",
 "height": "85.959%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "horizontalAlign": "center",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "left": "0%",
 "backgroundOpacity": 0,
 "width": 66,
 "gap": 10,
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": "100%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- COLLAPSE"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": 330,
 "right": 0,
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882"
 ],
 "overflow": "visible",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "layout": "absolute",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": "100%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- EXPANDED"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "backgroundOpacity": 1,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "shadowSpread": 1,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadowBlurRadius": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "right": "15%",
 "overflow": "visible",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "layout": "vertical",
 "gap": 10,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "bottom": "80%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "horizontalAlign": "right",
 "paddingRight": 20,
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "backgroundOpacity": 1,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "shadowSpread": 1,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadowBlurRadius": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "horizontalAlign": "center",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "backgroundOpacity": 1,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "shadowSpread": 1,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadowBlurRadius": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "right": "15%",
 "overflow": "visible",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "vertical",
 "gap": 10,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "bottom": "80%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "horizontalAlign": "right",
 "paddingRight": 20,
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "backgroundOpacity": 1,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "shadowSpread": 1,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadowBlurRadius": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "horizontalAlign": "center",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "backgroundOpacity": 1,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "shadowSpread": 1,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "vertical",
 "shadowBlurRadius": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "horizontalAlign": "center",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
 "left": "15%",
 "backgroundOpacity": 1,
 "children": [
  "this.Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
  "this.Container_1E19D23C_57F1_802D_41B0_92437DF80B82"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "shadowSpread": 1,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadowBlurRadius": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "shadowOpacity": 0.3
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C",
 "left": "15%",
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF"
 ],
 "right": "15%",
 "overflow": "visible",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "layout": "vertical",
 "gap": 10,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "bottom": "80%",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "horizontalAlign": "right",
 "paddingRight": 20,
 "borderRadius": 0
},
{
 "levels": [
  {
   "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_0E9CB5EA_1AAF_3DDE_41B5_3A2F6BF8E974",
 "frameCount": 24,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_12BDC117_19AD_F276_41A6_05A9D14354B4_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_0E9F65EA_1AAF_3DDE_419D_62F7B222DB83",
 "frameCount": 24,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_0E9E45EA_1AAF_3DDE_41AF_BC2D9A8850EA",
 "frameCount": 24,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_15080E93_1AA5_CE4E_41A7_B71D356A0B23_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_0E9185EA_1AAF_3DDE_41B1_D4FF9C04BC88",
 "frameCount": 24,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_0E9155EA_1AAF_3DDE_41A2_7614A444D44C",
 "frameCount": 24,
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_1473A3CA_1AA5_35DE_41A0_3FF75CD3ED7A_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_0E90B5EA_1AAF_3DDE_4190_F88FE9B5D257",
 "frameCount": 24,
 "colCount": 4
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "width": 60,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "toggle",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 60,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "data": {
  "name": "image button menu"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "click": "this.shareTwitter(window.location.href)",
 "data": {
  "name": "IconButton TWITTER"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "backgroundOpacity": 0,
 "maxHeight": 58,
 "width": 58,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 58,
 "click": "this.shareFacebook(window.location.href)",
 "data": {
  "name": "IconButton FB"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "left": "0%",
 "backgroundOpacity": 0.4,
 "width": 36,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "height": "100%",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container black"
 },
 "horizontalAlign": "left",
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 80,
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "left": 10,
 "backgroundOpacity": 0,
 "maxHeight": 80,
 "width": 50,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "40%",
 "bottom": "40%",
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "data": {
  "name": "IconButton arrow"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "left": "0%",
 "backgroundOpacity": 0.3,
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "gap": 10,
 "scrollBarColor": "#000000",
 "width": "90%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "layout": "absolute",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "height": "100%",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container"
 },
 "horizontalAlign": "left",
 "paddingRight": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 50,
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "backgroundOpacity": 0,
 "maxHeight": 50,
 "right": 9,
 "width": 50,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": true,
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "40%",
 "bottom": "40%",
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton collapse"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "paddingBottom": 0,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "gap": 10,
 "backgroundOpacity": 1,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "width": "85%",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#000000"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "horizontalAlign": "center",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 20,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "gap": 0,
 "backgroundOpacity": 1,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "overflow": "visible",
 "scrollBarColor": "#0069A3",
 "width": "50%",
 "layout": "vertical",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 50,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 460,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "horizontalAlign": "left",
 "paddingRight": 50,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "width": "25%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "paddingLeft": 0,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "data": {
  "name": "X"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "width": "100%",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 140,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "rollOverItemThumbnailShadow": true,
 "paddingBottom": 70,
 "itemBackgroundColorDirection": "vertical",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemVerticalAlign": "top",
 "width": "100%",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "itemThumbnailWidth": 220,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "class": "ThumbnailGrid",
 "propagateClick": true,
 "itemLabelFontWeight": "normal",
 "paddingLeft": 70,
 "itemLabelTextDecoration": "none",
 "itemThumbnailOpacity": 1,
 "height": "92%",
 "selectedItemLabelFontColor": "#04A3E1",
 "itemPaddingRight": 3,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "itemLabelGap": 7,
 "itemThumbnailShadow": false,
 "itemBackgroundColor": [],
 "itemLabelFontFamily": "Oswald",
 "itemPaddingTop": 3,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadow": true,
 "itemBackgroundColorRatios": [],
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "itemPaddingBottom": 3,
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemThumbnailScaleMode": "fit_outside",
 "backgroundOpacity": 0,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemThumbnailHeight": 125,
 "itemMaxWidth": 1000,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemLabelFontSize": 16,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemMinHeight": 50,
 "itemThumbnailBorderRadius": 0,
 "itemMaxHeight": 1000,
 "minHeight": 1,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "bottom": -0.2,
 "itemMinWidth": 50,
 "shadow": false,
 "itemPaddingLeft": 3,
 "paddingTop": 10,
 "minWidth": 1,
 "itemHeight": 160,
 "scrollBarMargin": 2,
 "itemLabelHorizontalAlign": "center",
 "itemHorizontalAlign": "center",
 "itemMode": "normal",
 "itemWidth": 220,
 "itemBorderRadius": 0,
 "itemLabelFontStyle": "italic",
 "itemLabelPosition": "bottom",
 "horizontalAlign": "center",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "gap": 26,
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "paddingBottom": 0,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "backgroundOpacity": 1,
 "width": "100%",
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "class": "WebFrame",
 "propagateClick": true,
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollEnabled": true,
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "insetBorder": false,
 "data": {
  "name": "WebFrame"
 },
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "width": "25%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 50,
 "paddingLeft": 0,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "data": {
  "name": "X"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "toolTipFontFamily": "Arial",
 "paddingBottom": 0,
 "id": "MapViewer",
 "left": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipPaddingBottom": 4,
 "transitionMode": "blending",
 "playbackBarBorderRadius": 0,
 "progressRight": 0,
 "playbackBarBottom": 0,
 "toolTipBorderSize": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarHeadBorderRadius": 0,
 "class": "ViewerArea",
 "propagateClick": true,
 "toolTipFontStyle": "normal",
 "toolTipShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "paddingLeft": 0,
 "progressOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "toolTipPaddingTop": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "vrPointerSelectionColor": "#FF6600",
 "progressBarBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#FFFFFF",
 "height": "99.975%",
 "playbackBarHeadShadow": true,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadHeight": 15,
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBottom": 2,
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "toolTipShadowOpacity": 1,
 "progressHeight": 10,
 "toolTipShadowSpread": 0,
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "toolTipFontSize": 12,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipDisplayTime": 600,
 "top": 0,
 "playbackBarHeight": 10,
 "toolTipBorderRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "toolTipBorderColor": "#767676",
 "playbackBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBackgroundOpacity": 1,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderSize": 0,
 "playbackBarHeadWidth": 6,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "transitionDuration": 500,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingRight": 6,
 "borderRadius": 0,
 "data": {
  "name": "Floor Plan"
 }
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "gap": 10,
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "overflow": "scroll",
 "width": "100%",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 140,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "width": "100%",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
 "gap": 10,
 "backgroundOpacity": 1,
 "children": [
  "this.Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1"
 ],
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "width": "55%",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#000000"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "horizontalAlign": "center",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 20,
 "id": "Container_1E19D23C_57F1_802D_41B0_92437DF80B82",
 "gap": 0,
 "backgroundOpacity": 1,
 "children": [
  "this.Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
  "this.Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
  "this.Container_1E18523C_57F1_802D_41B1_88C86CD9A273"
 ],
 "overflow": "visible",
 "scrollBarColor": "#0069A3",
 "width": "45%",
 "layout": "vertical",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 460,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "horizontalAlign": "left",
 "paddingRight": 60,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "width": "25%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "paddingLeft": 0,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "pressedIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "data": {
  "name": "X"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF.jpg",
 "rollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_rollover.jpg",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 40,
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "left": "0%",
 "backgroundOpacity": 0.7,
 "children": [
  "this.Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
  "this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
  "this.Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
  "this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
  "this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
  "this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
  "this.Container_1758A215_31FA_0014_41B6_9A4A5384548B",
  "this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
  "this.Container_168D8311_3106_01EC_41B0_F2D40886AB88"
 ],
 "gap": 10,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "minHeight": 1,
 "paddingLeft": 40,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "top": "0%",
 "borderSize": 0,
 "paddingTop": 40,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "height": "100%",
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- Buttons set"
 },
 "horizontalAlign": "left",
 "paddingRight": 40
},
{
 "paddingBottom": 0,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "backgroundOpacity": 0,
 "maxHeight": 1000,
 "width": "100%",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "class": "Image",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": "100%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "data": {
  "name": "Image"
 },
 "horizontalAlign": "center",
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "gap": 0,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 0,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 60,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "horizontalAlign": "right",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 30,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "overflow": "scroll",
 "scrollBarColor": "#E73B2C",
 "width": "100%",
 "layout": "vertical",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 520,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 100,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": 370,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 40,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "right": 20,
 "width": "100%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "mode": "push",
 "height": "36.14%",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "right": 20,
 "width": "100%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "mode": "push",
 "height": "36.14%",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "toolTipFontFamily": "Arial",
 "paddingBottom": 0,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipPaddingBottom": 4,
 "transitionMode": "blending",
 "playbackBarBorderRadius": 0,
 "progressRight": 0,
 "playbackBarBottom": 0,
 "toolTipBorderSize": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarHeadBorderRadius": 0,
 "class": "ViewerArea",
 "propagateClick": true,
 "toolTipFontStyle": "normal",
 "toolTipShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "paddingLeft": 0,
 "progressOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "toolTipPaddingTop": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "vrPointerSelectionColor": "#FF6600",
 "progressBarBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#FFFFFF",
 "height": "100%",
 "playbackBarHeadShadow": true,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadHeight": 15,
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBottom": 2,
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "toolTipShadowOpacity": 1,
 "progressHeight": 10,
 "toolTipShadowSpread": 0,
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "toolTipFontSize": 12,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipDisplayTime": 600,
 "top": "0%",
 "playbackBarHeight": 10,
 "toolTipBorderRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "toolTipBorderColor": "#767676",
 "playbackBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBackgroundOpacity": 1,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "playbackBarRight": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBarBorderSize": 0,
 "playbackBarHeadWidth": 6,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "transitionDuration": 500,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingRight": 6,
 "borderRadius": 0,
 "data": {
  "name": "Viewer photoalbum 1"
 }
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "width": "14.22%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": true,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": "20%",
 "bottom": "20%",
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton <"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "right": 10,
 "width": "14.22%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": true,
 "minHeight": 50,
 "paddingLeft": 0,
 "top": "20%",
 "bottom": "20%",
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton >"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "borderRadius": 0,
 "paddingBottom": 0,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "backgroundOpacity": 0,
 "maxHeight": 60,
 "right": 20,
 "width": "10%",
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 50,
 "paddingLeft": 0,
 "top": 20,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 50,
 "mode": "push",
 "height": "10%",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "paddingRight": 0,
 "cursor": "hand"
},
{
 "paddingBottom": 0,
 "maxWidth": 2000,
 "id": "Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1",
 "left": "0%",
 "backgroundOpacity": 0,
 "maxHeight": 1000,
 "width": "100%",
 "url": "skin/Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1.jpg",
 "class": "Image",
 "propagateClick": false,
 "verticalAlign": "bottom",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "height": "100%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "data": {
  "name": "Image40635"
 },
 "horizontalAlign": "center",
 "scaleMode": "fit_outside",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
 "gap": 0,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 0,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 20,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "5%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "horizontalAlign": "right",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 30,
 "id": "Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "children": [
  "this.HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
  "this.Container_1E18623C_57F1_802D_41D5_C4D10C61A206"
 ],
 "overflow": "scroll",
 "scrollBarColor": "#E73B2C",
 "width": "100%",
 "layout": "vertical",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 520,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 100,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "100%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_1E18523C_57F1_802D_41B1_88C86CD9A273",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": 370,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 40,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 1095,
 "id": "Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
 "left": "0%",
 "backgroundOpacity": 0,
 "maxHeight": 1095,
 "width": "100%",
 "url": "skin/Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19.jpg",
 "class": "Image",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 30,
 "paddingLeft": 0,
 "top": "0%",
 "height": "25%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 40,
 "data": {
  "name": "Image Company"
 },
 "horizontalAlign": "left",
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "gap": 0,
 "backgroundOpacity": 0,
 "children": [
  "this.Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
  "this.Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
  "this.Container_106C4A62_2D09_C594_41C0_0D00619DF541",
  "this.Button_0A054365_2D09_CB9F_4145_8C365B373D19",
  "this.Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
  "this.Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
  "this.Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
  "this.Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
  "this.Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
  "this.Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
  "this.Container_207ECEAD_3035_51EC_41A3_EE49910C654D"
 ],
 "right": "0%",
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "26%",
 "bottom": "26%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 1"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
  "this.HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
  "this.Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
  "this.Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6"
 ],
 "gap": 5,
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "bottom",
 "layout": "vertical",
 "minHeight": 1,
 "paddingLeft": 0,
 "bottom": "0%",
 "height": 130,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Container footer"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
  "this.Container_2A2DB53B_310E_001C_41BA_0206228E495C",
  "this.Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
  "this.Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
  "this.Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
  "this.Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
  "this.Button_2A2C053B_310E_001C_41A2_583DE489828C",
  "this.Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
  "this.Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
  "this.Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
  "this.Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
  "this.Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
  "this.Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA"
 ],
 "gap": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "25%",
 "bottom": "25%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-1"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
  "this.Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
  "this.Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
  "this.Button_15A10DDC_31FA_0014_4185_021C898E177D",
  "this.Button_15A13DDC_31FA_0014_41C5_41AE80876834",
  "this.Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
  "this.Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
  "this.Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
  "this.Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
  "this.Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
  "this.Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
  "this.Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
  "this.Button_159EBDDD_31FA_0014_41C8_935504B30727"
 ],
 "gap": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "25%",
 "bottom": "25%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-2"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
  "this.Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
  "this.Container_17578D7D_31FA_0015_41BE_353D3005648A",
  "this.Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
  "this.Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
  "this.Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
  "this.Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
  "this.Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
  "this.Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
  "this.Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
  "this.Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
  "this.Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
  "this.Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC"
 ],
 "gap": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "25%",
 "bottom": "25%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-3"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Button_175A5214_31FA_0014_4198_930DF49BADD9",
  "this.Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
  "this.Container_1759B215_31FA_0014_41C0_84C99CBD5517",
  "this.Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
  "this.Button_17598215_31FA_0014_41AC_1166AB319171",
  "this.Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
  "this.Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
  "this.Button_17593215_31FA_0014_41C0_42BAFB0080F0",
  "this.Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
  "this.Button_17590215_31FA_0014_41C1_2B2D012DCC76",
  "this.Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
  "this.Button_17596215_31FA_0014_41C6_A42670770708",
  "this.Button_1758B215_31FA_0014_41BC_C4EAC2A9544B"
 ],
 "gap": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "25%",
 "bottom": "25%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-4"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
  "this.Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
  "this.Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
  "this.Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
  "this.Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
  "this.Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
  "this.Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
  "this.Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
  "this.Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
  "this.Button_17EB52B7_3106_0014_419C_439E593AEC43",
  "this.Button_17EB62B7_3106_0014_41C5_43B38271B353",
  "this.Button_17EB72B7_3106_0014_41B9_61857077BF4A",
  "this.Button_17EB92B7_3106_0014_41B2_34A3E3F63779"
 ],
 "gap": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "25%",
 "bottom": "25%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-5"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "left": "0%",
 "backgroundOpacity": 0,
 "children": [
  "this.Button_168CA310_3106_01EC_41C7_72CE0522951A",
  "this.Container_168C8310_3106_01EC_4187_B16F315A4A23",
  "this.Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
  "this.Button_168D6310_3106_01EC_41B8_A0B6BE627547",
  "this.Button_168D5310_3106_01EC_41B5_96D9387401B8",
  "this.Button_168D3310_3106_01EC_41AC_5D524E4677A5",
  "this.Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
  "this.Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
  "this.Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
  "this.Button_168DD310_3106_01EC_4190_7815FA70349E",
  "this.Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
  "this.Button_168DA310_3106_01EC_41BE_DF88732C2A28",
  "this.Button_168D9311_3106_01EC_41A8_3BD8769525D6"
 ],
 "gap": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "overflow": "scroll",
 "class": "Container",
 "propagateClick": true,
 "layout": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "25%",
 "bottom": "25%",
 "verticalAlign": "middle",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-6"
 },
 "horizontalAlign": "left",
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#04A3E1",
 "paddingBottom": 20,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "backgroundOpacity": 0,
 "width": "100%",
 "class": "HTMLText",
 "propagateClick": false,
 "minHeight": 1,
 "paddingLeft": 10,
 "height": "100%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.42vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.92vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.92vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.51vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.51vh;font-family:'Oswald';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.09vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.09vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.51vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.51vh;font-family:'Oswald';\"><B><I>DONEC FEUGIAT:</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.64vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.51vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.51vh;font-family:'Oswald';\"><B><I>LOREM IPSUM:</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.73vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText"
 },
 "paddingRight": 10,
 "borderRadius": 0
},
{
 "borderRadius": 50,
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundColorRatios": [
  0
 ],
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "gap": 5,
 "backgroundOpacity": 0.7,
 "width": 180,
 "data": {
  "name": "Button"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": false,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "mode": "push",
 "shadow": false,
 "height": 50,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "fontSize": "2.39vh",
 "label": "LOREM IPSUM",
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "fontStyle": "italic",
 "horizontalAlign": "center",
 "textDecoration": "none",
 "rollOverBackgroundOpacity": 1,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "fontWeight": "bold"
},
{
 "scrollBarColor": "#04A3E1",
 "paddingBottom": 0,
 "id": "HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
 "backgroundOpacity": 0,
 "width": "100%",
 "class": "HTMLText",
 "propagateClick": false,
 "minHeight": 1,
 "paddingLeft": 0,
 "height": "46%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.42vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.92vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.92vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV></div>",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0,
 "data": {
  "name": "HTMLText18899"
 },
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_1E18623C_57F1_802D_41D5_C4D10C61A206",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "children": [
  "this.Image_1E18723C_57F1_802D_41C5_8325536874A5",
  "this.HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC"
 ],
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "width": "100%",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "75%",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- content"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button Tour Info"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "RECEPTION >",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_106C4A62_2D09_C594_41C0_0D00619DF541",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0A054365_2D09_CB9F_4145_8C365B373D19",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button Panorama List"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "ROOMS >",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Inserdt Text",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button Location"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "AMENITIES >",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button Floorplan"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "SPORTS AREA >",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button Photoalbum"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "SWIMMING POOL >",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button Contact"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "RESTAURANTS >",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_207ECEAD_3035_51EC_41A3_EE49910C654D",
 "gap": 10,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "id": "Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
 "gap": 10,
 "backgroundOpacity": 1,
 "width": 40,
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#5CA1DE"
 ],
 "shadow": false,
 "height": 2,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "blue line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
 "backgroundOpacity": 0,
 "width": "100%",
 "class": "HTMLText",
 "propagateClick": true,
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 78,
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText47602"
 },
 "visible": false,
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
 "gap": 7,
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
  "this.IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
  "this.IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
  "this.IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5"
 ],
 "overflow": "visible",
 "width": "100%",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "bottom",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 56,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Container Icons 1"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6",
 "gap": 7,
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
  "this.IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
  "this.IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
  "this.IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F"
 ],
 "overflow": "visible",
 "width": "100%",
 "layout": "horizontal",
 "class": "Container",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 44,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Container Icons 2"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button <BACK"
 },
 "fontFamily": "Oswald",
 "rollOverFontSize": 18,
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "shadowColor": "#000000",
 "rollOverFontFamily": "Oswald",
 "layout": "horizontal",
 "iconHeight": 30,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 5,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "BACK",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "gap": 10,
 "backgroundOpacity": 0.5,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": "100%",
 "overflow": "scroll",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 8,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "gap": 5,
 "backgroundOpacity": 0,
 "rollOverShadowBlurRadius": 18,
 "data": {
  "name": "Button text 1"
 },
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "rollOverShadow": false,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Main Entrance",
 "shadowBlurRadius": 15,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 2"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lobby",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Reception",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 3"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Reception",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 4"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Meeting Area 1",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 5"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Meeting Area 2",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 6"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Bar",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 7"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Chill Out",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 8"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Terrace",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 9"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Garden",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 10"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button <BACK"
 },
 "fontFamily": "Oswald",
 "rollOverFontSize": 18,
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "shadowColor": "#000000",
 "rollOverFontFamily": "Oswald",
 "layout": "horizontal",
 "iconHeight": 30,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 5,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "BACK",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "gap": 10,
 "backgroundOpacity": 0.5,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": "100%",
 "overflow": "scroll",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 8,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "gap": 5,
 "backgroundOpacity": 0,
 "rollOverShadowBlurRadius": 18,
 "data": {
  "name": "Button text 1"
 },
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "rollOverShadow": false,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 15,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 2"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Lorem Ipsum",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 3"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 4"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 5"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 6"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 7"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 8"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 9"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159EBDDD_31FA_0014_41C8_935504B30727",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 10"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button <BACK"
 },
 "fontFamily": "Oswald",
 "rollOverFontSize": 18,
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "shadowColor": "#000000",
 "rollOverFontFamily": "Oswald",
 "layout": "horizontal",
 "iconHeight": 30,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 5,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "BACK",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "gap": 10,
 "backgroundOpacity": 0.5,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": "100%",
 "overflow": "scroll",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 8,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "gap": 5,
 "backgroundOpacity": 0,
 "rollOverShadowBlurRadius": 18,
 "data": {
  "name": "Button text 1"
 },
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "rollOverShadow": false,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 15,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 2"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Lorem Ipsum",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 3"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 4"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 5"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 6"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 7"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 8"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 9"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 10"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button <BACK"
 },
 "fontFamily": "Oswald",
 "rollOverFontSize": 18,
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "shadowColor": "#000000",
 "rollOverFontFamily": "Oswald",
 "layout": "horizontal",
 "iconHeight": 30,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 5,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "BACK",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "gap": 10,
 "backgroundOpacity": 0.5,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": "100%",
 "overflow": "scroll",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 8,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "gap": 5,
 "backgroundOpacity": 0,
 "rollOverShadowBlurRadius": 18,
 "data": {
  "name": "Button text 1"
 },
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "rollOverShadow": false,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 15,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 2"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Lorem Ipsum",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 3"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 4"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 5"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 6"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 7"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 8"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 9"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 10"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button <BACK"
 },
 "fontFamily": "Oswald",
 "rollOverFontSize": 18,
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "shadowColor": "#000000",
 "rollOverFontFamily": "Oswald",
 "layout": "horizontal",
 "iconHeight": 30,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 5,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "BACK",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "gap": 10,
 "backgroundOpacity": 0.5,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": "100%",
 "overflow": "scroll",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 8,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "gap": 5,
 "backgroundOpacity": 0,
 "rollOverShadowBlurRadius": 18,
 "data": {
  "name": "Button text 1"
 },
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "rollOverShadow": false,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 15,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 2"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Lorem Ipsum",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 3"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 4"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 5"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 6"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 7"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 8"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 9"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 10"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button <BACK"
 },
 "fontFamily": "Oswald",
 "rollOverFontSize": 18,
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "shadowColor": "#000000",
 "rollOverFontFamily": "Oswald",
 "layout": "horizontal",
 "iconHeight": 30,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 5,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 50,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "BACK",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 30,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "gap": 10,
 "backgroundOpacity": 0.5,
 "width": "100%",
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "height": 1,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "gap": 10,
 "backgroundOpacity": 0,
 "width": "100%",
 "overflow": "scroll",
 "layout": "absolute",
 "class": "Container",
 "propagateClick": true,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 8,
 "shadow": false,
 "contentOpaque": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "gap": 5,
 "backgroundOpacity": 0,
 "rollOverShadowBlurRadius": 18,
 "data": {
  "name": "Button text 1"
 },
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "rollOverShadow": false,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 15,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "gap": 23,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 2"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedLabel": "Lorem Ipsum",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 3"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 4"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 5"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 6"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DD310_3106_01EC_4190_7815FA70349E",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 7"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 8"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DA310_3106_01EC_41BE_DF88732C2A28",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 9"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D9311_3106_01EC_41A8_3BD8769525D6",
 "gap": 5,
 "backgroundOpacity": 0,
 "width": "100%",
 "data": {
  "name": "Button text 10"
 },
 "fontFamily": "Oswald",
 "shadowColor": "#000000",
 "layout": "horizontal",
 "iconHeight": 32,
 "class": "Button",
 "propagateClick": true,
 "verticalAlign": "middle",
 "pressedBackgroundOpacity": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "paddingLeft": 10,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "shadow": false,
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 36,
 "fontSize": 18,
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "Lorem Ipsum",
 "shadowBlurRadius": 6,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundOpacity": 0.8,
 "paddingRight": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "borderRadius": 0,
 "fontWeight": "normal"
},
{
 "paddingBottom": 0,
 "maxWidth": 200,
 "id": "Image_1E18723C_57F1_802D_41C5_8325536874A5",
 "backgroundOpacity": 0,
 "maxHeight": 200,
 "width": "25%",
 "url": "skin/Image_1E18723C_57F1_802D_41C5_8325536874A5.jpg",
 "class": "Image",
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": "100%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "data": {
  "name": "agent photo"
 },
 "horizontalAlign": "left",
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "borderRadius": 0
},
{
 "scrollBarColor": "#04A3E1",
 "paddingBottom": 10,
 "id": "HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC",
 "backgroundOpacity": 0,
 "width": "75%",
 "class": "HTMLText",
 "propagateClick": false,
 "minHeight": 1,
 "paddingLeft": 10,
 "height": "100%",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.51vh;font-family:'Oswald';\"><B><I>JOHN DOE</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.4vh;font-family:'Oswald';\"><I>Licensed Real Estate Salesperson</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>jhondoe@realestate.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.09vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.09vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText19460"
 },
 "paddingRight": 10,
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "data": {
  "name": "IconButton Info"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038.png",
 "rollOverIconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "data": {
  "name": "IconButton Thumblist"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83.png",
 "rollOverIconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "data": {
  "name": "IconButton Location"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F.png",
 "rollOverIconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "data": {
  "name": "IconButton Photoalbum"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5.png",
 "rollOverIconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": true,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "data": {
  "name": "IconButton Floorplan"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15.png",
 "rollOverIconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, true, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_pressed.png",
 "data": {
  "name": "IconButton Realtor"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7.png",
 "rollOverIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 44,
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 44,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "data": {
  "name": "IconButton Video"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF.png",
 "rollOverIconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF_rollover.png",
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
},
{
 "paddingBottom": 0,
 "maxWidth": 101,
 "id": "IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F",
 "backgroundOpacity": 0,
 "maxHeight": 101,
 "width": 50,
 "transparencyActive": false,
 "class": "IconButton",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "height": 50,
 "mode": "push",
 "shadow": false,
 "borderSize": 0,
 "paddingTop": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F_pressed.png",
 "data": {
  "name": "IconButton --"
 },
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F.png",
 "visible": false,
 "paddingRight": 0,
 "cursor": "hand",
 "borderRadius": 0
}],
 "scrollBarMargin": 2,
 "backgroundPreloadEnabled": true,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "vrPolyfillScale": 0.5,
 "mobileMipmappingEnabled": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player468"
 },
 "horizontalAlign": "left",
 "height": "100%",
 "paddingRight": 0,
 "borderRadius": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
