let input = document.getElementById('countryInput');
let submit = document.getElementById('submit');
let countryList = [];

window.onload = ()=>{
    if(input.value == 'Poland' || input.value == 'Spain'|| input.value == 'Germany'|| input.value == 'France'){
        submit.disabled=false;
    }else{
        submit.disabled=true;
    }
    fetch('https://api.openaq.org/v1/countries').then(data => data.json())
        .then(data => {
            data.results.forEach(namesE=>{
                countryList.push(namesE.name);
            });
        });
};

input.onkeyup = ()=>{
    if(input.value === 'Poland' || input.value === 'Spain'|| input.value ==='Germany'|| input.value === 'France'){
        submit.disabled=false;
    }else{
        submit.disabled=true;
    }
    let value = input.value.trim();
    if (value == "" || value.length <= 0) {
        $('#searchResults').fadeOut();
        return;
    } else {
        $('#searchResults').fadeIn();
    };
            const matches = countryList.filter(s => s.toLowerCase().includes(input.value.trim().toLowerCase()));
            $('#searchResults').html('');
            if (matches.length === 0) {
                $('#searchResults').append("<p class='lead mt-2'>Brak wyników</p>");
            } else {
                matches.slice(0,10).forEach((dataE,i) => {
                    if (dataE) {
                        $('#searchResults').append("<p class='m-2 lead add'>"+matches[i]+"</p>")
                    } else {
                    }
                });
            }

};

$(document).on('click','.add', (e) => {
    let clicked = $(e.target).html();
    let inputVal = $('#countryInput');
    inputVal.val(clicked)
    $('#searchResults').fadeOut();
            if(inputVal.val() == 'Poland' || inputVal.val() == 'Spain'|| inputVal.val() == 'Germany'|| inputVal.val() == 'France'){
                submit.disabled=false;
            }else{
                submit.disabled=true;
            }
});

submit.onclick = ()=>{
    submit.children[0].classList.remove('d-none');
};






