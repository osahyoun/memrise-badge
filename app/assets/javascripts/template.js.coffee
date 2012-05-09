base = this;
base.Sunrize.template = """
<div id='sunrize-badge' style='display:none;'>
  <div id='sunrize-interior'>
    <div class='sunrize-header'>
      <a href='{{url}}'>
      <span class='sunrize-logo'></span>
      </a>
    </div>
    <div class='sunrize-score'>
      <p><strong>{{ranking}}<small>{{ordinal}}</small></strong>RANKING</p>
      <p><strong>{{points}}</strong>POINTS</p>
      <p>LEARNING<strong>{{courses}}</strong>COURSES</p>
      <p class='sunrize-final'>MEMORIZED<strong>{{words}}</strong>WORDS</p>
      <div class='sunrize-footer'>
        get your <a href='http://www.memrise.com'><em>memrize</em></a> badge at <a href='http://www.sunrize.me'>sunrize</a>
      </div>
    </div>
  </div>
</div>
"""

base.Sunrize.template_not_found = """
<div id='sunrize-badge' style='display:none;'>
  <div id='sunrize-interior'>
    <div class='sunrize-header'>
      <span class='sunrize-logo'></span>
    </div>
    <div class='sunrize-score'>
      <p>We couldn't find any stats for <em>{{user}}</em></p>
      <p class='sunrize-final'>Have you already registered your badge at <a href='http://sunrize.me'>sunrize.me</a></p>
      <div class='sunrize-footer'>
        get your <a href='http://www.memrise.com'><em>memrize</em></a> badge at <a href='http://sunrize.me'>sunrize</a>
      </div>
    </div>
  </div>
</div>
"""