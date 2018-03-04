import locales from './locales'

var templates = [{
  name: 'traffic galaxy',
  /* 다국어 키 표현을 어떻게.. */
  description: '...',
  /* 다국어 키 표현을 어떻게.. */
  group: 'etc',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: '../',
  /* 또는, Object */
  template: {
    type: 'traffic-galaxy',
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
  }
}];

module.exports = {
  templates,
  locales
};
