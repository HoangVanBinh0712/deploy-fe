import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { GlobalReducer } from "../reducers/GlobalReducer";
import { apiUrl } from "./Constants";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [globalState, dispatch] = useReducer(GlobalReducer, {
        industries: [],
        cities: [],
        highlightCompany:[],
    });

    const getIndustry = async () => {
        try {
            const responseIndustry = await axios.get(`${apiUrl}/industry`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(responseIndustry.data.success){
                dispatch({
                    type: "SET_INDUSTRY",
                    payload: {
                        industries: responseIndustry.data.data,
                    },
                  });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const getCity = async () => {
        try {
            const resCity = await axios.get(`${apiUrl}/city`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(resCity.data.success){
                dispatch({
                    type: "SET_CITY",
                    payload: {
                        cities: resCity.data.data,
                    },
                  });
            }
        }
        catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    const getHighLightCompany = async () => {
        try {
            const resCom = await axios.get(`${apiUrl}/user/highlight-company`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(resCom.status===200){
                dispatch({
                    type: "SET_COMPANY",
                    payload: {
                        highlightCompany: resCom.data,
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
        getIndustry()
        getCity()
        getHighLightCompany()
    }, []);

    //conxtext data
    const authGlobalData = {
        globalState,
    };

    //return
    return (
        <GlobalContext.Provider value={authGlobalData}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
