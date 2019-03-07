var currentBrand = {};
var showForm = false;

$(document).ready( function() {
  $(document).on('click', '.brand-item', function() {
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

  $('#toggle').on('click', function() {
    toggle();
  });

  $(document).on('submit', '#brand-form form', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
      url: '/brands',
      type: 'POST',
      dataType: 'JSON',
      data: data
    }).done( function(brand) {
      toggle()
      var b = '<li class="brand-item" data-id="' + brand.id + '" data-name="' + brand.name + '">' + brand.name + '-' + brand.location + '</li>';
      $('#brands-list').append(b);
    }).fail( function(err) {
      alert(err.responseJSON.errors)
    });
  });

  function toggle() {
    showForm = !showForm
    $('#brand-form').remove()
    $('#brands-list').toggle()

    if (showForm) {

      $.ajax({
        url: '/brand_form',
        method: 'GET'
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  }
});