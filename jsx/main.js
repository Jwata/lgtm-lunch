var Food = React.createClass({
  render: function() {
    console.log(this.props)
    return (
      <div className="col-md-2 col-sm-3 col-xs-6">
        <div className="thumbnail">
          <div className="image" style={{height: '162px', overflowY: 'hidden', backgroundColor: '#F5F5F5'}}>
            <a href="http://lgtm.in/i/GdELVjxmq">
              <img alt="" src={this.props.img} style={{maxHeight: '200px'}} />
            </a>
          </div>
          <div className="row">
            <div className="col-md-6 col-xs-6 col-sm-6">
              <img src="https://a248.e.akamai.net/assets.github.com/images/icons/emoji/moneybag.png" alt="Credits" style={{height: '16px', width: '16px'}} data-toggle="tooltip" title="" data-original-title="Credits" />
              109
            </div>
          </div>
        </div>
      </div>
    );
  }
});


var FoodList = React.createClass({
  render: function() {
    console.log(this.props.files);
    var foodNodes = this.props.files.map(function (food) {
      return (
        <Food author={food.author} img={food.thumb_360} />
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
