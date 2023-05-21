export const GlobalReducer = (state, action) => {
    const { type, payload: { industries, cities, highlightCompany } } = action

    switch (type) {
        case 'SET_INDUSTRY':
            return {
                ...state,
                industries
            }
        case 'SET_CITY':
            return {
                ...state,
                cities
            }
        case 'SET_COMPANY':
            return {
                ...state,
                highlightCompany
            }
        default:
            return state
    }
}