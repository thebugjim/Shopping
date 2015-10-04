//function sendSMSviaMail() {
// given the matched users via array matchedUsers
var SMSEmailAccount = Parse.Object.extend("SMSEmailAccount");

for(var i = 0; i < matchedUsers.length; i++) {
    var toEmail = matchedUsers[i].get("phoneNumber").replace(/-/g,'');
    var phoneCarrier = matchedUsers[i].get("phoneCarrier");
    if(phoneCarrier === "AT&T") {
        toEmail += "@txt.att.net";
    }
    else if(phoneCarrier === "Sprint") {
        toEmail += "@messaging.sprintpcs.com";
    }
    else if(phoneCarrier === "T-Mobile") {
        toEmail += "@tmomail.net";
    }
    else if(phoneCarrier === "Verizon") {
        toEmail += "@vtext.com";
    }

    var smsKey;
    var smsEmail;
    var query = new Parse.Query(SMSEmailAccount);
    query.find({
        success: function(results) {
            for(var j = 0; j < results.length; j++) {
                var account = results[j];
                var numEmailsInHour = account.get("numEmailsInHour");
                if(numEmailsInHour < 25) {
                    smsKey = account.get("key");
                    smsEmail = account.get("fromEmail");
                    account.set("numEmailsInHour", numEmailsInHour+1);
                    account.save();
                    break;
                }
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': smsKey,
            'message': {
                'from_email': smsEmail, 
                'to': [
                    {
                        'email': toEmail, 
                         'type': 'to'
                    }
                ],
            'autotext': 'true',
            'subject': 'You have been matched!',
            'html': 'Please log into your BundleMe account to see your matches.'
        }
    }
    }).done(function(response) {
        console.log(response);
    });
}

//}
