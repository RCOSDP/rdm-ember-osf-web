import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Transform | object', hooks => {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function(assert) {
        const transform = this.owner.lookup('transform:object');
        assert.ok(transform);
    });
});
