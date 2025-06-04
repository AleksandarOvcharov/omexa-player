# Hover Keyboard Controls

The Omexa Player now supports **hover-based keyboard controls**, allowing users to control the player with hotkeys when hovering over the video without needing to click or focus on specific buttons.

## How It Works

1. **Hover Detection**: When you hover your mouse over the player, a red border appears indicating that keyboard controls are active
2. **Automatic Activation**: No clicking required - just hover and use any hotkey
3. **Fullscreen Support**: All keyboard controls work in fullscreen mode regardless of hover state

## Supported Hotkeys

| Key | Action |
|-----|--------|
| `Space` / `K` | Play/Pause |
| `←` | Rewind 5 seconds |
| `→` | Forward 5 seconds |
| `J` | Rewind 10 seconds |
| `L` | Forward 10 seconds |
| `↑` | Volume Up |
| `↓` | Volume Down |
| `M` | Mute/Unmute |
| `F` | Toggle Fullscreen |
| `0-9` | Seek to percentage (0=start, 5=50%, 9=90%) |
| `Esc` | Exit Fullscreen |

## Visual Feedback

- **Red Border**: Appears when hovering over the player to indicate keyboard controls are active
- **Control Visibility**: In fullscreen mode, controls briefly appear when using keyboard shortcuts

## Testing

Use the `test-hover.html` file to test the hover keyboard functionality. The file includes:
- Visual instructions for all hotkeys
- A test YouTube video
- Clear indicators of when controls are active

## Implementation Details

The hover detection is implemented using:
- `mouseenter` and `mouseleave` events on the player container
- An `isHovering` state variable
- Keyboard event filtering based on hover state or fullscreen mode

This provides a seamless user experience similar to YouTube's player controls. 