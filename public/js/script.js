$(document).ready(function() {
  console.log('client-side script running...');

  var pageCount = 0;

  $('#add').click(function() {
    const htmlInput = $('#html-input');
    pageCount++;
    $('#page-count').text('Pages: ' + pageCount);
    $.ajax({
      url: 'http://localhost:5000/cards',
      type: 'post',
      dataType: 'text',
      contentType: 'text/plain',
      data: htmlInput.val(),
      success: function(data, error) {
        console.log(data);

      }
    });
    htmlInput.val('');
  });

  $('#generate').click(function() {
    const fileUrl = 'http://localhost:5000/static/file.txt';
    $('#link').attr('href', fileUrl);
    $('#link').text(fileUrl);
  })

  $('#start-over').click(function() {
    $('#html-input').val('')
    pageCount = 0;
    $('#page-count').text('Pages: ' + pageCount);
    $.ajax({
      url: 'http://localhost:5000/cards',
      type: 'delete',
      success: function(data, error) {
        console.log('reset cards');
      }
    });
  });
});
