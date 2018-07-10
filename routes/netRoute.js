const network = require('./network.js');
var color = {};
function normalize(rgb) {
  color.r = rgb.r / 255;
  color.g = rgb.g / 255;
  color.b = rgb.b / 255;
}

module.exports = function (app, db) {

  app.post('/useNetwork', (req, res) => {
    let rgb = req.body.color;
    network.useNet(rgb, app, db, req, res);
  });

  app.post('/failed', (req, res) => {
    let rgb = req.body.color;
    normalize(rgb);
    let type = req.body.type;
    let data = { input: { r: color.r, g: color.g, b: color.b }, };
    if (type == 'l') {
      data.output = { l: 1, };
    } else {
      data.output = { d: 1, };
    };

    console.log(data);
    db.collection('data').updateOne({ target: 'data' }, { $push: { data: data } }, (err, result) => {
      console.log('added data');
      res.send('added data');
    });
  });

  app.post('/success', (req, res) => {
    let rgb = req.body.color;
    normalize(rgb);
    let type = req.body.type;
    let data = { input: { r: color.r, g: color.g, b: color.b }, };
    if (type == 'l') {
      data.output = { l: 1, };
    } else {
      data.output = { d: 1, };
    };

    console.log(data);
    db.collection('data').updateOne({ target: 'data' }, { $push: { data: data } }, (err, result) => {
      console.log('added data');
      res.send('added data');
    });
  });
};
