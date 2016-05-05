// var Emitter = require("events").EventEmitter;
// var util = require("util");
var async = require("async");
var assert = require("assert");


var ReviewProcess = function(args) {
  assert(args.application, "Need an application to review");
  // instance level 
  var app = args.application;
  // var callback;

  // make sure the app is valid
  this.ensureAppValid = function(next) {
    if (app.isValid()) {
      // this.emit("validated", app);
      next(null, true);
    } else {
      // this.emit("invalid", app.validationMessage());
      next(app.validationMessage(), null);
    }
  }

  // find the next mission
  this.findNextMission = function(next) {
    // stub this out for now
    var mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    // this.emit("mission-selected", app);
    next(null, mission);
  };

  // make sure role selected is available
  this.roleIsAvailable = function(next) {
    // we have no concept of role selection just yet
    // TODO: What about a role? Need more info
    // this.emit("role-available", app);
    next(null, true);
  };

  // make sure height/weight/age is right for the role
  this.ensureRoleCompatible = function(next) {
    // TODO: find out about roles and height/weight etc
    // this.emit("role-compatible", app);
    next(null, true);
  };
  this.approveApplication = function(next) {
    next(null, true);
  };

  this.processApplication = function(next) {
    async.series({
          validated: this.ensureAppValid,
          mission: this.findNextMission,
          roleCompatible: this.roleIsAvailable,
          success: this.ensureRoleCompatible
        }, function(err, result) {
        if (err) {
          next(null, {
            success: false,
            message: err
          })
        } else {
          result.message = "Welcome to Mars!";
          console.log(result);
          next(null, result);
        }
      });
  };
};

// util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;