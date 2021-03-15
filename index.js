const fs = require('fs')
const lineReader = require('line-reader');
const PATH = './file2parse/logins.csv';
const MAX_CONTENT = 1000;
const os = require("os");

async function parseToBitwarden() {
  const [ header, ...arrayJSON] = await parseToJSON();
  const contentMinusHeader = MAX_CONTENT - header.len;
  console.log('contentMinusHeader', contentMinusHeader);
  // console.log('arrayJSON', arrayJSON)
  const arrayOfSections = sectionJSON(arrayJSON, contentMinusHeader)
  parseArrayToFile(arrayOfSections, header);
}

function parseArrayToFile(array, header) {
  let fileNum = 1;
  for(let arr of array) {

    const logger = fs.createWriteStream(`./filesParsed/${fileNum}.csv`, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
    logger.write(header.content + os.EOL) // append string to your file
    for(let line of arr) {
      logger.write(line.content + os.EOL) // append string to your file
    }
    logger.end();
    fileNum = fileNum + 1;
  }
}



function parseToJSON() {
  return new Promise((resolve, reject) => {
    let arrayParsed = [];
    lineReader.eachLine(PATH, function(line, last) {
      const obj = {
        content: line,
        len: line.length
      };
      arrayParsed = [...arrayParsed, obj];
      if (last) {
        return resolve(arrayParsed)
      }
    });
  })
}



function sectionJSON(array, limit, iterador = 0, contentResult = []) {
  if (contentResult.length == 0) {
    contentResult.push([]);
  }
  const lastActualItem = contentResult[contentResult.length - 1];
  const sumLastActualItem = sumArrayByKey(lastActualItem, 'len');
  const itemIterador = array[iterador];

  if(sumLastActualItem + itemIterador.len <= limit) {
    contentResult[contentResult.length - 1].push(itemIterador)
  } else {
    contentResult = [...contentResult, [itemIterador]]
  }

  if (array.length - 1 > iterador) {
    return sectionJSON(array, limit, iterador + 1, contentResult)
  } else {
    return contentResult
  }
}

function sumArrayByKey(array, key) {
  return [...array].reduce((acc,item)=> {
    return acc + item[key]
  }, 0);
}


parseToBitwarden();
