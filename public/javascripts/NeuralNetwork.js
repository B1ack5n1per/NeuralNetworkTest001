var rgbColor = {};
var currentColor = {};
var resultBad;
var resultGood;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

function update() {
  $('.spinner').css('display', 'block');
  $('.shader').css('display', 'block');
  let color = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  };
  currentColor = color;
  $('#opbackground').css('background', `rgba(${color.r}, ${color.g}, ${color.b}, 1)`);
  $('#background').css('background', `rgba(${color.r}, ${color.g}, ${color.b}, 1)`);
  $.ajax({
    method: 'POST',
    url: 'useNetwork',
    headers: {
      contentType: 'application/json',
    },
    data: {
      color: {
        r: color.r,
        g: color.g,
        b: color.b,
      },
    },
    success: (res) => {
      $('#background').css('color', res);
      normalize(color);
      console.log(res);
      if (res == '#000') {
        resultBad = 'l';
        resultGood = 'd';
        $('#opbackground').css('color', '#FFF');
        $('.spinner').css('display', 'none');
        $('.shader').css('display', 'none');
      } else {
        resultBad = 'd';
        resultGood = 'l';
        $('#opbackground').css('color', '#000');
        $('.spinner').css('display', 'none');
        $('.shader').css('display', 'none');
      };

    },
  });
}

function normalize(rgb) {
  rgbColor.r = rgb.r / 255;
  rgbColor.g = rgb.g / 255;
  rgbColor.b = rgb.b / 255;
}

$(document).ready(() => {
  $('.spinner').css('display', 'none');
  $('.shader').css('display', 'block');
  update();
  $('.button').on('mousedown', (event) => {
    $(event.target).css('filter', 'brightness(80%)');
  });
  $('.button').on('mouseup', (event) => {
    $(event.target).css('filter', 'brightness(100%)');
  });
  $('#bad').on('click', () => {
    console.log(resultBad);
    $.ajax({
      type: 'POST',
      url: '/failed',
      headers: {
        contentType: 'application/json',
      },
      data: {
        color: currentColor,
        type: resultBad,
      },
      success: (res) => {
        $('.spinner').css('display', 'none');
        $('.shader').css('display', 'none');
      },
    });
  });
  $('#good').on('click', () => {
    console.log(resultGood);
    $.ajax({
      type: 'POST',
      url: '/success',
      headers: {
        contentType: 'application/json',
      },
      data: {
        color: currentColor,
        type: resultGood,
      },
      success: (res) => {
        $('.spinner').css('display', 'none');
        $('.shader').css('display', 'none');
      },
    });
  });
  $('.button').on('click', () => {
    update();
  });
});
