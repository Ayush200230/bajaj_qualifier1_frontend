export const validateData = (data, dataFormat) => {
    if (dataFormat === 'comma') {
        const items = data.split(',').map((item) => item.trim())
        return items.every((item) => /^[a-zA-Z]$|^\d+$/.test(item))
    } else if (dataFormat === 'json') {
        try {
            const jsonData = JSON.parse(data)
            return (
                Array.isArray(jsonData.data) &&
                jsonData.data.every((item) => /^[a-zA-Z]$|^\d+$/.test(item))
            )
        } catch {
            return false
        }
    }
    return false
}

export const formatData = (data, dataFormat) => {
    if (dataFormat === 'comma') {
        return data.split(',').map((item) => item.trim())
    } else if (dataFormat === 'json') {
        const jsonData = JSON.parse(data)
        return jsonData.data
    }
}
