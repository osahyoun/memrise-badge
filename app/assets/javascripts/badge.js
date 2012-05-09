if(typeof Sunrize === 'undefined') Sunrize = {};

Sunrize.jQuery = window.jQuery.noConflict();

(function($){
  var loadingStyleSheet = false;
  var styleSheetURL = 'http://www.sunrize.me/badge/sunrize.css';
  var resourceURL = 'http://www.sunrize.me/user/' + Sunrize.user + '?callback=?';
  
  function getOrdinal(number){
    var last = number.charAt(number.length - 1);
    switch(last){
      case '':
        return 'none. yet!';
      case '1':
        return 'st';
      case '2':
        return 'nd';
      case '3':
        return 'rd';
      default: 
        return 'th';
    }
  }
  
  function render(){
    loadStyles();
    getData();
  }
  
  Sunrize.render = render;
  
  function loadStyles(){
    var o,p,s;    
    if(!loadingStyleSheet){
      loadingStyleSheet = true;
      o = document.createElement("link");
      o.href = styleSheetURL;
      o.rel = "stylesheet";
      o.type = "text/css";
      document.getElementsByTagName("head")[0].appendChild(o);
      s = setInterval(function() {
        p = $('#sunrize-badge').css("position");
        if (p == "relative") {
          clearInterval(s);
          s = null;
          $('#sunrize-badge').show();
        }
      }, 50);
    }   
  }
  
  function insertHTML(data){
    var html;    
    html = (data.status === '404') ? htmlForNotFound : htmlForUser(data);
    $('script.sunrize').before(html);
  }
  
  function htmlForUser(data){
    var d = {
      ranking: prettyPrint(data.rank),
      points: prettyPrint(data.points),
      words: prettyPrint(data.word_count),
      courses: prettyPrint(data.courses_total),
      ordinal: getOrdinal(data.rank),
      url: 'http://www.memrise.com/user/' + Sunrize.user + '/'
    };
    
    return $(Mustache.render(Sunrize.template, d));
  }
  
  function htmlForNotFound(){
    return $(Mustache.render(Sunrize.template_not_found, {user:Sunrize.user}));
  }
      
  function prettyPrint(number){
    return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  
  function getData(){
    $.getJSON(resourceURL, function(data){
      insertHTML(data);
    });
  }
  
})(Sunrize.jQuery);