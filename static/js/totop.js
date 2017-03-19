$(function(){
    $(window).scroll(function() {
                if($('#top') === undefined) return false ;
                if ($(this).scrollTop() != 0) {
                    $('#toTop').fadeIn();
                } else {
                    $('#toTop').fadeOut();
                }
      });

    $('#toTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);
    })
});
