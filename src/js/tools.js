
module.exports = {
    Undocounter: 0, //количество нажатий на кнопку undo подряд
    Redocounter: 0, //количество нажатий на кнопку redo подряд
    actionUndolist: [],
    actionRedolist: [],
    amount: 0, // Количество введенных символов
    maxamount: 7, // количество символов которые сотруться после кнопки Undo
    Undo(textarea){
        if(this.actionUndolist[this.Undocounter])
        {
            if(this.Undocounter == 0){ 
                this.actionRedolist.unshift(textarea.innerHTML)
            }
            textarea.innerHTML = this.actionUndolist[this.Undocounter]    
            this.Undocounter++
            this.Redocounter = 0
        }
    },
    Redo(textarea){
        if(this.actionRedolist[this.Redocounter])
        {
            textarea.innerHTML = this.actionRedolist[this.Redocounter]    
            this.Redocounter++
            this.Undocounter = 0
        }

    },
    Heading(textarea){
        this.Reset(textarea)
        if (window.getSelection() == null) {
            return false
        }
          var range = window.getSelection().getRangeAt(0) // Получаем выделенный текст
          var selectionContents = range.extractContents() // Получаем его фрагмент
          var h1 = document.createElement("h1")
          h1.appendChild(selectionContents)
          range.insertNode(h1) // Вставляем в место курсосра
          

    },
    Paragraph(textarea){
        this.Reset(textarea)
        if (window.getSelection() == null) {
            return false
        }
        if(this.actionUndolist[this.Undocounter]){
            let range = window.getSelection().getRangeAt(0)
            var selectionContents = range.extractContents() // Получаем фрагмент выделенного текста. 
            var div = document.createElement("div")
            div.appendChild(selectionContents) // Вносим фрагмент текста в div
            range.insertNode(div) // вставляем div в место курсора
            div.style.display="inline"
            if(textarea.innerHTML.substring(range.startOffset-4, range.startOffset))
            {
              div.insertAdjacentHTML('beforebegin', '<div class="paragraph"><br>         </div>') // сработает если сзади выделенного текста есть еще текст
            }
            else{
              div.insertAdjacentHTML('beforebegin', '<div class="paragraph">          </div>')// сработает если начало выделенного текста находиться в начале строки

            }
            textarea.innerHTML = textarea.innerHTML + '' // Выглядит глупо. Но без этой строки отступ строки выделяется синим цветом.
        }else{
            alert('Поле пустое') // сработает если textarea пустой
        }
    },
    InsertImage(url, textarea){
        this.Reset(textarea)
        document.execCommand('insertImage', false, url) // Не хотел использовать этот метод, но больше адекватных способов нет :(
    },
    CopyHTML(clip){
        clip(document.documentElement.innerHTML)
    },
    SetText(textarea){
        if(Number.isInteger( this.amount / this.maxamount ) && (this.amount / this.maxamount) != 0) // срабатывает каждые нажатий на клавишу
        {
            this.actionUndolist.unshift(textarea.innerHTML)
            this.Undocounter = 0
            this.amount++ // в случае если количество символов равна maxamount функция возвращает true
            return true // и не выполняет 80-ю строчку, поэтому ее пришлось продублировать 
        }
        this.actionRedolist = []
        this.amount++ 
    },
    Delete(textarea){
        this.actionUndolist.unshift(textarea.innerHTML) // Мониторинг нажатий на backspace
    },
    InsertText(textarea){
        this.Reset(textarea)
    },
    Reset(textarea){ // Сброс.
        this.actionRedolist = []
        this.Undocounter = 0
        this.actionUndolist.unshift(textarea.innerHTML + ' ') // + ' ' для того чтобы убрать disabled для кнопки.
    }
}