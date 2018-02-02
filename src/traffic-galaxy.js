/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'color',
    label: 'Ray color',
    name: 'rayColor'
  }]
}

var { RectPath, Shape } = scene

class Ray {

  constructor(id, length, ttl) {
    this.id = id;
    this.startedAt = Date.now();
    this.ttl = ttl;

    var theta = Math.random() * Math.PI * 2;
    this.line = {
      x1: 0,
      y1: 0,
      x2: 0 + length * Math.cos(theta),
      y2: 0 + length * Math.sin(theta)
    }
  }

  get endedAt() {
    return this.startedAt + this.ttl;
  }

  end() {
    this.ended = true;
  }

  get ray() {
    var now = Date.now();
    var startedAt = this.startedAt;
    var endedAt = this.endedAt;

    var ratio = (now - startedAt) / (endedAt - startedAt);
    if(this.ended) {
      ratio = Math.min(1, this.lastRatio + 0.05);
    }

    if(!this.lastRatio)
      this.lastRatio = 0;

    var { x1, y1, x2, y2 } = this.line;

    var line = {
      x1: x1 + (x2 - x1) * this.lastRatio,
      y1: y1 + (y2 - y1) * this.lastRatio,
      x2: x1 + (x2 - x1) * ratio,
      y2: y1 + (y2 - y1) * ratio
    }

    this.lastRatio = ratio;

    return line;
  }
}

export default class TrafficGalaxy extends RectPath(Shape) {

  dispose() {
    super.dispose();
  }

  added() {
    var {
      width, height
    } = this.bounds;

    var {
      x, y
    } = this.center;

    setInterval(() => {
      var id = Math.round(Math.random() * 100);
      var ray = this.rays[id];
      if(ray) {
        if(!ray.ended && Math.random() >= 0.0) { // 이 값으로 성능 시뮬레이션.
          this.cometDestroyed(id);
        }
      } else {
        this.cometCreated(id, new Ray(id, Math.sqrt(width * width + height * height) / 3, 10000));
      }

      this.invalidate();
    }, 10);
  }

  get rays() {
    if(!this._rays)
      this._rays = {};

    return this._rays;
  }

  cometCreated(id, ray) {
    this.rays[id] = ray;
  }

  cometDestroyed(id) {
    var ray = this.rays[id]
    if(ray)
      ray.end();
  }

  _draw(context) {
    var {
      top,
      left,
      height,
      width
    } = this.bounds;

    var {
      x, y
    } = this.center;

    context.beginPath();
    context.fillStyle = this.getState('fillStyle') || 'black';
    context.rect(left, top, width, height);
    context.clip();
    context.fill();

    context.lineCap = 'round';

    let now = Date.now();

    Object.values(this.rays).forEach(ray => {

      let line = ray.ray;
      if(!ray.ended && ray.lastRatio >= 1) {
        delete this.rays[ray.id];
        return;
      }

      let weight = Math.round(ray.lastRatio * 10);
      let strokeStyle = this.getState('rayColor') || '#5577aa';
      if(!ray.ended) {
        let style = Math.round(255 * ray.lastRatio).toString(16);
        strokeStyle = `#${style.padStart(2, '0')}2233`;
      }

      context.beginPath();

      context.lineWidth = 1 + weight / (ray.ended ? 3 : 1);
      context.strokeStyle = strokeStyle;

      context.moveTo(x + line.x1, y + line.y1);
      context.lineTo(x + line.x2, y + line.y2);

      context.stroke();

      if(ray.ended && ray.lastRatio >= 1) {
        delete this.rays[ray.id];
      }
    });
  }

  _post_draw() {}

  get controls() {}

  get nature(){
    return NATURE;
  }

  handleQueueIn(data) {
    var {
      id, ttl, intime
    } = data

    this.cometCreated(id, new Ray(id, Math.sqrt(width * width + height * height) / 3, ttl));
  }

  handleConsume() {
    var ray = this.rays[id];
    if(ray) {
      if(!ray.ended && Math.random() >= 0.0) { // 이 값으로 성능 시뮬레이션.
        this.cometDestroyed(id);
      }
    }
  }

  handleTimeout() {
    var ray = this.rays[id];
    if(ray) {
      if(!ray.ended && Math.random() >= 0.0) { // 이 값으로 성능 시뮬레이션.
        this.cometDestroyed(id);
      }
    }
  }

  onchangeData(after, before) {
    var {
      data
    } = after;

    var {
      id,
      ttl,
      intime
    } = data

    switch (data.xxx) {
      case 'inqueue':
        this.handleQueueIn(data)
        break;
      case 'consume':
        this.handleConsume(data)
        break;
      case 'timeout':
        this.handleTimeout(data)
        break;
    }

    this.invalidate();
  }
}

scene.Component.register('traffic-galaxy', TrafficGalaxy);
