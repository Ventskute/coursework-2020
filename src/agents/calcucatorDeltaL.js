import vars from '../common/vars'

export default (e) => {
    const [labA, labB] = e.detail;

    document.dispatchEvent(new CustomEvent('extract l', {
        detail: labA
    }))
    const labALuminance = vars.agentData;

    document.dispatchEvent(new CustomEvent('extract l', {
        detail: labB
    }))
    const labBLuminance = vars.agentData;

    vars.agentData = labALuminance - labBLuminance;
}