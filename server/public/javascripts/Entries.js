class Entries {
    constructor(db, mb) {
        this.db = db;
        this.mb = mb;

        this.mb.listen("/topics/loaded", (topics)=> {
            console.log(topics);
            const firstTopic = topics[0].title;
            console.log(firstTopic);
            this.get_entries_for_topic(firstTopic);
        });

        this.mb.listen("/entries/loaded", (topic, entries) => {
            this.render(topic, entries);
        });

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!! LISTEN REALTIME CHANGES IN ENTRIES !!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // 
        // this.db.collection("entries")
        //     .onSnapshot(function(querySnapshot) {
        //         var entries = [];
        //         querySnapshot.forEach(function(doc) {
        //             entries.push(doc.data().data);
        //         });
        //         console.log("Current entries", entries);
        //     });
    }

    get_entries_for_topic(topic) {
        let self = this;
        let entries = [];

        this.db.collection("entries").where("topic", "==", topic)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    entries.push(doc.data());
                });
                self.mb.say("/entries/loaded", {topic, entries})
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    render({topic, entries}) {
        const template = `<div id="entries">
                             <h1><%= topic %></h1>
                             <ul>
                             <% entries.forEach(function(entry){ %>
                                 <li><%= entry.data %></a></li>
                             <% }); %>
                             </ul>
                          </div>`;
        const html = ejs.render(template, {entries: entries, 'topic': topic});
        document.getElementById("entries_panel").innerHTML = html
    }
}
