/**
 * test/util/add-chainable.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik    = dofile('schematik');
const addChainable = dofile('util/add-chainable');


describe('.addChainable()', function() {

  beforeEach(function() {
    this.obj  = new Schematik().flag('hello', 'world');
    this.get  = Sinon.spy(function() { return this.flag('foo', 'bar'); });
    this.call = Sinon.spy(function() { return this.flag('foo'); });

    addChainable(this.obj, 'test', this.call, this.get);
    addChainable(this.obj, 'test2', this.call);
  });

  it('should add a chainable property to the context', function() {
    expect(this.obj)
      .to.have.property('test')
      .that.is.a('function');
    expect(this.obj)
      .to.be.an.instanceof(Schematik);
    expect(this.obj.flag('hello'))
      .to.equal('world');
  });

  it('should invoke {get} when accessed', function() {
    this.obj.test;

    expect(this.get)
      .to.be.calledOnce;
  });

  it('should invoke both {get} and {call} when called', function() {
    this.obj.test();

    expect(this.get)
      .to.be.calledOnce;
    expect(this.call)
      .to.be.calledOnce;
  });

  it('should return the result of {get} when accessed', function() {
    expect(this.obj.test.flag('foo'))
      .to.equal('bar');
  });

  it('should return the result of {call} when called', function() {
    expect(this.obj.test())
      .to.equal('bar');
  });

  it('should set the `chain` flag when accessed', function() {
    expect(this.obj.test.flag('chain'))
      .to.be.a('function');
  });

  it('should throw when {get} returns a non-Schematik value', function() {
    addChainable(this.obj, 'foo', function() { }, function() { return 'bar'; });
    expect(() => { this.obj.foo; })
      .to.throw('get() must return a Schematik object or undefined.');
  });

  it('should default to noop when {get} is undefined', function() {
    expect(this.obj.test2)
      .to.be.an.instanceof(Schematik);

    this.obj.test2();

    expect(this.call)
      .to.be.calledOnce;
  });

});
