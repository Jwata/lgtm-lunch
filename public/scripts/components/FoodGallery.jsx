define(['jquery', 'react', 'jsx!components/Food'], function($, React, Food) {

  var FoodGallery = React.createClass({
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
      var foodNodes = this.state.files.map(function (food) {
        good = food.reactions.filter(function(r) { return r.name == '+1'; }).length;
        bad = food.reactions.filter(function(r) { return r.name == '-1'; }).length;
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

  return FoodGallery;
});
