import axios from "axios";

const corsProxy = "https://cors-anywhere.herokuapp.com/"

export default {
    articleList: () => axios.get(`${corsProxy}https://tw.voicetube.com/channel/translated?time=short&order-type=collect&ref=nav-sub&accent=us`).then(res => {
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
    fetchArticle: (number) => axios.get(`${corsProxy}https://tw.voicetube.com/videos/print/${number}?eng_zh_tw=1`).then(res => {
        const parser = new DOMParser().parseFromString(res.data, "text/html");
        const spans = [...parser.querySelectorAll('li span')];

        const body = spans.map(e => {
            const s = e.innerHTML.split(/(?:<br>)|(?:<br\/>)/);
            const eng = new DOMParser().parseFromString(s[0], "text/html").querySelector('body').textContent.trim();
            const cht = new DOMParser().parseFromString(s[1], "text/html").querySelector('body').textContent.trim();

            return {
                eng,
                cht
            };
        });
        

        return body;
    }),
};