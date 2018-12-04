// META: title=StorageManager: estimate() for service worker registrations

function registerServiceWorker (filepath) {
  return new Promise(async (resolve, reject) => {
    try {
     const registration = await navigator.serviceWorker.register(filepath);
     resolve(registration);
    } catch (error) {
      reject(error);
    }
  })
}

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

  const usageBeforeCreate = estimate.usageDetails.serviceWorkerRegistrations ||
      0;

  const serviceWorkerRegistration = await registerServiceWorker('./helpers.js');
  t.add_cleanup(() => serviceWorkerRegistration.unregister());

  estimate = await navigator.storage.estimate();
  const usageAfterCreate = estimate.usageDetails.serviceWorkerRegistrations;

  assert_greater_than(
    usageAfterCreate, usageBeforeCreate,
    'estimated usage should increase after service worker is registered');
}, 'estimate() shows usage increase after large value is stored');
