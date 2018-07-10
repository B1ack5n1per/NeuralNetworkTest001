const brain = require('brain.js');
var color = {};

function normalize(rgb) {
  color.r = rgb.r / 255;
  color.g = rgb.g / 255;
  color.b = rgb.b / 255;
}

const net = new brain.NeuralNetwork();
var data = [{
    input: {
      r: 1,
      g: 1,
      b: 1,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0,
      g: 0,
      b: 0,
    },
    output: {
      d: 1,
    },
  },
  {
    input: {
      r: 1,
      g: 0.9529411764705882,
      b: 0.06666666666666667,
    },
    output: {
      d: 1,
    },
  },
  {
    input: {
      r: 0.00784313725490196,
      g: 0.5333333333333333,
      b: 0.10196078431372549,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.4392156862745098,
      g: 0.5529411764705883,
      b: 0.8549019607843137,
    },
    output: {
      d: 1,
    },
  },
  {
    input: {
      r: 0.592156862745098,
      g: 0,
      b: 0,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.11764705882352941,
      g: 0.3411764705882353,
      b: 0.30980392156862746,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.011764705882352941,
      g: 0.0392156862745098,
      b: 0.35294117647058826,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.9803921568627451,
      g: 0.6,
      b: 0.8588235294117647,
    },
    output: {
      d: 1,
    },
  },
  {
    input: {
      r: 0.047058823529411764,
      g: 0.15294117647058825,
      b: 0.023529411764705882,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.5450980392156862,
      g: 0.8117647058823529,
      b: 0.47058823529411764,
    },
    output: {
      d: 1,
    },
  },
  {
    input: {
      r: 0.6039215686274509,
      g: 0.07058823529411765,
      b: 0.5411764705882353,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.23529411764705882,
      g: 0.4666666666666667,
      b: 0.4392156862745098,
    },
    output: {
      l: 1,
    },
  },
  {
    input: {
      r: 0.5490196078431373,
      g: 0.8588235294117647,
      b: 0.9450980392156862,
    },
    output: {
      d: 1,
    },
  },
];
net.train(data, {
  log: true,
});

module.exports = {
  useNet: (rgb, app, db) => {
    normalize(rgb);
    let test = net.run(color);
    if (test.l > test.d) {
      test = '#FFF';
    } else {
      test = '#000';
    };

    return test;
  },
};
