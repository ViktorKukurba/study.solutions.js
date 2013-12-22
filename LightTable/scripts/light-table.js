/**
 * Created by Viktor Kukurba on 12/10/13.
 */

/**
 * @param {Element|Node} element Container for table.
 * @param {Object} config Configuration object.
 * @return {Object} LightTable object.
 * */
var tableFactory = function(element, config) {
    var initialize_ = function() {
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
    var draw_ = function(data) {
        //data_ = data;
        clearTableData_();
        drawHeader_();
        drawTable_(data);
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

    function elementIndex(elem) {
        var i = 0;
        while ((elem = elem.previousSibling) != null) ++i;
        return i;
    }

    var sortHandler = function() {
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
        var columnNumber = elementIndex(th);
        /** @type {number} */
        var columnIndex = parseInt(th.getAttribute('data-column-number'));
        array.sort(function(a, b) {
            return comparer_[settings_['columns'][columnIndex]['type'] + sortDirection](a, b, columnNumber + 1);
        });
        /** @type {number} */var l = array.length;
        /** @type {number} */var i = 0;
        for (; i < l;) {
            array[i].className = (i % 2 == 0) ? 'oddrow' : 'evenrow';
            element_.querySelector('tbody').appendChild(array[i++]);
        }
        if (sortDirection === '-desc') {
            that.className = that.className.replace('desc-sort', 'asc-sort');
        } else {
            that.className = that.className.replace('asc-sort', 'desc-sort');
        }
    };

    var setSorting_ = function() {
        /**@type {NodeList}*/
        var sortedTh = element_.querySelectorAll('span.sort');
        /** @type {number} */
        var length = sortedTh.length;
        if (length > 0)
            for (/** @type {number} */var index = 0; index < length;)
                sortedTh[index++].onclick = sortHandler;
    };

    var setEditable_ = function() {
        /**@type{NodeList}*/
        var tds = table_.querySelectorAll('tbody td');
        /** @type {number} */var length = tds.length;
        if (length > 0)
            for (/** @type {number} */var index = 0; index < length;)
                tds[index++].onclick = function() {
                    /**@type{Node|Element}*/
                    var td = this;
                    if (hasClass.call(table_, 'edit-state')) {
                        table_.className = table_.className.replace('edit-state', '');
                        return;
                    }
                    /**@type{NodeList}*/
                    var oldinput = td.querySelectorAll('input');
                    if (oldinput && oldinput.length) return;
                    /**@type{Node|Element}*/
                    var div = td.querySelector('div');
                    /**@type{Node|Element}*/
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.style.width = td.style.width;
                    input.value = td.innerText || td.textContent;
                    div.style.display = 'none';
                    td.appendChild(input);
                    input.onblur = function() {
                        div.innerText = div.textContent = input.value;
                        td.removeChild(input);
                        div.style.display = 'block';
                    };
                    input.focus();
                };
    };

    var comparer_ = {
        'number-desc': function(a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return parseFloat(tdb.innerText||tdb.textContent) >= parseFloat(tda.innerText||tda.textContent);
        },
        'number-asc': function(a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return parseFloat(tda.innerText||tda.textContent) >= parseFloat(tdb.innerText||tdb.textContent);
        },
        'string-desc': function(a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return (tdb.innerText||tdb.textContent) >= (tda.innerText||tda.textContent);
        },
        'string-asc': function(a, b, columnIndex) {
            var tda = a.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            var tdb = b.querySelector('tr td:nth-of-type(' + columnIndex + ')');
            return (tda.innerText || tda.textContent) >= (tdb.innerText || tdb.textContent);
        }
    };

    var lightTable = {
        'draw': draw_,
        'clear': clearTableData_,
        'addRows': addRows_,
        'removeRows': removeRows_,
        'setColumns': setColumns_,
        'getData': getData_
    };

    function getData_() {
        return data_;
    }

    /**
     * Adds header for column
     * @param {Object} column
     * @param {Element|Node} th
     * @param {number} index
     * */
    function addHeader_(column, th, index) {
        /**@type{Node|Element}*/
        var div = th.appendChild(document.createElement('DIV'));
        div.innerHTML = column.name;
        th.setAttribute('data-column-number', index);
        if (settings_['sortable'] && column.sort) {
            th.setAttribute('data-column', column.name);
            th.setAttribute('data-sorting', column['sort']);
            /**@type{Node|Element}*/
            var span = div.appendChild(document.createElement('span'));
            span.className = 'sort desc-sort';
            span.innerHTML = '&nbsp';
        }
    }

    /**
     * Draws header.
     * @private
     * */
    function drawHeader_() {
        /** @type {Node|Element} */
        var row = table_.getElementsByTagName('THEAD')[0].firstChild;
        /**@type {Array.<Object>}*/var columns = settings_['columns'];
        var length = columns.length;
        for (/**@type {number} */var index = 0; index < length; index++) {
            /**@type {Object}*/var column = columns[index];
            if (column['visible'] === false) continue;
            /**@type{Node|Element}*/
            var th = row.appendChild(document.createElement('TH'));
            addHeader_(column, th, index);
        }
    }

    /**
     * Get nex sibling th
     * @param {number} index
     * @return {Node|Element|null}
     * */
    function getSiblingTh_(index) {
        /**@type {NodeList}*/var ths = table_.querySelectorAll('th');
        /**@type {number}*/var i = 0;
        /**@type {number}*/var length = ths.length;
        for (; i < length; i++) {
            /**@type {Node|Element}*/var item = ths[i];
            /**@type {number}*/
            var thIndex = item.getAttribute('data-column-number');
            if (thIndex > index)
            return item;
        }
        return null;
    }

    function drawTable_(data) {
        addRows_(data);
    }

    function removeRows_(rows) {
        var trs = [];
        for (var index = 0; index < rows.length; index++) {
            trs.push(table_.querySelectorAll('tbody tr')[rows[index]]);
        }
        for (var index = 0; index < trs.length; index++) {
            table_.querySelector('tbody').removeChild(trs[index]);
        }
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
        /**@type{Array}*/var columns = settings_['columns'];
        var trCount = tbody.querySelectorAll('tr').length;
        for (; i < length; i++) {
            /**@type {Object}*/var row = rows[i];
            /**@type {number}*/ var number = trCount + i;
            data_[data_.length] = row;
            /**@type {Node|Element} */
            var bodyRow = tbody.insertRow(-1);
            bodyRow.className += (number % 2 == 0) ? 'oddrow' : 'evenrow';
            bodyRow.setAttribute('data-index', number);
            bodyRow.onmouseover = function() {
                /**@type {Element|Node}*/ var that = this;
                that.setAttribute('row-color', that.style.backgroundColor);
                that.style.backgroundColor = '#ffff66';
            };
            bodyRow.onmouseout = function() {
                /**@type {Element}*/ var that = this;
                that.style.backgroundColor = that.getAttribute('row-color');
            };
            /**@type{number}*/var cLength = columns.length;
            /**@type{number}*/var j = 0;
            for (; j < cLength;) {
                /**@type {Object}*/var column = columns[j++];
                if (column['visible'] === false) continue;
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
     * Add cell
     * @private
     * @param {number} index
     * @param {Object} currentCol
     * */
    function addCellRows_(index, currentCol) {
        /**@type{number}*/var i = 1;
        /**@type {Array.<Element|Node>}*/var rows = table_.rows;
        /**@type{number}*/var length = rows.length;
        /**@type{number}*/var cellNumber = rows[0].childNodes.length - 1;
        for (; i < length; i++) {
            /**@type {Element|Node}*/var row = rows[i];
            /**@type{number|string}*/
            var dataIndex = row.getAttribute('data-index');
            /**@type {string|number}*/
            var value = data_[dataIndex][currentCol['prop']];
            /**@type {Element|Node}*/
            var td = row.insertCell(index);
            td.title = value;
            /**@type{Node|Element}*/
            var div = td.appendChild(document.createElement('DIV'));
            div.innerHTML = value;
        }
    }

    /**
     * Add/remove columns
     * @private
     * @param {Object|Array.<Object>} columns
     * */
    function setColumns_(columns) {
        if (!Array.isArray(columns)) columns = [columns];
        /**@type{number}*/var length = columns.length;
        /**@type{number}*/var j = 0;
        /**@type {Element|Node}*/
        var head = table_.getElementsByTagName('THEAD')[0].firstChild;
        /**@type {Array.<Object>}*/
        var tableColumns = settings_['columns'];
        for (; j < length;) {
            /**@type {Object}*/var column = columns[j++];
            /**@type {Object}*/var currentCol = tableColumns[column['index']];
            currentCol['visible'] = column['visible'];
            if (column['visible']) {
                var beforeElem = getSiblingTh_(column['index']);
                /**@type{Node|Element}*/
                var th = beforeElem ? head.insertBefore(document.createElement('TH'), beforeElem) :
                    head.appendChild(document.createElement('TH'));
                /**@type {number}*/var index = elementIndex(th);
                addHeader_(currentCol, th, column['index']);
                if (settings_['sortable'] && currentCol['sort']) {
                    th.querySelector('span.sort').onclick = sortHandler;
                }
                addCellRows_(index, currentCol);
            } else {
                var hideTh = table_.querySelector('[data-column-number="' + column['index'] + '"]');
                hideTh.parentNode.removeChild(hideTh);
                var tds = table_.querySelectorAll('tr td:nth-of-type(' + (column['index'] + 1) + ')');
                var tdLength = tds.length;
                var i = 0;
                for (; i < tdLength;) {
                    tds[i].parentNode.removeChild(tds[i++]);
                }
            }
        }
    }
     /**
     * Clears table.
     * @private
     */
    function clearTableData_() {
        /** @type {Array.<Element|Node>} */var nodes = [
            table_.getElementsByTagName('COLGROUP')[0],
            table_.getElementsByTagName('THEAD')[0].firstChild,
            table_.getElementsByTagName('TBODY')[0],
            table_.getElementsByTagName('TFOOT')[0]
        ];
        /** @type {number} */ var length = nodes.length;
        while (length--) {
            /** @type {Node|Element} */var node = nodes[length];
            if (node) {
                while (node.lastChild) node.removeChild(node.lastChild);
            }
        }
    }

    /**@type {Node|Element}*/var element_ = element;
    /**@type {Object}*/var settings_ = config;
    /**@type {Element|Node|string}*/var table_;
    /**@type {Array.<Object>}*/var data_ = [];
    initialize_();
    return lightTable;
};
window['lightTable'] = tableFactory;
