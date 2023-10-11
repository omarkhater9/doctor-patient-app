export function Response(status='', body={}, error={}) {
    return {
        status,
        body,
        error
    }
}
