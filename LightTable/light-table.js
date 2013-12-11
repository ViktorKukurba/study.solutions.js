/**
 * Created by viktor on 12/10/13.
 */

var tableFactory = function () {

    /**
     * @param {Element|Node} element Container for table.
     * @param {Object} config Configuration object.
     * */
    var initialize_ = function (element, config) {
        element_ = element;
        table_ = element_.getElementsByTagName('TABLE')[0];
        if (!table_) {
            table_ = '<table class="ui-table">' +
                '<colgroup></colgroup>' +
                '<caption></caption>' +
                '<thead><tr></tr></thead>' +
                '<tbody></tbody></table>';
        }
    };
    /**
     * @param {Array.<Object>} data
     **/
    var setData = function (data) {
        data_ = data;
    };

    var draw_ = function () {
        element_ = this;
        console.log(element_);
    };

    var smartTable = {
        draw: draw_,
        init: initialize_
    };

    var table_;
    var data_;
    var element_;
    return smartTable;
};

window.LightTable = (tableFactory)();