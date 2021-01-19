import styled from "styled-components"
import { FunctionComponent } from "react"
import { rhythm } from "utils/typography"
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

const TextareaInner = styled.textarea`
  display: block;
  border: none;
  transition: box-shadow 0.2s ease;
  font-family: inherit;
  font-size: inherit;
  background: transparent;
  box-shadow: var(--color-primary) 0px 1px;
  color: var(--color-text);
  resize: none;

  overflow-x: hidden;
  overflow-wrap: break-word;

  &:focus {
    box-shadow: var(--color-primary) 0px 3px;
  }
`

export const Textarea: FunctionComponent<{
  onChange?: (event: SyntheticEvent<HTMLTextAreaElement>) => void
  onClick?: (event: SyntheticEvent<HTMLTextAreaElement>) => void
  rows?: number
  required?: boolean
  name?: string
  placeholder?: string
  disabled?: boolean
}> = props => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [rowHeight, setRowHeight] = useState<number | null>(null)
  const rows = props.rows || 1

  useEffect(() => {
    if (textareaRef?.current) {
      setRowHeight((textareaRef.current?.scrollHeight - 4) / rows)
    }
  }, [textareaRef, textareaRef.current])

  const handleChange = useCallback(
    event => {
      props.onChange && props.onChange(event)

      event.target.rows = rows
      const currentRows = ~~(event.target.scrollHeight / rowHeight!)
      event.target.rows = currentRows
    },
    [props.onChange, rowHeight]
  )

  return (
    <TextareaInner
      {...props}
      ref={textareaRef}
      onChange={handleChange}
      rows={rows}
    />
  )
}
