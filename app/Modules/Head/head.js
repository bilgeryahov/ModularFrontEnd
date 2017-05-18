/**
 * Created by Bilger on 18-May-17.
 */

const Head = {

    _template: null,
    _placeholder: null,

    init(){
        const selfObj = this;
        selfObj._template = document.getElementById('HeadTemplate');
        selfObj._placeholder = document.getElementById('HeadPlaceholder');

        new Request({
            url:'./Modules/Head/head.html',
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
    }
};

document.addEvent('domready', function () {
   Head.init();
});