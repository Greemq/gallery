<template>
    <div>

        <p>App id : <input id="app-id" v-model="agoraAppId" type="text" value=""/></p>
        <input v-model="channelName" placeholder="channelName" type="text"/>
        <h2>{{uid}}</h2>
        <div class="row">
            <div>
                <button id="host-join" type="button" @click="createChannel">Join as host</button>
                <button id="audience-join" type="button" @click="joinChannel">Join as audience</button>
                <button id="leave" type="button">Leave</button>
                <button id="getStr" type="button" @click="getLocalStream">get stream</button>
            </div>
        </div>
        <div>
            <h4>My Feed :</h4>
            <div id="me"></div>
            <div id="remoteContainer"></div>
        </div>
        <div>
            <div>
                <input id="RoleAttendee" v-model="role" type="radio" value="0">
                <label for="RoleAttendee">RoleAttendee</label>
                <br>
                <input id="RolePublisher" v-model="role" type="radio" value="1">
                <label for="RolePublisher">RolePublisher</label>
                <br>
                <input id="RoleSubscriber" v-model="role" type="radio" value="2">
                <label for="RoleSubscriber">RoleSubscriber</label>
                <br>
                <input id="RoleAdmin" v-model="role" type="radio" value="101">
                <label for="RoleAdmin">RoleAdmin</label>
                <br>
                <span>Выбрано: {{ role }}</span>

            </div>
        </div>
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
        };
    },
    mounted() {


        navigator.permissions.query({name: 'camera'}).then( permissionStatus => {
            console.log(permissionStatus)
            // in my browser on this page it logs:
            //{
            //   status: "prompt",
            //   onchange: null,
            // }
        })
        this.createClient();
    },
    methods: {
        getLocalStream() {
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then( stream => {
                window.localStream = stream;
                window.localAudio.srcObject = stream;
                window.localAudio.autoplay = true;
            }).catch( err => {
                console.log("u got an error:" + err)
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
            // this.client.setClientRole(this.role);
            this.joinChannel()
            this.client.join(this.agoraAppId, this.channelName, null, (uid) => {
                let localStream = AgoraRTC.createStream({
                    // audio: true,
                    video: true,
                });
                //Initialize the local stream
                localStream.init(() => {
                    // Play the local stream
                    localStream.play("me");
                    // Publish the local stream
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
                //Initialize the local stream
                localStream.init(() => {
                    // Play the local stream
                    localStream.play("me");
                    // Publish the local stream
                    client.publish(localStream, (err) => this.handleFail(err));
                }, (err) => this.handleFail(err));
            }, (err) => this.handleFail(err));
            this.client.on('stream-subscribed', function (evt) {
                let stream = evt.stream;
                let streamId = String(stream.getId())
                this.addVideoStream(streamId)
                stream.play(streamId);
            });

            this.client.on('stream-added', (evt) => {
                this.client.subscribe(evt.stream, (err) => this.handleFail(err));
            });

            // this.client.on('stream-removed', this.removeVideoSteam(this.client.stream));
            // this.client.on('peer-leave', this.removeVideoSteam(this.client.stream));

        },
        handleFail(err) {
            console.log("Error : ", err);
        },
        addVideoStream(elementId) {
            let streamDiv = document.createElement("div");
            streamDiv.id = elementId;
            streamDiv.style.transform = "rotateY(180deg)";
            let remoteContainer = document.getElementById('remoteContainer')
            remoteContainer.appendChild(streamDiv);
        },
        removeVideoStream(elementId) {
            let remoteDiv = document.getElementById(elementId);
            if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
        }
    }
};
</script>

<style scoped>

</style>