"use strict";
const summary_div = document.querySelector('.summary_wrapper');
const ave_span = document.querySelector('#ave_span');
fetch('./data.json')
    .then(response => response.text())
    .then(body => JSON.parse(body))
    .then((data) => {
    const cat_number = data.length;
    if (cat_number == 0) {
        summary_div.textContent = "No category to display";
        summary_div.classList.add('summary_empty');
    }
    else {
        summary_div.classList.remove('summary_empty');
        data.forEach((div => summary_div.appendChild(create_category_div(div))));
    }
    ave_span.textContent = get_average(data);
}).catch(() => {
    summary_div.textContent = "No category to display";
    summary_div.classList.add('summary_empty');
});
function create_category_div(data) {
    const div_wrapper = document.createElement('div');
    div_wrapper.classList.add('category', data.category);
    const img = document.createElement('img');
    img.src = data.icon;
    img.classList.add('cat_img');
    const cat_span = document.createElement('span');
    cat_span.textContent = data.category;
    cat_span.classList.add('cat_span');
    const score_div = document.createElement('div');
    score_div.classList.add('score_div');
    const score_span = document.createElement('span');
    score_span.textContent = String(data.score);
    score_span.classList.add('score_span');
    const percent_span = document.createElement('span');
    percent_span.textContent = ' / 100';
    percent_span.classList.add('percent_span');
    //Appending children to parent
    score_div.appendChild(score_span);
    score_div.appendChild(percent_span);
    div_wrapper.appendChild(img);
    div_wrapper.appendChild(cat_span);
    div_wrapper.appendChild(score_div);
    return div_wrapper;
}
function get_average(dataArr) {
    const data_num = dataArr.length;
    let sum = 0;
    if (data_num == 0)
        return '--';
    else {
        dataArr.forEach(data => sum += data.score);
    }
    return String(Math.round(sum / data_num));
}
