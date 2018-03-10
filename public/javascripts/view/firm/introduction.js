$(document).ready(function () {
  $('div.company').click(function () {
    $('div.contact').removeClass('current');
    $('div.company').addClass('current');
    $('div.contact-content').addClass('hidden');
    $('div.company-content').removeClass('hidden');
  });

  $('div.contact').click(function () {
    $('div.company').removeClass('current');
    $('div.contact').addClass('current');
    $('div.company-content').addClass('hidden');
    $('div.contact-content').removeClass('hidden');
  });
});