
export const PostReducer = (state, action) => {
  const { type, payload: { posts, postsAi, postHot, postMostView, postFollow, currentPage, totalPage, limit } } = action;
  switch (type) {
    case "POSTS_LOADED_SUCCESS":
      return {
        ...state,
        postLoading: false,
        posts,

        /* currentPage,
        totalPage,
        limit, */
      };
    case "POST_PREDICT_SUCCESS":
      return {
        ...state,
        postLoading: false,
        postsAi,

        /* currentPage,
        totalPage,
        limit, */
      };
    case "HOT_POST_LOADED_SUCCESS":
      return {
        ...state,
        postLoading: false,
        postHot,

        /* currentPage,
        totalPage,
        limit, */
      };
    case "MOST_VIEW_LOADED_SUCCESS":
      return {
        ...state,
        postLoading: false,
        postMostView,

        /* currentPage,
        totalPage,
        limit, */
      };
    case "POSTS_FOLLOW":
      return {
        ...state,
        postFollow,
      };
    case "POSTS_LOADED_FAIL":
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    /* case "POST_ADDED_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case "POST_UPDATED_SUCCESS":
      const newPosts = state.posts.map((post) => {
        if (post.id === payload.id) return payload;
        return post;
      });
      return {
        ...state,
        posts: newPosts,
      };
    case "POST_DELETED_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    case "POST_ACCEPTED_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    case "POSTS_FIND_SUCCESS":
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case "BEFORE_GET_PREPARE":
      return {
        ...state,
        posts: [],
        postLoading: true,
      };
      case "POSTS_PREDICT_SUCCESS":
        return {
          ...state,
          posts: payload.data.data,
          jobOption: payload.data.jobOptionResponses,
          currentView: payload.data.currentView,
        };
      case "POSTS_PREDICT_FAIL":
        return {
          ...state,
          posts: [],
          jobOption: 'Can not predict',
          currentView: 'Can not predict',
        }; */
    default:
      return state;
  }
};
