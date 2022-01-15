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
            <button @click="audioControl">Audio control</button>
            <h4>My Feed :</h4>
            <div id="me" style="width: 300px;height: 300px;background-color: seagreen"></div>
            <h4>Stream:</h4>
            <div id="remoteContainer" style="width: 300px;height: 300px;background-color: #0c5460"></div>
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
            localStream:null
        };
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
        audioControl(){
            if (this.localStream._isAudioMuted())
                this.localStream.muteAudio()
            else
                this.localStream.unmuteAudio()
        },
        listeners() {
            this.client.on('stream-subscribed', function (evt) {
                let stream = evt.stream;
                let streamId = String(stream.getId());
                let streamDiv = document.createElement("div");
                streamDiv.id = streamId;
                streamDiv.style = "transform:rotateY(180deg);height:100%";
                let remoteContainer = document.getElementById('remoteContainer');
                remoteContainer.appendChild(streamDiv);

                stream.play(streamId);
            });

            this.client.on('stream-added', (evt) => {
                this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            });
        },


        createClient() {
            this.uid = Math.round(Math.random(1000) * 10000000);
            this.client = AgoraRTC.createClient({
                mode: 'rtc',
                codec: 'vp8'
            });
            this.client.init(this.agoraAppId, () => console.log('client initialized'), (err) => this.handleFail(err));
        },
        createChannel() {
            this.joinChannel();
            this.client.join(this.agoraAppId, this.channelName, null, (uid) => {
                this.localStream = AgoraRTC.createStream({
                    audio: true,
                    video: true,
                });
                this.localStream.init(() => {
                    this.localStream.play("me");
                    this.client.publish(this.localStream, (err) => this.handleFail(err));
                }, (err) => this.handleFail(err));
            }, (err) => this.handleFail(err));
            this.listeners();
            // this.client.on('stream-subscribed', function (evt) {
            //     let stream = evt.stream;
            //     let streamId = String(stream.getId());
            //     try {
            //         this.addVideoStream(streamId);
            //     } catch (e) {
            //         console.log(e);
            //         let streamDiv = document.createElement("div");
            //         streamDiv.id = streamId;
            //         streamDiv.style.transform = "rotateY(180deg)";
            //         let remoteContainer = document.getElementById('remoteContainer');
            //         remoteContainer.appendChild(streamDiv);
            //     }
            //
            //
            //     stream.play(streamId);
            // });
            //
            // this.client.on('stream-added', (evt) => {
            //     this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            // });
        },
        joinChannel() {
            this.client.join(this.agoraAppId, this.channelName, null, (uid) => {
                this. localStream = AgoraRTC.createStream({
                    audio: true,
                    video: true,
                });
                this.localStream.init(() => {
                    this.localStream.play("me");
                    this.client.publish(this.localStream, (err) => this.handleFail(err));
                }, (err) => this.handleFail(err));
            }, (err) => this.handleFail(err));
            this.listeners();
            // this.client.on('stream-subscribed', function (evt) {
            //     let stream = evt.stream;
            //     let streamId = String(stream.getId());
            //     try {
            //         this.addVideoStream(streamId);
            //     } catch (e) {
            //         let streamDiv = document.createElement("div");
            //         streamDiv.id = streamId;
            //         streamDiv.style.transform = "rotateY(180deg)";
            //         let remoteContainer = document.getElementById('remoteContainer');
            //         remoteContainer.appendChild(streamDiv);
            //     }
            //
            //
            //     stream.play(streamId);
            // });
            //
            // this.client.on('stream-added', (evt) => {
            //     this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            // });

        },
        handleFail(err) {
            console.log("Error : ", err);
        },
    }
};
</script>

<style scoped>

</style>