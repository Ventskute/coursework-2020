import vars from '../common/vars'

export default (e) => {
    let [r, g, b] = e.detail;

    document.dispatchEvent(new CustomEvent('format rgb', {
        detail: [r/255, g/255, b/255]
    }))
    r = vars.agentData[0];
    g = vars.agentData[1];
    b = vars.agentData[2];

    vars.agentData = [
        100 * (r * 0.4124 + g * 0.3576 + b * 0.1805),
        100 * (r * 0.2126 + g * 0.7152 + b * 0.0722),
        100 * (r * 0.0193 + g * 0.1192 + b * 0.9505)
    ]
}