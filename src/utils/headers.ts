export const setAuthHeader = (token: string) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
}