class UIPanel{
   /** Creates pannel to display player information
     * @param {number} width of panel 
     * @param {number} left - left
     * @param {number} top - top
     */
    constructor(width, left, top){

        /** @type {HTMLDivElement} */
        this.DivMain = null;

        /** @type {number} */
        this.Width = width;

        this.BackgroundColor = UIColorsBackgroundTransparent;
        this.Left = left;
        this.Top = top;

        this.CreateDivMain();
    }

    /** @return {HTMLDivElement} */
    CreateDivMain(){
        this.DivMain = document.createElement('div');
        this.DivMain.style.position = 'absolute';
        this.DivMain.style.width = this.Width + 'px';
        this.DivMain.style.left = this.Left + 'px';
        this.DivMain.style.top = this.Top + 'px';
        
        this.DivMain.style.borderRadius = '5px';
        this.DivMain.style.padding = '00px';
        this.DivMain.style.border = '1px solid ' + UIColorsBorder;
        this.DivMain.style.boxShadow = UIColorsBorderShadow + ' 0px 0px 5px 0px inset';
        this.DivMain.style.background = this.BackgroundColor;
        this.DivMain.style.color = this.BackgroundColor;
        this.DivMain.style.boxSizing = 'border-box';
        this.DivMain.style.minHeight = '100px';
        this.DivMain.style.display = 'none';

        document.body.appendChild(this.DivMain);

        let meta = document.createElement('meta');
        //<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        this.DivMain.appendChild(meta);
    }

    Delete(){
        this.DivMain.remove();
    }

    Hide(){
        this.DivMain.style.display = 'none';
    }

    Show(){
        this.DivMain.style.display = 'block';
    }

}

class UITable{

    constructor(){
        /** @type {HTMLTableElement} */
        this.Table = null;

        this.Names = [];
        this.Values = [];
        
        this.CreateTable();
    }

    CreateTable(){
        this.Table = document.createElement('table');
        this.Table.style.color = 'black';
        this.Table.style.width = 100 + "%";

        let tableBody = document.createElement('tbody');

        this.Table.appendChild(tableBody);
    }

    /**
     * @param {string} name 
     * @param {string} text 
     * @param {string} color row background
     */
    AddTextLine(name, text, color){
        let row = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdText = document.createElement('td');

        row.style.background = color;

        tdName.innerHTML = name;
        tdText.innerHTML = text;
        tdName.style.overflowWrap = 'break-word';
        tdText.style.overflowWrap = 'break-word';
        
        row.appendChild(tdName);
        row.appendChild(tdText);

        this.Table.appendChild(row);
    }

    /**
     * @param {string} name 
     * @param {string} text 
     * @param {bool} createIfNotExist 
     * @param {text} backgroundColor
     * @returns {bool}
     */
    SetText(name, text, createIfNotExist, backgroundColor = 'transparent'){
        let elementIndex = this.GetNameIndex(name);
        if(elementIndex < 0){
            if(createIfNotExist){
                this.AddTextLine(name, text, backgroundColor);
                return true;
            }else{
                return false;
            }
        }
        this.Table.childNodes[elementIndex].childNodes[1].innerHTML = text;
        this.Table.childNodes[elementIndex].style.background = backgroundColor;
        return true;
    }

    /** @return {number} Row of table index. Returns -1 if not found*/
    GetNameIndex(name){
        for (let rowIndex = 0; rowIndex < this.Table.childNodes.length; rowIndex++) {
            let row = this.Table.childNodes[rowIndex];

            if(row.childNodes[0].innerHTML == name){
                return rowIndex;
            }
        }

        return -1;
    }

    Clear(){
        if(typeof this.Table !== 'undefined'){
            this.Table.innerHTML = '';
        }
    }

    /** Delete text element by names */
    DeleteText(name){
        let rowIndex = this.GetNameIndex(name);
        if(rowIndex < 0){
            return;
        }else{
            this.Table.removeChild(this.Table.childNodes[rowIndex]);
        }
    }
}

class UIInfoPanel extends UIPanel{

    constructor(width, left, top){
        super(width, left, top);

        this.Table = new UITable();
    }

    Init(){
        this.Table = new UITable();
        this.DivMain.appendChild(this.Table.Table);
    }
}
