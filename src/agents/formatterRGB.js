import vars from '../common/vars'

export default (e) => {
    vars.agentData = e.detail.map(tone => {
        return (tone > 0.04045) 
            ? Math.pow((tone + 0.055) / 1.055, 2.4) 
            : tone / 12.92;
    });
}