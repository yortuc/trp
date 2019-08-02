export class User {
    constructor(firebase, db, mb) {
        this.db = db;
        this.mb = mb;

        this.mb.listen("/link/clicked", (link) => {
            if(link == "/kullanici/yeni_entry_ekle") this.add_new_entry(topics.currentTopic);
            if(link == "/kullanici/giris") this.open_user_login_dialog();
            if(link == "/kullanici/cikis") this.sign_out();
            if(link == "/kullanici/yeni_topic_olustur") this.open_new_topic_dialog();
            if(link == "/kullanici/yeni_topic_ekle") this.add_new_topic();

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

    close_new_entry_dialog() {
        document.getElementById("new_entry_dialog").classList.add("hidden");
    }

    open_new_topic_dialog() {
        ui.get_modal_instance(document.getElementById("dlg_new_topic")).open();
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

    save_document(collection, doc, cb) {
        this.db.collection(collection).add(doc)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            cb();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
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
        this.save_document("entries", new_entry, this.close_new_entry_dialog)
    }

    add_new_topic() {
        const topic_title = document.getElementById("txt_title_new_topic").value;
        const entry = document.getElementById("txt_entry_new_topic").value;

        const new_topic = {
            location: [46, 11],
            tags: ['test', 'trp'],
            title: topic_title,
            user: '@yortuc'
        }

        this.save_document("topics", new_topic, ()=> {
            this.save_document("entries", {
                topic: topic_title,
                user: '@yortuc',
                data: entry,
                "type": 'text',
                location: [46, 11],
                entry_date: '2019-08-01T16:00:00'
            }, ()=> ui.get_modal_instance(document.getElementById("dlg_new_topic")).close())
        })
    }
}
