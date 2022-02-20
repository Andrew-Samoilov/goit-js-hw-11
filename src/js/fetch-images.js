const axios = require('axios').default;
let pageGallery = 1;

export async function fetchImages(imag) {
    const BASE_URL = 'https://pixabay.com/api/';
    const MY_API_KEY = '25686196-d3e700a683e9eec533ed2046f';
    const PER_PAGE = 40;
    const options = `image_type=photo&pretty=true&page=${pageGallery}&per_page=${PER_PAGE}&orientation=horizontal&safesearch=true`;
    /* https://pixabay.com/api/
    ?key=25686196-d3e700a683e9eec533ed2046f
    &q=yellow+flowers&image_type=photo&pretty=true */

    console.log(` inside function fetchImages ${imag}`);
    console.log(`  pageGallery ${pageGallery++}`);

    const axiosResponse = await axios.get(`${BASE_URL}?key=${MY_API_KEY}&q=${imag}&${options}`);
    return axiosResponse.data;

    // return await fetch(`${BASE_URL}?key=${MY_API_KEY}&q=${imag}&${options}`)
    //     .then(response => response.json(),
    // );
}

export function resetPageNumber() {
    pageGallery = 1;
}
