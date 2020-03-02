function natureGames() {
    //Variables

    let DropArea = $('.art-10-14-div-container:nth-child(2)').children();
    let DragItem = $('.dragItem');

console.log(DragItem);
console.log(DropArea);

    //Change css
    $('.art-10-14-div-container:nth-child(1)').children().children().attr('draggable', false);

    $(DragItem).each((i, item) => {
        item.id = 'DragItem' + i;
    });

    //Events

    $('#completedGame').click(() => {
        let success = true;
        if (DragItem[0].parentNode != DropArea[1]) {
            $(DragItem[0]).css('outline', '2px solid red', 'outline-offset, -1px');
            success = false;
        }
        if (DragItem[1].parentNode != DropArea[0]) {
            $(DragItem[1]).css('outline', '2px solid red', 'outline-offset, -1px');
            success = false;
        }

        if (success) {
            location.href = 'game-success-14.html';
        }
    });

    //reset
    $('#resetBtn').click(() => {
        for (let i = 0; i < 2; i++) {
            $('.art-10-14-div-container:nth-child(3)').children()[i].append(DragItem[i]);
        }
        $('.dragItem').removeAttr('style');
    });

    //Drag and Drop
    $(DragItem).each((i, item) => {
        item.ondragstart = ev => {
            this.drag(ev);
        };
    });

    $(DropArea).each((i, item) => {
        item.ondragover = ev => {
            this.allowDrop(ev);
        };
    });

    $(DropArea).each((i, item) => {
        item.ondrop = ev => {
            this.drop(ev);
        };
    });

    //Functions

    this.allowDrop = ev => {
        ev.preventDefault();
    };

    this.drag = ev => {
        ev.dataTransfer.setData('text', ev.target.id);
    };

    this.drop = ev => {
        var data = document.getElementById(event.dataTransfer.getData('text'));

        $(ev.target).css('outline', '', 'outline-offset');
        $(data).css('outline', '', 'outline-offset');

        if (ev.target.tagName == 'IMG') {
            let parent = ev.target.parentNode;

            data.parentNode.appendChild(ev.target);

            parent.appendChild(data);
            return;
        }

        ev.target.appendChild(data);
    };
}

natureGames();