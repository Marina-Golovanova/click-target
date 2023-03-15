export const config = {
  preloaderSettings: {
    loadingBar: {
      scaleX: 0.3,
      scaleY: 0.7,

      style: {
        color: 0xffffff,
        alpha: 0.4,
      },
    },
  },

  preloadResources: [
    {
      key: "background",
      type: "image",
      // eslint-disable-next-line no-undef
      url: require("@assets/sprites/background.jpg"),
    },
  ],

  startSettings: {
    target: {
      scale: 0.3,
      maxWidth: 250,
      minWidth: 200,
    },

    texts: [
      {
        name: "explanationText",
        x: 0.5,
        y: 0.15,
        text: "Сlick target until it disappears",
        textStyle: {
          fill: "#fff",
          fontSize: 30,
          fontFamily: "Roboto-Regular",
          stroke: "#000",
          strokeThickness: 5,
        },
        needAlignCenterX: true,
        alpha: 0,

        transformText: [
          {
            bounds: [0, 600],
            text: "Сlick target\nuntil it disappears",
          },
          {
            bounds: [600],
            text: "Сlick target until it disappears",
          },
        ],
      },
      {
        name: "tapText",
        x: 0.5,
        y: 0.85,
        text: "Tap to start",
        textStyle: {
          fill: "#fff",
          fontSize: 30,
          fontFamily: "Roboto-Regular",
          stroke: "#000",
          strokeThickness: 5,
        },
        needAlignCenterX: true,
        alpha: 0,
      },
    ],
  },

  modelSettings: {
    x: 20,
    y: 20,

    scoreTextStyle: {
      fill: "#fff",
      fontSize: 30,
      fontFamily: "Roboto-Regular",
    },

    scoreTable: [
      {
        bounds: [0, 400],
        score: 5,
      },
      {
        bounds: [401, 800],
        score: 4,
      },
      {
        bounds: [801, 1200],
        score: 3,
      },
      {
        bounds: [1201, 1600],
        score: 2,
      },
      {
        bounds: [1601, 2000],
        score: 1,
      },
    ],
  },

  gameSettings: {
    msTextStyle: {
      fill: "#fff",
      fontSize: 30,
      fontFamily: "Roboto-Regular",
      stroke: "#000",
      strokeThickness: 5,
    },

    timeLeft: {
      x: 20,
      y: 65,

      textStyle: {
        fill: "#fff",
        fontSize: 30,
        fontFamily: "Roboto-Regular",
      },
    },
  },

  finishSettings: {
    texts: [
      {
        name: "finishText",
        x: 0.5,
        y: 0.5,

        text: "Your score:",

        textStyle: {
          fill: "#fff",
          fontSize: 30,
          fontFamily: "Roboto-Regular",
          stroke: "#000",
          strokeThickness: 5,
        },

        needAlignCenterX: true,
      },
    ],
  },

  gameResources: [
    {
      key: "target",
      type: "image",
      url: require("@assets/sprites/target.png"),
    },
    {
      key: "clickTarget",
      type: "audio",
      url: [require("@assets/audio/click-target.mp3")],
    },
    {
      key: "fail",
      type: "audio",
      url: [require("@assets/audio/fail.mp3")],
    },
  ],
};
