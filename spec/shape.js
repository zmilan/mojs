(function() {
  var Bit, Byte, Rect, Shape, Thenable, Tweenable, h, ns, svg;

  Byte = mojs.Shape;

  Shape = mojs.Shape;

  Bit = mojs.shapesMap.getShape('bit');

  Thenable = mojs.Thenable;

  Tweenable = mojs.Tweenable;

  Rect = mojs.shapesMap.getShape('rect');

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  console.warn = function() {};

  console.error = function() {};

  describe('Shape ->', function() {
    describe('_vars method', function() {
      it('should have own _vars function ->', function() {
        var byte;
        byte = new Byte;
        expect(byte._vars).toBeDefined();
        return expect(function() {
          return byte._vars();
        }).not.toThrow();
      });
      it('should call _vars super method', function() {
        var byte;
        byte = new Byte;
        return expect(byte._history.length).toBe(1);
      });
      it('should save passed _o.masterModule to _masterModule', function() {
        var byte, obj;
        obj = {};
        byte = new Byte({
          masterModule: obj
        });
        byte._masterModule = null;
        byte._vars();
        return expect(byte._masterModule).toBe(obj);
      });
      it('should set `_isChained` based on `prevChainModule` option', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        byte._isChained = null;
        byte._vars();
        return expect(byte._isChained).toBe(true);
      });
      return it('should save passed _o.prevChainModule to _prevChainModule', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        byte._prevChainModule = null;
        byte._vars();
        return expect(byte._prevChainModule).toBe(byte0);
      });
    });
    describe('extension ->', function() {
      it('should extend Tweenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Tweenable).toBe(true);
      });
      return it('should extend Thenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Thenable).toBe(true);
      });
    });
    describe('defaults object ->', function() {
      return it('should have defaults object', function() {
        var byte;
        byte = new Byte;
        expect(byte._defaults).toBeDefined();
        expect(byte._defaults.parent).toBe(document.body);
        expect(byte._defaults.shape).toBe('circle');
        expect(byte._defaults.stroke).toBe('transparent');
        expect(byte._defaults.strokeOpacity).toBe(1);
        expect(byte._defaults.strokeLinecap).toBe('');
        expect(byte._defaults.strokeWidth).toBe(2);
        expect(byte._defaults.strokeDasharray).toBe(0);
        expect(byte._defaults.strokeDashoffset).toBe(0);
        expect(byte._defaults.fill).toBe('deeppink');
        expect(byte._defaults.fillOpacity).toBe(1);
        expect(byte._defaults.isSoftHide).toBe(true);
        expect(byte._defaults.isForce3d).toBe(false);
        expect(byte._defaults.left).toBe(0);
        expect(byte._defaults.top).toBe(0);
        expect(byte._defaults.x).toBe(0);
        expect(byte._defaults.y).toBe(0);
        expect(byte._defaults.angle).toBe(0);
        expect(byte._defaults.scale).toBe(1);
        expect(byte._defaults.scaleX).toBe(null);
        expect(byte._defaults.scaleY).toBe(null);
        expect(byte._defaults.origin).toBe('50% 50%');
        expect(byte._defaults.rx).toBe(0);
        expect(byte._defaults.ry).toBe(0);
        expect(byte._defaults.opacity).toBe(1);
        expect(byte._defaults.points).toBe(3);
        expect(byte._defaults.duration).toBe(400);
        expect(byte._defaults.radius[0]).toBe(50);
        expect(byte._defaults.radiusX).toBe(null);
        expect(byte._defaults.radiusY).toBe(null);
        expect(byte._defaults.isShowEnd).toBe(true);
        expect(byte._defaults.isShowStart).toBe(false);
        expect(byte._defaults.size).toBe(null);
        expect(byte._defaults.sizeGap).toBe(0);
        return expect(byte._defaults.callbacksContext).toBe(byte);
      });
    });
    describe('_applyCallbackOverrides ->', function() {
      it('should create callbackOverrides object on passed object', function() {
        var obj, tr;
        tr = new Shape;
        obj = {};
        tr._applyCallbackOverrides(obj);
        expect(typeof obj.callbackOverrides).toBe('object');
        return expect(obj.callbackOverrides).toBe(obj.callbackOverrides);
      });
      describe('onUpdate callback override ->', function() {
        it('should override this._o.onUpdate', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onUpdate).toBe('function');
        });
        it('should call _setProgress ', function() {
          var obj, progress, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_setProgress');
          progress = .25;
          obj.callbackOverrides.onUpdate(progress);
          return expect(tr._setProgress).toHaveBeenCalledWith(progress);
        });
        it('should not override onUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            easing: 'Linear.None',
            onUpdate: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Shape(options);
          expect(typeof tr._o.onUpdate).toBe('function');
          tr.timeline.setProgress(0);
          tr.timeline.setProgress(.1);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(.1);
          expect(args[1]).toBe(.1);
          expect(args[2]).toBe(true);
          return expect(args[3]).toBe(false);
        });
        return it('should call _setProgress method', function() {
          var obj, options, progress, tr;
          options = {
            easing: 'Linear.None',
            onUpdate: function() {}
          };
          obj = {};
          tr = new Shape(options);
          tr.timeline.setProgress(0);
          spyOn(tr, '_setProgress');
          progress = .1;
          tr.timeline.setProgress(progress);
          return expect(tr._setProgress.calls.first().args[0]).toBeCloseTo(progress, 5);
        });
      });
      describe('onStart callback override ->', function() {
        it('should override this._o.onStart', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onStart).toBe('function');
        });
        it('should call _show if isForward and !_isChained', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should not call _show if _isChained', function() {
          var obj, tr;
          tr = new Shape({
            isIt: 1,
            masterModule: new Shape
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(tr._show).not.toHaveBeenCalled();
        });
        it('should call _hide if not isForward and !_isChained', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should not call _hide if not isForward and _isChained', function() {
          var obj, tr;
          tr = new Shape({
            masterModule: new Shape
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hide if not isForward and isShowStart', function() {
          var obj, tr;
          tr = new Shape({
            isShowStart: true
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
      return describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onComplete).toBe('function');
        });
        it('should call _show if !isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _show if !isForward and _isLastInChain()', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _show if !isForward and _isLastInChain() #2', function() {
          var el, obj, tr;
          tr = new Shape().then({
            radius: 0
          });
          el = tr._modules[1];
          obj = {};
          el._applyCallbackOverrides(obj);
          spyOn(el, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(el._show).toHaveBeenCalled();
        });
        it('should not call _show if !isForward and not _isLastInChain', function() {
          var obj, tr;
          tr = new Shape().then({
            radius: 0
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).not.toHaveBeenCalled();
        });
        it('should call _hide if isForward and !isShowEnd', function() {
          var obj, tr;
          tr = new Shape({
            isShowEnd: false
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should not call _hide if isForward but isShowEnd', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        it('should call _hide if isForward and _isLastInChain', function() {
          var obj, tr;
          tr = new Shape({
            isShowEnd: false
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should call not _hide if isForward and !_isLastInChain', function() {
          var obj, tr;
          tr = new Shape({
            isShowEnd: false
          }).then({
            radius: 0
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        it('should not call _hide if isForward and _isLastInChain but isShowEnd', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hide if isForward but !_isLastInChain and isShowEnd', function() {
          var obj, tr;
          tr = new Shape().then({
            radius: 0
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
    });
    describe('_transformTweenOptions method', function() {
      return it('should call _applyCallbackOverrides with _o', function() {
        var tr;
        tr = new Shape;
        spyOn(tr, '_applyCallbackOverrides');
        tr._transformTweenOptions();
        return expect(tr._applyCallbackOverrides).toHaveBeenCalledWith(tr._o);
      });
    });
    describe('options object ->', function() {
      it('should receive empty options object by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte._o).toBeDefined();
      });
      return it('should receive options object', function() {
        var byte;
        byte = new Byte({
          option: 1
        });
        return expect(byte._o.option).toBe(1);
      });
    });
    describe('index option ->', function() {
      it('should receive index option', function() {
        var byte;
        byte = new Shape({
          index: 5
        });
        return expect(byte._index).toBe(5);
      });
      return it('should fallback to 0', function() {
        var byte;
        byte = new Shape;
        return expect(byte._index).toBe(0);
      });
    });
    describe('options history ->', function() {
      it('should have history array', function() {
        var byte;
        byte = new Byte;
        return expect(h.isArray(byte._history)).toBe(true);
      });
      return it('should save options to history array', function() {
        var byte;
        byte = new Byte({
          radius: 20
        });
        return expect(byte._history.length).toBe(1);
      });
    });
    describe('opacity set ->', function() {
      it('should set opacity with respect to units', function() {
        var byte;
        byte = new Byte({
          opacity: .5,
          isShowStart: true
        });
        return expect(byte.el.style.opacity).toBe('0.5');
      });
      return it('should animate opacity', function(dfr) {
        var byte;
        byte = new Byte({
          opacity: {
            1: 0
          },
          duration: 100,
          onComplete: function() {
            expect(byte.el.style.opacity).toBe('0');
            return dfr();
          }
        });
        return byte.play();
      });
    });
    describe('position set ->', function() {
      return describe('x/y coordinates ->', function() {
        it('should set a position with respect to units', function() {
          var byte;
          byte = new Byte({
            left: 100,
            top: 50
          });
          expect(byte.el.style.left).toBe('100px');
          return expect(byte.el.style.top).toBe('50px');
        });
        it('should animate position', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              100: '200px'
            },
            duration: 100,
            onComplete: function() {
              expect(byte.el.style.left).toBe('200px');
              return dfr();
            }
          });
          return byte.play();
        });
        it('should warn when x/y animated position and not foreign context', function() {
          var byte;
          spyOn(console, 'warn');
          byte = new Byte({
            left: {
              100: '200px'
            }
          });
          byte.play();
          return expect(console.warn).toHaveBeenCalled();
        });
        it('should notwarn when x/y animated position and foreign context', function() {
          var byte;
          spyOn(console, 'warn');
          byte = new Byte({
            left: {
              100: '200px'
            },
            ctx: svg
          });
          byte.play();
          return expect(console.warn).not.toHaveBeenCalled();
        });
        it('should animate position with respect to units', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              '20%': '50%'
            },
            duration: 100
          });
          byte.play();
          return setTimeout(function() {
            expect(byte.el.style.left).toBe('50%');
            return dfr();
          }, 500);
        });
        it('end unit that were not specified should fallback to start unit', function() {
          var byte;
          byte = new Byte({
            left: {
              '20%': 50
            },
            duration: 200
          });
          byte.play();
          expect(byte._deltas.left.start.unit).toBe('%');
          return expect(byte._deltas.left.end.unit).toBe('%');
        });
        it('should fallback to end units if units are different', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              '20%': '50px'
            },
            duration: 200,
            onComplete: function() {
              expect(byte.el.style.left).toBe('50px');
              return dfr();
            }
          });
          return byte.play();
        });
        it('should set a position with respect to units', function() {
          var byte, s, tr;
          byte = new Byte({
            x: 100,
            y: 50
          });
          s = byte.el.style;
          tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
          return expect(tr).toBe('translate(100px, 50px) rotate(0deg) scale(1, 1)');
        });
        it('should animate shift position', function(dfr) {
          var byte;
          byte = new Byte({
            x: {
              100: '200px'
            },
            duration: 200,
            onComplete: function() {
              var isTr, isTr2, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr = tr === 'translate(200px, 0) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(200px, 0px) rotate(0deg) scale(1, 1)';
              expect(isTr || isTr2).toBe(true);
              return dfr();
            }
          });
          return byte.play();
        });
        it('should animate position with respect to units', function(dfr) {
          var byte;
          byte = new Byte({
            x: {
              '20%': '50%'
            },
            duration: 200,
            onComplete: function() {
              var isTr, isTr2, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr = tr === 'translate(50%, 0) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(50%, 0px) rotate(0deg) scale(1, 1)';
              expect(isTr || isTr2).toBe(true);
              return dfr();
            }
          });
          return byte.play();
        });
        return it('should fallback to end units if units are differnt', function(dfr) {
          var byte;
          byte = new Byte({
            x: {
              '20%': '50px'
            },
            y: {
              0: '50%'
            },
            duration: 200,
            onComplete: function() {
              var s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              expect(tr).toBe('translate(50px, 50%) rotate(0deg) scale(1, 1)');
              return dfr();
            }
          });
          return byte.play();
        });
      });
    });
    describe('_render method ->', function() {
      it('should call _createShape method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_createShape');
        byte._isRendered = false;
        byte._render();
        return expect(byte._createShape).toHaveBeenCalled();
      });
      it('should set _isRendered to true', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte._isRendered).toBe(true);
        byte._isRendered = false;
        byte._render();
        return expect(byte._isRendered).toBe(true);
      });
      it('should not call _createShape method if already rendered', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_createShape');
        byte._isRendered = true;
        byte._render();
        return expect(byte._createShape).not.toHaveBeenCalled();
      });
      it('should set `el` and `shape` if `_isChained`', function() {
        var byte, byte0;
        byte0 = new Byte({
          radius: 25
        });
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        expect(byte.el).toBe(byte0.el);
        return expect(byte.shapeModule).toBe(byte0.shapeModule);
      });
      it('should not call _createShape method if _isChained', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          radius: 25,
          prevChainModule: byte0,
          masterModule: byte0
        });
        spyOn(byte, '_createShape');
        byte._o.el = byte0.el;
        byte._o.shapeModule = byte0.shapeModule;
        byte._render();
        return expect(byte._createShape).not.toHaveBeenCalled();
      });
      it('should call `_setProgress(0)` if not `_isChained`', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_setProgress');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setProgress).toHaveBeenCalledWith(0);
      });
      it('should not call `_setProgress(0)` if not `_isFirstInChain()`', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        spyOn(byte, '_setProgress');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setProgress).not.toHaveBeenCalledWith(0);
      });
      it('should call _setElStyles method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_setElStyles');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
      it('should not call _setElStyles method if _isChained', function() {
        var byte;
        byte = new Byte({
          prevChainModule: new Byte,
          masterModule: new Byte
        });
        spyOn(byte, '_setElStyles');
        byte._isRendered = true;
        byte._render();
        return expect(byte._setElStyles).not.toHaveBeenCalled();
      });
      it('should call _show method if `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        spyOn(byte, '_show');
        byte._isRendered = false;
        byte._render();
        return expect(byte._show).toHaveBeenCalled();
      });
      it('should call not _show method if not `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: false
        });
        spyOn(byte, '_show');
        byte._isRendered = false;
        byte._render();
        return expect(byte._show).not.toHaveBeenCalled();
      });
      it('should not _show method if `_isChained`', function() {
        var byte;
        byte = new Byte({
          isShowStart: true,
          prevChainModule: new Byte,
          masterModule: new Byte
        });
        spyOn(byte, '_show');
        byte._isRendered = false;
        byte._render();
        return expect(byte._show).not.toHaveBeenCalled();
      });
      it('should call _hide method if not `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: false
        });
        spyOn(byte, '_hide');
        byte._isRendered = false;
        byte._render();
        return expect(byte._hide).toHaveBeenCalled();
      });
      it('should call not _hide method if `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        spyOn(byte, '_hide');
        byte._isRendered = false;
        byte._render();
        return expect(byte._hide).not.toHaveBeenCalled();
      });
      return it('should not _hide method if `_isChained`', function() {
        var byte;
        byte = new Byte({
          isShowStart: false,
          prevChainModule: new Byte,
          masterModule: new Byte
        });
        spyOn(byte, '_hide');
        byte._isRendered = false;
        byte._render();
        return expect(byte._hide).not.toHaveBeenCalled();
      });
    });
    describe('_setElStyles method ->', function() {
      return it('should set dimentions and position of the `el`', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.el.style.position = 'static';
        byte.el.style.width = '0px';
        byte.el.style.height = '0px';
        byte.el.style['margin-left'] = '0px';
        byte.el.style['margin-top'] = '0px';
        byte._setElStyles();
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe("" + byte._props.shapeWidth + "px");
        expect(byte.el.style.height).toBe("" + byte._props.shapeHeight + "px");
        expect(byte.el.style['margin-left']).toBe("-" + (byte._props.shapeWidth / 2) + "px");
        return expect(byte.el.style['margin-top']).toBe("-" + (byte._props.shapeHeight / 2) + "px");
      });
    });
    describe('_draw method ->', function() {
      it('should set all attributes to shape\'s properties', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          x: 20,
          y: 30,
          rx: 15,
          ry: 25,
          stroke: 'red',
          strokeWidth: 2,
          strokeOpacity: .5,
          strokeLinecap: 'round',
          strokeDasharray: 200,
          strokeDashoffset: 100,
          fill: 'cyan',
          fillOpacity: .5,
          radius: 100,
          radiusX: 22,
          radiusY: {
            20: 0
          },
          points: 4
        });
        byte._draw();
        expect(byte.shapeModule._props.rx).toBe(byte._props.rx);
        expect(byte.shapeModule._props.ry).toBe(byte._props.ry);
        expect(byte.shapeModule._props.stroke).toBe(byte._props.stroke);
        expect(byte.shapeModule._props['stroke-width']).toBe(byte._props.strokeWidth);
        expect(byte.shapeModule._props['stroke-opacity']).toBe(byte._props.strokeOpacity);
        expect(byte.shapeModule._props['stroke-linecap']).toBe(byte._props.strokeLinecap);
        expect(byte.shapeModule._props['stroke-dasharray']).toBe(byte._props.strokeDasharray[0].value + ' ');
        expect(byte.shapeModule._props['stroke-dashoffset']).toBe(byte._props.strokeDashoffset[0].value + ' ');
        expect(byte.shapeModule._props['fill']).toBe(byte._props.fill);
        expect(byte.shapeModule._props['fill-opacity']).toBe(byte._props.fillOpacity);
        expect(byte.shapeModule._props['radius']).toBe(byte._props.radius);
        expect(byte.shapeModule._props['radiusX']).toBe(byte._props.radiusX);
        expect(byte.shapeModule._props['radiusY']).toBe(byte._props.radiusY);
        return expect(byte.shapeModule._props['points']).toBe(byte._props.points);
      });
      it('should call bit._draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.shapeModule, '_draw');
        byte._draw();
        return expect(byte.shapeModule._draw).toHaveBeenCalled();
      });
      it('should call _drawEl method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_drawEl');
        byte._draw();
        return expect(byte._drawEl).toHaveBeenCalled();
      });
      return it('should receive the current progress', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_draw');
        byte._setProgress(.5);
        return expect(byte._draw).toHaveBeenCalledWith(.5);
      });
    });
    describe('_drawEl method ->', function() {
      it('should set el positions and transforms', function() {
        var byte, isTr, isTr2, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          isShowStart: true
        });
        expect(byte.el.style.top).toBe('10px');
        expect(byte.el.style.opacity).toBe('1');
        expect(parseInt(byte.el.style.left, 10)).toBe(0);
        s = byte.el.style;
        tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(0, 0) rotate(0deg) scale(1, 1)';
        isTr2 = tr === 'translate(0px, 0px) rotate(0deg) scale(1, 1)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should set new values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10
        });
        byte._draw();
        byte._props.left = '1px';
        byte._draw();
        expect(byte.el.style.left).toBe('1px');
        return expect(byte._lastSet.left.value).toBe('1px');
      });
      it('should not set old values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._draw();
        byte._draw();
        expect(byte._lastSet.x.value).toBe('0');
        return expect(parseInt(byte.el.style.left, 10)).toBe(0);
      });
      it('should return true if there is no el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.el = null;
        return expect(byte._drawEl()).toBe(true);
      });
      it('should set transform if angle changed', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          angle: 25
        });
        byte._draw();
        byte._props.angle = 26;
        byte._draw();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(0, 0) rotate(26deg) scale(1, 1)';
        isTr2 = tr === 'translate(0px, 0px) rotate(26deg) scale(1, 1)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should not set transform if angle changed', function() {
        var byte;
        byte = new Byte({
          angle: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if scaleX changed', function() {
        var byte;
        byte = new Byte({
          scaleX: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._props.scaleX = 24;
        byte._draw();
        return expect(byte._fillTransform).toHaveBeenCalled();
      });
      it('should not set transform if scaleX not changed', function() {
        var byte;
        byte = new Byte({
          scaleX: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if scaleY changed', function() {
        var byte;
        byte = new Byte({
          scaleY: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._props.scaleY = 24;
        byte._draw();
        return expect(byte._fillTransform).toHaveBeenCalled();
      });
      it('should not set transform if scaleY not changed', function() {
        var byte;
        byte = new Byte({
          scaleY: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if one of the x, y or scale changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          ctx: svg
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if x changed #1', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          x: {
            0: 10
          }
        });
        byte._props.x = '4px';
        spyOn(byte, '_fillTransform').and.callThrough();
        byte._draw();
        expect(byte._fillTransform).toHaveBeenCalled();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(4px, 0) rotate(0deg) scale(1, 1)';
        isTr2 = tr === 'translate(4px, 0px) rotate(0deg) scale(1, 1)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should set transform if x changed #2', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          y: {
            0: 10
          }
        });
        byte._props.y = '4px';
        spyOn(byte, '_fillTransform').and.callThrough();
        byte._draw();
        expect(byte._fillTransform).toHaveBeenCalled();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(0, 4px) rotate(0deg) scale(1, 1)';
        isTr2 = tr === 'translate(0px, 4px) rotate(0deg) scale(1, 1)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should set transform if x changed #3', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          scale: {
            0: 10
          }
        });
        byte._props.scale = 3;
        spyOn(byte, '_fillTransform').and.callThrough();
        byte._draw();
        expect(byte._fillTransform).toHaveBeenCalled();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(0, 0) rotate(0deg) scale(3, 3)';
        isTr2 = tr === 'translate(0px, 0px) rotate(0deg) scale(3, 3)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should set `transform-origin` if `origin`', function() {
        var byte, prop, style, tr;
        byte = new Byte({
          origin: '50% 30%'
        });
        byte._drawEl();
        prop = 'transform-origin';
        style = byte.el.style;
        tr = style[prop] || style["" + mojs.h.prefix.css + prop];
        return expect(tr).toBe('50% 30% ');
      });
      it('should set `transform-origin` if `origin` changed', function() {
        var byte, prop, style, tr;
        byte = new Byte({
          origin: '50% 30%'
        });
        spyOn(byte, '_fillOrigin').and.callThrough();
        byte._props.origin = byte._parseStrokeDashOption('origin', '50% 40%');
        byte._drawEl();
        prop = 'transform-origin';
        style = byte.el.style;
        tr = style[prop] || style["" + mojs.h.prefix.css + prop];
        expect(tr).toBe('50% 40% ');
        return expect(byte._fillOrigin).toHaveBeenCalled();
      });
      it('should not set `transform-origin` if `origin`', function() {
        var byte;
        byte = new Byte({
          origin: '50% 30%'
        });
        byte._draw();
        spyOn(byte, '_fillOrigin').and.callThrough();
        byte._draw();
        return expect(byte._fillOrigin).not.toHaveBeenCalled();
      });
      return it('should set `transform-origin` if `origin` in `_deltas`', function() {
        var byte;
        byte = new Byte({
          origin: {
            '50% 30%': '50% 0'
          }
        });
        spyOn(byte, '_fillOrigin').and.callThrough();
        byte._drawEl();
        byte._drawEl();
        return expect(byte._fillOrigin.calls.count()).toBe(2);
      });
    });
    describe('_isPropChanged method ->', function() {
      it('should return bool showing if prop was changed after the last set', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._props.left = '20px';
        expect(byte._isPropChanged('left')).toBe(true);
        byte._props.left = '20px';
        return expect(byte._isPropChanged('left')).toBe(false);
      });
      return it('should add prop object to lastSet if undefined', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._isPropChanged('x');
        return expect(byte._lastSet.x).toBeDefined();
      });
    });
    describe('delta calculations ->', function() {
      it('should skip delta for excludePropsDelta object', function() {
        var byte;
        byte = new Byte({
          radius: {
            45: 55
          }
        });
        byte._skipPropsDelta = {
          radius: 1
        };
        byte._extendDefaults();
        return expect(byte._deltas.radius).not.toBeDefined();
      });
      describe('numeric values ->', function() {
        it('should calculate delta', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              25: 75
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25);
          expect(radiusDelta.delta).toBe(50);
          return expect(radiusDelta.type).toBe('number');
        });
        it('should calculate delta with string arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25': '75'
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25);
          return expect(radiusDelta.delta).toBe(50);
        });
        it('should calculate delta with float arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25.50': 75.50
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25.5);
          return expect(radiusDelta.delta).toBe(50);
        });
        it('should calculate delta with negative start arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '-25.50': 75.50
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(-25.5);
          return expect(radiusDelta.delta).toBe(101);
        });
        return it('should calculate delta with negative end arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25.50': -75.50
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25.5);
          expect(radiusDelta.end).toBe(-75.5);
          return expect(radiusDelta.delta).toBe(-101);
        });
      });
      describe('color values ->', function() {
        it('should calculate color delta', function() {
          var byte, colorDelta;
          byte = new Byte({
            stroke: {
              '#000': 'rgb(255,255,255)'
            }
          });
          colorDelta = byte._deltas.stroke;
          expect(colorDelta.start.r).toBe(0);
          expect(colorDelta.end.r).toBe(255);
          expect(colorDelta.delta.r).toBe(255);
          return expect(colorDelta.type).toBe('color');
        });
        return it('should ignore stroke-linecap prop, use start prop and warn', function() {
          var byte, fun;
          byte = null;
          spyOn(console, 'warn');
          fun = function() {
            return byte = new Byte({
              strokeLinecap: {
                'round': 'butt'
              }
            });
          };
          expect(function() {
            return fun();
          }).not.toThrow();
          expect(console.warn).toHaveBeenCalled();
          return expect(byte._deltas.strokeLinecap).not.toBeDefined();
        });
      });
      describe('unit values ->', function() {
        return it('should calculate unit delta', function() {
          var byte, xDelta;
          byte = new Byte({
            x: {
              '0%': '100%'
            }
          });
          xDelta = byte._deltas.x;
          expect(xDelta.start.string).toBe('0');
          expect(xDelta.end.string).toBe('100%');
          expect(xDelta.delta).toBe(100);
          return expect(xDelta.type).toBe('unit');
        });
      });
      return describe('tween-related values ->', function() {
        return it('should not calc delta for tween related props', function() {
          var byte;
          byte = new Byte({
            duration: {
              2000: 1000
            }
          });
          return expect(byte._deltas.duration).not.toBeDefined();
        });
      });
    });
    describe('_setProgress method ->', function() {
      it('should set Shapeion progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          }
        });
        byte._setProgress(.5);
        return expect(byte._progress).toBe(.5);
      });
      it('should set value progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        return expect(byte._props.radius).toBe(50);
      });
      it('should call _calcCurrentProps', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcCurrentProps');
        byte._setProgress(.5);
        return expect(byte._calcCurrentProps).toHaveBeenCalledWith(.5);
      });
      it('not to thow', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        return expect(function() {
          return byte._show();
        }).not.toThrow();
      });
      it('should set color value progress and only int', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(255,255,255)'
          }
        });
        colorDelta = byte._deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(127,127,127,1)');
      });
      return it('should set color value progress for delta starting with 0', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(0,255,255)'
          }
        });
        colorDelta = byte._deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(0,127,127,1)');
      });
    });
    describe('strokeDash.. values', function() {
      it('should set strokeDasharray/strokeDashoffset value progress', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: {
            '200 100': '400'
          }
        });
        byte._setProgress(.5);
        expect(byte._props.strokeDasharray[0].value).toBe(300);
        expect(byte._props.strokeDasharray[0].unit).toBe('px');
        expect(byte._props.strokeDasharray[1].value).toBe(50);
        return expect(byte._props.strokeDasharray[1].unit).toBe('px');
      });
      it('should set strokeDasharray/strokeDashoffset with percents', function() {
        var byte;
        byte = new Byte({
          type: 'circle',
          strokeDasharray: {
            '0% 200': '100%'
          },
          radius: 100
        });
        byte._setProgress(.5);
        expect(byte._props.strokeDasharray[0].value).toBe(50);
        expect(byte._props.strokeDasharray[0].unit).toBe('%');
        expect(byte._props.strokeDasharray[1].value).toBe(100);
        return expect(byte._props.strokeDasharray[1].unit).toBe('px');
      });
      it('should parse non-deltas strokeDasharray/strokeDashoffset values', function() {
        var byte;
        byte = new Byte({
          type: 'circle',
          strokeDasharray: '100%',
          radius: 100
        });
        expect(byte._props.strokeDasharray[0].value).toBe(100);
        return expect(byte._props.strokeDasharray[0].unit).toBe('%');
      });
      it('should parse multiple strokeDash.. values', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: '7 100 7'
        });
        expect(h.isArray(byte._props.strokeDasharray)).toBe(true);
        expect(byte._props.strokeDasharray.length).toBe(3);
        expect(byte._props.strokeDasharray[0].value).toBe(7);
        expect(byte._props.strokeDasharray[1].value).toBe(100);
        return expect(byte._props.strokeDasharray[2].value).toBe(7);
      });
      return it('should parse num values', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: 7
        });
        expect(h.isArray(byte._props.strokeDasharray)).toBe(true);
        return expect(byte._props.strokeDasharray.length).toBe(1);
      });
    });
    describe('_getRadiusSize method ->', function() {
      return it('should return max from delatas if key is defined', function() {
        var byte, size;
        byte = new Byte({
          radiusX: {
            20: 30
          }
        });
        size = byte._getRadiusSize('radiusX');
        return expect(size).toBe(30);
      });
    });
    describe('_increaseSizeWithEasing method ->', function() {
      it('should increase size based on easing - elastic.out', function() {
        var tr;
        tr = new Shape({
          easing: 'elastic.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - elastic.inout', function() {
        var tr;
        tr = new Shape({
          easing: 'elastic.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - back.out', function() {
        var tr;
        tr = new Shape({
          easing: 'back.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
      return it('should increase size based on easing - back.inout', function() {
        var tr;
        tr = new Shape({
          easing: 'back.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
    });
    describe('_increaseSizeWithBitRatio method ->', function() {
      it('should increase size based on bit ratio', function() {
        var tr;
        tr = new Shape({
          shape: 'equal'
        });
        tr._props.size = 1;
        tr._increaseSizeWithBitRatio();
        return expect(tr._props.size).toBe(tr.shapeModule._props.ratio);
      });
      return it('should increase size based 2 gap sizes', function() {
        var gap, tr;
        gap = 20;
        tr = new Shape({
          shape: 'equal',
          sizeGap: gap
        });
        tr._props.size = 1;
        tr._increaseSizeWithBitRatio();
        return expect(tr._props.size).toBe(tr.shapeModule._props.ratio + 2 * gap);
      });
    });
    describe('callbacksContext option ->', function() {
      it('should pass the options to the tween', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Shape({
          callbacksContext: obj,
          onUpdate: function() {
            return isRightContext = this === obj;
          }
        });
        tr.setProgress(0);
        tr.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should pass the options to the timeline', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Shape({
          callbacksContext: obj,
          timeline: {
            onUpdate: function() {
              return isRightContext = this === obj;
            }
          }
        });
        tr.setProgress(0);
        tr.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('_fillTransform method ->', function() {
      return it('return tranform string of the el', function() {
        var tr;
        tr = new Shape({
          x: 100,
          y: 100,
          angle: 50,
          scaleX: 2,
          scaleY: 3
        });
        return expect(tr._fillTransform()).toBe('translate(100px, 100px) rotate(50deg) scale(2, 3)');
      });
    });
    describe('_fillOrigin method ->', function() {
      it('return tranform-origin string of the el', function() {
        var tr;
        tr = new Shape({
          x: 100,
          y: 100,
          origin: '50% 30%'
        });
        return expect(tr._fillOrigin()).toBe('50% 30% ');
      });
      return it('return tranform-origin string of the el with delta', function() {
        var tr;
        tr = new Shape({
          x: 100,
          y: 100,
          easing: 'liner.none',
          origin: {
            '0% 0%': '50% 200%'
          }
        });
        tr.setProgress(0);
        tr.setProgress(.5);
        return expect(tr._fillOrigin()).toBe('25% 100% ');
      });
    });
    describe('_hideModuleChain method ->', function() {
      return it('should hide all modules in chain', function() {
        var tr;
        tr = new Shape().then({
          fill: 'orange'
        }).then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr._modules[0], '_hide');
        spyOn(tr._modules[1], '_hide');
        spyOn(tr._modules[2], '_hide');
        spyOn(tr._modules[3], '_hide');
        tr._hideModuleChain();
        expect(tr._modules[0]._hide).not.toHaveBeenCalled();
        expect(tr._modules[1]._hide).toHaveBeenCalled();
        expect(tr._modules[2]._hide).toHaveBeenCalled();
        return expect(tr._modules[3]._hide).toHaveBeenCalled();
      });
    });
    describe('el creation ->', function() {
      describe('el ->', function() {
        return it('should create el', function() {
          var byte, style;
          byte = new Byte({
            radius: 25
          });
          expect(byte.el.tagName.toLowerCase()).toBe('div');
          style = byte.el.style;
          expect(style['position']).toBe('absolute');
          expect(style['width']).toBe('52px');
          expect(style['height']).toBe('52px');
          return expect(byte.el.getAttribute('data-name')).toBe('mojs-shape');
        });
      });
      return it('should create bit based on shape option or fallback to circle', function() {
        var byte, byte2;
        byte = new Byte({
          radius: 25,
          shape: 'rect'
        });
        byte2 = new Byte({
          radius: 25
        });
        expect(byte.shapeModule._props.tag).toBe('rect');
        return expect(byte2.shapeModule._props.tag).toBe('ellipse');
      });
    });
    describe('_hide method ->', function() {
      it('should set `display` of `el` to `none`', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          isSoftHide: false
        });
        byte.el.style['display'] = 'block';
        byte._hide();
        return expect(byte.el.style['display']).toBe('none');
      });
      it('should set `_isShown` to false', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          isSoftHide: false
        });
        byte._isShown = true;
        byte._hide();
        return expect(byte._isShown).toBe(false);
      });
      return describe('isSoftHide option ->', function() {
        return it('should set `opacity` of `el` to `0`', function() {
          var byte;
          byte = new Byte({
            radius: 25,
            isSoftHide: true
          });
          byte.el.style['opacity'] = '.5';
          byte._hide();
          return expect(byte.el.style['opacity']).toBe('0');
        });
      });
    });
    describe('_show method ->', function() {
      it('should set `display` of `el` to `block`', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          isSoftHide: false
        });
        byte.el.style['display'] = 'none';
        byte._show();
        return expect(byte.el.style['display']).toBe('block');
      });
      it('should set `_isShown` to true', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          isSoftHide: false
        });
        byte._isShown = true;
        byte._show();
        return expect(byte._isShown).toBe(true);
      });
      return describe('isSoftHide option ->', function() {
        return it('should set `opacity` of `el` to `_props.opacity`', function() {
          var byte;
          byte = new Byte({
            radius: 25,
            isSoftHide: true,
            opacity: .2
          });
          byte.el.style['opacity'] = '0';
          byte._show();
          return expect(byte.el.style['opacity']).toBe("" + byte._props.opacity);
        });
      });
    });
    describe('_createShape method', function() {
      it('should create shape module based on `_props` shape', function() {
        var byte;
        byte = new Byte({
          shape: 'rect'
        });
        byte.shapeModule = null;
        byte._createShape();
        return expect(byte.shapeModule instanceof mojs.shapesMap.rect).toBe(true);
      });
      it('should send `width` and `height` to the `shape` module', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: 50,
          radiusY: 75,
          stroke: {
            0: 10
          }
        });
        byte.shapeModule = null;
        byte._createShape();
        expect(byte.shapeModule._props.width).toBe(2 * 50 + 10);
        expect(byte.shapeModule._props.height).toBe(2 * 75 + 10);
        return expect(byte.shapeModule._props.parent).toBe(byte.el);
      });
      return it('should save `width` and `height` to the `_props` module', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: 50,
          radiusY: 75,
          stroke: {
            0: 10
          }
        });
        byte.shapeModule = null;
        byte._createShape();
        expect(byte._props.shapeWidth).toBe(2 * 50 + 10);
        return expect(byte._props.shapeHeight).toBe(2 * 75 + 10);
      });
    });
    describe('_getMaxRadius method ->', function() {
      return it('should return maximum radius ', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75
        });
        spyOn(byte, '_getRadiusSize').and.callThrough();
        expect(byte._getMaxRadius('radiusX')).toBe(50);
        expect(byte._getMaxRadius('radiusY')).toBe(75);
        return expect(byte._getRadiusSize).toHaveBeenCalledWith('radiusX', 50);
      });
    });
    return describe('_getMaxStroke method ->', function() {
      it('should get maximum value of the strokeWidth if delta', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75,
          strokeWidth: {
            20: 0
          }
        });
        return expect(byte._getMaxStroke()).toBe(20);
      });
      return it('should get maximum value of the strokeWidth if static value', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75,
          strokeWidth: 10
        });
        return expect(byte._getMaxStroke()).toBe(10);
      });
    });
  });

}).call(this);
