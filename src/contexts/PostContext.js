import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { PostReducer } from "../reducers/PostReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./Constants";
import { AuthContext } from "./AuthContext";


export const PostContext = createContext();

const PostContextProvider = ({ children }) => {

    const { authState: { user } } = useContext(AuthContext)
    const [postState, dispatch] = useReducer(PostReducer, {
        postLoading: true,
        posts: [],
        postsAi: [],
        postFollow: [],
        postHot: [],
        postMostView: [],

    });

    const getAllPost = async () => {
        try {

            const responsePost = await axios.get(`${apiUrl}/post`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (responsePost.data.success) {
                dispatch({
                    type: "POSTS_LOADED_SUCCESS",
                    payload: {
                        posts: responsePost.data.data,
                    },
                });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getHotPost = async () => {
        try {

            const responsePost = await axios.get(`${apiUrl}/post/hot-job?page=1&limit=48`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (responsePost.data.success) {
                dispatch({
                    type: "HOT_POST_LOADED_SUCCESS",
                    payload: {
                        postHot: responsePost.data.data,
                    },
                });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getMostViewPost = async () => {
        try {

            const responsePost = await axios.get(`${apiUrl}/post/most-view?type=YEAR&page=1&limit=48`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (responsePost.data.success) {
                dispatch({
                    type: "MOST_VIEW_LOADED_SUCCESS",
                    payload: {
                        postMostView: responsePost.data.data,
                    },
                });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getFollowPost = async () => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            const responsePost = await axios.get(`${apiUrl}/user/follow`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
            })
            if (responsePost.data.success) {
                dispatch({
                    type: "POSTS_FOLLOW",
                    payload: {
                        postFollow: responsePost.data.data,
                    },
                });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getPredictPost = async (industryId) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            const responsePost = await axios.get(`${apiUrl}/user/cvpredict/post?industryId=${industryId}&limit=48`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
            })
            if (responsePost.data.success) {
                dispatch({
                    type: "POST_PREDICT_SUCCESS",
                    payload: {
                        postsAi: responsePost.data.data,
                    },
                });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }


    useEffect(() => {
        getAllPost()
        getMostViewPost()
        getHotPost()
        if (user !== null) {
            if (user.industry !== null && user.role === "ROLE_USER") {
                getPredictPost(user.industry.id)
            }
        }
        if (localStorage["user-token"] !== undefined && localStorage["USER_ROLE"] === "user") {
            getFollowPost()
        }

    }, [user]);

    const getPostById = async (id) => {
        try {
            const responsePost = await axios.get(`${apiUrl}/post/${id}`, {
                headers: {
                    "Content-Type": "application/json",

                },
            })
            console.log(responsePost)
            if (responsePost.data.success) {
                return responsePost.data
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getPostByIndustry = async (industryId) => {
        try {
            const responsePost = await axios.get(`${apiUrl}/post?industryId=${industryId}`, {
                headers: {
                    "Content-Type": "application/json",

                },
            })
            console.log(responsePost.data)
            if (responsePost.data.success) {
                return responsePost.data
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getPostByAnyFilter = async (keyword)=>{
        try {

            const responsePost = await axios.get(`${apiUrl}/post${keyword}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return responsePost.data
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    //Employer
    //get SubmitCV
    const getCvSubmited = async (postId) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.get(`${apiUrl}/employer/submitcv?postId=${postId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                if(response.data.success)
                    return response.data;
            } else throw new Error("Unauthorized !");
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    }

    // follow/ unfollow post
    const followPost = async (postId) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.post(`${apiUrl}/user/follow/${postId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                if(response.data.success)getFollowPost()
                return response.data;
            } else throw new Error("Unauthorized !");
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    }

    const unfollowPost = async (postId) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.post(`${apiUrl}/user/unfollow/${postId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                if(response.data.success)getFollowPost()
                return response.data;
            } else throw new Error("Unauthorized !");
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    }

    //Employer active
    const createPost = async (postInfo) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.post(`${apiUrl}/employer/post`,postInfo, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response.data;
            } else throw new Error("Unauthorized !");
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    }

    const updatePost = async (postId,postInfo) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.put(`${apiUrl}/employer/post/${postId}`,postInfo, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response.data;
            } else throw new Error("Unauthorized !");
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    }

    const getEmpPost = async (keyword) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.get(`${apiUrl}/employer/post${keyword}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response.data;
            } else throw new Error("Unauthorized !");
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }


    // Ntd get statitics
    const getEmpStatiticsView = async (year) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.get(`${apiUrl}/employer/statistic/view-page?year=${year}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response;
            } else throw new Error("Unauthorized !");
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getEmpStatiticsSubmit = async (year) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.get(`${apiUrl}/employer/statistic/cv-submit?year=${year}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response;
            } else throw new Error("Unauthorized !");
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getEmpStatiticsTotalViewPost = async (year) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.get(`${apiUrl}/employer/statistic/view-post?year=${year}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response;
            } else throw new Error("Unauthorized !");
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const upDatePostDeleted = async (id) => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.put(`${apiUrl}/employer/post?postId=${id}&status=DELETED`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });
                return response.data;
            } else throw new Error("Unauthorized !");
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    //conxtext data
    const authPostData = {
        getPostById, getPostByIndustry,getPostByAnyFilter,
        getCvSubmited,
        followPost, unfollowPost,
        createPost, updatePost,
        getEmpPost, upDatePostDeleted,
        getEmpStatiticsView,getEmpStatiticsSubmit,getEmpStatiticsTotalViewPost, 
        postState,
    };

    //return
    return (
        <PostContext.Provider value={authPostData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
