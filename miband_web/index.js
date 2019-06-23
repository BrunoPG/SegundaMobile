const MiBand = require('miband');
const Bluetooth	= require('node-web-bluetooth');
//var bluetooth = require("webbluetooth").bluetooth;
 
async function teste(){
  const device = await Bluetooth.requestDevice({
    filters: [
      { services: [ MiBand.advertisementService ] }
    ],
    //optionalServices: MiBand.optionalServices
  });
  
  const server = await device.gatt.connect();
   
  let miband = new MiBand(server);
  await miband.init();
   
  log('Notifications demo...')
  await miband.getTime();

  log('Result:', await miband.hrmRead())

  log('Tap MiBand button, quick!')
  miband.on('button', () => log('Tap detected'))
  try {
    await miband.waitButton(10000)
  } catch (e) {
    log('OK, nevermind ;)')
  }
}

teste();
