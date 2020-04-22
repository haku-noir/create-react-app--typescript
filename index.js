const fs = require('fs-extra');
const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

module.exports = (name, author, minimum) => {
  const currentDir = process.cwd();

  let appDir = currentDir;
  if(name) appDir = `${currentDir}/${name}`;
  const appName = appDir.split('/').slice(-1)[0];

  console.log(`Creating ${appName}\n`);
  Promise.resolve()
    .then(() => fs.mkdirs(appDir))
    .then(() => {
      if(minimum) return fs.copy(`${__dirname}/minimum`, appDir);
      return fs.copy(`${__dirname}/custom`, appDir);
    })
    .then(() => {
      let packageData = require(`${appDir}/package.json`);
      packageData.name = appName;
      if(author) packageData.author = author;
      return fs.writeFile(`${appDir}/package.json`, JSON.stringify(packageData, null, '  '));
    })
    .then(() => {
      console.log('Installing packages...');
      return exec(`cd ${appDir} && npm install`);
    })
    .then(() => {
      console.log('Installed successfully!\n');
      console.log('Building...');
      return exec(`cd ${appDir} && npm run build`);
    })
    .then(() => {
      console.log('Builded successfully!\n');
      console.log('\nRun commands\n');
      if(name) console.log(`cd ${name}/`);
      console.log('npm init\nnpm start\n');
    })
    .catch(err => {
      console.log('Fail!');
      console.error(err);
    });
}

