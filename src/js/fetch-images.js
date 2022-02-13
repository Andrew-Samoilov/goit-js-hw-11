export function fetchImages(imag) {
    const BASE_URL = 'https://pixabay.com/api/';
    const MY_API_KEY = '25686196-d3e700a683e9eec533ed2046f';
    const options = 'image_type=photo&pretty=true&page=1&per_page=40&orientation=horizontal&safesearch=true';
    /* https://pixabay.com/api/
    ?key=25686196-d3e700a683e9eec533ed2046f
    &q=yellow+flowers&image_type=photo&pretty=true */

    // imag = 'yellow+flowers';
    console.log(` inside function fetchImages ${imag}`);

    return fetch(`${BASE_URL}?key=${MY_API_KEY}&q=${imag}&${options}`)
        .then(response => response.json(),
    );
}
