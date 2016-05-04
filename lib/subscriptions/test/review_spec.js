var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");

describe("The Review Process", function() {
  describe("Recieving a valid application", function() {
    // SCENARIO
    var decision;
    // done mark this as an asynchronous test
    before(function(done) {
      validApp = new MembershipApplication({
        first: "Test",
        last: "User",
        email: "test@test.com",
        age: 30,
        height: 66,
        weight: 180
      });
      var review = new ReviewProcess();
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
  });
});