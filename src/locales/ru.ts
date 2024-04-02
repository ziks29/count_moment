export default {
  tma: {
    sdkProviderError: "Упс. Что-то пошло не так.",
  },
  settings: {
    title: "Настройки",
    changeLanguage: {
      title: "Изменить язык:",
      current: "Текущий язык:",
      language: {
        ru: "Русский",
        en: "English",
      },
    },
    order: {
      title: "Перетащите для изменения порядка:",
      disabled: "Отключено:",
      disabledExtra: "Перетащите сюда для отключения",
      components: {
        MI: "Основная информация",
        ET: "Трекер эмоций",
        AN: "Добавить новое",
        SM: "Отправить сообщение",
      },
    },
  },
  mainInfo: {
    morning: {
      "1": "Хорошего утра",
      "2": "Вставай и сияй",
      "3": "Доброе утро",
    },
    afternoon: {
      "1": "Добрый день",
      "2": "Солнечный день",
    },
    evening: {
      "1": "Тихого вечера",
      "2": "Добрый вечер",
      "3": "Спокойного вечера",
    },
    night: {
      "1": "Отдыхай",
      "2": "Сладких снов",
    },
    lessThanAnHour: "менее чем час",
    leftIn: "осталось в ",
    days: " д.",
    and: " и ",
    hours: " ч.",
    tasks: "У вас в данный момент {count} задач.",
    yearProgress: "Прогресс года: {progress}%",
  },
  emotionTracker: {
    title: "Как вы себя чувствуете сегодня?",
    emotions: {
      Joy: "Радость",
      Sadness: "Печаль",
      Anger: "Гнев",
      Fear: "Страх",
      Trust: "Доверие",
      Disgust: "Отвращение",
      Surprise: "Удивление",
      Anticipation: "Ожидание",
      Love: "Любовь",
    },
    input: {
      placeholder: "Напиши здесь свою заметку...",
      label: "Заметка для себя:",
      skip: "Пропустить",
      submit: "Отправить",
    },
    ty: "Спасибо!",
    post: "Настроение {latestMood} было сохранено.",
  },
  addNext: {
    title: "Добавить новую задачу",
  },
} as const;
