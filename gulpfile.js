// var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

/*
|--------------------------------------------------------------------------
| Bower Description
|--------------------------------------------------------------------------
|
| Bower is efficent tool to manage front-end libraries & framework. It's
| just like composer for frontend tool. By default, it default path is in
| vendor/bower_components/[file_name].
|
*/
// var paths = {
// 	'jquery'	: './vendor/bower_components/jquery/',
// 	'bootstrap'	: './vendor/bower_components/bootstrap-sass-official/assets/'
// }


// elixir(function(mix) {
//     mix.sass('app.scss');
// });


// elixir(function(mix) {
// 	mix.sass('app.scss', 'public/css/', {includePaths: [paths.bootstrap + 'stylesheets/']})
//         .copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts')
//         .scripts([
//             paths.jquery + "dist/jquery.js",
//             paths.bootstrap + "javascripts/bootstrap.js"
//         ], './', 'public/js/app.js');
// });
// 
// 
var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
});
