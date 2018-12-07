test(() => {
  if (typeof PerformanceObserver.supportedEntryTypes === "undefined")
    assert_unreached("supportedEntryTypes is not supported.");
  const types = PerformanceObserver.supportedEntryTypes;
  assert_greater_than(types.indexOf("longtask"), -1,
    "There should be 'longtask' in PerformanceObserver.supportedEntryTypes");
  assert_equals(types.indexOf("taskattribution"), -1,
    "There should NOT be 'taskattribution' in PerformanceObserver.supportedEntryTypes");
}, "supportedEntryTypes contains 'longtask' but not 'taskattribution'.");
