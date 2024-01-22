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