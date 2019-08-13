class DBHelper {
    constructor(firebase) {
        this.fb = firebase;
        this.db = firebase.firestore();
    }

    listenCollection(collection, cb) {
        return this.db.collection(collection)
                    .onSnapshot(function(querySnapshot) {
                        var items = [];
                        querySnapshot.forEach(function(doc) {
                            items.push(doc.data());
                        });
                        console.log("Current " + collection, items);
                        cb(items);
                    });
    }

    listenCollectionWith(collection, where, cb) {
        return this.db.collection(collection).where(...where)
            .onSnapshot(function(querySnapshot) {
                var items = [];
                querySnapshot.forEach(function(doc) {
                    items.push(doc.data());
                });
                console.log("Current " + collection, items);
                cb(items);
            });
    }
}

export default DBHelper;    
