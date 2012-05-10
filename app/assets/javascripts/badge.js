if(typeof Sunrize === 'undefined') Sunrize = {}

;(function(){
  var loadingStyleSheet = false
      styleSheetURL = 'http://www.sunrize.me/badge.css'
      styleSheetURL = '/assets/application.css'
      resourceURL = 'http://www.sunrize.me/user/' + Sunrize.user + '?callback=?'
      jsonpID = 0
      d = document
  
  function getOrdinal(number){
    var last = number.charAt(number.length - 1)
    switch(last){
      case '':
        return 'none. yet!'
      case '1':
        return 'st'
      case '2':
        return 'nd'
      case '3':
        return 'rd'
      default: 
        return 'th'
    }
  }
  
  function $(id){
    return d.getElementById(id)
  }
  
  function render(){
    loadStyles()
    getData()
  }
  
  Sunrize.render = render
  
  function getBadgePosition(){
    var badge = $('sunrize-badge')
    if (badge && window.getComputedStyle) {
      return d.defaultView.getComputedStyle(badge, null).getPropertyValue('position')
    } else if (badge && badge.currentStyle) return badge.currentStyle['position']
    else return null
  }
  
  function loadStyles(){
    var styleTag, repeat
    if(!loadingStyleSheet){
      loadingStyleSheet = true
      styleTag = d.createElement("link")
      styleTag.href = styleSheetURL
      styleTag.rel = "stylesheet"
      styleTag.type = "text/css"
      d.getElementsByTagName("head")[0].appendChild(styleTag)
      repeat = setInterval(function() {
        if (getBadgePosition() == "relative") {
          clearInterval(repeat)
          repeat = null
          $("sunrize-badge").style.display = "block"
        }
      }, 50)
    }   
  }
  
  function insertHTML(data){
    var div = d.createElement("div")
    div.id = 'sunrize-badge'
    div.style.display == 'none'
    div.innerHTML = (data.status === '404') ? htmlForNotFound : htmlForUser(data)
    $('sunrize').parentNode.insertBefore(div)
  }
  
  function htmlForUser(data){
    var d = {
      ranking: prettyPrint(data.rank),
      points: prettyPrint(data.points),
      words: prettyPrint(data.word_count),
      courses: prettyPrint(data.courses_total),
      ordinal: getOrdinal(data.rank),
      url: 'http://www.memrise.com/user/' + Sunrize.user + '/'
    }
    
    return Mustache.render(Sunrize.template, d)
  }
  
  function htmlForNotFound(){
    return Mustache.render(Sunrize.template_not_found, {user:Sunrize.user})
  }
      
  function prettyPrint(number){
    return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  }
  
  function getData(){
    JSONP(resourceURL, function(data){
      insertHTML(data)
    })
  }
  
  function JSONP(url, callback){
    var script = d.createElement('script'),
        callbackName = 'sunrize_JSONP' + (++jsonpID)
    
    script.src = url.replace(/=\?/, '=' + callbackName)
    d.getElementsByTagName('head')[0].appendChild(script)
    window[callbackName] = function(data){
      delete window[callbackName]
      script.parentElement.removeChild(script)
      if(typeof callback !== 'undefined') return callback(data)
      else return data
    }
  }
  
})();