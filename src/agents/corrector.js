import vars from '../common/vars'

export default () => {
    if (!vars.modalWindow.closed) {
        vars.context.drawImage(vars.currentSlide, 0, 0, vars.canvasWidth, vars.canvasHeight);
        const slideData = vars.context.getImageData(0, 0, vars.canvasWidth, vars.canvasHeight);
        const pixels = slideData.data;
        // debugger;
        for (let x = 0; x < pixels.length; x += 4) {                
            const averageColor = ~~((pixels[x] + pixels[x + 1] + pixels[x + 2]) / 3);
            const diff = vars.colorMap[averageColor] - averageColor + vars.lux;
            
            pixels[x] += diff;
            pixels[x + 1] += diff;
            pixels[x + 2] += diff;                    
        }
        
        vars.context.putImageData(slideData, 0, 0);

        vars.modalWindow.requestAnimationFrame(() => document.dispatchEvent(new Event('correct image')));
    } else {
        vars.modalWindow = null;
    }
}