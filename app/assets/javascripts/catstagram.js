$( document ).ready(function() {
  $('[data-post-id]').on('submit', '[data-meow-button="create"]', function(event) {
    event.preventDefault(); // would cause page to be refreshed otherwise

    $form = $(event.currentTarget); // this identifies the element in the DOM that triggered the event (which is the form submit button)

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: 'json',
      success: function(meow) {
        // Find the parent wrapper div so we can use its data-post-id
        $post = $form.closest('[data-post-id]');

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

        // update meow count
        $meowCount = $post.find('[data-meow-count]');
        $meowCount.replaceWith('<p data-meow-count="1">1 Meow</p>');
      }
    });
  }); // why did we change the target here?

  $('[data-post-id]').on('submit', '[data-meow-button="delete"]', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "DELETE",
      url: $form.attr('action'),
      dataType: 'json',
      success: function() {

        // Find the parent wrapper div so we can use its data-post-id
        $post = $form.closest('[data-post-id]');

        // create string version of form action
        action = '/posts/'+$post.data('post-id')+'/meows/';

        // create new form
        $newForm = $('<form>').attr({
          action: action,
          method: 'post',
          'data-meow-button': 'create'
        });

        // create new submit
        $meowButton = $('<input>').attr({type: 'submit', value: 'Meow'});

        // append submit button to form
        $newForm.append($meowButton);

        // replace old form with new form
        $form.replaceWith($newForm);

        // update meow count
        $meowCount = $post.find('[data-meow-count]');
        var oldCount = $meowCount.data('meow-count');
        var newCount = parseInt(oldCount, 10) - 1;

        function pluralizeMeow(newCount) {
          if (newCount === 1)
            return 'Meow';
          else
            return 'Meows';
        };

        var meow = pluralizeMeow(newCount);
        $meowCount.text(newCount+' '+meow);

      }
    });
  });
});
