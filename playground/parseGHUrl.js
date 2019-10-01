import parseGHUrl from "parse-github-url"

let repoMeta = parseGHUrl("https://github.com/jonschlinkert/micromatch")

// This provides one of the fields of the object
document.getElementById("output").innerHTML = repoObj.owner
