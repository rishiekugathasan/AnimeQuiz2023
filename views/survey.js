//check for Navigation Timing API support
if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
console.info(performance.navigation.type);
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    window.location.replace("http://localhost:3000/reSubmission");
} else {
    console.info( "This page is not reloaded");
}

function check() {
    let val;

    let option1 = document.getElementById("option_1");
    let option2 = document.getElementById("option_2");
    let option3 = document.getElementById("option_3");
    let option4 = document.getElementById("option_4");
    let option5 = document.getElementById("option_5");
    let option6 = document.getElementById("option_6");
    let option7 = document.getElementById("option_7");
    let option8 = document.getElementById("option_8");
    let option9 = document.getElementById("option_9");

    let button = document.getElementById("submit_btn");

    if (option1.checked || option2.checked || option3.checked || option4.checked || option5.checked || option6.checked || option7.checked || option8.checked || option9.checked) {
        val = true;
        button.disabled = false;
        alert("you selected");
        return false;
    }else {
        val = false;
        button.disabled = true;
        alert("you did not select");
        location.reload();
        return true;
    }
}