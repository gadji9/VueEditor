<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-8 tool-bar col-lg-5 p-sm-0 d-flex align-self-start justify-content-around">
                <button :disabled="isUndoDisabled" @click="Undo" class="bar-item">
                    <img src="../assets/back.png" alt="">
                </button>
                <button :disabled ="isRedoDisabled" @click="Redo" class="bar-item">
                    <img src="../assets/forward.png" alt="">
                </button>
                <button @click="Heading" class="bar-item">
                    <img src="../assets/head.png" alt="">
                </button>
                <button @click="Paragraph" class="bar-item">
                    <img src="../assets/paragraph.png" alt="">
                </button>
                <button @click="InsertImage" class="bar-item ">
                    <img src="../assets/insertimage.png" alt="">
                </button>
                <a @click="CopyHTML" class="align-self-center text-decoration-none ">Скопировать HTML</a>
            </div>
        </div>
        <div class="row">
            <div @keydown="Watcher" ref="textarea" class="col-12 textarea" contenteditable="true">
                
            </div>
        </div>
    </div>
</template>

<script>
import tools from '../js/tools.js'
    export default {
        data(){
            return{
                isUndoDisabled: true,
                isRedoDisabled: true,
                areaValue: '',
                amount: 0, // Количество символов в div'е.
                maxamout: 7
            }
        },
        methods:{
            Undo(){
                tools.Undo(this.$refs.textarea)
                this.isZero()
            },
            Redo(){
                tools.Redo(this.$refs.textarea)
                this.isZero()
            },
            Heading(){
                tools.Heading(this.$refs.textarea)
                this.isZero()
            },
            Paragraph(){
                tools.Paragraph(this.$refs.textarea)
                this.isZero()
            },
            InsertImage(){
                const url = prompt()
                if((url.replace(/\s/g, '')) != ''){
                    tools.InsertImage(url, this.$refs.textarea)
                    this.isZero()
                }
            },
            CopyHTML(){
              tools.CopyHTML(this.$clipboard)  
            },
            isZero(){
                if(!tools.actionUndolist[tools.Undocounter]){
                    this.isUndoDisabled = true // Проверка на возможность использования кнопки Undo
                }
                else{
                    this.isUndoDisabled = false
                }
                if(!tools.actionRedolist[tools.Redocounter]){
                    this.isRedoDisabled = true // Проверка на возможность использования кнопки Undo
                }
                else{
                    this.isRedoDisabled = false
                }
            },
            Watcher(event){
                if(event.which == 8) //Проверка на нажатие на кнопку backspace
                {
                    tools.Delete(this.$refs.textarea)

                }
                else if(event.ctrlKey && event.key=='v'){
                    tools.InsertText(this.$refs.textarea)
                    this.isZero()
                }
                else if(!event.ctrlKey){ // Любые другие кнопки
                   if(tools.SetText(this.$refs.textarea)){ // Так как в tools.js мы не можем вызвать метод isZero.
                        this.isZero()                       // Придеться возвращать true при нажатии maxamount клавиш
                    }
                }
                
            }

        },
        mounted(){
                tools.actionUndolist.unshift(this.$refs.textarea.innerHTML + ' ') // Вносим в массив чистый  редактор.
        }
    }
</script>

<style>
h1{
    text-align:center;

}

.bar-item{
    background-color:rgb(40,40,40);
    display:flex;
    justify-content: center;
    align-items:center;
    width:42px;
    height: 38px;
    border-radius: 10%;
}
.bar-item:not(:disabled):hover{
    background-color:rgb(78, 76, 76);
}
.textarea{
    background-color: rgb(43, 41, 41);
    margin-top:25px;
    border:none;
    outline:none;
    color:white;
    min-height:32.5rem;
    font-size: 15px;
    line-height:23px;
}
.textarea img{
    display:block;
    margin:auto;
}
    
.textarea:empty:not(:focus):before{
color:rgba(152, 152, 153); /* Placeholder для div: Если пустой и курсор мыши не на нем то показываем текст */
content: 'Введите ваш текст'
}
.paragraph{
 display:inline;
 white-space: pre-wrap;
}
</style>