import React, { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import { Link } from "gatsby"

const renderers: any = {
  link: (link: { href: string; children: any }) => {
    if (link.href.startsWith("/")) {
      return <Link to={link.href}>{link.children}</Link>
    }

    // dirtiest hack evar
    if (link.href.includes("moscowjs.org")) {
      const [, path] = link.href.split("moscowjs.org")

      return <Link to={path}>{link.children}</Link>
    }

    return <a href={link.href}>{link.children}</a>
  },
}

export const Markdown: FunctionComponent<{
  children?: string
  markdown?: string
}> = ({ children, markdown }) => {
  return (
    <ReactMarkdown renderers={renderers}>
      {children || markdown || ""}
    </ReactMarkdown>
  )
}
