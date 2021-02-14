/* eslint-disable @typescript-eslint/no-unused-vars */
import * as core from '@actions/core'
import {getOutdatedPackages} from './outdated'
import {readPubspec, writePubspec, updatePackages} from './pubspecService'

async function run(): Promise<void> {
  const pathToPubspecFile = core.getInput('pathToPubspecFile')
  // change preferToSplitPrs (input) from string to boolean type
  const preferToSplitPrs = core.getInput('preferToSplitPrs') === 'true'

  try {
    // read pubspec.yaml
    const pubspec = readPubspec(pathToPubspecFile)

    // get outdated package
    const outdatedPackages = await getOutdatedPackages()

    // update pubspec
    const updatedPubspec = updatePackages(pubspec, outdatedPackages)
    // eslint-disable-next-line no-console
    console.log(updatedPubspec.toString())

    // write to pubspec.yaml
    // writePubspec(updatedPubspec, pathToPubspecFile)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
