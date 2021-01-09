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
  blockMarginBottom: 0.5
})

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
