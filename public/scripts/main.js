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


require(['react', 'jsx!components/Timer'], function (React, Timer) {
  var start = new Date();
  Timer = React.createFactory(Timer);

  // Mount the JSX component in the app container
  React.render(
      Timer({start: start}),
      document.getElementById('js-app-container'));
});

