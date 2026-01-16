import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
} from 'react'
import styled from 'styled-components'
import { Input } from 'reakit/Input'

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
  autosize?: boolean
  value?: string
  defaultValue?: string
}> = ({ onChange, rows = 1, autosize, value, defaultValue, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [rowHeight, setRowHeight] = useState<number | null>(null)

  useEffect(() => {
    if (textareaRef?.current) {
      setRowHeight((textareaRef.current?.scrollHeight - 4) / rows)
    }
  }, [textareaRef, textareaRef.current])

  const handleChange = useCallback(
    (event: any) => {
      onChange && onChange(event)

      if (!autosize) {
        return
      }

      event.target.rows = rows
      const currentRows = ~~(event.target.scrollHeight / rowHeight!)
      event.target.rows = currentRows
    },
    [onChange, rowHeight]
  )

  return (
    <Input {...(props as any)} onChange={handleChange}>
      {/* @ts-ignore */}
      {inputProps => (
        <TextareaInner
          {...inputProps}
          ref={textareaRef}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
        />
      )}
    </Input>
  )
}
