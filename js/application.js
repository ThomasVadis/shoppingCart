var updateSubTotal = function(ele){
  var price = parseFloat($(ele).find('.price').html());
  var quantity = parseFloat($(ele).find('.quantity input').val())

  var subtotal  = (isNaN(price) ? 0 : price)  * (isNaN(quantity) ? 0 : quantity)
  $(ele).find('.subTotal').html(subtotal)
  return subtotal
}

var sum  = function (acc, x) { return acc + x; };

var updateTotals = function () {
  var subtotals = [];

  $('tbody tr').each(function (i, ele) {
    var sTotal = updateSubTotal(ele);
    subtotals.push(sTotal);
  });

  var totalCost = subtotals.reduce(sum,0);

  $('#totalCost').html(totalCost);

}

$(document).ready(function () {
  updateTotals()

  $(document).on('click', '.btn.remove', function (event){
    $(this).closest('tr').remove();
    updateTotals()
  })

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotals()
    }, 1000)

  })

  $('#addItem').on('submit', function(event){
    event.preventDefault();
    var item = $(this).children('[name=item]').val();
    var price = $(this).children('[name=price]').val();


    $('tbody').append('<tr>' +
    '<td class="item">' + item + '</td>'+
    '<td class="price">' +price+'</td>'+
    '<td class="quantity"><input type="number" value="1"/></td>' +
    '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
    '<td class="subTotal"></td>'+
  '</tr>');

  updateTotals()
  $(this).children('[name=item]').val('');
  $(this).children('[name=price]').val('');


  })
});


