import vars from '../common/vars'

export default (e) => {
    vars.agentData = e.detail.map(value => {
        return (value > 0.008856) 
            ? Math.pow(value, 1 / 3) 
            : (7.787 * value) + 16 / 116;
    });
}