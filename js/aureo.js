
function multitextLength(arrayText) {
  let maxLength = 0;
  for (text of arrayText) {
    if (maxLength < text.length) {
      maxLength = text.length;
    }
  }
  return maxLength;
}

function aureo(text) {
  let texts = text.split(" ");
  let combinations = aureoRec(texts);
  let result = new Set();
  for (let i = 0; i < combinations.length; i++) {
    for (let j = 0; j < combinations[i].length; j++) {
      result.add(combinations[i][j]);
    }
  }
  return result;
}

function aureoRec(arrayTexts) {
  arrayArrayArrayTextResult = [];
  for (let i = 0; i < arrayTexts.length; i++) {
    arrayArrayArrayTextResult[i] = [];
  }
  if (arrayTexts.length == 1) {
    let arrayArrayTextResult = [];
    arrayArrayTextResult.push([arrayTexts[0]]);
    arrayArrayArrayTextResult[0].push(arrayArrayTextResult);
  } else {
    let subArrayText = [];
    for (let i = 0; i < arrayTexts.length - 1; i++) {
      subArrayText.push(arrayTexts[i]);
    }
    let subArrayArrayResult = aureoRec(subArrayText);
    for (let i = 0; i < texts.length; i++) {
      if (i > 0) {
        // concatenar al ultimo en cada texts[i]
      }
      if (i < texts.length - 1) {
        // añadir el último a texts[i-1]
      }
    }
  }
  return arrayArrayArrayTextResult;
}

