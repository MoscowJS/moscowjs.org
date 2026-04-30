export type Talk = {
  title: string
  speaker: string
  timeEnd: number
}

export const allTalks: Talk[] = [
  {
    title: 'Не ошибается тот, кто ничего не делает, или как падать правильно',
    speaker: 'Елена Евтифьева',
    timeEnd: 1761246000000,
  },
  {
    title:
      'Разработка мигратора кода с использованием AI на примере миграции с Linaria на CSS modules',
    speaker: 'Михаил Витик',
    timeEnd: 1761246000000,
  },
  {
    title: 'Vike: Один фреймворк, чтобы править всеми',
    speaker: 'Илья Оловянников',
    timeEnd: 1761246000000,
  },
  {
    title: 'Я сделал reactuse и мне есть, что рассказать',
    speaker: 'Дмитрий Бабин',
    timeEnd: 1761246000000,
  },
]
