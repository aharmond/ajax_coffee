var currentBrand = {};
var showForm = false;
var editingBrand;

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

  $(document).on('click', '#edit-brand', function() {
    editingBrand = $(this).siblings('.brand-item').data().id
    toggle();
  })

  $(document).on('click', '#delete-brand', function() {
    var id = $(this).siblings('.brand-item').data().id
    $.ajax({
      url: '/brands/' + id,
      method: 'DELETE'
    }).done( function() {
      var row = $("[data-id='" + id + "'")
      row.parent().remove('li');
    });
  });

  $('#toggle').on('click', function() {
    toggle();
  });

  $(document).on('submit', '#brand-form form', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var url = '/brands';
    var method = 'POST'
    if(editingBrand) {
      url = url + '/' + editingBrand;
      method = 'PUT'
    }

    $.ajax({
      url: url,
      method: method,
      dataType: 'JSON',
      data: data
    }).done( function(brand) {
      toggle();
      getBrand(brand.id);
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
        method: 'GET',
        data: { id: editingBrand }
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  }

  function getBrand(id) {
    $.ajax({
      url: '/brands/' + id,
      method: 'GET'
    }).done( function(brand) {
      if (editingBrand) {
        var li = $("[data-id='" + id + "'")
        $(li).replaceWith(brand)
        editingBrand = null
      } else {
      $('#brands-list').append(brand);
      }
    });
  }
});