import vars from '../common/vars'

export default (e) => {
    document.dispatchEvent(new CustomEvent('format rgb to xyz', {
        detail: e.detail
    }))

    document.dispatchEvent(new CustomEvent('format xyz to lab', {
        detail: vars.agentData
    }))
}