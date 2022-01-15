<template>
    <div>

        <p>App id : <input id="app-id" v-model="agoraAppId" type="text" value=""/></p>
        <input v-model="channelName" placeholder="channelName" type="text"/>
        <h2>{{ uid }}</h2>
        <div class="row">
            <div>
                <button id="host-join" type="button" @click="createChannel">Join as host</button>
                <button id="audience-join" type="button" @click="joinChannel">Join as audience</button>
                <button id="leave" type="button">Leave</button>
            </div>
        </div>
        <div>
            <h4>My Feed :</h4>
            <div id="me" style="width: 200px;height:200px"></div>
            <div id="remoteContainer" style="width: 400px;height:400px;background-color: seagreen"></div>
            <button @click="videoControl">video controls</button>
        </div>
        <!--        <div>-->
        <!--            <div>-->
        <!--                <input id="RoleAttendee" v-model="role" type="radio" value="0">-->
        <!--                <label for="RoleAttendee">RoleAttendee</label>-->
        <!--                <br>-->
        <!--                <input id="RolePublisher" v-model="role" type="radio" value="1">-->
        <!--                <label for="RolePublisher">RolePublisher</label>-->
        <!--                <br>-->
        <!--                <input id="RoleSubscriber" v-model="role" type="radio" value="2">-->
        <!--                <label for="RoleSubscriber">RoleSubscriber</label>-->
        <!--                <br>-->
        <!--                <input id="RoleAdmin" v-model="role" type="radio" value="101">-->
        <!--                <label for="RoleAdmin">RoleAdmin</label>-->
        <!--                <br>-->
        <!--                <span>Выбрано: {{ role }}</span>-->

        <!--            </div>-->
        <!--        </div>-->
        <br>
        <br>
        <br>
    </div>
</template>

<script>
import AgoraRTC from 'agora-rtc-sdk';

export default {
    name: "Try1",
    data() {
        return {
            client: null,
            // agoraAppId: 'b0e7072ea1f8479fb58b857449c7f702',
            agoraAppId: 'ff487d0a29264aa78133c3ea7eccd374',
            channelName: null,
            uid: null,
            role: 101,
            stream: null,
            video: false
        };
    },
    watch: {
        'video': function () {
            if (this.video)
                this.stream.disableAudio();
            else
                this.stream.enableAudio();
        }
    },
    mounted() {


        navigator.permissions.query({name: 'camera'}).then(permissionStatus => {
            console.log(permissionStatus);
            // in my browser on this page it logs:
            //{
            //   status: "prompt",
            //   onchange: null,
            // }
        });
        this.createClient();
    },
    methods: {
        videoControl() {
            this.video = !this.video;
        },
        createClient() {
            this.uid = Math.round(Math.random(1000) * 10000000);
            this.client = AgoraRTC.createClient({
                mode: 'rtc',
                codec: 'vp8'
            });
            this.client.init(this.agoraAppId, () => {
                console.log('client initialized');
                this.addListeners();
            }, (err) => this.handleFail(err));
        },
        addListeners() {
            this.client.on('stream-subscribed', function (evt) {
                this.stream = evt.stream;
                let streamId = String(this.stream.getId());
                console.log('my error ' + e);
                let streamDiv = document.createElement("div");
                streamDiv.id = streamId;
                streamDiv.style = "transform:rotateY(180deg)";
                let remoteContainer = document.getElementById('remoteContainer');
                remoteContainer.appendChild(streamDiv);

                this.stream.play(streamId);
            });

            this.client.on('stream-added', (evt) => {
                this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            });
        },
        createChannel() {
            this.client.join(this.agoraAppId, this.channelName, null, (uid) => {
                let localStream = AgoraRTC.createStream({
                    audio: true,
                    video: true,
                });
                this.stream = localStream;
                localStream.init(() => {
                    localStream.play("me");
                    let me = document.getElementById('me');
                    client.publish(localStream, (err) => this.handleFail(err));
                }, (err) => this.handleFail(err));
            }, (err) => this.handleFail(err));

        },
        joinChannel() {
            this.client.join(this.agoraAppId, this.channelName, null, (uid) => {
                let localStream = AgoraRTC.createStream({
                    audio: true,
                    video: true,
                });
                this.stream = localStream;
                localStream.init(() => {
                    localStream.play("me");
                    this.client.publish(localStream, (err) => this.handleFail(err));
                }, (err) => this.handleFail(err));
            }, (err) => this.handleFail(err));
            this.addListeners();


        },
        handleFail(err) {
            console.log("Error : ", err);
        },
    }
};
</script>

<style scoped>

</style>