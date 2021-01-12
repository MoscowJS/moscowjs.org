import React, { FunctionComponent } from "react"
import ReactMarkdown from "react-markdown"
import slug from "remark-slug"
import toc from "remark-toc"
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
  heading: (data: { level: number; node: any; children: any }) => {
    return React.createElement(
      `h${data.level}`,
      { id: data.node.data.id },
      data.children
    )
  },
}

export const Markdown: FunctionComponent<{
  children?: string
  markdown?: string
}> = ({ children, markdown }) => {
  const plugins: any[] = [
    slug,
    [
      toc,
      {
        heading: "Содержание",
        tight: true,
      },
    ],
  ]

  return (
    <ReactMarkdown
      allowDangerousHtml={true}
      plugins={plugins}
      renderers={renderers}
    >
      {children || markdown || ""}
    </ReactMarkdown>
  )
}
