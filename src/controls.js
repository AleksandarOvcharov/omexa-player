import { ICONS } from './icons.js';

export class Controls {
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
        this.isHovering = false;
    
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
        this.player.container.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.player.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
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
    // Handle keyboard events if hovering over player or in fullscreen
    if (!this.isHovering && !this.isFullscreen) {
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
                // Show controls in fullscreen when pausing/playing
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'Digit0':
            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6':
            case 'Digit7':
            case 'Digit8':
            case 'Digit9':
                e.preventDefault();
                const digit = parseInt(e.code.replace('Digit', ''));
                const seekTime = (digit / 10) * this.player.getDuration();
                this.player.seek(seekTime);
                // Show controls in fullscreen when seeking
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
                  case 'ArrowLeft':
                e.preventDefault();
                const currentTime = this.player.getCurrentTime();
                this.player.seek(Math.max(0, currentTime - 5));
                // Show controls in fullscreen when seeking
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                const currentTime2 = this.player.getCurrentTime();
                const duration = this.player.getDuration();
                this.player.seek(Math.min(duration, currentTime2 + 5));
                // Show controls in fullscreen when seeking
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                const volume = Math.min(1, this.player.getVolume() + 0.1);
                this.player.setVolume(volume);
                this.player.unmute();
                // Show controls in fullscreen when adjusting volume
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                const volume2 = Math.max(0, this.player.getVolume() - 0.1);
                this.player.setVolume(volume2);
                // Show controls in fullscreen when adjusting volume
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'KeyJ':
                e.preventDefault();
                const currentTimeJ = this.player.getCurrentTime();
                this.player.seek(Math.max(0, currentTimeJ - 10));
                // Show controls in fullscreen when seeking
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'KeyK':
                e.preventDefault();
                if (this.player.isPaused()) {
                    this.player.play();
                } else {
                    this.player.pause();
                }
                // Show controls in fullscreen when pausing/playing
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
                break;
            case 'KeyL':
                e.preventDefault();
                const currentTimeL = this.player.getCurrentTime();
                const durationL = this.player.getDuration();
                this.player.seek(Math.min(durationL, currentTimeL + 10));
                // Show controls in fullscreen when seeking
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
                }
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
                // Show controls in fullscreen when muting/unmuting
                if (this.isFullscreen) {
                    this.player.container.classList.remove('inactive');
                    this.handleMouseActivity();
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
  
  handleMouseEnter() {
    this.isHovering = true;
    this.handleMouseActivity();
  }
  
  handleMouseLeave() {
    this.isHovering = false;
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