import axios from "axios";

export default {
    articleList: () => axios.get('/api/article').then((res) => res.data),
};