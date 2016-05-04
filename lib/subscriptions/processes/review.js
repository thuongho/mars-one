var Emitter = require("events").EventEmitter;

var ReviewProcess = function(args) {

  // make sure the app is valid
  this.ensureAppValid = function(app) {
    if (app.isValid) {
      this.emit("validated", app);
    } else {
      this.emit("invalid", "The is a problem with this application");
    }
  }
  // find the next mission
  // make sure role selected is available
  // make sure height/weight/age is right for the role
  // accept the app with a message
  // dey the app with a message
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;