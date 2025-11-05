
<div align="center">

# cursor-style


![npm version](https://img.shields.io/npm/v/cursor-style)
![npm downloads](https://img.shields.io/npm/dm/cursor-style)
![license](https://img.shields.io/npm/l/cursor-style)


Started as a personal need for a custom cursor. Now it features six unique types, full customization options, and smooth 60 FPS performance at only 16 KB.

[**Documentation & Demo**](https://cursor-style.info) • [**NPM**](https://www.npmjs.com/package/cursor-style)

</div>


## What's New in v1.5.0

**New Props for Cursor Type 5:**
- `enableTextHoverEffect` - Control text/image z-index layering
- `imageFollowDelay` - Smooth floating effect for image movement (0-50ms)
- `imageOffsetX` / `imageOffsetY` - Position offset controls

**Improvements:**
- Enhanced TypeScript type safety
- Better JSDoc documentation
- Performance optimizations



## Installation

```bash
npm install cursor-style
```



## Quick Start

```tsx
import { CustomCursor } from "cursor-style";

function App() {
  return (
    <div>
      <CustomCursor type="one" size={35} bgColor="white" clickEffect="pulse" />
      {/* Your content here */}
    </div>
  );
}
```



## Available Cursor Types

The library includes six different cursor types:

| Type | Description |
|------|-------------|
| **one** | Simple filled circle - clean and customizable |
| **two** | Dot with outline ring - two parts you can style independently |
| **three** | Outline-only circle with transparent center |
| **four** | Crosshair with rotation, tilt, and transform effects |
| **five** | Image hover system with dynamic positioning |
| **six** | Morphing cursor that adapts to element shapes |



## Usage Examples

**Basic Cursor**
```tsx
<CustomCursor type="one" size={35} bgColor="white" />
```

**Dot + Outline**
```tsx
<CustomCursor type="two" sizeDot={10} sizeOutline={45} delay={15} />
```

**Image Hover**
```tsx
<CustomCursor type="five" showImages imageSize={30} imageFollowDelay={20} />
<span data-cursor-image="/path/to/image.jpg">Hover me</span>
```

**Morphing Cursor**
```tsx
<CustomCursor type="six" baseSize={2} morphDuration={25} />
```



## Features

Click effects, magnetic attraction, image previews, mix blend modes, full TypeScript support with discriminated unions. See full [documentation](https://cursor-style.info) for API reference, advanced techniques, and performance optimization.

---

## Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"one"` \| `"two"` \| `"three"` \| `"four"` \| `"five"` \| `"six"` | Required | Cursor variant |
| `size` | `0-100` | `35` | Base size (×10 internally) |
| `delay` | `0-50` | `0` | Movement delay (ms) |
| `scaleOnHover` | `-10 to 10` | `0` | Scale on hover |
| `clickEffect` | `"pulse"` \| `"ripple"` \| `"fade"` | - | Click animation |
| `clickEffectColor` | `string` | `"white"` | Click effect color |
| `clickEffectSize` | `0-100` | `1.5` | Click effect size |
| `clickEffectDuration` | `0-100` | `30` | Click duration (ms) |
| `magnetEffect` | `boolean` | `false` | Magnetic attraction |
| `magnetStrength` | `0-50` | `2` | Magnet strength |
| `magnetRange` | `0-50` | `10` | Magnet range (px) |
| `magnetClassName` | `string` | `"cursor-magnet"` | Target class |
| `magnetType` | `"attract"` \| `"repel"` | `"attract"` | Magnet behavior |
| `useMixBlendDifference` | `boolean` | `true` | Blend mode |
| `overrideOpacity` | `0-1` | - | Custom opacity |

Each cursor type has additional type-specific props. See [documentation](https://cursor-style.info) for complete API reference.

---

<div align="center">

**[Documentation](https://cursor-style.info)** • **[GitHub](https://github.com/nsl-nikos/cursor-style)** • **[NPM](https://www.npmjs.com/package/cursor-style)**

MIT © [nsl-nikos](https://github.com/nsl-nikos)

</div>
