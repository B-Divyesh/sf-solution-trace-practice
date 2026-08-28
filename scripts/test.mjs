import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const playwrightArgs = process.argv.slice(2);

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('npm', ['run', 'test:unit']);
run('npm', ['run', 'build']);
run('npx', ['playwright', 'test', ...playwrightArgs]);
