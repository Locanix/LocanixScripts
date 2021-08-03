var minutes = 60;
var minimumDuration = minutes * 60000; //ms

var checkOnduty = function (onDutyValue) {
  var onDuty = onDutyValue == "Yes";
  //log(onDutyValue);
  //check for onDuty customfield true - if true goes in for checking for delay
  if (onDuty) {
    var now = new Date();
    if (!context.state.ts) {
      context.setState({ ts: now.getTime() }); //set first time ts on onduty true -
      return true;
    } else {
      var ts = context.state.ts;
      var diffMs = now.getTime() - ts;
      log(diffMs);
      log("OnDuty for " + diffMs / 60000 + " Mins.");
      if (diffMs <= minimumDuration) {
        // check for delay match - if more than 1 hour - set Vehicle IN onDuty Tag.
        log("Still not " + minutes + " minutes.");
        return true;
      } else {
        log("Onduty over " + minutes + " minutes.");
        //context.setState({}); //reset counter
        return false;
      }
    }
  } else {
    context.setState({}); //check for onDuty - if false - reset counter
    return false;
  }
};

//var onDutyValue = session.user.getCustomFieldValue("OnDuty");
var onDutyValue = fields.get("OnDuty", false) ? "Yes" : "No";
//log(onDutyValue);
return checkOnduty(onDutyValue);
