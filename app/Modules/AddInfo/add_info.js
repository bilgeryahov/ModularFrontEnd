/**
 * Created by Bilger on 29-May-17.
 */

const AddInfo = {

    _template: null,
    _placeholder: null,
    _templatePath: './Modules/AddInfo/add_info.html',

    init(){
        const selfObj = this;
        selfObj._template = document.getElementById('AddInfoTemplate');
        selfObj._placeholder = document.getElementById('AddInfoPlaceholder');

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

    sendDataToDatabase(){

        // First get the data from the text field.
        const $textField = $('FirstNameInput');
        const $textFieldValue = $textField.value;

        // Send to the Firebase RealTime database.
        if(FirebaseEngine){

            FirebaseEngine.loginAnonymously(function ($error, $data) {

                if($error){

                    console.error($error);
                    return;
                }

                FirebaseEngine.saveData(
                    'data',
                    $textFieldValue
                );
                alert('success');
            });
            return;
        }

        console.error('AddInfo.sendToDatabase(): FirebaseEngine is not present!');
    }
};

document.addEvent('domready', function () {
    AddInfo.init();
});