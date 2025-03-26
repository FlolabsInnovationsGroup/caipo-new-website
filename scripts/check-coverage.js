const fs = require('fs');
const path = require('path');

// Coverage thresholds from jest.config.js
const COVERAGE_THRESHOLDS = {
  branches: 80,
  functions: 80,
  lines: 80,
  statements: 80,
};

// Read coverage summary
const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');

if (!fs.existsSync(coveragePath)) {
  console.error('❌ No coverage report found. Run tests with coverage first:');
  console.error('   pnpm test:coverage');
  process.exit(1);
}

const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
const total = coverage.total;

// Check thresholds
const failures = [];

Object.entries(COVERAGE_THRESHOLDS).forEach(([metric, threshold]) => {
  const actual = total[metric].pct;
  if (actual < threshold) {
    failures.push({
      metric,
      threshold,
      actual,
    });
  }
});

// Report results
console.log('\n📊 Coverage Report:\n');

Object.entries(total).forEach(([metric, data]) => {
  const threshold = COVERAGE_THRESHOLDS[metric];
  const actual = data.pct;
  const color = actual >= threshold ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${metric}: ${actual}% (threshold: ${threshold}%)\x1b[0m`);
});

if (failures.length > 0) {
  console.log('\n❌ Coverage is below thresholds:');
  failures.forEach(({ metric, threshold, actual }) => {
    console.log(`   ${metric}: ${actual}% < ${threshold}%`);
  });
  console.log('\nFiles needing coverage:');
  
  Object.entries(coverage).forEach(([file, data]) => {
    if (file === 'total') return;
    
    const needsCoverage = Object.entries(data).some(([metric, { pct }]) => {
      const threshold = COVERAGE_THRESHOLDS[metric];
      return pct < threshold;
    });

    if (needsCoverage) {
      console.log(`   ${file}`);
    }
  });

  process.exit(1);
} else {
  console.log('\n✅ All coverage thresholds met!\n');
} 