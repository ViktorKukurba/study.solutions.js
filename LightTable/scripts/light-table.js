/**
 * Created by viktor on 12/10/13.
 */

/**
 * @param {Element|Node} element Container for table.
 * @param {Object} config Configuration object.
 * */
var tableFactory = function (element, config) {

    var initialize_ = function () {
        table_ = element_.getElementsByTagName('TABLE')[0];
        if (!table_) {
            table_ = '<table class="ui-table">' +
                '<colgroup></colgroup>' +
                '<caption></caption>' +
                '<thead><tr></tr></thead>' +
                '<tbody></tbody></table>';
            element_.innerHTML = table_;
            table_ = element_.getElementsByTagName('TABLE')[0];
        }
    };

    /**
     * @param {Array.<Object>} data Data list.
     * */
    var draw_ = function (data) {
        data_ = data;
        clearTableData_();
        drawHeader_();
        drawTable_();
        console.log(element_);
        element_.querySelector('span.desc-sort').onclick = function(){
            element_.querySelectorAll('tr td:nth-of-type(3)').sort();
        }
    };

    var lightTable = {
        draw: draw_,
        clear: clearTableData_,
        addRows: addRows_
    };

    /**
     * Draws header.
     * @private
     * */
    function drawHeader_() {
        /** @type {Node|Element} */
        var row = table_.getElementsByTagName('THEAD')[0].firstChild;
        var columns = settings_['columns'];
        var length = columns.length;
        for (/**@type{number}*/var index = 0; index < length; index++) {
            var column = columns[index];
            /**@type{Node|Element}*/
            var th = row.appendChild(document.createElement('TH'));
            /**@type{Node|Element}*/
            var div = th.appendChild(document.createElement('DIV'));
            div.innerHTML = column.name;
            if (column.sort) {
                th.setAttribute('data-column', column.name);
                th.setAttribute('data-sorting', column['sort']);
                var span = div.appendChild(document.createElement('span'));
                span.className = 'desc-sort';
                span.innerHTML = 'd';
            }
        }
    }

    function drawTable_() {
        addRows_(data_)
    }

    /**
     * @param {Object|Array.<Object>} rows
     * */
    function addRows_(rows) {
        if (!Array.isArray(rows)) rows = [rows];
        /**@type{number}*/ var i = 0;
        /**@type{number}*/ var length = rows.length;
        /** @type {Node|Element} */
        var tbody = table_.getElementsByTagName('TBODY')[0];
        /**@type{Object}*/ var columns = settings_['columns'];
        for (; i < length;) {
            var row = rows[i++];
            /** @type {Node|Element} */
            var bodyRow = tbody.insertRow(-1);
            /**@type{number}*/ var j = 0;
            for (; j < columns.length;) {
                var column = columns[j++];
                /** @type {Node|Element} */
                var td = bodyRow.insertCell(-1);
                td.title = row[column['prop']];
                /**@type{Node|Element}*/
                var div = td.appendChild(document.createElement('DIV'));
                div.innerHTML = row[column['prop']];
            }
        }

    }

    /**
     * Clears table.
     * @private
     */
    function clearTableData_() {
        /** @type {Array} */ var nodes = [
            table_.getElementsByTagName('COLGROUP')[0],
            table_.getElementsByTagName('THEAD')[0].firstChild,
            table_.getElementsByTagName('TBODY')[0],
            table_.getElementsByTagName('TFOOT')[0]
        ];
        var length = nodes.length;
        for (/** @type {number} */ var i = 0; i < length;) {
            /** @type {Node|Element} */ var node = nodes[i++];
            if (node) {
                while (node.lastChild) node.removeChild(node.lastChild);
            }
        }
    }

    var element_ = element;
    var settings_ = config;
    var table_;
    var data_;
    initialize_();
    return lightTable;
};

window.lightTable = tableFactory;