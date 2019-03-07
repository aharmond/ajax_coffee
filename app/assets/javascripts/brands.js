var currentBrand = {};

$(document).ready( function() {
  $('.brand-item').on('click', function() {
    currentBrand.id = this.dataset.id;
    currentBrand.name = this.dataset.name;
    $.ajax({
      url: '/brands/' + currentBrand.id + '/blends',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(blends) {
      var list = $('#blends');
      $('#brand').text(currentBrand.name + ' Blends');
      list.empty();
      blends.forEach( function(blend) {
        var li = '<li data-blend-id="' + blend.id + '">' + blend.name + '-' + blend.notes + '</li>'
        list.append(li)
      });
    });
  });
});