class User {
    constructor(db, mb) {
        this.db = db;
        this.mb = mb;

        this.mb.listen("/link/clicked", (link) => {
            if(link == "/kullanici/yeni_entry"){
                this.open_new_entry_dialog();
            }

            if(link == "/kullanici/yeni_entry_ekle") {
                this.add_new_entry(topics.currentTopic);
            }

            if(link == "/kullanici/giris") {
                this.open_user_login_dialog();
            }

            if(link == "/kullanici/cikis") {
                this.sign_out();
            }
        });

        firebase.auth().onAuthStateChanged(function(user) {
            console.log("MEVCUT KULLANICI:", user);

            if (user) {
                document.getElementById("user_login").classList.add("hidden");
                document.getElementById("user_logged").classList.remove("hidden");
            } else {
                document.getElementById("user_login").classList.remove("hidden");
                document.getElementById("user_logged").classList.add("hidden");
            }
        });
    }

    open_new_entry_dialog() {
        document.getElementById("new_entry_dialog").classList.remove("hidden");
    }

    close_new_entry_dialog() {
        document.getElementById("new_entry_dialog").classList.add("hidden");
    }

    open_user_login_dialog() {
        document.getElementById("firebaseui-auth-container").classList.remove("hidden");

        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        var uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
              },
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
              }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              firebase.auth.GithubAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
          };

        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    sign_out() {
        if (confirm("Cikis yapmak istediginize ")) {
            firebase.auth().signOut()
        }
    }

    add_new_entry(topic) {
        const entry = document.getElementById("txt_new_entry").value;

        const new_entry = {
            topic: topic.title,
            user: '@yortuc',
            data: entry,
            "type": 'text',
            location: [46, 11],
            entry_date: '2019-08-01T16:00:00'
        }

        this.db.collection("entries").add(new_entry)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.close_new_entry_dialog();
            // topics.get_topics();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}
