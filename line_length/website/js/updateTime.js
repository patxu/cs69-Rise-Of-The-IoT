updateTime();
setInterval(updateTime, 2000);
function updateTime(){
  var query = new Parse.Query("Reading");
  query.descending("createdAt");
  query.limit(10);// value * 3 seconds = how far back you're looking
  query.find({
    success: function(results) {
      var index;
      var sum = 0;
      for (index = 0; index < results.length; index++){
        sum = parseFloat(sum) + parseFloat(results[index].get("distance"));
      }
      if (isNaN(sum)){
        document.getElementById("KAF-time").innerHTML = "Not Available";
      }
      else {
        var avg = sum/results.length*0.0328; //cm to feet
        if (avg > 10) {
          avg = 10;
          console.log("line past sensor!");
        }
        else {
          lineLength = 10 - avg;
          console.log("line length = ", lineLength);
        }
        var waitTime = 7.416 * lineLength + 1.810; //special function
        document.getElementById("KAF-time").innerHTML = formatTime(waitTime);

        //console.log(results[results.length-1].get("distance"));
        var createdAt = results[0].createdAt;
        var updated = "Last Updated: " + 
          (createdAt.getMonth()+1) + "/" + 
          createdAt.getDate() + "/" + 
          createdAt.getFullYear() + " at " + 
          createdAt.getHours() + ":" + 
          createdAt.getMinutes();
        document.getElementById("last-updated").innerHTML = updated;
      }
    }, error: function(error) {
      console.log(error);
    }
  });
}

function formatTime(time){
  var minutes = Math.floor(time/60);
  if (minutes > 0){
    if (mintes == 1) {
      return minutes + " minute"
    }
    else {
      return minutes + " minutes"
    }
  }
  var seconds = Math.floor(time%60);
    if (seconds == 1) {
      return seconds + " second"
    }
    else {
      return seconds + " seconds"
    }
}
