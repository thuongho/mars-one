var assert = require("assert");
var MembershipApplication = require("../models/membership_application.js");

describe("Membership application requirements", function() {
  
  var validApp;

  before(function() {
    // arrange the data here
    validApp = new MembershipApplication({
      first: "Test",
      last: "User",
      email: "test@test.com",
      age: 30,
      height: 66,
      weight: 180
    });
  });

  // Acceptance test
  describe("Application valid if...", function(){
    it("all validators successful", function() {
      assert(validApp.isValid(), "Not valid");
    });
  });

  // Throw stones at the test
  describe("Application invalid if...", function() {

    it.skip("is past the validUntil date", function() {

    })

    it('email is 4 characters or less', function() {
      var invalidApp = new MembershipApplication({email: "dd"})
      assert(!invalidApp.emailIsValid());
    });
    it('email does contain an @', function() {
      var invalidApp = new MembershipApplication({email: "thingthingthing:thing.com"});
      assert(!invalidApp.emailIsValid());
    });
    it('email is omitted', function() {
      var invalidApp = new MembershipApplication();
      assert(!invalidApp.emailIsValid());
    });
    it('height is less than 60 inches', function() {
      var invalidApp = new MembershipApplication({height: 10});
      assert(!invalidApp.heightIsValid());
    });
    it('height is more than 75 inches', function() {
      var invalidApp = new MembershipApplication({height: 80});
      assert(!invalidApp.heightIsValid());
    });
    it('height is omitted', function() {
      var invalidApp = new MembershipApplication();
      assert(!invalidApp.heightIsValid());
    });
    it('age is more than 100', function() {
      var invalidApp = new MembershipApplication({age: 101});
      assert(!invalidApp.ageIsValid());
    });
    it('age is less than 15', function() {
      var invalidApp = new MembershipApplication({age: 14});
      assert(!invalidApp.ageIsValid());
    });
    it('age is omitted', function() {
      var invalidApp = new MembershipApplication();
      assert(!invalidApp.ageIsValid());
    });
    it('weight is less than 100', function() {
      var invalidApp = new MembershipApplication({weight: 90});
      assert(!invalidApp.weightIsValid());
    });
    it('weight is more than 300', function() {
      var invalidApp = new MembershipApplication({weight: 301});
      assert(!invalidApp.weightIsValid());
    });
    it('weight is omitted', function() {
      var invalidApp = new MembershipApplication();
      assert(!invalidApp.weightIsValid());
    });
    it('first is omitted', function() {
      var invalidApp = new MembershipApplication();
      assert(!invalidApp.nameIsValid());
    });
    it('last is omitted', function() {
      var invalidApp = new MembershipApplication();
      assert(!invalidApp.nameIsValid());
    });
  });
});