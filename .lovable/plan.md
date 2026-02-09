

# 🎮 Pipe Connect — charity: water Web Game

## Overview
A simple, hopeful tap-timing game where players connect pipe pieces to bring clean water from a source to a village. Optimized for mobile, casual play.

---

## Screen 1: Start Screen
- **charity: water** branding (yellow jerry can icon + text, clean white/black palette)
- Game title: **"Pipe Connect"**
- Brief instruction: *"Tap when the pipe is aligned to connect clean water to a village"*
- A single **"Play"** button (yellow accent, matching brand)
- Minimal, clean layout — centered content, lots of whitespace

## Screen 2: Gameplay Screen

### Layout (top to bottom):
1. **Header bar** — Mistake counter (3 hearts/drops) 
2. **Game area** — A vertical path with:
   - 💧 **Water source** icon at the top-left
   - 🏘️ **Village** icon at the bottom-right
   - A diagonal/stepped pipe path with **5 connection slots** between them
3. **Falling pipe piece** — Drops from top, moving horizontally across the screen
4. **Tap zone** — The entire screen is tappable

### Core Mechanic:
- A pipe piece slides horizontally across the screen at the current empty slot position
- When it aligns with the correct slot, the player taps to lock it in place
- ✅ **Correct tap** → pipe snaps into place with a satisfying animation, progress advances
- ❌ **Wrong tap** → piece flashes red, a heart/drop is lost, piece resets
- Speed slightly increases with each successful connection for light challenge

### Game End States:
- **3 mistakes** → "So close! Tap to try again" with a retry button
- **All 5 pipes connected** → Water flow animation from source to village

## Impact Moment (Win State)
- Animated blue water flows through the completed pipe path
- Message appears: **"Clean water is flowing. You helped connect a community."**
- Subtitle: *"663 million people lack clean water. You can help."*
- **"Learn More"** button linking to charitywater.org
- **"Play Again"** button

---

## Design Style
- **Colors**: White background, black text, charity: water yellow (#F5C518) as accent, blue (#00A3E0) for water
- **Typography**: Clean sans-serif, bold headlines
- **Icons**: Simple SVG shapes — water droplet, pipe segments, small house cluster
- **Animations**: Smooth CSS transitions for pipe locking, water flow effect using animated gradient
- **Mobile-first**: Touch-friendly tap targets, portrait orientation, no scrolling needed

## Technical Approach
- Pure React with CSS animations (no game engine needed)
- `requestAnimationFrame` for pipe movement timing
- Simple state machine: start → playing → won/lost
- All visuals built with SVG and CSS — no external images needed
- Responsive layout using viewport units for consistent mobile experience

