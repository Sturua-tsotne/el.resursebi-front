function computerGames() {
    var DragGameChilds1 = document.querySelectorAll('.DragGame--childs1');
    var mydrag = document.querySelectorAll('.myDrag');

    var completedBtn = document.getElementById('completedGame');
    var resetBtn = document.getElementById('resetBtn');

    $(DragGameChilds1).on('dragstart', (e) => this.dragStart(e));
    $(DragGameChilds1).on('dragend', (e) => this.dragEnd(e));


    for (const drag of mydrag) {
        drag.addEventListener('dragover', (e) => this.dragOver(e));
        drag.addEventListener('drop', (e) => this.dragDrop(e));
    }


    document.addEventListener('DOMContentLoaded', () => {
        mydrag.forEach(w => {
            w.setAttribute('data-class', w.getAttribute('class'))
        })
        DragGameChilds1.forEach(w => {
            w.setAttribute('data-class', w.getAttribute('class'))
        });
    })

    this.dragOver = (e) => {

        e.preventDefault();
    }
    this.dragStart = (e) => {
        
        setTimeout(() => {
            e.target.className += " draggedElement"
        }, 0);
    }


    this.dragEnd = (e) => {
        
        var elClassName = e.target.getAttribute('data-class')
        e.target.className = elClassName;
    }

    var myArray = [];
    DragGameChilds1.forEach(element => {
        myArray.push(element);
    });

    var myDragArray = [];

    mydrag.forEach(element => {
        myDragArray.push(element);
    });

    var clone1;

    this.dragDrop = (e) => {
        var drag = document.querySelector('.draggedElement')
        if(e.target.children[0] && e.target.children[0].getAttribute('data-same') == drag.getAttribute('data-same')){
            return;
        }
        if(e.target.children[1] && ((e.target.children[1].getAttribute('data-same') == drag.getAttribute('data-same'))
            || (e.target.children[0].getAttribute('data-same') == drag.getAttribute('data-same')))){
            return;
        }

        var clone = drag.cloneNode(true);
        $(clone).removeClass('draggedElement')
        //$(clone).removeClass('ml-4vh')
        e.target.appendChild(clone);
        clone1 = e.target.appendChild(clone);
        if (clone1.getAttribute('data-same') == 1) {
            clone1.style = "pointer-events: none;  top: 50%; left: 55%;";//z-index: -1;
        }
        if(clone1.getAttribute('data-same') == 2){
            // clone1.setAttribute('style', "pointer-events: none; margin-left: -15px;")
            //clone1.style = "pointer-events: none; margin-left: -15px;";
            clone1.innerHTML = "<span style='color: blue;margin-bottom: -34px; margin-left: -15px;'>"+ clone1.innerHTML+"</span>";
        }

    }



    this.successPage = () => {
        this.errorPage();
        if(count == 20){
            location.href = 'game-success-12.html';
        }

    }

    var count = 0;
    this.errorPage = () => {
        myDragArray.forEach(element => {
            if(element.children[0]){
                if((element.children[0].getAttribute('data-same') == 1 && element.children[0].getAttribute('data-place') == element.getAttribute('data-place'))
                    && !element.children[1]){
                    element.parentElement.classList.add('success');
                    count++;
                }
                else{
                    element.parentElement.classList.add('error')
                }
            }
            if(element.children[1]){
                if(element.getAttribute('data-place1') == element.children[0].getAttribute('data-place1')
                    && element.getAttribute('data-place1') == element.children[1].getAttribute('data-place1')
                    && element.getAttribute('data-place1') == 2){
                        element.parentElement.classList.add('success');
                        count++;
                }
                if(element.getAttribute('data-place2') == element.children[0].getAttribute('data-place2')
                    && element.getAttribute('data-place2') == element.children[1].getAttribute('data-place2')
                    && element.getAttribute('data-place2') == 2){
                        element.parentElement.classList.add('success')
                        count++;
                }
                if(element.getAttribute('data-place3') == element.children[0].getAttribute('data-place3')
                    && element.getAttribute('data-place3') == element.children[1].getAttribute('data-place3')
                    && element.getAttribute('data-place3') == 2){
                        element.parentElement.classList.add('success')
                        count++;
                }
            }
        });
    }

    this.completGame = () => {
        this.successPage();
        completedBtn.setAttribute('disabled', 'true');
    }

    this.init = () => {
        count = 0;
        myDragArray.forEach(element => {
            $(element).empty()
            $(element.parentElement).removeClass('error');
            $(element.parentElement).removeClass('success');
        });



        completedBtn.removeAttribute('disabled');
    }


    resetBtn.addEventListener('click', () => this.init());
    completedBtn.addEventListener('click', () => this.completGame());


}



const computergame = new computerGames();