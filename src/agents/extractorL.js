import vars from '../common/vars'

export default (e) => {
    const [l,a,b] = e.detail;

    const fraction = l / 100;

    vars.agentData = (fraction > Math.pow(6/29, 3)) 
        ? 116 * Math.pow(fraction, 1/3) 
        : Math.pow(29/3, 3) * fraction;
}