import Ember from 'ember';
import Logger from '../utils/logger';

const logger = new Logger();

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  userLogin(userId) {
    return logger.userLogin(userId);
  },

  debug(message, options) {
    logger.log( message, { options, severity: 'debug'} );
  },
  info(message, options) {
    logger.log( message, { options, severity: 'info'} );
  },
  warn(message, options) {
    logger.log( message, { options, severity: 'warn'} );
  },
  error(message, options) {
    logger.log( message, { options, severity: 'error'} );
  },


  workflow(startingPoint, userId = undefined) {
    return logger.createWorkflow(startingPoint, userId);
  },

  perf(metric, options) {
    return logger.createMeasurement(metric, options);
  }

});
