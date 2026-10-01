import assert from 'node:assert/strict';
import test from 'node:test';
import {
  FREE_TRIO_FORMULA_LIMIT,
  REWARDED_TRIO_FORMULA_BATCH,
  TrioFormulaQuotaManager
} from '../src/systems/TrioFormulaQuotaManager.js';

test('allows the free quota, then a rewarded batch adds five unique discoveries', () => {
  const quota = new TrioFormulaQuotaManager();
  for (let index = 0; index < FREE_TRIO_FORMULA_LIMIT; index++) {
    assert.equal(quota.recordDiscovery(`formula-${index}`), true);
  }

  assert.equal(quota.canDiscover('formula-next'), false);
  assert.equal(quota.recordDiscovery('formula-0'), false);
  assert.equal(quota.getStatus().remaining, 0);

  quota.grantRewardedBatch();
  assert.equal(quota.getUnlockedLimit(), FREE_TRIO_FORMULA_LIMIT + REWARDED_TRIO_FORMULA_BATCH);
  assert.equal(quota.recordDiscovery('formula-next'), true);
});

test('restores legacy discoveries and keeps the larger saved reward allowance', () => {
  const legacyFormulaKeys = Array.from({ length: 28 }, (_, index) => `legacy-${index}`);
  const quota = new TrioFormulaQuotaManager({ trioRewardedFormulaSlots: 1 }, legacyFormulaKeys);

  assert.equal(quota.getStatus().discovered, 28);
  assert.equal(quota.getUnlockedLimit(), 28);
  assert.equal(quota.getStatus().remaining, 0);
});

test('reset clears discovered formulas and rewarded slots', () => {
  const quota = new TrioFormulaQuotaManager();
  quota.recordDiscovery('formula-1');
  quota.grantRewardedBatch();
  quota.reset();

  assert.deepEqual(quota.getStatus(), {
    discovered: 0,
    limit: FREE_TRIO_FORMULA_LIMIT,
    remaining: FREE_TRIO_FORMULA_LIMIT
  });
});
