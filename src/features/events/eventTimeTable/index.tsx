import React, { FunctionComponent } from "react"
import { EventData, TalkData } from "models"
import { format, add } from "date-fns"
import { airtableDateFix } from "utils/airtableDateFix"
import { speakerPath, talkPath } from "utils/paths"
import { Link } from "gatsby"
import { Container, Markdown } from "components/layout"
import styled from "styled-components"
import { rhythm } from "utils/typography"

const sceneOrder: {
  [k: string]: number
} = {
  "Главный зал": 0,
  "Основная сцена": 0,
  "Первый зал": 10,
  "Дополнительная сцена": 10,
  "Малая сцена": 10,
  "Второй зал": 20,
  "Третий зал": 30,
}

type TableRows = {
  [K: string]:
    | {
        keynote: false
        talks: {
          [K: string]: TalkData
        }
      }
    | {
        keynote: true
        talk: TalkData
      }
}

const TimetableContainer = styled.div`
  overflow-x: scroll;

  th,
  td,
  tr {
    border-bottom: none;
    vertical-align: top;
  }

  tr {
    border-bottom: var(--color-primary) solid 1px;

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    min-width: 350px;

    &:first-child {
      min-width: 0;
      vertical-align: middle;
      /* font-size: ${rhythm(0.5)}; */
    }
  }
`

const Meta = styled.a`
  display: inline-block;
  margin-right: ${rhythm(0.5)};
`

const TalkCell = (props: { talk: TalkData }) => {
  const { talk } = props

  return (
    <>
      <h5>{talk.Speakers.map(({ data }) => `${data.Name}`).join(", ")}</h5>
      <h4>
        <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
      </h4>
    </>
  )
}

const formatHoursMins = (date: string) =>
  format(airtableDateFix(new Date(date)), "HH:mm")

export const EventTimeTable: FunctionComponent<{ event: EventData }> = ({
  event,
}) => {
  if (!event.Timetable || !event.Talks) {
    return null
  }

  const talks = event.Talks.map(({ data }) => data)

  const scenes: string[] = [...new Set(talks.map(talk => talk.Scene))].filter(
    x => x
  ) as string[]

  scenes.sort((a, b) => {
    const ao = sceneOrder[a] || 0
    const bo = sceneOrder[b] || 0

    return ao - bo
  })

  const times: string[] = [...new Set(talks.map(talk => talk.Start))].filter(
    x => x
  ) as string[]

  times.sort((a, b) => {
    const [ah, am] = a!.split(":").map(x => +x)
    const [bh, bm] = b!.split(":").map(x => +x)

    return am - bm || ah - bh
  })

  const tableRows: TableRows = talks.reduce((result, talk) => {
    const time = talk.Start!
    const scene = talk.Scene

    if (!scene) {
      result[time] = { keynote: true, talk }
      return result
    }

    result[time] = result[time] || {
      keynote: false,
      talks: {},
    }
    ;(result[time] as any).talks[scene] = talk

    return result
  }, {} as TableRows)

  return (
    <>
      <h3>Расписание</h3>
      <TimetableContainer>
        <table>
          <thead>
            <tr>
              <th></th>
              {scenes.map(scene => (
                <th>{scene}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatHoursMins(event.Date)}</td>
              <td colSpan={scenes.length}>
                {event.Type === "Offline"
                  ? "Регистрация, кофе, открытие"
                  : "Открытие"}
              </td>
            </tr>
            {times.map(time => {
              const talks = tableRows[time]

              if (talks.keynote) {
                return (
                  <tr>
                    <td>{time}</td>
                    <td colSpan={scenes.length}>
                      <TalkCell talk={talks.talk} />
                    </td>
                  </tr>
                )
              }

              return (
                <tr>
                  <td>{time}</td>
                  {scenes.map(scene => {
                    const talk = talks.talks[scene]

                    if (!talk) {
                      return <td></td>
                    }

                    return (
                      <td>
                        <TalkCell talk={talk} />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {event.Type === "Offline" ? (
              <tr>
                <td>{formatHoursMins(event.DateEnd)}</td>
                <td colSpan={scenes.length}>Афтепати</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </TimetableContainer>
    </>
  )
}
