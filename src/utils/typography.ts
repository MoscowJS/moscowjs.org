import Typography from "typography"

const typography = new Typography({
  baseFontSize: "20px",
  baseLineHeight: 1.5,
  scaleRatio: 2,
  googleFonts: [
    {
      name: "Source Sans Pro",
      styles: ["600"],
    },
    {
      name: "Ubuntu",
      styles: ["300", "700"],
    },
  ],
  headerFontFamily: ["Source Sans Pro", "sans-serif"],
  headerWeight: 600,
  bodyFontFamily: ["Ubuntu", "sans-serif"],
  bodyWeight: 300,
  boldWeight: 700,
  includeNormalize: true,
  blockMarginBottom: 0.5,
})

// Export helper functions
export const { scale, rhythm, options } = typography
export const sizes: { [K: string]: string } = {
  xxxs: rhythm(1.2),
  xxs: rhythm(1.5),
  xs: rhythm(2),
  s: rhythm(4),
  m: rhythm(6),
  l: rhythm(8),
  xl: rhythm(10),
  xxl: rhythm(12),
}

export const getSize = (size: string = "xs") => sizes[size] || size
export default typography
