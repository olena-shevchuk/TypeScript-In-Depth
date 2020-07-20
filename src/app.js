showHello('greeting', 'TypeScript');
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = "Hello from " + name;
}
