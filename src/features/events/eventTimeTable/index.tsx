import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
// import { Link } from 'gatsby'

import { Meetup } from 'models'
// import { talkPath } from 'utils/paths'
import { rhythm } from 'utils/typography'
import { airtableDateFix } from 'utils/airtableDateFix'

const sceneOrder: {
  [k: string]: number
} = {
  'Главный зал': 0,
  'Основная сцена': 0,
  'Первый зал': 10,
  'Дополнительная сцена': 10,
  'Малая сцена': 10,
  'Второй зал': 20,
  'Третий зал': 30,
}

// type TableRows = {
//   [K: string]:
//     | {
//         keynote: false
//         talks: {
//           [K: string]: Talk
//         }
//       }
//     | {
//         keynote: true
//         talk: Talk
//       }
// }

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

// const TalkCell = (props: { talk: Talk }) => {
//   const { talk } = props

//   return (
//     <>
//       <h5>
//         {talk.speakers
//           .map(({ persons_id: speaker }) => `${speaker.name}`)
//           .join(', ')}
//       </h5>
//       <h4>
//         <Link to={talkPath(talk.title)}>{talk.title}</Link>
//       </h4>
//     </>
//   )
// }

const formatHoursMins = (date: string) =>
  format(airtableDateFix(new Date(date)), 'HH:mm')

export const EventTimeTable: FunctionComponent<{ event: Meetup }> = ({
  event,
}) => {
  if (!event.timetable || !event.talks) {
    return null
  }

  const scenes: Array<string> = [
    ...new Set(event.talks.map(talk => talk.scene)),
  ].filter(x => Boolean(x)) as Array<string>

  scenes.sort((a, b) => {
    const ao = sceneOrder[a] || 0
    const bo = sceneOrder[b] || 0

    return ao - bo
  })

  // const times: string[] = [
  //   ...new Set(event.talks.map(talk => talk.start)),
  // ].filter(x => x) as string[]

  // times.sort((a, b) => {
  //   const [ah, am] = a!.split(':').map(x => +x)
  //   const [bh, bm] = b!.split(':').map(x => +x)

  //   return ah - bh || am - bm
  // })

  // const tableRows: TableRows = event.talks.reduce((result, talk) => {
  //   const time = talk.start!
  //   const scene = talk.scene

  //   if (!scene) {
  //     result[time] = { keynote: true, talk }
  //     return result
  //   }

  //   result[time] = result[time] || {
  //     keynote: false,
  //     talks: {},
  //   }
  //   ;(result[time] as any).talks[scene] = talk

  //   return result
  // }, {} as TableRows)

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
              <td>{formatHoursMins(event.date_start)}</td>
              <td colSpan={scenes.length}>
                {event.type === 'Offline'
                  ? 'Регистрация, кофе, открытие'
                  : 'Открытие'}
              </td>
            </tr>
            {/* {times.map(time => {
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
            })} */}
            {event.type === 'Offline' ? (
              <tr>
                <td>{formatHoursMins(event.date_end)}</td>
                <td colSpan={scenes.length}>Афтепати</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </TimetableContainer>
    </>
  )
}
