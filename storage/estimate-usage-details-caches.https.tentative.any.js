// META: title=StorageManager: estimate() for caches

test(t => {
  assert_true('estimate' in navigator.storage);
  assert_equals(typeof navigator.storage.estimate, 'function');
  assert_true(navigator.storage.estimate() instanceof Promise);
}, 'estimate() method exists and returns a Promise');

promise_test(async t => {
  const estimate = await navigator.storage.estimate();
  assert_true(typeof estimate === 'object');
  assert_true('usage' in estimate);
  assert_equals(typeof estimate.usage, 'number');
  assert_true('quota' in estimate);
  assert_equals(typeof estimate.quota, 'number');
}, 'estimate() resolves to dictionary with members');

promise_test(async t => {
  let estimate = await navigator.storage.estimate();

  const cachesUsageBeforeCreate = estimate.usageDetails.caches || 0;

  const cacheName = 'testCache'
  const cache = await caches.open(cacheName);
  t.add_cleanup(() => caches.delete(cacheName));

  await cache.put('/test.json', new Response('{\
    "foo": "bar",\
    "foo1": "bar1",\
    "foo2": "bar2"\
  }'));

  estimate = await navigator.storage.estimate();
  const cachesUsageAfterPut = estimate.usageDetails.caches;
  assert_greater_than(
    cachesUsageAfterPut, cachesUsageBeforeCreate,
    'estimated usage should increase after value is stored');
}, 'estimate() shows usage increase after large value is stored');
