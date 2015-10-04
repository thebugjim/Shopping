//function sendSMSviaMail() {
    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': 'DwBPuASHFHNIc37ez2gauA',
            'message': {
                'from_email': connie.chiang94@gmail.com',
                'to': [
                    {
                        'email': '9094380571@tmomail.net'
                        type: 'to'
                    }
                ],
            'autotext': 'true',
            'subject': 'You have been matched!',
            'html': 'Please log into your account to see your matches.'
        }
    }
    }).done(function(response) {
        console.log(response);
    });
//}
