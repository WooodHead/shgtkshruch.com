export default () => {
  const $skills = $('.js-skill-item');
  const $output = $('.js-skill-target');
  let clicked = false;

  function showTarget($this) {
    const top = $this.position().top;
    const left = $this.position().left;
    const index = $this.index() === 0 ? 1 : $this.index();

    $this
      .clone()
      .addClass('is-clone')
      .insertAfter(`.skill__item:nth-child(${index})`);

    $this
      .css({
        position: 'absolute',
        top,
        left,
      })
      .css({
        transition: 'top 0.4s ease-in-out, left 0.4s ease-in-out',
        top: $output.position().top,
        left: $output.position().left,
      })
      .data({
        top,
        left,
      })
      .addClass('is-target')
      .find('.skill__name')
      .addClass(`skill__name--${$this.data('year')}`)
      .end();

    setTimeout(() => {
      $this
        .find('.skill__text')
        .css({
          display: 'inline-block',
        });
      clicked = false;
    }, 900);
  }

  function returnElement($target, cb) {
    $target
      .removeClass('is-target')
      .find('.skill__name')
      .removeClass(`skill__name--${$target.data('year')}`)
      .end()
      .css({
        top: $target.data('top'),
        left: $target.data('left'),
      })
      .find('.skill__text')
      .hide();

    setTimeout(() => {
      $target
        .css({
          position: 'static',
          top: 0,
          left: 0,
        })
        .css({
          position: 'relative',
          transition: 'all 0s',
        })
        .removeAttr('style')
        .end();
      $('.is-clone').remove();
      cb();
    }, 400);
  }

  $skills.click(function c() {
    $output.addClass('is-active');

    if (clicked) return;
    clicked = true;

    const $this = $(this);
    const $target = $('.is-target');

    if ($target.length === 0) {
      showTarget($this);
      return;
    }

    returnElement($target, () => {
      showTarget($this);
    });
  });
};
