
function getCredentials() {
var data = {
      'grant_type': 'client_credentials',
      'client_id': "fUhst7tpAZGWhPKyJpX2yTYLQmuOXBk_O77bXeiD",
      'client_secret': "IQw-agHWk3WwnKf4Q_hke8FjcIRzkdxFO2kv7VmC"
    };

    $.ajax({
      'url': 'https://api.clarifai.com/v1/token',
      'data': data,
      'type': 'POST'
    })
    .then(function(r) {
      localStorage.setItem('accessToken', r.access_token);
    });
}

function postImage(imgurl) {
    var data = {
      'url': imgurl
    };
    var accessToken = localStorage.getItem('accessToken');

    return $.ajax({
      'url': 'https://api.clarifai.com/v1/tag',
      'headers': {
        'Authorization': 'Bearer ' + accessToken
      },
      'data': data,
      'type': 'POST'
    }).then(function(r){
        localStorage.setItem('tagResp', r);
        parseResponse(r);

    });
  }

  function  parseResponse(resp) {
    var tags = [];
    if (resp.status_code === 'OK') {
      var results = resp.results;
      tags = results[0].result.tag.classes;
    } else {
      console.log('Sorry, something is wrong.');
    }
    console.log(tags)
    return tags;
  }

  function run(imgurl) {
        $.when(getCredentials())
          .then(postImage(imgurl))
}
