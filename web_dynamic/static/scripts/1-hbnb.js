$(document).ready(function () {
  const checked = {};
  $('INPUT[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (this.checked) checked[id] = name;
    else delete checked[id];
  });

  if (checked) {
    names = Object.values(checked).join(', ');
    $('DIV.amenities h4').text(names);
  else $('DIV.amenities h4').html('&nbsp;');
});
