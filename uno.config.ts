// uno.config.ts
import {
  defineConfig, 
  presetAttributify, 
  presetIcons,
  presetTypography, 
  presetUno, 
  presetWebFonts,
  transformerDirectives, 
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'full': 'w-full h-full',
    'flex-col': 'flex flex-col',
    'flex-items': 'flex items-center',
    'flex-b-c': 'flex justify-between items-center',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
    'turn-dark': 'invert-100 hue-rotate-180',
  },
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})