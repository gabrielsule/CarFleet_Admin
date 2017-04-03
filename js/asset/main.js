//sidenav
$(".button-collapse").sideNav();
//var el = document.querySelector('.custom-scrollbar');
//Ps.initialize(el);
//collapse
$(document).on('click', '.collapsible-header', function () {
    $(this).next().slideToggle('fast');
    if ($(this).parent().hasClass('open')) {
        $(this).parent().removeClass('open');
    } else {
        $(this).parent().addClass('open');
    }
});
//tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

