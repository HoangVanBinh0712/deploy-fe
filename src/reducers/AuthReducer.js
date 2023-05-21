export const AuthReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, role, profile, CV, achivement } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authloading: false,
                isAuthenticated,
                user,
                role,
            }
        case 'REMOVE_AUTH':
            return {
                ...state,
                authloading: true,
                isAuthenticated,
                user,
                role,
            }
        case 'PROFILE_LOAD_SUCCESS':
            return {
                ...state,
                profile: profile,
                profileLoading: false,
            }
        case 'CV_UPLOAD_SUCCESS':
            return {
                ...state,
                CV: CV
            }
        case 'CV_SUBMIT_SUCCESS':
            return {
                ...state,
                submited: false
            }
        case 'SET_ACHIVEMENT':
            return {
                ...state,
                achivement,
            }

        default:
            return state
    }
}
