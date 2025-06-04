import { STYLES } from './styles.js';
import { Controls } from './controls.js';
import { YouTubePlayer } from './youtube.js';

export class OmexaPlayer {
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
      // Keep loading spinner visible during initial load
    });
    
    this.mediaElement.addEventListener('loadedmetadata', () => {
      this.duration = this.mediaElement.duration;
      this.isReady = true;
      this.hideLoading();
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
    
    this.mediaElement.addEventListener('waiting', () => {
      this.showBuffering();
    });
    
    this.mediaElement.addEventListener('canplay', () => {
      this.hideBuffering();
    });
    
    this.mediaElement.addEventListener('playing', () => {
      this.hideBuffering();
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
    
    this.youtubePlayer.on('waiting', () => {
      this.showBuffering();
    });
    
    this.youtubePlayer.on('playing', () => {
      this.hideBuffering();
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
    loading.id = 'omexa-loading';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'omexa-loading-spinner';
    
    // Create loading text
    const text = document.createElement('div');
    text.className = 'omexa-loading-text';
    text.textContent = 'Loading...';
    
    loading.appendChild(spinner);
    loading.appendChild(text);
    this.container.appendChild(loading);
  }
  
  hideLoading() {
    const loading = this.container.querySelector('#omexa-loading');
    if (loading) {
      loading.remove();
    }
  }
  
  showBuffering() {
    // Don't show buffering if we're still in initial loading phase
    if (!this.isReady) return;
    
    // Don't show multiple buffering indicators
    if (this.container.querySelector('#omexa-buffering')) return;
    
    const buffering = document.createElement('div');
    buffering.className = 'omexa-loading';
    buffering.id = 'omexa-buffering';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'omexa-loading-spinner';
    
    // Create loading text
    const text = document.createElement('div');
    text.className = 'omexa-loading-text';
    text.textContent = 'Loading...';
    
    buffering.appendChild(spinner);
    buffering.appendChild(text);
    this.container.appendChild(buffering);
  }
  
  hideBuffering() {
    const buffering = this.container.querySelector('#omexa-buffering');
    if (buffering) {
      buffering.remove();
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