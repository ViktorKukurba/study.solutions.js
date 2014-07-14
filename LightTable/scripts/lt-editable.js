/**
 * Created by viktor on 02.01.14.
 */
window.lightTable.editable = function setEditable_() {
  var /**@type{Node|Element}*/ tBody = table_.querySelector('tbody');
  tBody.onclick = function (e) {
    if (hasClass.call(table_, 'edit-state')) {
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
};