export class Topics {
    constructor(db, mb) {
        this.db = db;
        this.mb = mb;
        this.currentTopic = null;

        this.mb.listen('/topics/loaded', (topics)=> {
            this.render(topics);
            this.currentTopic = topics[0];
        });

        this.mb.listen("/link/clicked", (link)=> {
            if(link.startsWith("/t/")){
                this.select_topic(link.substring(3));
            }
        });
    }

    select_topic(topic_title) {
        this.currentTopic = topic_title;
        this.mb.say("/topics/topic_changed", topic_title);
    }

    get_topics() {
        let self = this;
        let topics = [];

        this.db.collection("topics")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    topics.push(doc.data());
                });
                self.mb.say("/topics/loaded", topics)
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    render(topics) {
        const template = `<div id="topics">
                             <h1>konular</h1>
                             <ul>
                             <% topics.forEach(function(topic){ %>
                                 <li><a href="/t/<%= topic.title %>"><%= topic.title %></a></li>
                             <% }); %>
                             </ul>
                          </div>`;
        const html = ejs.render(template, {topics: topics});
        document.getElementById("topics_panel").innerHTML = html
    }
}
