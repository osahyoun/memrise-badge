//= require jquery
//= require mustache
//= require badge
//= require template

  
if(typeof(Sunrize.user) === 'undefined' || Sunrize.user === '') {
  throw("We have a problem! You've not defined your Memrise username.");
} else {
  Sunrize.render();
}
