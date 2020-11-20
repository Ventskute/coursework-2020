import vars from '../common/vars'

export default (e) => {
    document.dispatchEvent(new CustomEvent('format rgb to xyz', {
        detail: e.detail
    }))

    document.dispatchEvent(new CustomEvent('format rgb', {
        detail: vars.agentData
    }))
}