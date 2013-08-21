
//function UpdateNewsLetters(WCFhostURL) {
//    var email = $("#txtNewsLetter").val();
//    var hostURL = WCFhostURL + "WCF_Redesign.svc/UpdateNewsLetters"; //"WCF_Redesign.svc/UpdateNewsLetters"; 

//    if ($.trim(email).length == 0) {

//        $('#spnErrorText').html('');
//        $('#spnErrorText').append('*');
//    }
//    else {
//        if (validateEmail(email)) {
//            $('#spnErrorText').html('');
//            var params = {};
//            params.name = $("#txtNewsLetter").val();
//            $("#btnUpdateNewsLetters").attr('src', 'Images/loader.gif');
//            $.ajax({
//                type: "POST",
//                url: hostURL,
//                data: '{"sEMail": "' + email + '"}',
//                contentType: 'application/json; charset=utf-8',
//                success: function (response, status, xhr) {
//                    if (status == "success") {
//                        $("#btnUpdateNewsLetters").attr('src', 'Images/btn_submit.gif');
//                        alert('Thank you!  You have been signed up!');
//                    }
//                },
//                error: function (xhr, status, error) {
//                    $("#btnUpdateNewsLetters").attr('src', 'Images/btn_submit.gif');
//                    alert("Error\n-----\n" + xhr.status + '\n' + xhr.responseText);
//                }
//            });
//        }
//        else {
//            $('#spnErrorText').html('');
//            $('#spnErrorText').append('Invalid Email Address');
//        }
//    }
//}

$(document).ready(function () {
    $("#txtNewsLetter").keypress( function (e) {
        var keyCode = (window.event) ? e.which : e.keyCode;
       
        if (keyCode == 13) {
            // e.preventDefault();
            $("#btnUpdateNewsLetters").focus();            
            UpdateNewsLetters()
            e.preventDefault();
        }
    });

})





function UpdateNewsLetters() {
    var email = $("#txtNewsLetter").val();


    if ($.trim(email).length == 0) {

        $('#spnErrorText').html('');
        $('#spnErrorText').append('*');
    }
    else {
        if (validateEmail(email)) {
            $('#spnErrorText').html('');
            $("#btnUpdateNewsLetters").attr('src', 'Images/loader.gif');
            $.post("GetNewsLetterResopnse.aspx?Email="+email+"",function(data) {
                //alert(data);
                if (data == "1")
                {
                    $("#btnUpdateNewsLetters").attr('src', 'Images/btn_submit.gif');
                    alert("Thank you!  You have been signed up!");
                } else if (data == "2")
                {
                    $("#btnUpdateNewsLetters").attr('src', 'Images/btn_submit.gif');
                    alert("Thank you! But You had already signed up!");
                }                
                else{
                    $("#btnUpdateNewsLetters").attr('src', 'Images/btn_submit.gif');
                    alert("not signed up");
                }
            });
        }
        else {
            $('#spnErrorText').html('');
            $('#spnErrorText').append('Invalid Email Address');
        }
    }
}

function settext() {
    if (document.getElementById("txtNewsLetter").value == "")
        document.getElementById("txtNewsLetter").value = "enter your email here";
}

function removetext() {
    document.getElementById("txtNewsLetter").value = "";
}
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}


function numValid(obj, digitsAfterDecimal) {
   // alert(obj.value);
    var testString;
    if (digitsAfterDecimal > 0) {
        testString = ".0123456789-";
    }
    else {
        testString = "0123456789-";
    }
    var outputString;
    outputString = "";
    for (i = 0; i <= obj.value.length - 1; i++) {
        if (testString.indexOf(obj.value.charAt(i)) != -1) {
            if (obj.value.charAt(i) == ".") {
                if (outputString.indexOf(".") == -1) {
                    outputString = outputString + obj.value.charAt(i);
                }
            }
            else {
                if (obj.value.charAt(i) == "-") {
                    if (outputString.indexOf("-") == -1) {
                        if (i == 0) {
                            outputString = outputString + obj.value.charAt(i);
                        }
                    }
                }
                else {
                    outputString = outputString + obj.value.charAt(i);
                }
            }
        }
    }

    obj.value = roundNumber(outputString, digitsAfterDecimal);
    if (obj.value == ".") {
        obj.value = "";
    }
    if (obj.value.indexOf(".") == (obj.value.length - 1)) {
        obj.value = obj.value.substr(0, obj.value.length - 1);
    }
    if (isNaN(parseFloat(obj.value))) {
        obj.value = "";
    }
}

function roundNumber(inputValue, digitsAfterDecimal) {
    inputValue = (inputValue * (Math.pow(10, digitsAfterDecimal)));
    inputValue = Math.round(inputValue);
    inputValue = (inputValue / (Math.pow(10, digitsAfterDecimal)));
    return inputValue;
}
    