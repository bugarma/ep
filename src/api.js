import axios from "axios";

export default {
    articleList: () => axios.get(`https://cors-anywhere.herokuapp.com/https://tw.voicetube.com/channel/translated?time=short&order-type=collect&ref=nav-sub&accent=us`).then(res => {
        const parser = new DOMParser().parseFromString(res.data, "text/html");
        const links = [...parser.querySelectorAll('div.photo')];

        const options = links.map((e) => {
            const { href } = e.querySelector("a");
            const number = href.split('/')[4].split('?')[0];
            const { alt } = e.querySelector("img");
            
            return { number, title: alt };
        });
        return options;
    }),
};