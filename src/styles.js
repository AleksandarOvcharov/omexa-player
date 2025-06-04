export const STYLES = `
.omexa-player {
    position: relative;
    width: 640px;
    max-width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1;
    transition: box-shadow 0.3s ease;
}

.omexa-player:hover {
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.5);
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