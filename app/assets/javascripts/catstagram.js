$( document ).ready(function() {
  $('[data-meow-button="create"]').on('submit', function(event) {
    event.preventDefault(); // would cause page to be refreshed otherwise

    $form = $(event.currentTarget); // this identifies the element in the DOM that triggered the event (which is the form submit button)

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: 'json',
      success: function() {
        alert("MEOW");
      }
    });
  });
});
