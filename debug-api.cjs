const axios = require('axios');

async function check() {
    try {
        const res = await axios.get('https://alfa-leetcode-api.onrender.com/select?titleSlug=two-sum');
        console.log("Keys:", Object.keys(res.data));
        console.log("Example Test Cases (Raw):", res.data.exampleTestcases);
        console.log("Full Meta Data:", JSON.stringify(res.data.metaData, null, 2));
    } catch (e) {
        console.error(e.message);
    }
}

check();
