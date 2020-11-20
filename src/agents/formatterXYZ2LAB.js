import vars from '../common/vars'

export default (e) => {
    let [x,y,z] = e.detail;

    document.dispatchEvent(new CustomEvent('format xyz', {
        detail: [x/0.95047/100, y/1.00000/100, z/1.08883/100]
    }))
    x = vars.agentData[0];
    y = vars.agentData[1];
    z = vars.agentData[2];
    
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}