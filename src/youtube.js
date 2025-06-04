export class YouTubePlayer {
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