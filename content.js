// http://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/

var elements = document.getElementsByTagName('*');

var title_res = [];
var name_res = [];
var punctuation = [',', ' ', '\\.', '\\?', '!'];
var e = 'president(( |-)elect)?( donald)?( j.?)? trump';
var e2 = 'donald( j.?)? trump';
var p, match, re;
var epistring = 'President Trump, who lost the popular vote by nearly 3 million votes';
var namestring = 'Donald Trump, who lost the popular vote by nearly 3 million votes';

for (var i = 0; i < punctuation.length; i++) {
  p = punctuation[i];
  match = e + p;
  re = new RegExp(match, 'gi');
  title_res.push(re);
  match = e2 + p;
  re = new RegExp(match, 'gi');
  name_res.push(re);
}



for (var i = 0; i < elements.length; i++) {
  var element = elements[i];

  for (var j = 0; j < element.childNodes.length; j++) {
    var node = element.childNodes[j];


    if (node.nodeType === 3) {
      var text = node.nodeValue;
      // comma comes first so it isn't injected again after a space
      // the space is handled separately since it also needs a comma
      updated = text.replace(title_res[0], epistring + ',');
      updated = updated.replace(title_res[1], epistring + ', ');
      updated = updated.replace(name_res[0], namestring + ',');
      updated = updated.replace(name_res[1], namestring + ', ');
      for (var k = 2; k < punctuation.length; k++) {
        p = punctuation[k];
        if (k === 2 || k === 3) {
          p = p.slice(1, 2);
        }
        // alert(p)
        updated = updated.replace(title_res[k], epistring + p);
        updated = updated.replace(name_res[k], namestring + p);

      }

      if (updated !== text) {
        element.replaceChild(document.createTextNode(updated), node);
      }
    }
  }
}
