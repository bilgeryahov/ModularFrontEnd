/**
 * Created by Bilger on 09-May-17.
 */

const Head = {

    init(){
        alert("Head loaded!");
    }
};

document.addEvent('domready', function(){

    Head.init();
});