document.addEventListener('init', function(event){
    var page = event.target;

    if (page.id === 'quest_list') {
        page.querySelector('#button-quest-vegan').onclick = function () {
            document.querySelector('#myNavigator').pushPage('quest-vegan.html', {data: {title: 'Vegan Quest'}});
        };
    } else if (page.id === 'quest-city-bike') {
        page.querySelector('ons-tool')
    }
})