/*!
 * Omexa Player v1.0.0
 * Modern video player for web
 * https://github.com/your-username/omexa-player
 * 
 * Copyright (c) 2024
 * Released under the MIT License
 */
(function() {
  'use strict';
  
  // Icons module
  const ICONS = {
  play: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>`,
  
  pause: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>`,
  
  rewind: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
  </svg>`,
  
  fastForward: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
  </svg>`,
  
  fullscreen: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </svg>`,
  
  exitFullscreen: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
  </svg>`,
  
  volumeUp: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>`,
  
  volumeMute: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>`,
  
  settings: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>`
}; 
  
  // Styles module
  const STYLES = `
.omexa-player {
    position: relative;
    width: 640px;
    max-width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1;
}

    .omexa-player-wrapper {
        position: relative;
        width: 640px;
        max-width: 100%;
    }

.omexa-player * {
  box-sizing: border-box;
}

.omexa-player video {
  width: 100%;
  height: auto;
  display: block;
}

.omexa-player-youtube {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.omexa-player-youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.omexa-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 20px 16px 16px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.omexa-player:hover .omexa-controls,
.omexa-controls.active {
  transform: translateY(0);
}

.omexa-progress-container {
  position: relative;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  margin-bottom: 12px;
  cursor: pointer;
}

.omexa-progress-bar {
  height: 100%;
  background: #ff6b6b;
  border-radius: 2px;
  width: 0%;
  transition: width 0.1s ease;
}

.omexa-progress-buffer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  width: 0%;
}

.omexa-controls-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.omexa-controls-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.omexa-controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.omexa-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  width: 40px;
  height: 40px;
}

.omexa-btn:hover {
  background: rgba(255,255,255,0.1);
}

.omexa-btn svg {
  width: 20px;
  height: 20px;
}

.omexa-btn-play svg {
  width: 24px;
  height: 24px;
}

.omexa-time {
  color: white;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  min-width: 80px;
}

.omexa-volume-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.omexa-volume-slider {
  width: 60px;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.omexa-volume-bar {
  height: 100%;
  background: white;
  border-radius: 2px;
  width: 100%;
  transition: width 0.1s ease;
}

.omexa-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
}

.omexa-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff6b6b;
  text-align: center;
  font-size: 14px;
}

.omexa-player.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 999999 !important;
  border-radius: 0 !important;
}

.omexa-player.fullscreen video {
  height: 100vh;
  object-fit: contain;
}

/* Hide controls when inactive in fullscreen */
.omexa-player.fullscreen .omexa-controls {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.omexa-player.fullscreen.inactive .omexa-controls {
  opacity: 0;
  pointer-events: none;
}

.omexa-player.fullscreen.inactive {
  cursor: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .omexa-controls {
    padding: 16px 12px 12px;
  }
  
  .omexa-controls-row {
    gap: 8px;
  }
  
  .omexa-controls-left {
    gap: 4px;
  }
  
  .omexa-controls-right {
    gap: 4px;
  }
  
  .omexa-btn {
    width: 36px;
    height: 36px;
    padding: 6px;
  }
  
  .omexa-btn svg {
    width: 18px;
    height: 18px;
  }
  
  .omexa-btn-play svg {
    width: 20px;
    height: 20px;
  }
  
  .omexa-time {
    font-size: 12px;
    min-width: 70px;
  }
  
  .omexa-volume-slider {
    width: 50px;
  }
}

@media (max-width: 480px) {
  .omexa-volume-container {
    display: none;
  }
  
  .omexa-time {
    min-width: 60px;
  }
}

.omexa-branding {
  text-align: right;
  padding: 6px 8px 0;
  font-size: 10px;
  color: #999;
  font-weight: 400;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.omexa-branding:hover {
  opacity: 1;
  color: #666;
}

.omexa-branding a {
  color: inherit;
  text-decoration: none;
}

.omexa-branding a:hover {
  text-decoration: underline;
}
`; 
  
  // YouTube Player module
  class YouTubePlayer {
  constructor(container, videoId, options = {}) {
    this.container = container;
    this.videoId = this.extractVideoId(videoId);
    this.options = options;
    this.player = null;
    this.isReady = false;
    this.callbacks = {};
    
    this.loadYouTubeAPI();
  }
  
  extractVideoId(url) {
    if (!url) return null;
    
    // Direct video ID
    if (url.length === 11 && !url.includes('.')) {
      return url;
    }
    
    // YouTube URL patterns
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  }
  
  loadYouTubeAPI() {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      this.initPlayer();
      return;
    }
    
    // Load YouTube API
    if (!window.ytApiLoading) {
      window.ytApiLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
    
    // Wait for API to load
    const checkAPI = () => {
      if (window.YT && window.YT.Player) {
        this.initPlayer();
      } else {
        setTimeout(checkAPI, 100);
      }
    };
    checkAPI();
  }
  
  initPlayer() {
    const iframe = document.createElement('div');
    iframe.id = `omexa-yt-${Date.now()}`;
    this.container.appendChild(iframe);
    
    this.player = new window.YT.Player(iframe.id, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: {
        autoplay: this.options.autoplay ? 1 : 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0
      },
      events: {
        onReady: () => {
          this.isReady = true;
          this.trigger('ready');
        },
        onStateChange: (event) => {
          this.handleStateChange(event);
        },
        onError: (event) => {
          this.trigger('error', event.data);
        }
      }
    });
  }
  
  handleStateChange(event) {
    const state = event.data;
    
    switch (state) {
      case window.YT.PlayerState.UNSTARTED:
        this.trigger('loadstart');
        break;
      case window.YT.PlayerState.ENDED:
        this.trigger('ended');
        break;
      case window.YT.PlayerState.PLAYING:
        this.trigger('play');
        this.trigger('playing');
        break;
      case window.YT.PlayerState.PAUSED:
        this.trigger('pause');
        break;
      case window.YT.PlayerState.BUFFERING:
        this.trigger('waiting');
        break;
      case window.YT.PlayerState.CUED:
        this.trigger('loadeddata');
        break;
    }
  }
  
  // Control methods
  play() {
    if (this.isReady && this.player) {
      this.player.playVideo();
    }
  }
  
  pause() {
    if (this.isReady && this.player) {
      this.player.pauseVideo();
    }
  }
  
  seek(time) {
    if (this.isReady && this.player) {
      this.player.seekTo(time, true);
    }
  }
  
  setVolume(volume) {
    if (this.isReady && this.player) {
      this.player.setVolume(volume * 100);
    }
  }
  
  mute() {
    if (this.isReady && this.player) {
      this.player.mute();
    }
  }
  
  unmute() {
    if (this.isReady && this.player) {
      this.player.unMute();
    }
  }
  
  // State getters
  getCurrentTime() {
    if (this.isReady && this.player) {
      return this.player.getCurrentTime() || 0;
    }
    return 0;
  }
  
  getDuration() {
    if (this.isReady && this.player) {
      return this.player.getDuration() || 0;
    }
    return 0;
  }
  
  getVolume() {
    if (this.isReady && this.player) {
      return (this.player.getVolume() || 0) / 100;
    }
    return 1;
  }
  
  isMuted() {
    if (this.isReady && this.player) {
      return this.player.isMuted();
    }
    return false;
  }
  
  isPaused() {
    if (this.isReady && this.player) {
      const state = this.player.getPlayerState();
      return state !== window.YT.PlayerState.PLAYING;
    }
    return true;
  }
  
  getLoadedFraction() {
    if (this.isReady && this.player) {
      return this.player.getVideoLoadedFraction() || 0;
    }
    return 0;
  }
  
  // Event system
  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }
  
  off(event, callback) {
    if (this.callbacks[event]) {
      const index = this.callbacks[event].indexOf(callback);
      if (index > -1) {
        this.callbacks[event].splice(index, 1);
      }
    }
  }
  
  trigger(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data));
    }
  }
  
  destroy() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
    this.callbacks = {};
    this.isReady = false;
  }
} 
  
  // Controls module
  

class Controls {
  constructor(player) {
    this.player = player;
    this.controlsContainer = null;
    this.progressContainer = null;
    this.progressBar = null;
    this.bufferBar = null;
    this.playButton = null;
    this.timeDisplay = null;
    this.volumeButton = null;
    this.volumeSlider = null;
    this.volumeBar = null;
    this.fullscreenButton = null;
    this.rewindButton = null;
    this.fastForwardButton = null;
    
    this.isDragging = false;
    this.lastVolume = 1;
    this.isFullscreen = false;
    this.inactivityTimer = null;
    
    this.createControls();
    this.bindEvents();
  }
  
  createControls() {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'omexa-controls';
    
    // Progress bar
    this.progressContainer = document.createElement('div');
    this.progressContainer.className = 'omexa-progress-container';
    
    this.bufferBar = document.createElement('div');
    this.bufferBar.className = 'omexa-progress-buffer';
    
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'omexa-progress-bar';
    
    this.progressContainer.appendChild(this.bufferBar);
    this.progressContainer.appendChild(this.progressBar);
    
    // Controls row
    const controlsRow = document.createElement('div');
    controlsRow.className = 'omexa-controls-row';
    
    // Left controls
    const leftControls = document.createElement('div');
    leftControls.className = 'omexa-controls-left';
    
    // Rewind button
    this.rewindButton = this.createButton('rewind', 'omexa-btn-rewind');
    
    // Play/Pause button
    this.playButton = this.createButton('play', 'omexa-btn-play');
    
    // Fast forward button
    this.fastForwardButton = this.createButton('fastForward', 'omexa-btn-fast-forward');
    
    // Time display
    this.timeDisplay = document.createElement('div');
    this.timeDisplay.className = 'omexa-time';
    this.timeDisplay.textContent = '0:00 / 0:00';
    
    leftControls.appendChild(this.rewindButton);
    leftControls.appendChild(this.playButton);
    leftControls.appendChild(this.fastForwardButton);
    leftControls.appendChild(this.timeDisplay);
    
    // Right controls
    const rightControls = document.createElement('div');
    rightControls.className = 'omexa-controls-right';
    
    // Volume controls
    const volumeContainer = document.createElement('div');
    volumeContainer.className = 'omexa-volume-container';
    
    this.volumeButton = this.createButton('volumeUp', 'omexa-btn-volume');
    
    this.volumeSlider = document.createElement('div');
    this.volumeSlider.className = 'omexa-volume-slider';
    
    this.volumeBar = document.createElement('div');
    this.volumeBar.className = 'omexa-volume-bar';
    
    this.volumeSlider.appendChild(this.volumeBar);
    volumeContainer.appendChild(this.volumeButton);
    volumeContainer.appendChild(this.volumeSlider);
    
    // Fullscreen button
    this.fullscreenButton = this.createButton('fullscreen', 'omexa-btn-fullscreen');
    
    rightControls.appendChild(volumeContainer);
    rightControls.appendChild(this.fullscreenButton);
    
    // Assemble controls
    controlsRow.appendChild(leftControls);
    controlsRow.appendChild(rightControls);
    
    this.controlsContainer.appendChild(this.progressContainer);
    this.controlsContainer.appendChild(controlsRow);
    
    return this.controlsContainer;
  }
  
  createButton(iconName, className) {
    const button = document.createElement('button');
    button.className = `omexa-btn ${className}`;
    button.innerHTML = ICONS[iconName];
    button.type = 'button';
    return button;
  }
  
  bindEvents() {
    // Play/Pause
    this.playButton.addEventListener('click', () => {
      if (this.player.isPaused()) {
        this.player.play();
      } else {
        this.player.pause();
      }
    });
    
    // Rewind (10 seconds)
    this.rewindButton.addEventListener('click', () => {
      const currentTime = this.player.getCurrentTime();
      this.player.seek(Math.max(0, currentTime - 10));
    });
    
    // Fast forward (10 seconds)
    this.fastForwardButton.addEventListener('click', () => {
      const currentTime = this.player.getCurrentTime();
      const duration = this.player.getDuration();
      this.player.seek(Math.min(duration, currentTime + 10));
    });
    
    // Progress bar
    this.progressContainer.addEventListener('mousedown', this.handleProgressMouseDown.bind(this));
    this.progressContainer.addEventListener('mousemove', this.handleProgressMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleProgressMouseUp.bind(this));
    
    // Volume button
    this.volumeButton.addEventListener('click', () => {
      if (this.player.isMuted() || this.player.getVolume() === 0) {
        this.player.unmute();
        this.player.setVolume(this.lastVolume);
      } else {
        this.lastVolume = this.player.getVolume();
        this.player.mute();
      }
    });
    
    // Volume slider
    this.volumeSlider.addEventListener('mousedown', this.handleVolumeMouseDown.bind(this));
    this.volumeSlider.addEventListener('mousemove', this.handleVolumeMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleVolumeMouseUp.bind(this));
    
    // Fullscreen
    this.fullscreenButton.addEventListener('click', () => {
      this.toggleFullscreen();
    });
    
    // Keyboard controls
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Fullscreen change events
    document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    
    // Mouse activity tracking for fullscreen
    this.player.container.addEventListener('mousemove', this.handleMouseActivity.bind(this));
    this.player.container.addEventListener('mouseenter', this.handleMouseActivity.bind(this));
    this.player.container.addEventListener('mouseleave', this.handleMouseInactivity.bind(this));
  }
  
  handleProgressMouseDown(e) {
    this.isDragging = true;
    this.updateProgress(e);
  }
  
  handleProgressMouseMove(e) {
    if (this.isDragging) {
      this.updateProgress(e);
    }
  }
  
  handleProgressMouseUp() {
    this.isDragging = false;
  }
  
  updateProgress(e) {
    const rect = this.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const time = pos * this.player.getDuration();
    this.player.seek(Math.max(0, Math.min(this.player.getDuration(), time)));
  }
  
  handleVolumeMouseDown(e) {
    this.isDraggingVolume = true;
    this.updateVolume(e);
  }
  
  handleVolumeMouseMove(e) {
    if (this.isDraggingVolume) {
      this.updateVolume(e);
    }
  }
  
  handleVolumeMouseUp() {
    this.isDraggingVolume = false;
  }
  
  updateVolume(e) {
    const rect = this.volumeSlider.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this.player.setVolume(pos);
    this.player.unmute();
  }
  
  handleKeydown(e) {
    if (!this.player.container.contains(document.activeElement) && !this.isFullscreen) {
      return;
    }
    
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        if (this.player.isPaused()) {
          this.player.play();
        } else {
          this.player.pause();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const currentTime = this.player.getCurrentTime();
        this.player.seek(Math.max(0, currentTime - 5));
        break;
      case 'ArrowRight':
        e.preventDefault();
        const currentTime2 = this.player.getCurrentTime();
        const duration = this.player.getDuration();
        this.player.seek(Math.min(duration, currentTime2 + 5));
        break;
      case 'ArrowUp':
        e.preventDefault();
        const volume = Math.min(1, this.player.getVolume() + 0.1);
        this.player.setVolume(volume);
        this.player.unmute();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const volume2 = Math.max(0, this.player.getVolume() - 0.1);
        this.player.setVolume(volume2);
        break;
      case 'KeyF':
        e.preventDefault();
        this.toggleFullscreen();
        break;
      case 'KeyM':
        e.preventDefault();
        if (this.player.isMuted()) {
          this.player.unmute();
        } else {
          this.player.mute();
        }
        break;
      case 'Escape':
        if (this.isFullscreen) {
          this.exitFullscreen();
        }
        break;
    }
  }
  
  toggleFullscreen() {
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }
  
  enterFullscreen() {
    const container = this.player.container;
    
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else {
      // Fallback for browsers without fullscreen API
      container.classList.add('fullscreen');
      this.isFullscreen = true;
      this.updateFullscreenUI();
    }
  }
  
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      // Fallback
      this.player.container.classList.remove('fullscreen');
      this.isFullscreen = false;
      this.updateFullscreenUI();
    }
  }
  
  handleFullscreenChange() {
    const isFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
    
    this.isFullscreen = isFullscreen;
    this.updateFullscreenUI();
    
    if (isFullscreen) {
      this.player.container.classList.add('fullscreen');
    } else {
      this.player.container.classList.remove('fullscreen');
    }
  }
  
  updateFullscreenUI() {
    if (this.isFullscreen) {
      this.fullscreenButton.innerHTML = ICONS.exitFullscreen;
    } else {
      this.fullscreenButton.innerHTML = ICONS.fullscreen;
    }
  }
  
  handleMouseActivity() {
    if (this.isFullscreen) {
      this.player.container.classList.remove('inactive');
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        if (this.isFullscreen) {
          this.player.container.classList.add('inactive');
        }
      }, 3000);
    }
  }
  
  handleMouseInactivity() {
    if (this.isFullscreen) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        this.player.container.classList.add('inactive');
      }, 1000);
    }
  }
  
  updateTime() {
    const currentTime = this.player.getCurrentTime();
    const duration = this.player.getDuration();
    
    // Update progress bar
    if (duration > 0 && !this.isDragging) {
      const progress = (currentTime / duration) * 100;
      this.progressBar.style.width = `${progress}%`;
    }
    
    // Update buffer bar
    const buffered = this.player.getLoadedFraction();
    if (buffered) {
      this.bufferBar.style.width = `${buffered * 100}%`;
    }
    
    // Update time display
    this.timeDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`;
  }
  
  updatePlayButton() {
    if (this.player.isPaused()) {
      this.playButton.innerHTML = ICONS.play;
    } else {
      this.playButton.innerHTML = ICONS.pause;
    }
  }
  
  updateVolumeControls() {
    const volume = this.player.getVolume();
    const isMuted = this.player.isMuted();
    
    // Update volume button icon
    if (isMuted || volume === 0) {
      this.volumeButton.innerHTML = ICONS.volumeMute;
    } else {
      this.volumeButton.innerHTML = ICONS.volumeUp;
    }
    
    // Update volume bar
    this.volumeBar.style.width = `${isMuted ? 0 : volume * 100}%`;
  }
  
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  show() {
    this.controlsContainer.classList.add('active');
  }
  
  hide() {
    this.controlsContainer.classList.remove('active');
  }
  
  destroy() {
    if (this.controlsContainer && this.controlsContainer.parentNode) {
      this.controlsContainer.parentNode.removeChild(this.controlsContainer);
    }
    
    // Clean up event listeners
    document.removeEventListener('mouseup', this.handleProgressMouseUp.bind(this));
    document.removeEventListener('mouseup', this.handleVolumeMouseUp.bind(this));
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    
    clearTimeout(this.inactivityTimer);
  }
} 
  
  // Main Player module
  



class OmexaPlayer {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      autoplay: false,
      muted: false,
      volume: 1,
      ...options
    };
    
    // Parse data attributes
    if (this.container) {
      this.parseDataAttributes();
    }
    
    this.mediaElement = null;
    this.youtubePlayer = null;
    this.controls = null;
    this.isYouTube = false;
    this.isReady = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = this.options.volume;
    this.muted = this.options.muted;
    this.updateInterval = null;
    
    this.init();
  }
  
  parseDataAttributes() {
    const type = this.container.dataset.type;
    const src = this.container.dataset.src;
    const autoplay = this.container.dataset.autoplay;
    
    if (src) this.options.src = src;
    if (type) this.options.type = type;
    if (autoplay !== undefined) this.options.autoplay = autoplay === 'true';
  }
  
  init() {
    if (!this.container || !this.options.src) {
      this.showError('Container or source not found');
      return;
    }
    
    this.injectStyles();
    this.setupContainer();
    this.detectVideoType();
    this.createPlayer();
  }
  
  injectStyles() {
    // Check if styles are already injected
    if (document.querySelector('#omexa-player-styles')) {
      return;
    }
    
    const style = document.createElement('style');
    style.id = 'omexa-player-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }
  
  setupContainer() {
    // Create wrapper if it doesn't exist
    if (!this.container.parentElement || !this.container.parentElement.classList.contains('omexa-player-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'omexa-player-wrapper';
      this.container.parentNode.insertBefore(wrapper, this.container);
      wrapper.appendChild(this.container);
      this.wrapper = wrapper;
    } else {
      this.wrapper = this.container.parentElement;
    }
    
    this.container.className = 'omexa-player';
    this.container.innerHTML = ''; // Clear existing content
  }
  
  detectVideoType() {
    const src = this.options.src;
    const type = this.options.type;
    
    if (type === 'youtube' || this.isYouTubeUrl(src)) {
      this.isYouTube = true;
    } else {
      this.isYouTube = false;
    }
  }
  
  isYouTubeUrl(url) {
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/,
      /youtube\.com\/v\//
    ];
    
    return youtubePatterns.some(pattern => pattern.test(url));
  }
  
  createPlayer() {
    this.showLoading();
    
    if (this.isYouTube) {
      this.createYouTubePlayer();
    } else {
      this.createVideoPlayer();
    }
    
    this.createControls();
  }
  
  createVideoPlayer() {
    this.mediaElement = document.createElement('video');
    this.mediaElement.src = this.options.src;
    this.mediaElement.preload = 'metadata';
    this.mediaElement.volume = this.volume;
    this.mediaElement.muted = this.muted;
    
    if (this.options.autoplay) {
      this.mediaElement.autoplay = true;
      this.mediaElement.muted = true; // Required for autoplay in most browsers
    }
    
    this.container.appendChild(this.mediaElement);
    this.bindVideoEvents();
  }
  
  createYouTubePlayer() {
    const youtubeContainer = document.createElement('div');
    youtubeContainer.className = 'omexa-player-youtube';
    this.container.appendChild(youtubeContainer);
    
    this.youtubePlayer = new YouTubePlayer(youtubeContainer, this.options.src, {
      autoplay: this.options.autoplay
    });
    
    this.bindYouTubeEvents();
  }
  
  bindVideoEvents() {
    if (!this.mediaElement) return;
    
    this.mediaElement.addEventListener('loadstart', () => {
      this.hideLoading();
    });
    
    this.mediaElement.addEventListener('loadedmetadata', () => {
      this.duration = this.mediaElement.duration;
      this.isReady = true;
      this.startTimeUpdates();
    });
    
    this.mediaElement.addEventListener('play', () => {
      if (this.controls) {
        this.controls.updatePlayButton();
      }
    });
    
    this.mediaElement.addEventListener('pause', () => {
      if (this.controls) {
        this.controls.updatePlayButton();
      }
    });
    
    this.mediaElement.addEventListener('volumechange', () => {
      if (this.controls) {
        this.controls.updateVolumeControls();
      }
    });
    
    this.mediaElement.addEventListener('timeupdate', () => {
      this.currentTime = this.mediaElement.currentTime;
    });
    
    this.mediaElement.addEventListener('error', (e) => {
      this.showError('Failed to load video');
    });
    
    this.mediaElement.addEventListener('ended', () => {
      if (this.controls) {
        this.controls.updatePlayButton();
      }
    });
  }
  
  bindYouTubeEvents() {
    if (!this.youtubePlayer) return;
    
    this.youtubePlayer.on('ready', () => {
      this.hideLoading();
      this.isReady = true;
      this.startTimeUpdates();
    });
    
    this.youtubePlayer.on('play', () => {
      if (this.controls) {
        this.controls.updatePlayButton();
      }
    });
    
    this.youtubePlayer.on('pause', () => {
      if (this.controls) {
        this.controls.updatePlayButton();
      }
    });
    
    this.youtubePlayer.on('ended', () => {
      if (this.controls) {
        this.controls.updatePlayButton();
      }
    });
    
    this.youtubePlayer.on('error', (errorCode) => {
      let errorMessage = 'Failed to load YouTube video';
      switch(errorCode) {
        case 2:
          errorMessage = 'Invalid YouTube video ID';
          break;
        case 5:
          errorMessage = 'Video cannot be played in HTML5 player';
          break;
        case 100:
          errorMessage = 'Video not found or private';
          break;
        case 101:
        case 150:
          errorMessage = 'Video embedding disabled by owner';
          break;
        default:
          errorMessage = `YouTube error (${errorCode}): Video unavailable`;
      }
      this.showError(errorMessage);
    });
  }
  
  createControls() {
    this.controls = new Controls(this);
    this.container.appendChild(this.controls.controlsContainer);
    this.addBranding();
  }
  
  addBranding() {
    // Remove existing branding if present
    const existingBranding = this.wrapper.querySelector('.omexa-branding');
    if (existingBranding) {
      existingBranding.remove();
    }
    
    // Add subtle branding
    const branding = document.createElement('div');
    branding.className = 'omexa-branding';
    branding.innerHTML = 'Powered by <a href="https://github.com/your-username/omexa-player" target="_blank">Omexa Player</a>';
    this.wrapper.appendChild(branding);
  }
  
  startTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    this.updateInterval = setInterval(() => {
      if (this.controls) {
        this.controls.updateTime();
        this.controls.updateVolumeControls();
      }
    }, 100);
  }
  
  showLoading() {
    this.hideError();
    const loading = document.createElement('div');
    loading.className = 'omexa-loading';
    loading.textContent = 'Loading...';
    loading.id = 'omexa-loading';
    this.container.appendChild(loading);
  }
  
  hideLoading() {
    const loading = this.container.querySelector('#omexa-loading');
    if (loading) {
      loading.remove();
    }
  }
  
  showError(message) {
    this.hideLoading();
    const error = document.createElement('div');
    error.className = 'omexa-error';
    error.textContent = message;
    error.id = 'omexa-error';
    this.container.appendChild(error);
  }
  
  hideError() {
    const error = this.container.querySelector('#omexa-error');
    if (error) {
      error.remove();
    }
  }
  
  // Public API methods
  play() {
    if (this.isYouTube && this.youtubePlayer) {
      this.youtubePlayer.play();
    } else if (this.mediaElement) {
      this.mediaElement.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }
  
  pause() {
    if (this.isYouTube && this.youtubePlayer) {
      this.youtubePlayer.pause();
    } else if (this.mediaElement) {
      this.mediaElement.pause();
    }
  }
  
  seek(time) {
    if (this.isYouTube && this.youtubePlayer) {
      this.youtubePlayer.seek(time);
    } else if (this.mediaElement) {
      this.mediaElement.currentTime = time;
    }
  }
  
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.isYouTube && this.youtubePlayer) {
      this.youtubePlayer.setVolume(this.volume);
    } else if (this.mediaElement) {
      this.mediaElement.volume = this.volume;
    }
  }
  
  getVolume() {
    if (this.isYouTube && this.youtubePlayer) {
      return this.youtubePlayer.getVolume();
    } else if (this.mediaElement) {
      return this.mediaElement.volume;
    }
    return this.volume;
  }
  
  mute() {
    if (this.isYouTube && this.youtubePlayer) {
      this.youtubePlayer.mute();
    } else if (this.mediaElement) {
      this.mediaElement.muted = true;
    }
  }
  
  unmute() {
    if (this.isYouTube && this.youtubePlayer) {
      this.youtubePlayer.unmute();
    } else if (this.mediaElement) {
      this.mediaElement.muted = false;
    }
  }
  
  isMuted() {
    if (this.isYouTube && this.youtubePlayer) {
      return this.youtubePlayer.isMuted();
    } else if (this.mediaElement) {
      return this.mediaElement.muted;
    }
    return false;
  }
  
  isPaused() {
    if (this.isYouTube && this.youtubePlayer) {
      return this.youtubePlayer.isPaused();
    } else if (this.mediaElement) {
      return this.mediaElement.paused;
    }
    return true;
  }
  
  getCurrentTime() {
    if (this.isYouTube && this.youtubePlayer) {
      return this.youtubePlayer.getCurrentTime();
    } else if (this.mediaElement) {
      return this.mediaElement.currentTime;
    }
    return 0;
  }
  
  getDuration() {
    if (this.isYouTube && this.youtubePlayer) {
      return this.youtubePlayer.getDuration();
    } else if (this.mediaElement) {
      return this.mediaElement.duration || 0;
    }
    return 0;
  }
  
  getLoadedFraction() {
    if (this.isYouTube && this.youtubePlayer) {
      return this.youtubePlayer.getLoadedFraction();
    } else if (this.mediaElement && this.mediaElement.buffered.length > 0) {
      const buffered = this.mediaElement.buffered;
      const duration = this.mediaElement.duration;
      if (duration > 0) {
        return buffered.end(buffered.length - 1) / duration;
      }
    }
    return 0;
  }
  
  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    if (this.controls) {
      this.controls.destroy();
    }
    
    if (this.youtubePlayer) {
      this.youtubePlayer.destroy();
    }
    
    if (this.mediaElement) {
      this.mediaElement.remove();
    }
    
    // Clean up branding
    const branding = this.wrapper && this.wrapper.querySelector('.omexa-branding');
    if (branding) {
      branding.remove();
    }
    
    this.container.innerHTML = '';
    this.container.className = '';
    
    // If we created a wrapper, remove it and restore original structure
    if (this.wrapper && this.wrapper.classList.contains('omexa-player-wrapper')) {
      const parent = this.wrapper.parentNode;
      if (parent) {
        parent.insertBefore(this.container, this.wrapper);
        parent.removeChild(this.wrapper);
      }
    }
  }
}

// Auto-initialize players on page load
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('[data-type][data-src]');
  containers.forEach(container => {
    if (!container.omexaPlayer) {
      container.omexaPlayer = new OmexaPlayer(container);
    }
  });
});

// Global object for manual initialization
if (typeof window !== 'undefined') {
  window.OmexaPlayer = OmexaPlayer;
} 
  
})();