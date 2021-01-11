import { FunctionComponent, SyntheticEvent } from "react"

declare module "*.png" {
  const value: string
  export = value
}

declare module "*.jpg" {
  const value: string
  export = value
}

declare module "*.svg" {
  const value: string
  export = value
}

declare module "remark-slug" {
  const value: any
  export = value
}

declare module "gatsby-plugin-dark-mode" {
  const ThemeToggler: FunctionComponent<{
    children: FunctionComponent<{
      theme: "dark" | "light"
      toggleTheme: (event: SyntheticEvent) => null
    }>
  }>

  export = { ThemeToggler }
}
