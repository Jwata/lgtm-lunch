var Food = React.createClass({
  render: function() {
    return (
      <div className="col-md-2 col-sm-3 col-xs-6">
        <div className="thumbnail">
          <div className="image" style={{height: '162px', overflowY: 'hidden', backgroundColor: '#F5F5F5'}}>
            <a href="">
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
              <a href="" data-toggle="tooltip" title="" data-original-title="Upvote">
                <img src="https://a248.e.akamai.net/assets.github.com/images/icons/emoji/+1.png" alt="Like" style={{height: '16px', width: '16px'}} />
              </a>
            </div>
            <div className="col-md-6 col-xs-6 col-sm-6" style={{'textAlign': 'right'}}>
              <a href="" data-toggle="tooltip" title="" data-original-title="Report">
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
      return (
        <Food title={food.title} img={food.thumb_360} good={good} bad={bad} />
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


React.render(
  <MainGallery url="https://slack.com/api/files.list?token=xoxp-8665634432-8665626855-8720456611-757dc5&types=images" />,
  document.getElementById('main-gallery-container')
);
