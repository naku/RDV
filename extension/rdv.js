// Begin of config
var dbName = 'https://yourdb.firebaseio.com'; // Setup an account at https://www.firebase.com/
var userId = 'youruser';
// End of config

$(document).ready(function() {
	var articleId = window.location.pathname.replace(/\//g, '_').replace(/_?(.*)_/, "$1");
	var fb = new Firebase(dbName + '/users/' + userId + '/articles/' + articleId);

	if (!window.location.pathname.match(/\/?r\/.+\/comments\/.+/)) {
		return;
	}

	var currentArticles = _($('input[name="thing_id"'))
		.map(function(e) { return $(e).val() })
		.filter(function(e) { return e.slice(0, 3) == 't1_'} );

	fb.on('value', function(snapshot) {
		var readArticles = snapshot.val() != null ? snapshot.val().comments : [];
		var unreadArticles = _.difference(currentArticles, readArticles);

		if (readArticles.length > 0) {
			$.each(unreadArticles, function(j, i) {
				$('input[value="' + i + '"').closest('div').find("p.tagline").after('<span class="rdv_new_text"> [NEW!]</span>');
				$('input[value="' + i + '"').closest('div').addClass('rdv_new_article');
			});
		}
		
		fb.set({comments: currentArticles});
	});
});
