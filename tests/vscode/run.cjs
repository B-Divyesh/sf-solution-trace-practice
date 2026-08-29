const { createHash } = require('node:crypto');
const { cp, mkdtemp, mkdir, readFile, rm, writeFile } = require('node:fs/promises');
const { spawnSync } = require('node:child_process');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { runTests } = require('@vscode/test-web');

async function prepareVscodeWeb(runnerDataDir) {
  const response = await fetch('https://update.code.visualstudio.com/api/update/web-standalone/stable/latest');
  if (!response.ok) throw new Error(`VS Code release lookup failed with ${response.status}.`);
  const release = await response.json();
  const folderName = `vscode-web-stable-${release.version}`;
  const destination = path.join(runnerDataDir, folderName);
  const marker = path.join(destination, 'version');
  try {
    if ((await readFile(marker, 'utf8')).trim() === folderName) return release.version;
  } catch {}

  const archive = path.join(runnerDataDir, `${folderName}.tar.gz`);
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  const download = spawnSync('curl', [
    '--fail', '--location', '--retry', '12', '--retry-all-errors', '--continue-at', '-',
    '--output', archive, release.url
  ], { stdio: 'inherit' });
  if (download.status !== 0) process.exit(download.status ?? 1);
  const digest = createHash('sha256').update(await readFile(archive)).digest('hex');
  if (digest !== release.sha256hash) throw new Error('Downloaded VS Code web archive failed its SHA-256 check.');
  const unpack = spawnSync('tar', ['-xzf', archive, '-C', destination, '--strip-components=1'], { stdio: 'inherit' });
  if (unpack.status !== 0) process.exit(unpack.status ?? 1);
  await writeFile(marker, folderName);
  await rm(archive, { force: true });
  return release.version;
}

async function main() {
  // @vscode/test-web resolves its own Playwright release. Install that exact
  // Chromium once so this real VS Code web-profile test is reproducible even
  // when the worker only preinstalls the root Playwright browser.
  const testWebRoot = path.dirname(require.resolve('@vscode/test-web'));
  const playwrightCli = path.join(path.dirname(require.resolve('playwright', { paths: [testWebRoot] })), 'cli.js');
  const install = spawnSync(process.execPath, [playwrightCli, 'install', 'chromium'], { stdio: 'inherit' });
  if (install.status !== 0) process.exit(install.status ?? 1);

  const profile = await mkdtemp(path.join(tmpdir(), 'show-debugging-vscode-'));
  const installedRoot = path.join(profile, 'installed');
  const extensionRoot = path.join(installedRoot, 'extension');
  const runnerDataDir = path.resolve('.vscode-test-web');
  await Promise.all([mkdir(installedRoot), mkdir(runnerDataDir, { recursive: true })]);
  const commit = await prepareVscodeWeb(runnerDataDir);

  try {
    const unpack = spawnSync('unzip', ['-q', path.resolve('dist/site/downloads/show-your-debugging-vscode.vsix'), '-d', installedRoot]);
    if (unpack.status !== 0) process.exit(unpack.status ?? 1);
    const packagedTestDir = path.join(extensionRoot, 'dist/test/suite');
    await mkdir(packagedTestDir, { recursive: true });
    await cp(path.resolve('vscode-extension/dist/test/suite/index.js'), path.join(packagedTestDir, 'index.js'));
    await runTests({
      browserType: 'chromium',
      browserOptions: ['--no-sandbox'],
      quality: 'stable',
      commit,
      headless: true,
      extensionDevelopmentPath: extensionRoot,
      extensionTestsPath: path.join(packagedTestDir, 'index.js'),
      testRunnerDataDir: runnerDataDir
    });
  } finally {
    await rm(profile, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
