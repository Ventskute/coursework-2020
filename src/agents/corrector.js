import vars from '../common/vars'

export default () => {
    if (!vars.modalWindow.closed) {
        vars.context.drawImage(vars.currentSlide, 0, 0, vars.canvasWidth, vars.canvasHeight);
        const slideData = vars.context.getImageData(0, 0, vars.canvasWidth, vars.canvasHeight);
        const data = slideData.data;
        // debugger;
        for (let x = 0; x < data.length; x += 4) {                
            const averageColor = ~~((data[x] + data[x + 1] + data[x + 2]) / 3);
            const diff = vars.colorMap[averageColor] - averageColor + vars.lux;
            
            data[x] += diff;
            data[x + 1] += diff;
            data[x + 2] += diff;                    
        }
        
        vars.context.putImageData(slideData, 0, 0);

        vars.modalWindow.requestAnimationFrame(() => document.dispatchEvent(new Event('correct image')));
    } else {
        vars.modalWindow = null;
    }
}