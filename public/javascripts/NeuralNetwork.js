var rgbColor = {};
var currentColor = {};

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
  let color = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  };
  currentColor = color;
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
      setTimeout(() => {
        $('.spinner').css('display', 'none');
      }, 1000);
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
  update();
  $('.button').on('mousedown', (event) => {
    $(event.target).css('filter', 'brightness(80%)');
  });
  $('.button').on('mouseup', (event) => {
    $(event.target).css('filter', 'brightness(100%)');
  });
  $('#bad').on('click', () => {
    $.ajax({
      type: 'POST',
      url: '/failed',
      headers: {
        contentType: 'application/json',
      },
      data: {
        color: currentColor,
      },
      success: (res) => {},
    });
  });
  $('.button').on('click', () => {
    update();
  });
});
