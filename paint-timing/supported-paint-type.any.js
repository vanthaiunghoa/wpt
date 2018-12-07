test(() => {
  if (typeof PerformanceObserver.supportedEntryTypes === "undefined")
    assert_unreached("supportedEntryTypes is not supported.");
  assert_greater_than(PerformanceObserver.supportedEntryTypes.indexOf("paint"), -1,
    "There should be an entry 'paint' in PerformanceObserver.supportedEntryTypes");
}, "supportedEntryTypes contains 'paint'.");
