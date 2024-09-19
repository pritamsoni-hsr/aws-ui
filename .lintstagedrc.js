const path = require('path');

// bun run lint:fmt
const buildEslintCommand = filenames => {
  return [
    `prettier -w ${filenames.map(f => path.relative(process.cwd(), f)).join('  ')}`,
    `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f)).join(' --file ')}`,
  ];
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
