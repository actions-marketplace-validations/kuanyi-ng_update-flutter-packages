import * as core from '@actions/core'
import {getOutdatedPackages} from './outdated'
import {readPubspec} from './pubspecReader'
import {updatePubspecToResolvableVersion} from './pubspecUpdater'
import {writePubspec} from './pubspecWriter'

async function run(): Promise<void> {
  try {
    // read pubspec.yaml
    const pubspec = readPubspec()
    // get outdated package
    const outdatedPackages = await getOutdatedPackages()
    // update pubspec
    const updatedPubspec = updatePubspecToResolvableVersion(
      pubspec,
      outdatedPackages
    )
    // write to pubspec.yaml
    writePubspec(updatedPubspec)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
