
let arrowElement = document.getElementById('arrow_id');
arrowElement.style.transform = "rotate(180deg)";
const moving = (e) => {
    let button = e.keyCode;
    let positionX = arrowElement.offsetLeft;
    let positionY = arrowElement.offsetTop;
    let rotation = arrowElement.style.transform;
    rotation = +rotation.slice(7, rotation.indexOf('deg'));
    if(button === 37)
        rotation -= 10;
    else if(button === 39)
        rotation += 10;
    rotation%=360;
    rotation = rotation<0?rotation+360:rotation;
    arrowElement.style.transform = `rotate(${rotation}deg)`;
    if(button === 38 || button === 40 || button === 32){
        let x = 1, y = -1,
        newx = (x*(rotation/90*9)),
        newy = (y*((90-rotation)/90*9));
        if(rotation > 90 && rotation < 180 ){
            y = 1;
            rotation -= 90;
            newx = x*((90 - rotation)/90*9);
            newy = y*rotation/90*9;
        }
        else if(rotation >= 180 && rotation <=270){
            x = -1, y = 1;
            rotation -= 180;
            newx = (x*(rotation/90*9));
            newy = (y*((90-rotation)/90*9));
        }
        else if(rotation > 270 && rotation <=360){
            x = -1;
            rotation -= 270;
            newx = x*((90 - rotation)/90*9);
            newy = y*rotation/90*9;
        }
        if(button === 40)
            newx *= -1, newy *= -1;
        if(button === 38 || button === 40){
            arrowElement.style.left = arrowElement.offsetLeft +  newx + "px";
            arrowElement.style.top  = arrowElement.offsetTop + newy + "px";
        }
        else{
            let circle = document.createElement("div");
            circle.style.borderRadius = '50%';
            circle.style.width = '15px';
            circle.style.height = '15px';
            circle.style.background = 'white';
            circle.style.position = 'absolute';
            let maxPosX = arrowElement.offsetLeft + newx;
            let maxPosY = arrowElement.offsetTop + newy;
            circle.style.top = maxPosY;
            circle.style.left = maxPosX;
            let interval = setInterval(() => {
                if(maxPosX >= 1200 || maxPosY >= 610 || maxPosX < 0 || maxPosY < 0){
                    circle.remove();
                    clearInterval(interval);
                }else{
                    circle.style.top = maxPosY + 'px';
                    circle.style.left = maxPosX + 'px';
                    maxPosY += newy;
                    maxPosX += newx;
                }
            }, 100);
            document.body.appendChild(circle);
        }
    }     
}