var fs = require( "fs" );
// Project src
var srcDir = "src/"
var entryPoint = srcDir + "main.js";
// regex to serach @include("file"); declarations
var searchRegex = /include\(\"[^\)]*\"\)/;
// Parse entry point
var content = parseInclude(entryPoint);
// write the parsed/replaced content into a single file
fs.writeFileSync("dist/main.js", content);

/**
 *  Replaces all @include("file") declarations with file content
 *
 * @param {String} file src
 * @returns {String} File content with "includes" content
 */
function parseInclude(src) {
  var content = fs.readFileSync(src, "utf8");
  // verify all include declarations and replace with file content
  while((searchResult = searchRegex.exec(content))) {
    var includeDeclaration = searchResult[0];
    // get included file path
    var includePath = getPath(includeDeclaration);
    // parse include declaration content
    var includeContent = parseInclude(includePath);
    // replace include with file content
    content = content.replace(includeDeclaration, includeContent);
  }
  return content;
}

/**
 * Retrive the include declaration file path
 *
 * @param {String} include declaration like @include("test.js")
 * @returns {String} path
 */
function getPath(include) {
  return srcDir + include.replace(/include\(\"|\"\)/g, "");
}

function insertFileInfo(src, content) {
  var prefix = "/* >> " + src + " START */",
      sufix = "/* << " + src + " END */";
  //
  return  prefix + "\n" + content + "\n" + sufix;
}
console.log("js compiled.");
