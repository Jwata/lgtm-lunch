var teamId = "LGTM Lunch";
var clientId = "8665634432.8720154930";
var clientSecret = "fba1bd5c7eb9d53d5c27b37122504a31";
var apiUrl = "https://slack.com/api";
var oauthUrl = "https://slack.com/oauth/authorize";
var redirectUri = "http://localhost:9292/";

var token = "xoxp-8665634432-8665626855-8720456611-757dc5";

var Food = React.createClass({
  postReaction: function(reaction) {
    var id = this.props.id
    var queryStr = $.param({
        token: token,
        name: reaction,
        file: id
    });
    var requestUrl = apiUrl + '/reactions.add?' + queryStr
    $.get(requestUrl);
  },
  onClickThumbsUp: function() {
    console.log("onClickThumbsUp")
    this.postReaction("thumbsup")
  },
  onClickThumbsDown: function() {
    console.log("onClickThumbsDown")
    this.postReaction("thumbsdown")
  },
  render: function() {
    return (
      <div className="col-md-2 col-sm-3 col-xs-6">
        <div className="thumbnail">
          <div className="image" style={{height: '162px', overflowY: 'hidden', backgroundColor: '#F5F5F5'}}>
            <a href={this.props.url}>
              <img alt="" src={this.props.img} style={{maxHeight: '200px'}} />
            </a>
          </div>
          <div className="row">
            <div className="col-md-12 col-xs-12 col-sm-12">
              <p>{this.props.title}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-xs-6 col-sm-6">
              <img src="https://a248.e.akamai.net/assets.github.com/images/icons/emoji/meat_on_bone.png" alt="MeatOnBone" style={{height: '16px', width: '16px'}} data-toggle="tooltip" data-origninal-title="MeatOnBone" />
              {this.props.good}
            </div>
            <div className="col-md-6 col-xs-6 col-sm-6" style={{'textAlign': 'right'}}>
              {this.props.bad}
              <img src="https://a248.e.akamai.net/assets.github.com/images/icons/emoji/shit.png" alt="Shit" style={{height: '16px', width: '16px'}} data-toggle="tooltip" data-origninal-title="Shit" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-xs-6 col-sm-6">
              <a onClick={this.onClickThumbsUp}>
                <img src="https://a248.e.akamai.net/assets.github.com/images/icons/emoji/+1.png" alt="Like" style={{height: '16px', width: '16px'}} />
              </a>
            </div>
            <div className="col-md-6 col-xs-6 col-sm-6" style={{'textAlign': 'right'}}>
              <a onClick={this.onClickThumbsDown}>
                <img src="https://a248.e.akamai.net/assets.github.com/images/icons/emoji/-1.png" alt="Report" style={{height: '16px', width: '16px'}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


var FoodList = React.createClass({
  render: function() {
    var foodNodes = this.props.files.map(function (food) {
      good = food.reactions.filter(function(r) { return r.name == '+1'; }).length;
      bad = food.reactions.filter(function(r) { return r.name == '-1'; }).length;
      console.log(food)
      return (
        <Food id={food.id} title={food.title} img={food.thumb_360} good={good} bad={bad} url={food.permalink}/>
      );
    });
    return (
      <div>
        {foodNodes}
      </div>
    );
  }
});

var MainGallery = React.createClass({
  getInitialState: function() {
    return {files: [] };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dateType: 'json',
      cache: false,
      success: function(data) {
        this.setState({files: data.files});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <FoodList files={this.state.files}/>
      </div>
    );
  }
});

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var code = getParameterByName('code');

var tokenParam = $.param({
  client_id: clientId,
  client_secret: clientSecret,
  code: code,
  redirect_uri: redirectUri
});
tokenUrl = apiUrl + '/oauth.access?' + tokenParam;
$.get(tokenUrl).then(function(ret) {
  console.log(ret);
  if (ret.ok) return ret.access_token;
  // TODO error handling
}).then(function(token) {
  window.localStorage.setItem("access_token", token);
});


//var params = $.param({
//  types: "images",
//  token: token
//});
//
//React.render(
//    <MainGallery url={apiUrl + '/file.list?' + params} />,
//    document.getElementById('main-gallery-container')
//);

// Profile
var Profile = React.createClass({
  render: function() {
    var authParam = $.param({
      client_id: clientId,
      team: teamId,
      redirect_uri: redirectUri
    });
    var authUrl = oauthUrl + '?' + authParam;
    return (
       <a href={authUrl}> Login with <img src="/images/slack_rgb.png" alt="Slack" height="30px" /></a>
    );
  }

});
React.render(
   <Profile/>,
   document.getElementById('profile')
);

