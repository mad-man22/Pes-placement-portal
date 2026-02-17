const axios = require('axios');

async function check() {
    try {
        const res = await axios.get('https://alfa-leetcode-api.onrender.com/select?titleSlug=two-sum');
        console.log("Keys:", Object.keys(res.data));
        console.log("Example Test Cases:", res.data.exampleTestcases);
        console.log("Meta Data:", res.data.metaData); // Often contains input structure
    } catch (e) {
        console.error(e.message);
    }
}

check();
