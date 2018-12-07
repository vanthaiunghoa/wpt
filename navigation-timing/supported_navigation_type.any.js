test(() => {
  if (typeof PerformanceObserver.supportedEntryTypes === "undefined")
    assert_unreached("supportedEntryTypes is not supported.");
  assert_greater_than(PerformanceObserver.supportedEntryTypes.indexOf("navigation"), -1,
    "There should be an entry 'navigation' in PerformanceObserver.supportedEntryTypes");
}, "supportedEntryTypes contains 'navigation'.");
