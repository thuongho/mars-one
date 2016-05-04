var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");
var sinon = require("sinon");

describe("The Review Process", function() {
  describe("Receiving a valid application", function() {
    // SCENARIO
    var decision;
    var validApp = new MembershipApplication({
      first: "Test",
      last: "User",
      email: "test@test.com",
      age: 30,
      height: 66,
      weight: 180
    });
    var review = new ReviewProcess();
    // var spy = sinon.spy(validApp, "emailIsValid");
    // makes more sense to spy on review process
    // var spy = sinon.spy(review, "ensureAppValid");

    // for events 
    // var spy = sinon.spy();
    var validationSpy = sinon.spy();
    var missionSpy = sinon.spy();
    var roleAvailableSpy = sinon.spy();
    var roleCompatibleSpy = sinon.spy();

    // done mark this as an asynchronous test
    before(function(done) {
      // don't call spy() and let event emiiter call it
      review.on("validated", validationSpy); 
      review.on("mission-selected", missionSpy); 
      review.on("role-available", roleAvailableSpy); 
      review.on("role-compatible", roleCompatibleSpy);  
      review.processApplication(validApp, function(err, result) {
        decision = result;
        // asynch when done is called, mocha is gonna continue with tests
        done();
      });
    });
    
    // BEHAVIOR
    it("returns success", function() {
      assert(decision.success, decision.message);
    });
    it("ensures the application is valid", function() {
      // emailIsValid method was called
      // assert(spy.called);  // alternative of writing
      // assert(review.ensureAppValid.called);  // spy wraps the called method
      // assert(spy.called);  // object is no longer wrapped
      // make sure that all of the spy are called if it is just spy = sinon.psy()
      // assert.equal(spy.callCount, 4);
      assert(validationSpy.called); 
    });
    it("slects a mission", function() {
      assert(missionSpy.called);
    });
    it("ensures a role exists", function() {
      assert(roleAvailableSpy.called);
    });
    it("ensures role compatibility", function() {
      assert(roleCompatibleSpy.called);
    });
  });
});