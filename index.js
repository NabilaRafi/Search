function loadJson(){
        var jsonFile = "./savingsData.json";
        var httpRequest = new XMLHttpRequest();
        var jsonObj;
        try{
            // Opera 8.0+, Firefox, Chrome, Safari
            httpRequest = new XMLHttpRequest();
            }catch (e){
            // Internet Explorer Browsers
            try{
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");

            }catch (e) {

            try{
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
            // Something went wrong
            alert("Your browser broke!");
             return false;
          }

       }

    }
     httpRequest.onreadystatechange = function(){
        console.log(httpRequest.readyState);

       if (httpRequest.readyState == 4  ){
          // Javascript function JSON.parse to parse JSON data
           jsonObj = JSON.parse(httpRequest.responseText);
           var screenWidth = screen.width;
           console.log(screenWidth)
           if (screenWidth < 600){
               renderPageTable(jsonObj);
           }else{
               renderTable(jsonObj);
               console.log(jsonObj);
           }
       }

}


      httpRequest.open("GET", jsonFile, true);
      httpRequest.send();
}


function renderTable(data){
    console.log("reached renderTable")


    var col = [];
    var key;

    for(i=0;i<=data.length;i++){
        for(key in data[i]){
            console.log(key);
            if(col.indexOf(key) === -1){
                col.push(key);

            }

        }
    }
    var table = document.createElement("table");

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    var tableContainer = divContainer.appendChild(table);
            tableContainer.id = "dataTable"
}
                 
function renderPageTable(data){
       console.log("reached renderPageTable")
       var current_page = 1;
       var records_per_page = 1; 
       var numPages = Math.ceil(data.length / records_per_page);
       console.log("number of records" + numPages)
       //console.log(current_page)



       var buttonSpace = document.getElementById("buttonSpace");



       var prevButton = document.createElement('button');
       var nexButton = document.createElement('button');
        console.log("next button" + nexButton);
        console.log("previous button" + prevButton);

       prevButton.id = "btn_prev";
       prevButton.onclick = prevPage;
       prevButton.innerHTML = "prev";
       buttonSpace.appendChild(prevButton);
    

       nexButton.id = "btn_nex";
       nexButton.innerHTML = "next";
       //nexButton.onclick = nexPage;
       buttonSpace.appendChild(nexButton);
        document.getElementById("btn_nex").onclick = nexPage;
    console.log(buttonSpace);



       function nexPage(){
        console.log("reached next Page");
        if (current_page < numPages) {
            console.log(numPages +"  "+ current_page)
            current_page++;
            changePage(current_page);
        }
    }

       console.log("after the button creation");
       function prevPage()
          {

              console.log("reached prev Page")
            if (current_page > 1) {
                console.log("reached if of prev Page")
                current_page--;
                console.log(current_page);
                changePage(current_page);
        }
        }
       console.log("after the prevPage function")
       console.log(data)






    function changePage(page)
    {


        var btn_prev = document.getElementById("btn_prev");
        var btn_next = document.getElementById("btn_nex");
        var listing_table = document.getElementById("showData");

        // Validate page
        if (page < 1) {page = 1};
        if (page > numPages) {page = numPages;}

        listing_table.innerHTML = "";


        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            listing_table.innerHTML += data[i].Product + "<br>" + data[i].Interest_Type + "<br>" + data[i].Interest_Rate + "<br>" + data[i].Minimum_Deposit+ "<br>";
        


        if (page == 1) {
            
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
            var prevData = data[i-1];
            console.log(prevData);
            btn_prev.innerHTML = prevData.Product;
        }


        if (page == numPages)

            {
           document.getElementById("btn_nex").style.visibility = "hidden";
        } else {
            document.getElementById("btn_nex").style.visibility = "visible";
            var nextData = data[i+1];
            console.log(nextData);
            btn_next.innerHTML = nextData.Product;
        }
        }
    }

    window.onload = function() {
        changePage(1);
    };

   }