/**
 * @file FirebaseEngine.js
 *
 * Own implementation of a Firebase engine, with
 * fetch data and save data functions.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

const FirebaseEngine = {

    // Reference to the core engine.
    _databaseEngine: {},
    _authEngine: {},

    /**
     * Initializes the current application and the Firebase engine.
     *
     * @return void
     */

    init: function(){

        let $self = this;

        let $config = {
            apiKey: "AIzaSyD1lkxmYQouKt7gdAQopcD0Z7oZktPH5oc",
            authDomain: "modularfrontend.firebaseapp.com",
            databaseURL: "https://modularfrontend.firebaseio.com",
            projectId: "modularfrontend",
            storageBucket: "modularfrontend.appspot.com",
            messagingSenderId: "482731016963"
        };

        // Initialize the current app.
        firebase.initializeApp($config);

        // Initialize the databse enigne.
        $self._databaseEngine = firebase.database().ref();

        // Initialize the auth engine.
        $self._authEngine = firebase.auth();
    },

    /**
     * Fetches data from the Firebase Real Time Database.
     *
     * When data arrives calls back the function provided with the
     * data attached.
     *
     * If something goes wrong, error message is returned by the callback.
     *
     * @param $path
     * @param $callback
     *
     * @return void
     */

    fetchData: function($path, $callback){

        let $self = this;

        $self._databaseEngine.child($path)
            .once('value')
            .then(function($data){

                // Call me back with the data.
                return $callback(null, $data.val());
            })
            .catch(function($error){

                // Oh bad..
                return $callback($error, null);
            });
    },

    /**
     * You provide the path and the data, it makes sure
     * that your data ends up at the correct place.
     *
     * @param $path
     * @param $data
     *
     * @return void
     */

    saveData: function($path, $data){

        let $self = this;

        $self._databaseEngine.child($path).set($data);
    },

    loginAnonymously($callback){

        const $self = this;

        $self._authEngine.signInAnonymously()
            .then(function () {

                return $callback(null, true);
            })
            .catch(function($error) {

                return $callback($error, null);
            });
    }
};

document.addEvent('domready', function(){

    // Initialize the Firebase enigne.
    FirebaseEngine.init();
});