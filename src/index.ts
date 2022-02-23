import * as core from '@actions/core';

import { CommandWrapper } from './command-builder';
import { Inputs } from './inputs';
import { locateNx } from './locate-nx';
import { runNx } from './run-nx';

async function main(): Promise<void> {
  core.debug(
    `core.getInput('affectedBaseNonPR') - ${core.getInput(
      'affectedBaseNonPR',
    )}`,
  );
  console.log(
    `cl ore.getInput('affectedBaseNonPR') - ${core.getInput(
      'affectedBaseNonPR',
    )}`,
  );
  core.debug(
    `core.getInput('affectedHeadNonPR') - ${core.getInput(
      'affectedHeadNonPR',
    )}`,
  );
  console.log(
    `cl core.getInput('affectedHeadNonPR') - ${core.getInput(
      'affectedHeadNonPR',
    )}`,
  );
  const inputs: Inputs = {
    targets: core
      .getInput('targets', { required: true })
      .split(',')
      .filter((target) => target.length > 0),
    projects: core
      .getInput('projects', { required: false })
      .split(',')
      .filter((project) => project.length > 0),
    all: core.getInput('all') === 'true',
    affected: core.getInput('affected') === 'true',
    parallel: core.getInput('parallel') === 'true',
    maxParallel:
      parseInt(core.getInput('maxParallel')) === NaN
        ? 3
        : parseInt(core.getInput('maxParallel')),
    args: core
      .getInput('args')
      .split(' ')
      .filter((arg) => arg.length > 0),
    nxCloud: core.getInput('nxCloud') === 'true',
    workingDirectory: core.getInput('workingDirectory'),
    affectedBaseNonPR: core.getInput('affectedBaseNonPR') || 'HEAD~1',
    affectedHeadNonPR: core.getInput('affectedHeadNonPR') || 'HEAD',
  };
  core.debug(`inputs - ${JSON.stringify(inputs, null, 2)}`);
  console.log(`cl inputs - ${JSON.stringify(inputs, null, 2)}`);

  if (inputs.workingDirectory && inputs.workingDirectory.length > 0) {
    core.info(`🏃 Working in custom directory: ${inputs.workingDirectory}`);
    process.chdir(inputs.workingDirectory);
  }

  return core
    .group<CommandWrapper>('🔍 Ensuring Nx is available', locateNx)
    .then((nx) => runNx(inputs, nx))
    .catch((err) => {
      core.setFailed(err);
    });
}

void main();
