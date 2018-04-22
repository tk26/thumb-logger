let chai = require('chai');
let should = chai.should();
let logger = require('./logger.js');

describe('getLogger', () =>{
  it('should return logger when provided valid logger name', () => {
    const loggerName = 'APILog';
    let log = logger.getLogger(loggerName);
    log.should.not.be.null;
    log.id.should.equal(loggerName);
  });

  it('should throw type error when unregistered logger is provided', () => {
    const loggerName = 'NonexistantLogger';
    chai.expect(logger.getLogger.bind(logger,loggerName)).to.throw(TypeError);
  });

  it('should not create duplicate logger objects', () => {
    const loggerName = 'APILog';
    let logA = logger.getLogger(loggerName);
    logA.should.not.be.null;
    logA.id.should.equal(loggerName);
    let logB = logger.getLogger(loggerName);
    logB.id = "Test";
    logB.id.should.equal(logA.id);
  });
});
