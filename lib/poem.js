function randomPoem(author, origin, breakLine) {
    var str = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/src/poem.json", false);
    xhr.send();
    var poem = JSON.parse(xhr.responseText);
    var i = Math.floor(Math.random() * poem.length + 1) - 1;
    
    for (var j = 0; j < poem[i].verse.length - 1; j++) {
        str = str + poem[i].verse[j];
        if (breakLine == "all")
            str += "<br>";
    }
    str += poem[i].verse[j];

    if (author || origin) {
        if (breakLine == "all" || breakLine == "source")
            str += "<br>";
        str += "——";
    }
    if (author)
        str += poem[i].author;
    if (origin)
        str = str + "《" + poem[i].origin + "》";
    return str;
}
