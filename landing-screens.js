// Update a path here to replace a screenshot. Frames retain their dimensions.
// Position controls which part of a long screenshot is visible inside its frame.
window.ZEROPOINT_SCREENS = {
  home: { src: 'assets/hero-dashboard.png', alt: 'ZeroPoint home with weekly activity and recent sessions', position: 'top' },
  session: { src: 'assets/screens/session.png', alt: 'ZeroPoint session details showing rounds, costs, gear, and reflections', position: 'center 10%' },
  inventory: { src: 'assets/screens/inventory.png', alt: 'ZeroPoint ammo inventory with stock quantities', position: 'center 10%' }
};

// Feature illustrations are independent of app screenshots. Swap these files freely.
window.ZEROPOINT_ARTWORK = {
  "session-story": {
    "src": "assets/landing/features/session-logbook.webp",
    "alt": "Range logbook with handwritten notes, pencil, and paper target"
  },
  "gear-story": {
    "src": "assets/landing/features/gear-story.webp",
    "alt": "Organized range bag essentials with hearing protection, ammo tray, and maintenance checklist"
  },
  "progress-story": {
    "src": "assets/landing/features/progress-story.webp",
    "alt": "Calendar with highlighted range days and a four-week milestone ribbon"
  },
  "crew-story": {
    "src": "assets/landing/features/crew-story.webp",
    "alt": "Range-day invitation with four connected crew tokens and a calendar date"
  }
};
