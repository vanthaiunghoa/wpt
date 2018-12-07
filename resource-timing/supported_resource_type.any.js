test(() => {
  if (typeof PerformanceObserver.supportedEntryTypes === "undefined")
    assert_unreached("supportedEntryTypes is not supported.");
  assert_greater_than(PerformanceObserver.supportedEntryTypes.indexOf("resource"), -1,
    "There should be an entry 'resource' in PerformanceObserver.supportedEntryTypes");
}, "supportedEntryTypes contains 'resource'.");
