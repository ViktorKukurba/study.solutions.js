/**
 * JQuery extention for handling click, dblclick, slowdblclick
 * @param {function(event):event} clickCallback. Callback for click
 * @param {function(event):event} dblclickCallback. Callback for double click
 * @param {function(event):event} slowDoubleclickCallback. Callback for slow double click
 * @param {number} timout
 * @return {void}
 */
jQuery.fn.click_dblclick_slowdblclick = function (clickCallback, dblclickCallback, slowDoubleclickCallback, timeout) {
    return this.each(function () {
        var /**@type{number}*/clicks = 0, self = this;
        jQuery(this).off('click');
        jQuery(this).on('click', function (event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        setTimeout(function () {
                            if (clicks == 1) {
                                clickCallback.call(self, event);
                            } else {
                                slowDoubleclickCallback.call(self, event);
                            }
                            clicks = 0;
                        }, 600);
                    } else {
                        dblclickCallback.call(self, event);
                        clicks = 0;
                    }
                }, timeout || 300);
            }
        });
    });
}
