var table = document.getElementById('debug')
fetch('blocklist.json')
.then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
.then(data => {
    for (let i =0; i < Object.keys(data).length; i++) {
        //var $button = $("<button>" + data[i]+ "</button>");
        //$container.prepend($button);
        var row =  `<tr>
                        <button class="button" onClick = "removeList()">${data[i]}</button>
                    </tr> ` 
        table.innerHTML +=row
        //document.querySelector("#debug").innerHTML = data[i]
      }

    })


