var test = require('tape');
var reducer = require('../src/reducers/index');


test('Initial test', function (assert) {

	assert.deepEqual(
		reducer({ type: '@@STATE', payload: { foo: 'bar' } }),
		{ foo: 'bar' },
		'1 should be equal to 1'
	);

	assert.end();

});
