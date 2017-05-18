/**
 * Created by Bilger on 18-May-17.
 */

const Header = {

    _template: null,
    _placeholder: null,
    _templatePath: './Modules/Header/header.html',

    init(){
        const selfObj = this;
        selfObj._template = document.getElementById('HeaderTemplate');
        selfObj._placeholder = document.getElementById('HeaderPlaceholder');

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
        selfObj._placeholder.innerHTML = compiled({name: 'Bilger'});
    }
};

document.addEvent('domready', function () {
    Header.init();
});