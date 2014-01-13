$( document ).ready(function() {
  $('[data-meow-button="create"]').on('submit', function(event) {
    event.preventDefault(); // would cause page to be refreshed otherwise

    $form = $(event.currentTarget); // this identifies the element in the DOM that triggered the event (which is the form submit button)

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: 'json',
      success: function(meow) {
        // create string version of form action
        action = '/posts/'+meow.post_id+'/meows/'+meow.id;

        // create the new form
        $newForm = $('<form>').attr({
          action: action,
          method: 'delete',
          'data-meow-button': 'delete'
        });

        // create the new submit button
        $meowButton = $('<input>').attr({type: 'submit', value: 'Remove Meow'});

        // append button to form
        $newForm.append($meowButton);

        // replace old form w/ new form
        $form.replaceWith($newForm);
      }
    });
  });
});
