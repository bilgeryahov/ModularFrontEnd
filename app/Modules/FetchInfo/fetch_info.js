/**
 * Created by Bilger on 29-May-17.
 */

const FetchInfo = {

    _template: null,
    _placeholder: null,
    _templatePath: './Modules/FetchInfo/fetch_info.html',

    init(){
        const selfObj = this;
        selfObj._template = document.getElementById('FetchTemplate');
        selfObj._placeholder = document.getElementById('FetchInfoPlaceholder');

        new Request({
            url:selfObj._templatePath,
            method: 'get',
            onSuccess(data){
                return selfObj.generateTemplate(data);
            }
        }).send();
    },

    generateTemplate(data){
        const selfObj = this;
        const compiled = Handlebars.compile(data);
        selfObj._placeholder.innerHTML = compiled();
    },

    getDataFromDatabase(){

        const $textField = $('FirstNameOutput');

        if(FirebaseEngine){

            FirebaseEngine.fetchData(
                '/data/',
                function ($error, $data) {

                    if($error){

                        console.error($error);
                        return;
                    }

                    $textField.innerHTML = $data;
                });
            return;
        }

        console.error('FetchInfo.getDataFromDatabase(): FirebaseEngine is not present!');
    }
};

document.addEvent('domready', function () {

    FetchInfo.init();
});