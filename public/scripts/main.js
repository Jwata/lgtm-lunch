require.config({
  baseUrl : "scripts/",
  paths   : {
    jquery     : "../bower_components/jquery/dist/jquery",
    bootstrap  : "../bower_components/bootstrap/dist/bootstrap",
    react      : "../bower_components/react/react-with-addons",
    text       : "../bower_components/requirejs-text/text",
    JSXTransformer: "JSXTransformer"
  },
  shim : {
    jquery : {
      exports : "$"
    },
    bootstrap: {
      deps :['jquery']
    }
  },
  jsx : {
    fileExtension: ".jsx"
  }
});


require(['jquery', 'react', 'jsx!components/FoodGallery'], function ($, React, FoodGallery) {
  FoodGallery = React.createFactory(FoodGallery);

  var token = "xoxp-8665634432-8665626855-8719130195-7a102e";
  var params = $.param({types: "images", token: token});
  var url = "https://slack.com/api/files.list?" + params;

  console.log(FoodGallery);
  React.render(
      FoodGallery({url: url}),
      document.getElementById('main-gallery-container')
  );
});

//var teamId = "LGTM Lunch";
//var clientId = "8665634432.8720154930";
//var clientSecret = "fba1bd5c7eb9d53d5c27b37122504a31";
//var oauthUrl = "https://slack.com/oauth/authorize";
//var redirectUri = "http://localhost:9292/";
//
//var token = "xoxp-8665634432-8665626855-8720456611-757dc5";
//
//function getParameterByName(name) {
//  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//      results = regex.exec(location.search);
//  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//}
//
//var code = getParameterByName('code');
//
//var tokenParam = $.param({
//  client_id: clientId,
//  client_secret: clientSecret,
//  code: code,
//  redirect_uri: redirectUri
//});
//tokenUrl = apiUrl + '/oauth.access?' + tokenParam;
//$.get(tokenUrl).then(function(ret) {
//  console.log(ret);
//  if (ret.ok) return ret.access_token;
//  // TODO error handling
//}).then(function(token) {
//  window.localStorage.setItem("access_token", token);
//});
//
//
//// Profile
//var Profile = React.createClass({
//  render: function() {
//    var authParam = $.param({
//      client_id: clientId,
//      team: teamId,
//      redirect_uri: redirectUri
//    });
//    var authUrl = oauthUrl + '?' + authParam;
//    return (
//        <a href={authUrl}> Login with <img src="/images/slack_rgb.png" alt="Slack" height="30px" /></a>
//    );
//  }
//
//});
//React.render(
//    <Profile/>,
//    document.getElementById('profile')
//);

