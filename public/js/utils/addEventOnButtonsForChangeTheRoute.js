/* globals $*/
(function () {
	$('.btn-route').on('click', function () {
		let $this = $(this);
		location.hash = $this.find('a').attr('href');
	});
})();