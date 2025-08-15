# cursor-style

Elevate your web application's user experience with cursor-style, a sophisticated library designed to customize and animate the cursor. From adding elegance and interactivity to standing out, cursor-style provides an array of options to enhance your site's interactive elements with minimal effort.

![npm](https://img.shields.io/npm/v/cursor-style)

##  Installation

```bash
npm install cursor-style
```

##  Features

- **Three Cursor Types**: Choose from simple circle, dot+outline, or outline-only cursors
- **Click Effects**: Built-in pulse animations on mouse clicks
- **Extensive Customization**: Control size, colors, delays, and animations
- **Optimized Performance**: Lightweight bundle with smooth 60fps animations
- **TypeScript Ready**: Full type safety with cursor-specific prop validation
- **Seamless Integration**: Drop-in solution for any React project
- **Mix Blend Modes**: Built-in support for difference blend mode effects

## 🆕 What's New in v1.4.5

- **New Click Effects**: Added `ripple` and `fade` click effects alongside the existing `pulse` effect

## Cursor Types

![First Cursor](https://github.com/N1kos9/calculator/assets/139173199/85a57eb9-fd37-4d3c-bab1-0d65e19675e3)


![Second Cursor](https://github.com/N1kos9/calculator/assets/139173199/46c59406-2a45-464a-9321-19989c08bb3d) 


![Third Cursor](https://github.com/N1kos9/calculator/assets/139173199/2070b0a6-c4d5-4964-b519-718051eed7ef)


## 📖 Quick Start

### CustomCursor Component

```tsx
import { CustomCursor } from "cursor-style";

function App() {
  return (
    <div>
      {/* Simple filled cursor */}
      <CustomCursor 
        type="one" 
        size={20} 
        bgColor="white"
        clickEffect="pulse"
      />
      
      {/* Dot + outline cursor */}
      <CustomCursor 
        type="two"
        sizeDot={8}
        sizeOutline={40}
        bgColorDot="blue"
        bgColorOutline="white"
        delay={3}
      />
      
      {/* Outline only cursor */}
      <CustomCursor 
        type="three"
        size={30}
        bgColor="red"
        scaleOnHover={2}
      />
    </div>
  );
}
```


## 🔧 API Reference


#### Common Props (All Types)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"one" \| "two" \| "three"` | **Required** | Cursor style type |
| `delay` | `number` | `0` | Movement delay (0-1000ms) |
| `useMixBlendDifference` | `boolean` | `true` | Enable difference blend mode |
| `size` | `number` | `35 / 10 / 35` | Cursor diameter |
| `scaleOnHover` | `number` | `1.5` | Scale factor when hovering interactive elements |
| `clickEffect` | `"pulse" \| "ripple" \| "fade"` | `undefined` | Click animation effect type |
| `clickEffectColor` | `string` | `"white"` | Pulse effect color |
| `clickEffectSize` | `number` | `1.5` | Pulse effect scale |
| `clickEffectDuration` | `number` | `300` | Pulse duration (ms) |

#### Type "one" Specific Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bgColor` | `string` | `"white"` | Fill color |

#### Type "two" Specific Props  
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sizeDot` | `number` | `10` | Center dot size |
| `sizeOutline` | `number` | `45` | Outline size |
| `bgColorDot` | `string` | `"white"` | Dot color |
| `bgColorOutline` | `string` | `"white"` | Outline color |

#### Type "three" Specific Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bgColor` | `string` | `"white"` | Border color |

## 🎯 Pratical Examples

### Click Effects
```tsx
<CustomCursor 
  type="one"
  clickEffect="pulse"
  clickEffectColor="rgba(255, 0, 0, 0.8)"
  clickEffectSize={10.5}
  clickEffectDuration={500}
/>
```

### Delayed Following
```tsx
<CustomCursor 
  type="two"
  delay={8}
  size={10}
  bgColorOutline="#00ff00"
/>
```

### Hover Scaling
```tsx
<CustomCursor 
  type="three"
  scaleOnHover={2}
  size={45}
  bgColor="purple"
/>
```

### Mix Blend Mode Disabled
```tsx
<CustomCursor 
  type="one"
  useMixBlendDifference={false}
  bgColor="rgba(0, 0, 0, 0.5)"
/>
```

## 🎨 Styling Tips

### CSS Integration
The library automatically hides the default cursor, but you might need to set it manually in some cases:

```css
* {
  cursor: none;
}
```

### Interactive Elements
The cursor automatically detects and scales on these elements:
- `<a>`, `<button>`, `<input>`, `<textarea>`
- Elements with `role="button"`
- Elements with `tabindex` (except `-1`)
- Elements with class `hoverable`

Add the `hoverable` class to custom interactive elements:
```tsx
<div className="hoverable">This will trigger hover scaling</div>
```

## 📦 Bundle Size

- **Unpacked**: ~29.8 kB 
- **Minified**: ~7.8 kB
- **Gzipped**: ~3.2 kB (estimated)

## 🔧 TypeScript Support

Full TypeScript support with intelligent prop validation:

```tsx
// ✅ Valid - TypeScript approves
<CustomCursor type="two" sizeDot={10} bgColorDot="blue" />

// ❌ Invalid - TypeScript error  
<CustomCursor type="one" sizeDot={10} />  // sizeDot not valid for type "one"
```

## 🐛 Troubleshooting

### Cursor Not Showing
1. Ensure the component is rendered in your app
2. Check that no CSS is overriding `cursor` styles
3. Verify the cursor colors aren't matching your background
4. Set a background color to the page/div if one is not provided (in case useMixBlendDifference is enabled)

### Performance Issues
1. Avoid setting `delay` values above 10 for smooth performance
2. Use `useMixBlendDifference={false}` if you experience rendering issues
3. Consider disabling click effects on high-frequency interactions

### TypeScript Errors
1. Update to the latest version for best type definitions
2. Ensure you're only using props valid for your chosen cursor type
3. Check that `clickEffect` is set to `"pulse"` (only supported value)

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **GitHub**: [nsl-nikos/cursor-style](https://github.com/nsl-nikos)
- **NPM**: [cursor-style](https://www.npmjs.com/package/cursor-style)
- **Issues**: [Report bugs or request features](https://github.com/nsl-nikos)

---

Made with ❤️ by [nsl-nikos](https://github.com/nsl-nikos)