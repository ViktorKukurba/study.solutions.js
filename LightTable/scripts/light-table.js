/**
 * Created by Viktor Kukurba on 12/10/13.
 */


/**@typedef {{columns:Array.<Object>,
    pagination:Object,
    sortable:boolean,
    editable:boolean}}*/
var settings_;

/**
 * @param {Element|Node} element Container for table.
 * @param {settings_}
  config Configuration object.
 * @return {Object} LightTable object.
 * */
var tableFactory = function (element, config) {
  'use strict';
  function initialize_() {
    settings_ = config;
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
  }

  /**
   * Draws table.
   * @param {Array.<Object>} data Data list.
   * */
  function draw_(data) {
    clearTable_();
    drawHeader_();
    drawTable_(data);
    if (settings_.sortable) {
      setSorting_();
    }
    if (settings_.editable) {
      setEditable_();
    }
    if (settings_.pagination) {
      drawFooter_();
    }
  }

  /**
   * Draws footer.
   * */
  function drawFooter_() {
    var /**@type {number}*/ total = dataList_.length,
      /**@type {Object}*/ pagination = settings_.pagination,
      /**@type {Node|Element}*/ div,
      /**@type {number}*/ pagesCount = Math.ceil(total / pagination.length),
      /**@type {number}*/ index = 0;
    if (total > pagination.length) {
      div = element_.querySelector('.lt-footer') ||
        document.createDocumentFragment()
          .appendChild(document.createElement('DIV'));
      div.className = 'lt-footer';
      div.innerHTML = 'Total: ' + total + ' | Pages: ';
      for (; index < pagesCount; index++) {
        div.innerHTML += '<a href="#' + index + '" >' + index + '</a>' + ' | ';
      }
      div.onclick = function (e) {
        var target = e.target;
        if (target.tagName === 'A') {
          pagination.start = parseInt(target.innerHTML);
          clearTableData_();
          drawTable_();
        }
      };
      element_.appendChild(div);
    }
  }

  function hasClass(elem, className) {
    var /** @type {!RegExp} */
      classNameRe = new RegExp('(?:^|\\s)' + className + '(?!\\S)');
    return classNameRe.test(elem.className);
  }

  function elementIndex(elem) {
    var /** @type {number}*/ i = 0;
    while ((elem = elem.previousSibling) !== null) {
      ++i;
    }
    return i;
  }

  function removeRows_(rows) {
    var trs = [],
      /**@type {number}*/ i = 0,
      /**@type {number}*/ j = 0;
    for (; i < rows.length; i++) {
      trs.push(table_.querySelectorAll('tbody tr')[rows[i]]);
    }
    for (; j < trs.length; j++) {
      table_.querySelector('tbody').removeChild(trs[j]);
    }
  }

  function sortHandler(e) {
    if (e.target.tagName !== 'SPAN' || !hasClass(e.target, 'sort')) {
      return;
    }
    var /**@type {Node|Element}*/ that = e.target,
      /**@type {Node|Element}*/ th = that.parentNode.parentNode,
      /**@type{string}*/
        direction = hasClass(that, 'desc-sort') ? 'desc' : 'asc',
      /** @type {number} */ columnIndex;
    if (settings_.pagination) {
      columnIndex = parseInt(th.getAttribute('data-column-number'));
      dataList_.sort(function (a, b) {
        return valCompare_[direction](a, b, settings_.columns[columnIndex]);
      });
      clearTableData_();
      drawTable_();
    } else {
      sortTrs_(th, direction);
    }
    if (direction === 'desc') {
      that.className = that.className.replace('desc-sort', 'asc-sort');
    } else {
      that.className = that.className.replace('asc-sort', 'desc-sort');
    }
  }

  function sortTrs_(th, direction) {
    var /**@type {NodeList}*/ trs = element_.querySelectorAll('tbody tr'),
      /** @type {Array.<Node|Element>} */
        array = Array.prototype.slice.call(trs, 0),
      /** @type {number} */ i = 0,
      /** @type {number} */ columnNumber = elementIndex(th) + 1,
      /** @type {number} */
        columnIndex = parseInt(th.getAttribute('data-column-number')),
      /** @type {number} */ l = array.length;
    array.sort(function (a, b) {
      var /**@type {Node|Element}*/
          tda = a.querySelector('tr td:nth-of-type(' + columnNumber + ')'),
        /**@type {Node|Element}*/
          tdb = b.querySelector('tr td:nth-of-type(' + columnNumber + ')'),
        /**@type {number}*/ valA = tda.innerText || tda.textContent,
        /**@type {number}*/ valB = tdb.innerText || tdb.textContent;
      return valCompare_[direction](valA, valB, settings_.columns[columnIndex]);
    });
    for (; i < l;) {
      array[i].className = (i % 2 === 0) ? 'oddrow' : 'evenrow';
      element_.querySelector('tbody').appendChild(array[i++]);
    }
  }

  function setSorting_() {
    /**@type {Node|Element}*/
    var header = table_.querySelector('thead');
    if (header) {
      header.onclick = sortHandler;
    }
  }

  function setEditable_() {
    var /**@type{Node|Element}*/ tBody = table_.querySelector('tbody');
    tBody.onclick = function (e) {
      if (hasClass(table_, 'edit-state')) {
        table_.className = table_.className.replace('edit-state', '');
        return;
      }
      table_.className += ' edit-state';
      var /**@type{Node|Element}*/
          td = e.target.tagName === 'TD' ? e.target : e.target.parentNode,
        /**@type{Node|Element}*/ div = td.querySelector('div'),
        /**@type{Node|Element}*/ input = document.createElement('input');
      input.type = 'text';
      input.style.width = td.style.width;
      input.value = td.innerText || td.textContent;
      div.style.display = 'none';
      td.appendChild(input);
      input.onblur = function () {
        div.innerText = div.textContent = input.value;
        td.removeChild(input);
        div.style.display = 'block';
      };
      input.focus();
    };
  }

  function getData_() {
    return data_;
  }

  /**
   * @param {Object|Array.<Object>} rows
   * */
  function addRows_(rows) {
    if (!Array.isArray(rows)) {
      rows = [rows];
    }
    var /**@type{number}*/ i = 0,
      /**@type{number}*/ length = rows.length,
      /** @type {Node|Element} */
        tBody = table_.getElementsByTagName('TBODY')[0],
      /**@type{Array.<Object>}*/ columns = settings_.columns,
      /**@type{number}*/ trCount = tBody.querySelectorAll('tr').length,
      /**@type {Object}*/ row,
      /**@type {number}*/ number,
      /**@type {Node|Element} */ bodyRow,
      /**@type{number}*/ cLength = columns.length,
      /**@type{number}*/ j = 0,
      /**@type {Object}*/ column,
      /** @type {Node|Element} */ td,
      /** @type {Node|Element} */ div;
    for (; i < length; i++) {
      row = rows[i];
      number = trCount + i;
      data_[data_.length] = row;
      bodyRow = tBody.insertRow(-1);
      bodyRow.className += (number % 2 === 0) ? 'oddrow' : 'evenrow';
      bodyRow.setAttribute('data-index', number);
      for (j = 0; j < cLength;) {
        column = columns[j++];
        if (column.visible === false) {
          continue;
        }
        td = bodyRow.insertCell(-1);
        div = td.appendChild(document.createElement('DIV'));
        td.title = row[column.prop];
        div.innerHTML = row[column.prop];
      }
    }
  }

  /**
   * Add/remove columns
   * @private
   * @param {Object|Array.<Object>} columns
   * */
  function setColumns_(columns) {
    if (!Array.isArray(columns)) {
      columns = [columns];
    }
    var /**@type{number}*/ length = columns.length,
      /**@type{number}*/ j = 0,
      /**@type {Element|Node}*/
        head = table_.getElementsByTagName('THEAD')[0].firstChild,
      /**@type {Array.<{prop:string}>}*/
        tableColumns = settings_.columns,
      /**@type {Object}*/ column,
      /**@type {{prop:string}}*/ currentCol,
      /**@type{Node|Element}*/ beforeElem,
      /**@type{Node|Element}*/ th,
      /**@type {number}*/ index,
      /**@type {number}*/ colIndex,
      /**@type{NodeList}*/tds,
      /**@type {number}*/ i,
      /**@type {number}*/ tdLength;
    for (; j < length;) {
      column = columns[j++];
      colIndex = column.index;
      currentCol = tableColumns[colIndex];
      currentCol.visible = column.visible;
      if (column.visible) {
        beforeElem = getSiblingTh_(colIndex);
        th = document.createElement('TH');
        if (beforeElem) {
          head.insertBefore(th, beforeElem);
        } else {
          head.appendChild(th);
        }
        index = elementIndex(th);
        addHeader_(currentCol, th, colIndex);
        addCellRows_(index, currentCol);
      } else {
        th = table_.querySelector('[data-column-number="' + colIndex + '"]');
        tds = table_.querySelectorAll('tr td:nth-of-type(' + (colIndex + 1) + ')');
        tdLength = tds.length;
        i = 0;
        th.parentNode.removeChild(th);
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
  function clearTable_() {
    var /** @type {Array.<Element|Node>} */ nodes = [
        table_.getElementsByTagName('COLGROUP')[0],
        table_.getElementsByTagName('THEAD')[0].firstChild,
        table_.getElementsByTagName('TBODY')[0],
        table_.getElementsByTagName('TFOOT')[0]
      ],
      /** @type {number} */ length = nodes.length,
      /** @type {Node|Element} */ node;
    while (length--) {
      node = nodes[length];
      if (node) {
        while (node.lastChild) {
          node.removeChild(node.lastChild);
        }
      }
    }
  }

  /**
   * Clears table data.
   * @private
   */
  function clearTableData_() {
    var /** @type {Element|Node} */
      tbody = table_.getElementsByTagName('TBODY')[0];
    while (tbody.lastChild) {
      tbody.removeChild(tbody.lastChild);
    }
  }

  /**
   * Adds header for column
   * @param {Object} column
   * @param {Element|Node} th
   * @param {number} index
   * */
  function addHeader_(column, th, index) {
    var /**@type{Node|Element}*/
        div = th.appendChild(document.createElement('DIV')),
      /**@type{Node|Element}*/ span;
    div.innerHTML = column.name;
    th.setAttribute('data-column-number', index);
    if (settings_.sortable && column.sort) {
      th.setAttribute('data-column', column.name);
      th.setAttribute('data-sorting', column.sort);
      span = div.appendChild(document.createElement('span'));
      span.className = 'sort desc-sort';
      span.innerHTML = '&nbsp';
    }
  }

  /**
   * Draws header.
   * @private
   * */
  function drawHeader_() {
    var /** @type {Node|Element} */
        row = table_.getElementsByTagName('THEAD')[0].firstChild,
      /**@type {Array.<Object>}*/ columns = settings_.columns,
      /**@type {number} */length = columns.length,
      /**@type {number} */ index = 0,
      /**@type {Object}*/ column,
      /**@type{Node|Element}*/ th;
    for (; index < length; index++) {
      column = columns[index];
      if (column.visible === false) {
        continue;
      }
      th = row.appendChild(document.createElement('TH'));
      addHeader_(column, th, index);
    }
  }

  /**
   * Get nex sibling th
   * @param {number} index
   * @return {Node|Element|null}
   * */
  function getSiblingTh_(index) {
    var /**@type {NodeList}*/ ths = table_.querySelectorAll('th'),
      /**@type {number}*/ i = 0,
      /**@type {number}*/ length = ths.length,
      /**@type {Node|Element}*/ item,
      /**@type {number}*/ thIndex;
    for (; i < length; i++) {
      item = ths[i];
      thIndex = item.getAttribute('data-column-number');
      if (thIndex > index) {
        return item;
      }
    }
    return null;
  }

  function drawTable_(data) {
    dataList_ = data || dataList_;
    var /**@type{Node|Element}*/ tBody = table_.querySelector('tbody');
    tBody.onmouseover = function (e) {
      var /**@type {Element|Node}*/ elem = e.target,
        /**@type {Element|Node}*/
          that = (elem.tagName === 'TD' ? elem : elem.parentNode).parentNode;
      that.setAttribute('row-color', that.style.backgroundColor);
      that.style.backgroundColor = '#ffff66';
    };
    tBody.onmouseout = function (e) {
      var /**@type {Element|Node}*/ elem = e.target,
        /**@type {Element|Node}*/
          that = (elem.tagName === 'TD' ? elem : elem.parentNode).parentNode;
      that.style.backgroundColor = that.getAttribute('row-color');
    };
    addRows_(getPaginationRows());
  }

  function getPaginationRows() {
    var /**@type {Object}*/ pagination = settings_.pagination,
      /**@type {number}*/start;
    if (pagination && pagination.length < dataList_.length) {
      start = (pagination.start || 0) * pagination.length;
      return dataList_.slice(start, start + pagination.length);
    }
    return dataList_;
  }

  /**
   * Add cell
   * @private
   * @param {number} index
   * @param {{prop:string}} currentCol
   * */
  function addCellRows_(index, currentCol) {
    var /**@type{number}*/ i = 1,
      /**@type {Array.<Element|Node>}*/ rows = table_.rows,
      /**@type{number}*/ length = rows.length,
      /**@type {Element|Node}*/ row,
      /**@type{number|string}*/
        dataIndex,
      /**@type {string|number}*/
        value,
      /**@type {Element|Node}*/
        td,
      /**@type{Node|Element}*/
        div;
    for (; i < length; i++) {
      row = rows[i];
      dataIndex = row.getAttribute('data-index');
      value = data_[dataIndex][currentCol.prop];
      td = row.insertCell(index);
      div = td.appendChild(document.createElement('DIV'));
      td.title = value;
      div.innerHTML = value;
    }
  }

  var comparator_ = Object.create(null, {
      number: { value: function (a, b, asc) {
        if (asc) {
          return parseFloat(a) >= parseFloat(b);
        } else {
          return parseFloat(b) >= parseFloat(a);
        }
      },
        enumerable: true
      },
      string: {value: function (a, b, asc) {
        if (asc) {
          return a >= b;
        } else {
          return b >= a;
        }
      },
        enumerable: true
      }
    }),

    valCompare_ = Object.create(null, {
      'desc': {value: function (a, b, column) {
        var /**@type {number|string}*/ valueA = a[column.prop] || a,
          /**@type {number|string}*/ valueB = b[column.prop] || b;
        return comparator_[column.type](valueA, valueB);
      },
        enumerable: true
      },
      'asc': { value: function (a, b, column) {
        var /**@type {number|string}*/ valueA = a[column.prop] || a,
          /**@type {number|string}*/ valueB = b[column.prop] || b;
        return comparator_[column.type](valueA, valueB, true);
      },
        enumerable: true
      }
    }),
    /**@type {{draw:function(),
    * clear:function(),
    * addRows:function(Array.<Object>)}}*/
      lightTable = {
      'draw': draw_,
      'clear': clearTable_,
      'addRows': function (rows) {
        dataList_.push(rows);
        var /**@type {?Object}*/pag = settings_.pagination;
        if (pag && pag.length < dataList_.length) {
          drawFooter_();
        } else {
          addRows_(rows);
        }
      },
      'removeRows': removeRows_,
      'setColumns': setColumns_,
      'getData': getData_
    },
    /**@type {Node|Element|undefined}*/ element_ = element,
    /**@type {Element|Node|string}*/ table_,
    /**@type {Array.<Object>}*/ data_ = [],
    /**@type {Array.<Object>}*/ dataList_ = [];
  initialize_();
  return lightTable;
};
window['lightTable'] = tableFactory;
