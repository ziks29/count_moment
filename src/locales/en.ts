export default {
  tma: {
    sdkProviderError: "Oops. Something went wrong.",
  },
  settings: {
    title: "Settings",
    changeLanguage: {
      title: "Change language:",
      current: "Current language:",
      language: {
        ru: "Русский",
        en: "English",
      },
    },
    order: {
      title: "Drag and drop to reorder or disable:",
      disabled: "Disabled:",
      disabledExtra: "Drop here to disable",
      components: {
        MI: "Main Information",
        ET: "Emotion Tracker",
        AN: "Add New",
        SM: "Send Message",
      },
    },
  },
  mainInfo: {
    morning: {
      1: "Have a Great Morning",
      2: "Rise and Shine",
      3: "Good Morning",
    },
    afternoon: {
      1: "Good Afternoon",
      2: "Sunny Day",
    },
    evening: {
      1: "Quiet Eve",
      2: "Good Evening",
      3: "Peaceful Evening",
    },
    night: {
      1: "Rest Well",
      2: "Sweet Dreams",
    },
    lessThanAnHour: "less than an hour",
    leftIn: "left in ",
    days: " d.",
    and: " and ",
    hours: " h.",
    tasks: "You have currently {count} tasks.",
    yearProgress: "Year Progress: {progress}%",
  },
  emotionTracker: {
    title: "How are you feeling today?",
    emotions: {
      Joy: "Joy",
      Sadness: "Sadness",
      Anger: "Anger",
      Fear: "Fear",
      Trust: "Trust",
      Disgust: "Disgust",
      Surprise: "Surprise",
      Anticipation: "Anticipation",
      Love: "Love",
    },
    input: {
      placeholder: "Write your note here...",
      label: "Note to self:",
      skip: "Skip",
      submit: "Submit",
    },
    post: "Your {latestMood} mood has been recorded.",
    ty: "Thank you!",
  },
  addNext: {
    title: "Add your next goal:",
  },
} as const;
