import vars from '../common/vars'

export default (e) => {
    const [color1, color2] = e.detail;

    document.dispatchEvent(new CustomEvent('format rgb to lab', {
        detail: [color1, color1, color1]
    }))
    const labA = vars.agentData;

    document.dispatchEvent(new CustomEvent('format rgb to lab', {
        detail: [color2, color2, color2]
    }))
    const labB = vars.agentData;

    document.dispatchEvent(new CustomEvent('calculate delta l', {
        detail: [labA, labB]
    }))
    const deltaL = vars.agentData;

    vars.agentData = Math.abs(deltaL, 2);
}