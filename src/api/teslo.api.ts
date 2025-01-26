import axios from "axios";
import { useAuthStore } from "../stores";

const tesloApi = axios.create({
    baseURL: "http://localhost:3000/api",
});

tesloApi.interceptors.request.use((config) => {
    // * JS vanilla
    // const token = localStorage.getItem("token");

    // * Zustand (used as method, not hook)
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default tesloApi;