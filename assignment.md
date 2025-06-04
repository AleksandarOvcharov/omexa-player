# Omexa Player - Assignment

## Project Overview
Omexa Player is a modern, simple video player that can be easily integrated into any website through a single CDN link. The player supports both regular video files and YouTube videos.

## Key Requirements

### Core Features
- ✅ **Universal Video Support**: Handle both regular video files and YouTube videos
- ✅ **Easy Integration**: Single JavaScript file importable via CDN
- ✅ **Modern UI**: Clean, simple design with modern icons
- ✅ **Responsive Design**: Works across different screen sizes and devices

### Player Controls
- ✅ **Play/Pause Button**: Modern simple icon design
- ✅ **Navigation Arrows**: For seeking/skipping (left/right arrows)
- ✅ **Fullscreen Toggle**: Full browser fullscreen capability
- ✅ **Progress Bar**: Visual timeline with scrubbing capability
- ✅ **Volume Control**: Mute/unmute and volume slider
- ✅ **Time Display**: Current time and total duration

### Technical Requirements
- ✅ **Single File Distribution**: Everything bundled into one JavaScript file
- ✅ **CDN Ready**: Optimized for CDN distribution
- ✅ **Cross-browser Compatible**: Works on modern browsers
- ✅ **Lightweight**: Minimal dependencies and optimized size (~28KB minified)
- ✅ **API Integration**: YouTube API integration for YouTube videos

### Usage Pattern
```html
<!-- For regular videos -->
<div id="player-container"
     data-type="video"
     data-src="https://example.com/video.mp4">
</div>

<!-- For YouTube videos -->
<div id="player-container"
     data-type="youtube"
     data-src="https://example.com/video.mp4"
     data-autoplay="false">
</div>

<script src="https://cdn-url.com/player.js"></script>
```

### Implementation Plan
1. ✅ **Create Player Class**: Main OmexaPlayer class with initialization logic
2. ✅ **Video Type Detection**: Auto-detect and handle different video sources
3. ✅ **UI Components**: Build modern control interface with SVG icons
4. ✅ **YouTube Integration**: Implement YouTube API wrapper
5. ✅ **Fullscreen API**: Cross-browser fullscreen implementation
6. ✅ **Event System**: Comprehensive event handling for controls
7. ✅ **Build System**: Bundle everything into single distributable file

### File Structure
```
/
├── src/
│   ├── player.js          # Main player class ✅
│   ├── controls.js        # UI controls and interactions ✅
│   ├── youtube.js         # YouTube API integration ✅
│   ├── icons.js           # SVG icon definitions ✅
│   └── styles.js          # CSS styles as JavaScript strings ✅
├── dist/
│   ├── omexa-player.js    # Final bundled file ✅
│   └── omexa-player.min.js # Minified version ✅
├── example.txt            # Usage examples ✅
├── assignment.md          # This file ✅
├── README.md              # Documentation ✅
├── demo.html              # Demo page ✅
└── build.js               # Build script ✅
```

### Success Criteria
- ✅ Single JS file works when imported via script tag
- ✅ Plays both regular videos and YouTube videos
- ✅ Modern, responsive UI with custom icons
- ✅ Fullscreen functionality works cross-browser
- ✅ Player initializes automatically on page load
- ✅ All controls function properly (play, pause, seek, volume, fullscreen)
- ✅ Clean, maintainable code structure
- ✅ Minimal external dependencies

## 🎉 Implementation Complete!

### Key Features Implemented:
1. **Modern SVG Icons**: Play, pause, rewind, fast-forward, volume, and fullscreen controls
2. **Responsive Design**: Adapts to mobile, tablet, and desktop with appropriate control sizes
3. **Fullscreen Support**: True fullscreen with auto-hiding controls and inactivity detection
4. **Keyboard Controls**: Full keyboard navigation (Space, arrows, F, M, Esc)
5. **YouTube Integration**: Seamless YouTube API integration with unified controls
6. **Progress Bar**: Click-to-seek and visual progress indication
7. **Volume Controls**: Interactive slider and mute toggle
8. **Auto-initialization**: Automatically finds and initializes players on page load
9. **API**: Comprehensive JavaScript API for programmatic control

### File Sizes:
- **Development Build**: ~36KB (omexa-player.js)
- **Production Build**: ~28KB (omexa-player.min.js)

### Browser Support:
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Demo Available:
Open `demo.html` in a browser to see both regular video and YouTube video examples with full functionality. 