import Ember from 'ember';
import Logger from '../util/logger';

const logger = new Logger();

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  userLogin(userId) {
    return logger.userLogin(userId);
  },

  info(message, options) {
    logger.log( {message, options, severity: 'info'} );
  },
  warn(message, options) {
    logger.log( {message, options, severity: 'warn'} );
  },
  error(message, options) {
    logger.log( {message, options, severity: 'error'} );
  },


  workflow(startingPoint, userId = undefined) {
    return logger.createWorkflow(startingPoint, userId);
  },

  perf(metric, options) {
    return logger.createMeasurement(metric, options);
  }

});
