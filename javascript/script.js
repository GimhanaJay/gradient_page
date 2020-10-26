var gradientCollection = document.getElementsByClassName("gradient_color_container");
var totalGradientCount = gradientCollection.length;
var gradientViewPort = document.getElementById('gradient-view');
var gradientLocalNum = 1;

//1st gradient load start
var gradientCodes = document.getElementById("gradient-01");
var color1 = gradientCodes.getAttribute("data-color1");
var color2 = gradientCodes.getAttribute("data-color2");
gradientViewPort.style.backgroundImage = "linear-gradient(to right," + color1 + "," + color2 + ")";
gradientCollection[0].style.display = "block";
//end of first gradient load

/*
* this for loop will add the colour to the two small boxes of each gradient with the correct colour from
* data-color1 and data-color2 attributes.
*/
for(i = 0; i<totalGradientCount; i++){
    var color1 = gradientCollection[i].getAttribute("data-color1");
    var color2 = gradientCollection[i].getAttribute("data-color2");

    var colorBox = gradientCollection[i].getElementsByClassName("colour_box");

    colorBox[0].style.backgroundColor = color1;
    colorBox[1].style.backgroundColor = color2;
}


//This function will listen for clicks on arrow buttons to change into next or previous gradient.
Array.from(document.getElementsByClassName("control_arrow")).forEach(function(item) {
    item.addEventListener('click', function(){

        //if left arrow clicked
        if(item.classList.contains("arrow_left")){
            if(gradientLocalNum == 1){
                gradientLocalNum = totalGradientCount;
            }else{
                gradientLocalNum = gradientLocalNum - 1;
            }
            var gradientId = "gradient-0" + gradientLocalNum;
        }

        //if right arrow clicked
        else{
            if(gradientLocalNum == totalGradientCount){
                gradientLocalNum = 1;
            }else{
                gradientLocalNum = gradientLocalNum + 1;
            }
            var gradientId = "gradient-0" + gradientLocalNum;
        }

        var gradientDivNumber = gradientLocalNum - 1;
        
        for(i=0; i < totalGradientCount; i++){
            gradientCollection[i].style.display = "none";
        }
        gradientCollection[gradientDivNumber].style.display = "block";

        setGradient(gradientId);
    });
});

function setGradient(gradientId){
    
    if (gradientId == undefined){
        gradientId = "gradient-01";
    }

    var gradientCodes = document.getElementById(gradientId);
    var color1 = gradientCodes.getAttribute("data-color1");
    var color2 = gradientCodes.getAttribute("data-color2");

    gradientViewPort.style.backgroundImage = "linear-gradient(to right," + color1 + "," + color2 + ")";
}

//copy button listen and hex code copying code
Array.from(document.getElementsByClassName("copy_btn")).forEach(function(item){
    item.addEventListener('click', function(){
        var codeHolder = document.getElementById("copy-text");
        var colorCode = item.parentNode.getElementsByClassName("colour_code")[0].innerText;

        codeHolder.value = colorCode;
        codeHolder.style.display = "flex";

        /* Select the hex field */
        codeHolder.select();
        codeHolder.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the hex inside the field*/
        document.execCommand("copy");

        /* Alert the copied hex */
        var popup = document.getElementById("popup-info");

        document.getElementById('popup_text').innerText = colorCode + " Copied!";
        popup.classList.add('popup_visible');
        setTimeout(function(){ 
            popup.classList.remove('popup_visible');
        }, 2000);

        codeHolder.style.display = "none";
    });
});