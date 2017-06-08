/* global inView Typed */

export default () => {
  // calcurate heading height and adapt it
  $('.js-heading').each((i, el) => {
    const $heading = $(el).find('.heading__typed').first();
    const height = $heading.height();

    $heading.hide();
    $(el).find('.heading__typed').eq(1).css({ height });
  });

  let introShow = false;
  let workIsShow = false;
  let historyIsShow = false;
  let skillIsShow = false;

  inView('.js-heading')
    .on('enter', (el) => {
      if (!$(el).find('.js-heading-output').is(':empty')) return;

      if (
        ($(el).hasClass('work') && !introShow) ||
        ($(el).hasClass('history') && !workIsShow) ||
        ($(el).hasClass('skill') && !historyIsShow) ||
        ($(el).hasClass('contact') && !skillIsShow)
      ) return;

      Typed.new(`#${el.id} .js-heading-output`, {
        stringsElement: $(el).find('.heading__main').get(0),
        showCursor: false,
        callback() {
          if ($(el).hasClass('intro')) {
            introShow = true;
          }

          if ($(el).hasClass('work')) {
            $('.work__list').fadeIn();
            workIsShow = true;
          }

          if ($(el).hasClass('history')) {
            setTimeout(() => {
              $('.history__list').addClass('is-active');
              setTimeout(() => {
                $('.history__item').first().find('.history__name').click();
                historyIsShow = true;
              }, 1800);
            }, 500);
          }

          if ($(el).hasClass('skill')) {
            $('.skill__list').addClass('is-active');
            skillIsShow = true;
          }

          if ($(el).hasClass('contact')) {
            $('.contact__list').addClass('is-active');
          }
        },
      });
    });
};
