# 🎬 Omexa Player

A modern, lightweight video player for the web that supports both regular video files and YouTube videos with a unified interface.

![Omexa Player Demo](https://img.shields.io/badge/demo-available-brightgreen) ![File Size](https://img.shields.io/badge/size-~28KB%20minified-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎮 **Modern Controls** - Clean, intuitive interface with custom SVG icons
- 📱 **Responsive Design** - Adapts to different screen sizes and devices
- 🖥️ **Fullscreen Support** - True fullscreen experience with auto-hiding controls
- ⚡ **Lightweight** - Single JavaScript file under 30KB
- 🎯 **Easy Integration** - Just add data attributes and include the script
- ⌨️ **Keyboard Shortcuts** - Full keyboard support for accessibility
- 📺 **YouTube Integration** - Seamless YouTube video support
- 🎵 **Volume Control** - Interactive volume slider and mute functionality
- ⏭️ **Seek Controls** - Progress bar with click-to-seek and keyboard navigation
- 🏷️ **Subtle Branding** - Unobtrusive "Powered by Omexa Player" attribution

## 🚀 Quick Start

### CDN Installation (Recommended)

```html
<!-- Add this to your HTML -->
<div id="player-container"
     data-type="video"
     data-src="https://example.com/video.mp4">
</div>

<script src="https://cdn.jsdelivr.net/gh/your-username/omexa-player@latest/dist/omexa-player.min.js"></script>
```

### Local Installation

1. Download `omexa-player.min.js` from the releases
2. Include it in your HTML:

```html
<script src="path/to/omexa-player.min.js"></script>
```

## 📖 Usage

### Basic Video Player

```html
<div id="my-video"
     data-type="video"
     data-src="https://example.com/video.mp4">
</div>
```

### YouTube Video Player

```html
<div id="my-youtube-video"
     data-type="youtube"
     data-src="https://www.youtube.com/watch?v=VIDEO_ID"
     data-autoplay="false">
</div>
```

### Manual Initialization

```javascript
// Initialize with JavaScript
const player = new OmexaPlayer('#my-container', {
    src: 'https://example.com/video.mp4',
    type: 'video',
    autoplay: false,
    volume: 0.8
});
```

## 🎮 Controls

### Mouse Controls
- **Click Play/Pause** - Toggle video playback
- **Click Progress Bar** - Seek to specific time
- **Click Volume Slider** - Adjust volume
- **Hover Controls** - Show/hide control overlay
- **Double-click** - Toggle fullscreen

### Keyboard Shortcuts
- **Space** - Play/Pause
- **←/→** - Seek backward/forward (5 seconds)
- **↑/↓** - Volume up/down (10%)
- **M** - Mute/Unmute
- **F** - Toggle fullscreen
- **Esc** - Exit fullscreen

### Button Controls
- **⏮️ Rewind** - Go back 10 seconds
- **▶️/⏸️ Play/Pause** - Toggle playback
- **⏭️ Fast Forward** - Go forward 10 seconds
- **🔊 Volume** - Mute/unmute and volume control
- **⛶ Fullscreen** - Toggle fullscreen mode

## 🔧 JavaScript API

### Initialization Options

```javascript
const player = new OmexaPlayer(container, {
    src: 'video-url',           // Video source URL
    type: 'video|youtube',      // Player type
    autoplay: false,            // Auto-start playback
    muted: false,               // Start muted
    volume: 1.0                 // Initial volume (0.0 - 1.0)
});
```

### Control Methods

```javascript
// Playback control
player.play();                 // Start playback
player.pause();                // Pause playback
player.seek(120);              // Seek to 2 minutes

// Volume control
player.setVolume(0.5);         // Set volume to 50%
player.mute();                 // Mute audio
player.unmute();               // Unmute audio

// Cleanup
player.destroy();              // Remove player and clean up
```

### State Methods

```javascript
// Get current state
const currentTime = player.getCurrentTime();    // Current playback time
const duration = player.getDuration();          // Video duration
const volume = player.getVolume();              // Current volume
const isPaused = player.isPaused();             // Is video paused?
const isMuted = player.isMuted();               // Is audio muted?
const buffered = player.getLoadedFraction();    // Buffered percentage
```

## 🎨 Customization

### CSS Custom Properties

You can customize the player appearance by overriding CSS variables:

```css
.omexa-player {
    --primary-color: #ff6b6b;           /* Progress bar color */
    --control-bg: rgba(0,0,0,0.7);      /* Control overlay background */
    --button-hover: rgba(255,255,255,0.1); /* Button hover color */
}
```

### Custom Styling

The player uses these main CSS classes:

- `.omexa-player-wrapper` - Outer wrapper container
- `.omexa-player` - Main player container
- `.omexa-controls` - Control overlay
- `.omexa-btn` - Control buttons
- `.omexa-progress-container` - Progress bar container
- `.omexa-volume-container` - Volume controls
- `.omexa-branding` - Subtle branding text

## 📱 Responsive Design

The player automatically adapts to different screen sizes:

- **Desktop** - Full controls with hover effects
- **Tablet** - Touch-optimized controls
- **Mobile** - Simplified controls, hidden volume slider

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 File Structure

```
omexa-player/
├── src/
│   ├── player.js          # Main player class
│   ├── controls.js        # UI controls and interactions
│   ├── youtube.js         # YouTube API integration
│   ├── icons.js           # SVG icon definitions
│   └── styles.js          # CSS styles
├── dist/
│   ├── omexa-player.js    # Development build
│   └── omexa-player.min.js # Production build
├── demo.html              # Demo page
├── build.js               # Build script
└── README.md              # This file
```

## 🔨 Development

### Building from Source

1. Clone the repository:
```bash
git clone https://github.com/your-username/omexa-player.git
cd omexa-player
```

2. Build the player:
```bash
node build.js
```

3. Open `demo.html` in your browser to test

### Project Structure

- **`src/`** - Source files (ES6 modules)
- **`dist/`** - Built files for distribution
- **`build.js`** - Simple build script that bundles modules

## 📋 Requirements

### For Regular Videos
- Modern browser with HTML5 video support
- No additional dependencies

### For YouTube Videos
- YouTube iframe API (loaded automatically)
- Internet connection

## 🆘 Troubleshooting

### Video Won't Play
- Check if the video URL is accessible
- Verify CORS headers for cross-origin videos
- Ensure browser supports the video format

### YouTube Videos Not Loading
- Verify the YouTube URL format
- Check if the video is publicly accessible
- Ensure iframe embedding is allowed for the video

### Controls Not Appearing
- Check if CSS styles are properly loaded
- Verify the container has sufficient height
- Check browser console for JavaScript errors

## 📄 License

MIT License - feel free to use in commercial and personal projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📧 Support

For support and questions, please open an issue on GitHub.

---

Made with ❤️ for the web development community 