YUI().use('test', function (Y) {
  var testCase = new Y.Test.Case({
    name: 'My Test Case',
    test1: function () {
      Y.Assert.areEqual(10, 10);
    },
    test2: function () {
      Y.Assert.isArray([1, 2, 3]);
    }
  });
  Y.Test.Runner.add(testCase);
  Y.Test.Runner.run();
});