import agent_of_tone_correction from '../agents/corrector'  
import vars from '../common/vars'
 
import agent_of_correction from '../agents/corrector'
import agent_of_format_to_rgb from '../agents/formatterRGB'
import agent_of_format_to_xyz from '../agents/formatterXYZ'
import agent_of_format_rgb_to_lab from '../agents/formatterRGB2LAB'
import agent_of_format_rgb_to_xyz from '../agents/formatterRGB2XYZ'
import agent_of_format_xyz_to_lab from '../agents/formatterXYZ2LAB'
import agent_of_extracting_l_from_lab from '../agents/extractorL'
import agent_of_calculating_delta_l from '../agents/calcucatorDeltaL'
import agent_of_calculating_delta_e from '../agents/calculatorDeltaE'

class Modal {
    constructor() {
        document.addEventListener('correct image', agent_of_correction);
        document.addEventListener('format rgb', agent_of_format_to_rgb);
        document.addEventListener('format xyz', agent_of_format_to_xyz);
        document.addEventListener('format rgb to lab', agent_of_format_rgb_to_lab);
        document.addEventListener('format rgb to xyz', agent_of_format_rgb_to_xyz);
        document.addEventListener('format xyz to lab', agent_of_format_xyz_to_lab);
        document.addEventListener('extract l', agent_of_extracting_l_from_lab);
        document.addEventListener('calculate delta l', agent_of_calculating_delta_l);
        document.addEventListener('calculate delta e', agent_of_calculating_delta_e);
        
        this.createColorMap();
    }

    createColorMap() {
        this.tones = [];
        let i = 0;
        
        for (let j = 1; j < 256; j++) {
            document.dispatchEvent(new CustomEvent('calculate delta e', {
                detail: [i, j]
            }))

            if (vars.agentData >= 1) {
                this.tones.push(j);
                i = j;
            }
        }

        if (this.tones[this.tones.length - 1] !== 255) this.tones.push(255);
        
        for (let color = 0; color < 256; color++) {
            vars.colorMap[color] = this.tones.find(tone => tone >= color)
        }

        console.log(vars.colorMap);
    }

    createWindow() {
        document.dispatchEvent(new Event('modalCreated'));
        vars.modalWindow = window.open('', 'Correction result');
        vars.modalWindow.document.write(`
            <body style="background: #333; display: flex; align-items: center; margin: 0;">
            <canvas style="height: 100%; width: 100%" id="correctionCanvas"></canvas></body>
        `);
    }

    updateLuxValue(newLux) {
        vars.lux = Math.log(Math.pow(newLux || 1, 3));

        if (!vars.modalWindow || vars.modalWindow.closed) {
            this.initCorrection.call(this);
        }
    }

    async initCorrection() {
        this.createWindow();
        vars.currentSlide = document.querySelector('.slide.active');
        this.canvas = vars.modalWindow.document.getElementById('correctionCanvas');
        vars.context = this.canvas.getContext('2d');
        
        this.canvas.width = vars.canvasWidth;
        this.canvas.height = vars.canvasHeight;
        
        vars.context.drawImage(vars.currentSlide, 0, 0, vars.canvasWidth, vars.canvasHeight);
        

        vars.modalWindow.requestAnimationFrame(() => document.dispatchEvent(new Event('correct image')));
    }    

  
}

export {
    Modal
}