/**
 * Created by viktor on 12/10/13.
 */

/**
 * @param {Element|Node} element Container for table.
 * @param {Object} config Configuration object.
 * @return {Object} LightTable object.
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
        if (settings_['sortable']) setSorting_();
        if (settings_['editable']) setEditable_();
    };

    function hasClass(className) {
        /**@type {Node|Element}*/
        var that = this;
        /** @type {!RegExp} */
        var classNameRe = new RegExp('(?:^|\\s)' + className + '(?!\\S)');
        return classNameRe.test(that.className);
    }

    var setSorting_ = function () {
        /**@type {NodeList}*/
        var sortedTh = element_.querySelectorAll('span.sort');
        /** @type {number} */
        var length = sortedTh.length;
        if (length > 0)
            for (/** @type {number} */var index = 0; index < length; )
                sortedTh[index++].onclick = function () {
                    /**@type {Node|Element}*/
                    var that = this;
                    /**@type {Node|Element}*/
                    var th = that.parentNode.parentNode;
                    /**@type{string}*/
                    var sortDirection = hasClass.call(that, 'desc-sort') ? '-desc' : '-asc';
                    /**@type {NodeList}*/
                    var trs = element_.querySelectorAll('tbody tr');
                    /** @type {Array.<Node|Element>} */
                    var array = Array.prototype.slice.call(trs, 0);
                    /** @type {number} */
                    var columnNumber = parseInt(th.getAttribute('data-column-number'));
                    array.sort(function (a, b) {
                        return comparer_[settings_['columns'][columnNumber]['type'] + sortDirection](a, b, columnNumber + 1);
                    });
                    /** @type {number} */var l = array.length;
                    /** @type {number} */var i = 0;
                    for (; i < l; ) {
                        array[i].className = (i % 2 == 0) ? 'oddrow' : 'evenrow';
                        element_.querySelector('tbody').appendChild(array[i++]);
                    }
                    if (sortDirection === '-desc') {
                        that.className = that.className.replace('desc-sort', 'asc-sort');
                    } else {
                        that.className = that.className.replace('asc-sort', 'desc-sort');
                    }
                };
    };

    var setEditable_ = function () {
        /**@type{NodeList}*/
        var tds = table_.querySelectorAll('tbody td');
        var length = tds.length;
        if (length > 0)
            for (/** @type {number} */var index = 0; index < length; )
                tds[index++].onclick = function () {
                    /**@type{Node|Element}*/
                    var td = this;
                    /**@type{NodeList}*/
                    var oldinput = td.querySelectorAll('input');
                    if (oldinput && oldinput.length) return;
                    /**@type{Node|Element}*/
                    var input = document.createElement('input');
                    input.type = "text";
                    input.value = td.innerText;
                    /**@type{Node|Element}*/
                    var div = td.querySelector('div');
                    div.style.display = 'none';
                    td.appendChild(input);
                    input.onblur = function () {
                        div.innerText = input.value;
                        td.removeChild(input);
                        div.style.display = 'block';
                    };
                    input.focus();
                };
    };

    var comparer_ = {
        'number-desc': function (a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return parseFloat(tdb.innerText) >= parseFloat(tda.innerText);
        },
        'number-asc': function (a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return parseFloat(tda.innerText) >= parseFloat(tdb.innerText);
        },
        'string-desc': function (a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return tdb.innerText >= tda.innerText;
        },
        'string-asc': function (a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return tda.innerText >= tdb.innerText;
        }
    };

    var lightTable = {
        'draw': draw_,
        'clear': clearTableData_,
        'addRows': addRows_
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
            if (settings_['sortable'] && column.sort) {
                th.setAttribute('data-column', column.name);
                th.setAttribute('data-sorting', column['sort']);
                th.setAttribute('data-column-number', index);
                /**@type{Node|Element}*/
                var span = div.appendChild(document.createElement('span'));
                span.className = 'sort desc-sort';
                span.innerHTML = '&nbsp';
            }
        }
    }

    function drawTable_() {
        addRows_(data_);
    }

    /**
    * @param {Object|Array.<Object>} rows
    * */
    function addRows_(rows) {
        if (!Array.isArray(rows)) rows = [rows];
        /**@type{number}*/var i = 0;
        /**@type{number}*/var length = rows.length;
        /** @type {Node|Element} */
        var tbody = table_.getElementsByTagName('TBODY')[0];
        /**@type{Object}*/var columns = settings_['columns'];
        for (; i < length; ) {
            var row = rows[i++];
            /** @type {Node|Element} */
            var bodyRow = tbody.insertRow(-1);
            bodyRow.className += (i % 2 == 0) ? 'oddrow' : 'evenrow';
            bodyRow.onmouseover = function () {
                /**@type {Element}*/
                var that = this;
                bodyRow.setAttribute('row-color', that.style.backgroundColor);
                that.style.backgroundColor = '#ffff66';
            };
            bodyRow.onmouseout = function () {
                /**@type {Element}*/
                var that = this;
                that.style.backgroundColor = bodyRow.getAttribute('row-color');
            };
            /**@type{number}*/var j = 0;
            for (; j < columns.length; ) {
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
        /** @type {Array} */var nodes = [
            table_.getElementsByTagName('COLGROUP')[0],
            table_.getElementsByTagName('THEAD')[0].firstChild,
            table_.getElementsByTagName('TBODY')[0],
            table_.getElementsByTagName('TFOOT')[0]
        ];
        var length = nodes.length;
        for (/** @type {number} */var i = 0; i < length; ) {
            /** @type {Node|Element} */var node = nodes[i++];
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
window['lightTable'] = tableFactory;
