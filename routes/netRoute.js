const network = require('./network.js');
module.exports = function (app, db) {

  app.post('/useNetwork', (req, res) => {
    let rgb = req.body.color;
    console.log(rgb);
    let color = network.useNet(rgb);
    res.send(color);
  });

  app.post('/failed', (req, res) => {
    let rgb = req.body.color;
    console.log(`{${rgb.r}, ${rgb.g}, ${rgb.b}}: failed`);
  });
};
