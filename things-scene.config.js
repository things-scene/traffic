import locales from './locales';

import icon from './assets/no-image.png';

var templates = [{
  type: 'traffic-galaxy',
  description: 'traffic monitoring - galaxy',
  group: 'etc', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'traffic-galaxy',
    top: 100,
    left: 100,
    width: 600,
    height: 400,
    fontSize: 40,
    fillStyle: 'black',
    rayColor: 'white',
    fontColor: '#FF0000',
    strokeStyle: '#000',
    lineWidth: 0,
    text: '',
    lineCap: 'round'
  }
}];

export default {
  templates,
  locales
};
