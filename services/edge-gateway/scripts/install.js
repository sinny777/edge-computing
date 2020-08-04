const os = require('os');
var spawn = require('cross-spawn');

 console.log(os.platform());
 console.log(process.platform);

/*
if (os.platform() === 'win32') {
    spawn.sync('npm', ['run', 'native_build'], {
        input: 'win32 detected. Build native module.',
        stdio: 'inherit'
    });
}
*/

if(process.platform != 'darwin'){
  spawn.sync('npm', ['install', 'sx127x', 'latest'], {
      input: 'linux detected. Install sx127x module.',
      stdio: 'inherit'
  });
}
