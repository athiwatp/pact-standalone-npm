var pkg = require('../package.json');
var logger = require('./logger.js');
var os = require('os');
var osType = os.type();
var arch = os.arch();

logger.info("Checking platform specific dependency for OS '" + osType + "' and architecture '" + arch + "'...");
for (var packageName in pkg.optionalDependencies) {
  if (packageName.indexOf(pkg.name) !== -1) {
    try {
      require.resolve(packageName);
      logger.info("Platform specific dependency '" + packageName + "' installed successfully!");
      process.exit(0);
      break;
    } catch (e) {
      logger.debug(e);
    }
  }
}

logger.error("Cannot resolve specific pact module for OS " + osType + "' and architecture '" + arch + "'. Download/install must of failed, please try again.");
process.exit(1);
