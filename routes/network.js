const brain = require('brain.js');
var color = {};

function normalize(rgb) {
  color.r = rgb.r / 255;
  color.g = rgb.g / 255;
  color.b = rgb.b / 255;
}

const net = new brain.NeuralNetwork();

module.exports = {
  useNet: (rgb, app, db, req, res) => {
    var data;
    var test;
    db.collection('data').findOne({ target: 'data', }, function (err, results) {
      data = results.data;
      for (let i = 0; i < data.length; i++) {
        data[i].input.r = Number(data[i].input.r);
        data[i].input.g = Number(data[i].input.g);
        data[i].input.b = Number(data[i].input.b);
      };

      net.train(data, { log: false, });
      normalize(rgb);
      let test = net.run(color);
      if (test.l > test.d) {
        test = '#FFF';
      } else {
        test = '#000';
      };

      res.send(test);
    });

    // train network
  },
};
