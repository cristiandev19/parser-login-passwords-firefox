const fs = require('fs')
const readline = require('readline');

const PATH = './file2parse/logins.csv';
// fs.readFile('./file2parse/logins.csv', 'utf8' , (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data[3]);
//   // for()
// })

const readInterface = readline.createInterface({
  input: fs.createReadStream(PATH),
  output: null,
  console: false
});

readInterface.on('line', function(line) {
  console.log('line', line);
  console.log('line', line.length);
});

function CSVParsed() {
  return new Promise((resolved, reject) => {
    try {
      readInterface.on('line', function(line) {
        if (a < 6) {
          console.log('line', line);
          console.log('line', line.length);
        }
      });

    } catch (error) {
      return reject(error);
    }
  })
}

