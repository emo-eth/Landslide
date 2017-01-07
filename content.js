// http://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/

var elements = document.getElementsByTagName('*');

var res = [];
var punctuation = [',', ' ', '\\.', '\\?', '!'];
let e = 'president(( |-)elect)?( donald)? trump';
var p, match, re;
  for (var i = 0; i < punctuation.length; i++) {
    p = punctuation[i];
    match = e + p;
    re = new RegExp(match, 'gi');
    res.push(re);
  }


for (var i = 0; i < elements.length; i++) {
  var element = elements[i];

  for (var j = 0; j < element.childNodes.length; j++) {
    var node = element.childNodes[j];


    if (node.nodeType === 3) {
      var text = node.nodeValue;
      // comma comes first so it isn't injected again after a space
      // the space is handled separately since it also needs a comma
      updated = text.replace(res[0], 'President Trump, who lost the popular vote by nearly 3 million votes,');
      updated = text.replace(res[1], 'President Trump, who lost the popular vote by nearly 3 million votes, ');
      for (var k = 2; k < punctuation.length; k++) {
        p = punctuation[k];
        updated = updated.replace(res[k], 'President Trump, who lost the popular vote by nearly 3 million votes' + p);
      }

      if (updated !== text) {
        element.replaceChild(document.createTextNode(updated), node);
      }
    }
  }
}
