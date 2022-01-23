const path = require('path');
const Max = require('max-api');
const { exec } = require('child_process');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler("speak", (msg) => {
	let command = 'espeak.exe -w temp.wav \"'+msg+"\"";
	Max.post(command);
    exec(command, (err, stdout, stderr) => {
		if (err) {
	    // node couldn't execute the command
          Max.error(stderr);
		  Max.error(err);
		  return;
		}
		// the *entire* stdout and stderr (buffered)
		Max.outletBang()
	  });
});
