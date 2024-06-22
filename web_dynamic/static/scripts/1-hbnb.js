$(document).ready(function () {
  const checked = {};
  $('input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if (this.checked) checked[id] = name;
    else delete checked[id];
    if (Object.values(checked).length === 0) $('.amenities h4').html('&nbsp;');
    else $('.amenities h4').text(Object.values(checked).sort().join(', '));
  });
});
