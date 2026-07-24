import { runRelationshipVerifier } from '../../services/simulated/verifier';

runRelationshipVerifier().then(report => {
  console.log('=== DSG-002 Relationship Verification Report ===');
  console.log('Status:', report.passed ? '✅ PASS' : '❌ FAIL');
  report.checks.forEach(check => {
    console.log(`[Check #${check.id}] ${check.name}: ${check.passed ? '✅' : '❌'} ${check.message || ''}`);
  });
  if (!report.passed) {
    throw new Error('DSG-002 verifier failed');
  }
});
