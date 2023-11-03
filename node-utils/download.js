const { exit } = require("process");
const axios = require('axios').default;
const fs = require('fs');

(async function (){
  var args = process.argv.slice(2);
  if (args.length != 3) {
    console.log("Usage: download.js DOWNLOAD_URL KEY OUTPUT_FILE");
    exit(1);
  }
  
  var downloadUrl = args[0];
  var key = args[1];
  var outputFile = args[2];
  
  await downloadFile(downloadUrl, key, outputFile);
}());


async function downloadFile(url, key, outputFile) {
  const { data, headers } = await axios({
      url: url,
      method: "GET",
      headers: {
        "Authorization": "Bearer " + key
      },
      responseType: "stream",
  });

  const contentLength = headers['content-length'];

  console.log(contentLength)

  data.on('data', (chunk) => {
      // console.log(chunk)
  })

  data.pipe(fs.createWriteStream(outputFile))
}
