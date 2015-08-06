var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    console.log(this.props.files);
    var commentNodes = this.props.files.map(function (comment) {
      return (
        <Comment author={comment.author}>
          <img src={comment.thumb_64} />
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var CommentBox = React.createClass({
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
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList files={this.state.files}/>
        <CommentForm />
      </div>
    );
  }
});


React.render(
  <CommentBox url="https://slack.com/api/files.list?token=xoxp-8665634432-8665626855-8720456611-757dc5" />,
  document.getElementById('comment-box')
);
