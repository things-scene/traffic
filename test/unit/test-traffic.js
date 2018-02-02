/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Traffic } from '../../src/index'

describe('Traffic', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'traffic',
          type: 'traffic'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('traffic')

    expect(!!component).not.to.equal(false);
  });
});
